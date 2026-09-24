import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const getArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const serviceLabels = {
  ka: {
    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი / რეპეტიტორი",
    housekeeper: "სახლის დამხმარე",
    dogwalker: "ძაღლის გამსეირნებელი",
    "dog-walker": "ძაღლის გამსეირნებელი",
  },
  en: {
    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor / Teacher",
    housekeeper: "Housekeeper",
    dogwalker: "Dog Walker",
    "dog-walker": "Dog Walker",
  },
  ru: {
    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogwalker: "Выгульщик собак",
    "dog-walker": "Выгульщик собак",
  },
};

const cityLabels = {
  ka: {
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",
  },
  en: {
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",
  },
  ru: {
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",
  },
};

const icons = {
  nanny: "👶",
  caregiver: "👵",
  driver: "🚗",
  tutor: "📚",
  housekeeper: "🏠",
  dogwalker: "🐕",
  "dog-walker": "🐕",
};

const getProfilePath = (profile) => {
  if (!profile) return "/";

  const p = profile.profession;

  if (p === "nanny") return `/nannies/${profile.id}`;
  if (p === "caregiver") return `/caregivers/${profile.id}`;
  if (p === "driver") return `/drivers/${profile.id}`;
  if (p === "tutor") return `/tutors/${profile.id}`;
  if (p === "housekeeper") return `/housekeepers/${profile.id}`;
  if (p === "dogwalker" || p === "dog-walker")
    return `/dogwalker/${profile.id}`;

  return "/";
};

const tr = {
  ka: {
    title: "გაგზავნილი დაინტერესებები",
    desc: "აქ ჩანს სპეციალისტებისთვის შენ მიერ გაგზავნილი ყველა შეთავაზება.",
    empty: "ჯერ არც ერთი სპეციალისტისთვის არ გაგიგზავნიათ შეთავაზება.",
    waiting: "სპეციალისტის პასუხის მოლოდინში",
    yes: "სპეციალისტს აინტერესებს შეთავაზება",
    no: "სპეციალისტს ამ ეტაპზე შეთავაზება არ აინტერესებს",
    view: "პროფილის ნახვა",
    back: "← Care Georgia",
  },
  en: {
    title: "Sent Interests",
    desc: "All offers you sent to specialists appear here.",
    empty: "You haven't sent an offer to a specialist yet.",
    waiting: "Waiting for specialist response",
    yes: "The specialist is interested",
    no: "The specialist is not interested at this time",
    view: "View Profile",
    back: "← Care Georgia",
  },
  ru: {
    title: "Отправленные предложения",
    desc: "Здесь находятся все предложения, которые вы отправили специалистам.",
    empty: "Вы пока не отправляли предложения специалистам.",
    waiting: "Ожидание ответа специалиста",
    yes: "Специалист заинтересован",
    no: "Специалист сейчас не заинтересован",
    view: "Посмотреть профиль",
    back: "← Care Georgia",
  },
};

export default function SentInterests() {
  const { language } = useLanguage();
  const t = tr[language] || tr.ka;
  const uid = localStorage.getItem("careGeorgiaCurrentUserId");

  const mine = getArray("careGeorgiaInterests")
    .filter(
      (interest) =>
        String(interest.employerUserId) === String(uid)
    )
    .reverse();

  const jobs = getArray("careGeorgiaJobs");
  const profiles = getArray("careGeorgiaSpecialists");

  return (
    <div className="drivers-page">
      <div className="drivers-container">
        <Link to="/" className="back-link">
          {t.back}
        </Link>

        <div className="drivers-heading">
          <div>
            <h1>📤 {t.title}</h1>
            <p>{t.desc}</p>
          </div>
        </div>

        {mine.length === 0 ? (
          <div className="driver-card" style={{ padding: 30 }}>
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="drivers-grid">
            {mine.map((interest) => {
              const job = jobs.find(
                (item) =>
                  String(item.id) === String(interest.jobId)
              );

              const profile = profiles.find(
                (item) =>
                  String(item.id) ===
                  String(interest.specialistProfileId)
              );

              return (
                <div className="driver-card" key={interest.id}>
                  {profile && (
                    <>
                      <h3>
                        {icons[profile.profession] || "👤"}{" "}
                        {profile.firstName || ""}{" "}
                        {profile.lastName
                          ? `${profile.lastName.charAt(0)}.`
                          : ""}
                      </h3>

                      <p>
                        {serviceLabels[language]?.[
                          profile.profession
                        ] || profile.profession}
                      </p>

                      {profile.city && (
                        <p>
                          📍{" "}
                          {cityLabels[language]?.[profile.city] ||
                            profile.city}
                        </p>
                      )}
                    </>
                  )}

                  {job && (
                    <p>
                      💼{" "}
                      {serviceLabels[language]?.[job.service] ||
                        job.service}
                    </p>
                  )}

                  <div
                    style={{
                      marginTop: 12,
                      padding: 12,
                      background:
                        interest.status === "interested"
                          ? "#f0fdf4"
                          : "#f8fafc",
                      borderRadius: 10,
                    }}
                  >
                    {interest.status === "interested"
                      ? `💚 ${t.yes}`
                      : interest.status === "not-interested"
                        ? `⚪ ${t.no}`
                        : `⏳ ${t.waiting}`}
                  </div>

                  {profile && (
                    <Link
                      to={getProfilePath(profile)}
                      state={{ from: "sent-interests" }}
                      style={{
                        display: "inline-block",
                        marginTop: 14,
                      }}
                    >
                      👤 {t.view} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
