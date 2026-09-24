import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "იპოვე ტუტორი",
    description:
      "იპოვე შენთვის სასურველი მასწავლებელი ან რეპეტიტორი საგნის, ქალაქისა და ფასის მიხედვით.",

    allSubjects: "ყველა საგანი",
    english: "ინგლისური",
    math: "მათემატიკა",
    georgian: "ქართული",
    history: "ისტორია",
    subjectNotSpecified: "საგანი არ არის მითითებული",

    allCities: "ყველა ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    other: "სხვა",

    allPrices: "ყველა ფასი",
    under20: "20 ₾-მდე",
    price20to30: "20 - 30 ₾",
    over30: "30 ₾+",

    search: "ძიება",
    experience: "გამოცდილება",
    viewProfile: "პროფილის ნახვა",

    name1: "ნინო ბ.",
    name2: "ანა გ.",
    name3: "მარიამ ლ.",

    years6: "6 წელი",
    years4: "4 წელი",
    years5: "5 წელი",

    englishLanguage: "ინგლისური ენა",
    mathSubject: "მათემატიკა",
    georgianLanguage: "ქართული ენა",
    historySubject: "ისტორია",

    currency: "₾",

    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    noResults: "ამ ფილტრებით ტუტორი ვერ მოიძებნა.",
  },

  en: {
    title: "Find a Tutor",
    description:
      "Find the right teacher or tutor by subject, city and price.",

    allSubjects: "All subjects",
    english: "English",
    math: "Mathematics",
    georgian: "Georgian",
    history: "History",
    subjectNotSpecified: "Subject not specified",

    allCities: "All cities",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    other: "Other",

    allPrices: "All prices",
    under20: "Up to 20 GEL",
    price20to30: "20 - 30 GEL",
    over30: "30 GEL+",

    search: "Search",
    experience: "Experience",
    viewProfile: "View Profile",

    name1: "Nino B.",
    name2: "Ana G.",
    name3: "Mariam L.",

    years6: "6 years",
    years4: "4 years",
    years5: "5 years",

    englishLanguage: "English",
    mathSubject: "Mathematics",
    georgianLanguage: "Georgian",
    historySubject: "History",

    currency: "GEL",

    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    noResults: "No tutors were found with these filters.",
  },

  ru: {
    title: "Найти репетитора",
    description:
      "Найдите подходящего учителя или репетитора по предмету, городу и цене.",

    allSubjects: "Все предметы",
    english: "Английский",
    math: "Математика",
    georgian: "Грузинский",
    history: "История",
    subjectNotSpecified: "Предмет не указан",

    allCities: "Все города",
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    other: "Другой",

    allPrices: "Все цены",
    under20: "До 20 GEL",
    price20to30: "20 - 30 GEL",
    over30: "30 GEL+",

    search: "Поиск",
    experience: "Опыт",
    viewProfile: "Посмотреть профиль",

    name1: "Нино Б.",
    name2: "Ана Г.",
    name3: "Мариам Л.",

    years6: "6 лет",
    years4: "4 года",
    years5: "5 лет",

    englishLanguage: "Английский язык",
    mathSubject: "Математика",
    georgianLanguage: "Грузинский язык",
    historySubject: "История",

    currency: "GEL",

    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    noResults: "По этим фильтрам репетиторы не найдены.",
  },
};

