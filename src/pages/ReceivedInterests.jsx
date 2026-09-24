import { useEffect, useState } from "react";
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
  ka: { nanny:"ძიძა", caregiver:"მომვლელი", driver:"მძღოლი", tutor:"ტუტორი / რეპეტიტორი", housekeeper:"სახლის დამხმარე", dogwalker:"ძაღლის გამსეირნებელი", "dog-walker":"ძაღლის გამსეირნებელი" },
  en: { nanny:"Nanny", caregiver:"Caregiver", driver:"Driver", tutor:"Tutor / Teacher", housekeeper:"Housekeeper", dogwalker:"Dog Walker", "dog-walker":"Dog Walker" },
  ru: { nanny:"Няня", caregiver:"Сиделка", driver:"Водитель", tutor:"Репетитор", housekeeper:"Помощник по дому", dogwalker:"Выгульщик собак", "dog-walker":"Выгульщик собак" },
};

const cityLabels = {
  ka:{tbilisi:"თბილისი",batumi:"ბათუმი",kutaisi:"ქუთაისი",rustavi:"რუსთავი",gori:"გორი",zugdidi:"ზუგდიდი",poti:"ფოთი",telavi:"თელავი",other:"სხვა"},
  en:{tbilisi:"Tbilisi",batumi:"Batumi",kutaisi:"Kutaisi",rustavi:"Rustavi",gori:"Gori",zugdidi:"Zugdidi",poti:"Poti",telavi:"Telavi",other:"Other"},
  ru:{tbilisi:"Тбилиси",batumi:"Батуми",kutaisi:"Кутаиси",rustavi:"Рустави",gori:"Гори",zugdidi:"Зугдиди",poti:"Поти",telavi:"Телави",other:"Другой"},
};

const icons = { nanny:"👶", caregiver:"👵", driver:"🚗", tutor:"📚", housekeeper:"🏠", dogwalker:"🐕", "dog-walker":"🐕" };

const tr = {
  ka: {
    title:"დამსაქმებლის დაინტერესება",
    desc:"აქ ჩანს დამსაქმებლებისგან შენს სპეციალისტის პროფილზე მიღებული შეთავაზებები.",
    empty:"ჯერ არც ერთ დამსაქმებელს არ გამოუგზავნია დაინტერესება.",
    interested:"მაინტერესებს შეთავაზება",
    not:"ამ ეტაპზე არ მაინტერესებს",
    new:"ახალი შეთავაზება",
    yes:"თქვენ დაადასტურეთ, რომ შეთავაზება გაინტერესებთ.",
    no:"თქვენ მიუთითეთ, რომ ამ ეტაპზე შეთავაზება არ გაინტერესებთ.",
    contact:"დამსაქმებლის საკონტაქტო ინფორმაცია",
    back:"← Care Georgia"
  },
  en: {
    title:"Employer Interests",
    desc:"Employer offers sent to your specialist profile appear here.",
    empty:"No employer has sent you an offer yet.",
    interested:"I'm interested",
    not:"Not interested at this time",
    new:"New offer",
    yes:"You confirmed that you are interested.",
    no:"You indicated that you are not interested at this time.",
    contact:"Employer Contact Information",
    back:"← Care Georgia"
  },
  ru: {
    title:"Интерес работодателя",
    desc:"Здесь находятся предложения работодателей для вашего профиля специалиста.",
    empty:"Работодатели пока не отправляли вам предложения.",
    interested:"Мне интересно",
    not:"Сейчас не интересно",
    new:"Новое предложение",
    yes:"Вы подтвердили интерес к предложению.",
    no:"Вы указали, что предложение сейчас не интересно.",
    contact:"Контактная информация работодателя",
    back:"← Care Georgia"
  }
};