function Tutors() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [appliedCity, setAppliedCity] = useState(selectedCity);
  const [appliedSubject, setAppliedSubject] = useState("");
  const [appliedPrice, setAppliedPrice] = useState("");

  // ძველი სატესტო ტუტორები
  const defaultTutors = [
    {
      id: "1",
      name: t.name1,
      subjectValue: "english",
      cityValue: "tbilisi",
      experience: t.years6,
      paymentType: "hourly",
      priceValue: 30,
      rating: "⭐ 4.9",
      verified: true,
    },

    {
      id: "2",
      name: t.name2,
      subjectValue: "math",
      cityValue: "tbilisi",
      experience: t.years4,
      paymentType: "hourly",
      priceValue: 25,
      rating: "⭐ 4.8",
      verified: true,
    },

    {
      id: "3",
      name: t.name3,
      subjectValue: "georgian",
      cityValue: "batumi",
      experience: t.years5,
      paymentType: "hourly",
      priceValue: 25,
      rating: "⭐ 4.7",
      verified: false,
    },
  ];

  // localStorage-დან სპეციალისტების წამოღება
  const getSavedSpecialists = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("careGeorgiaSpecialists")
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const savedSpecialists = getSavedSpecialists();

  // მომხმარებლების მიერ შექმნილი აქტიური ტუტორები
  const customTutors = savedSpecialists
    .filter(
      (profile) =>
        profile.profession === "tutor" &&
        profile.status !== "inactive"
    )
    .map((profile) => {
      const firstName = profile.firstName || "";
      const lastName = profile.lastName || "";

      const lastInitial = lastName
        ? `${lastName.charAt(0)}.`
        : "";

      const safeName =
        `${firstName} ${lastInitial}`.trim() ||
        (language === "ka"
          ? "ტუტორი"
          : language === "ru"
          ? "Репетитор"
          : "Tutor");

      return {
        id: String(profile.id),

        name: safeName,

        subjectValue:
          profile.subject || "",

        cityValue:
          profile.city || "other",

        experience:
          profile.experience || "",

        paymentType:
          profile.paymentType || "hourly",

        priceValue:
          Number(profile.priceValue) || 0,

        rating:
          profile.rating !== null &&
          profile.rating !== undefined
            ? `⭐ ${profile.rating}`
            : "",

        verified:
          profile.verified === true,
      };
    });

  // ძველი + მომხმარებლების ტუტორები
  const tutors = [
    ...defaultTutors,
    ...customTutors,
  ];

  const subjectNames = {
    english: t.englishLanguage,
    math: t.mathSubject,
    georgian: t.georgianLanguage,
    history: t.historySubject,
  };

  const cityNames = {
    tbilisi: t.tbilisi,
    batumi: t.batumi,
    kutaisi: t.kutaisi,
    rustavi: t.rustavi,
    gori: t.gori,
    zugdidi: t.zugdidi,
    other: t.other,
  };

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") {
      return t.monthly;
    }

    if (paymentType === "biweekly") {
      return t.biweekly;
    }

    if (paymentType === "daily") {
      return t.daily;
    }

    return t.hourly;
  };

  const filteredTutors = tutors.filter((tutor) => {
    const matchesCity = appliedCity
      ? tutor.cityValue === appliedCity
      : true;

    const matchesSubject = appliedSubject
      ? tutor.subjectValue === appliedSubject
      : true;

    let matchesPrice = true;

    if (appliedPrice === "under20") {
      matchesPrice = tutor.priceValue <= 20;
    }

    if (appliedPrice === "20to30") {
      matchesPrice =
        tutor.priceValue >= 20 &&
        tutor.priceValue <= 30;
    }

    if (appliedPrice === "over30") {
      matchesPrice = tutor.priceValue >= 30;
    }

    return (
      matchesCity &&
      matchesSubject &&
      matchesPrice
    );
  });

  const getPrice = (tutor) => {
    return `${tutor.priceValue} ${
      t.currency
    } / ${getPaymentTypeName(tutor.paymentType)}`;
  };

  const getSubjectName = (subjectValue) => {
    if (!subjectValue) {
      return t.subjectNotSpecified;
    }

    return (
      subjectNames[subjectValue] ||
      subjectValue
    );
  };

  return (
    <div className="drivers-page">
      <header className="drivers-header">
        <Link
          to="/"
          className="back-link"
        >
          ← Care Georgia
        </Link>

        <h1>{t.title}</h1>

        <p>{t.description}</p>
      </header>

      <div className="driver-filters">
        {/* SUBJECT */}

        <select
          value={selectedSubject}
          onChange={(e) =>
            setSelectedSubject(e.target.value)
          }
        >
          <option value="">
            {t.allSubjects}
          </option>

          <option value="english">
            {t.english}
          </option>

          <option value="math">
            {t.math}
          </option>

          <option value="georgian">
            {t.georgian}
          </option>

          <option value="history">
            {t.history}
          </option>
        </select>

        {/* CITY */}

        <select
          value={selectedCity}
          onChange={(e) => {
            const city = e.target.value;

            if (city) {
              setSearchParams({ city });
            } else {
              setSearchParams({});
            }
          }}
        >
          <option value="">
            {t.allCities}
          </option>

          <option value="tbilisi">
            {t.tbilisi}
          </option>

          <option value="batumi">
            {t.batumi}
          </option>

          <option value="kutaisi">
            {t.kutaisi}
          </option>

          <option value="rustavi">
            {t.rustavi}
          </option>

          <option value="gori">
            {t.gori}
          </option>

          <option value="zugdidi">
            {t.zugdidi}
          </option>

          <option value="other">
            {t.other}
          </option>
        </select>

        {/* PRICE */}

        <select
          value={selectedPrice}
          onChange={(e) =>
            setSelectedPrice(e.target.value)
          }
        >
          <option value="">
            {t.allPrices}
          </option>

          <option value="under20">
            {t.under20}
          </option>

          <option value="20to30">
            {t.price20to30}
          </option>

          <option value="over30">
            {t.over30}
          </option>
        </select>

        <button
          type="button"
          onClick={() => {
            setAppliedSubject(selectedSubject);
            setAppliedCity(selectedCity);
            setAppliedPrice(selectedPrice);
          }}
        >
          {t.search}
        </button>
      </div>

      {/* TUTORS */}

      <section className="drivers-list">
        {filteredTutors.length === 0 ? (
          <div
            className="driver-card"
            style={{
              justifyContent: "center",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <p>{t.noResults}</p>
          </div>
        ) : (
          filteredTutors.map((tutor) => (
            <div
              className="driver-card"
              key={tutor.id}
            >
              <div className="driver-avatar">
                📚
              </div>

              <div className="driver-info">
                <div className="driver-name">
                  <h2>
                    {tutor.name}
                  </h2>

                  {tutor.verified && (
                    <span className="verified">
                      ✓
                    </span>
                  )}
                </div>

                <p>
                  📖{" "}
                  {getSubjectName(
                    tutor.subjectValue
                  )}
                </p>

                <p>
                  📍{" "}
                  {cityNames[
                    tutor.cityValue
                  ] || tutor.cityValue}
                </p>

                <p>
                  🎓 {t.experience}:{" "}
                  {tutor.experience}
                </p>

                {tutor.rating && (
                  <p>
                    {tutor.rating}
                  </p>
                )}
              </div>

              <div className="driver-price">
                <strong>
                  {getPrice(tutor)}
                </strong>

                <Link
                  to={`/tutors/${tutor.id}`}
                  className="profile-btn"
                >
                  {t.viewProfile}
                </Link>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Tutors;