export default function ReceivedInterests() {
  const { language } = useLanguage();
  const t = tr[language] || tr.ka;
  const uid = localStorage.getItem("careGeorgiaCurrentUserId");

  const [all, setAll] = useState(() => getArray("careGeorgiaInterests"));
  const jobs = getArray("careGeorgiaJobs");
  const profiles = getArray("careGeorgiaSpecialists");

  const mine = all
    .filter((interest) => String(interest.specialistUserId) === String(uid))
    .reverse();

  useEffect(() => {
    if (!uid) return;

    const hasUnread = all.some(
      (interest) =>
        String(interest.specialistUserId) === String(uid) &&
        interest.specialistSeen !== true
    );

    if (!hasUnread) return;

    const next = all.map((interest) =>
      String(interest.specialistUserId) === String(uid)
        ? { ...interest, specialistSeen: true }
        : interest
    );

    setAll(next);
    localStorage.setItem("careGeorgiaInterests", JSON.stringify(next));
    window.dispatchEvent(new Event("careGeorgiaInterestsUpdated"));
  }, [uid]);

  const update = (id, status) => {
    const next = all.map((interest) =>
      String(interest.id) === String(id) &&
      String(interest.specialistUserId) === String(uid)
        ? {
            ...interest,
            status,
            specialistSeen: true,
            respondedAt: new Date().toISOString(),
          }
        : interest
    );

    setAll(next);
    localStorage.setItem("careGeorgiaInterests", JSON.stringify(next));
    window.dispatchEvent(new Event("careGeorgiaInterestsUpdated"));
  };

  return (
    <div className="drivers-page">
      <div className="drivers-container">
        <Link to="/" className="back-link">{t.back}</Link>

        <div className="drivers-heading">
          <div>
            <h1>💼 {t.title}</h1>
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
                (item) => String(item.id) === String(interest.jobId)
              );

              const profile = profiles.find(
                (item) =>
                  String(item.id) === String(interest.specialistProfileId)
              );

              const email =
                interest.showEmployerEmail === true &&
                interest.employerEmail;

              const phone =
                interest.showEmployerPhone === true &&
                interest.employerPhone;

              return (
                <div className="driver-card" key={interest.id}>
                  <h3>
                    💼{" "}
                    {job
                      ? serviceLabels[language]?.[job.service] || job.service
                      : ""}
                  </h3>

                  {profile && (
                    <p>
                      {icons[profile.profession] || "👤"}{" "}
                      {serviceLabels[language]?.[profile.profession] ||
                        profile.profession}
                    </p>
                  )}

                  {job && (
                    <>
                      <p>
                        📍 {cityLabels[language]?.[job.city] || job.city}
                      </p>
                      {job.description && <p>{job.description}</p>}
                    </>
                  )}

                  <div
                    style={{
                      padding: 12,
                      background: "#f8fafc",
                      borderRadius: 10,
                      marginTop: 12,
                    }}
                  >
                    {interest.status === "interested"
                      ? `💚 ${t.yes}`
                      : interest.status === "not-interested"
                        ? `⚪ ${t.no}`
                        : `🔔 ${t.new}`}
                  </div>

                  {(email || phone) && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: 12,
                        background: "#eff6ff",
                        borderRadius: 10,
                      }}
                    >
                      <strong>📇 {t.contact}</strong>

                      {email && (
                        <p>
                          ✉️{" "}
                          <a href={`mailto:${interest.employerEmail}`}>
                            {interest.employerEmail}
                          </a>
                        </p>
                      )}

                      {phone && (
                        <p>
                          📞{" "}
                          <a href={`tel:${interest.employerPhone}`}>
                            {interest.employerPhone}
                          </a>
                        </p>
                      )}
                    </div>
                  )}

                  {interest.status === "sent" && (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => update(interest.id, "interested")}
                      >
                        💚 {t.interested}
                      </button>

                      <button
                        type="button"
                        onClick={() => update(interest.id, "not-interested")}
                      >
                        {t.not}
                      </button>
                    </div>
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
