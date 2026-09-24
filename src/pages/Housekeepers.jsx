import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "იპოვე სახლის დამხმარე",
    description:
      "იპოვე სანდო ადამიანი სახლის ყოველდღიური საქმეებისა და დასუფთავებისთვის.",

    allCities: "ყველა ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    allServices: "ყველა მომსახურება",
    cleaning: "სახლის დასუფთავება",
    daily: "ყოველდღიური დახმარება",
    cooking: "საჭმლის მომზადება",

    allEmployment: "ყველა განაკვეთი",
    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    allPrices: "ყველა ფასი",
    under20: "20 ₾-მდე",
    price20to30: "20 - 30 ₾",
    over30: "30 ₾+",

    search: "ძიება",
    verified: "✓ ვერიფიცირებული",
    experience: "გამოცდილება",
    viewProfile: "პროფილის ნახვა",
    noReviews: "ჯერ არ აქვს შეფასება",
    noResults: "შესაბამისი სახლის დამხმარე ვერ მოიძებნა",

    name1: "ნათია მ.",
    name2: "თამუნა კ.",
    name3: "ეკა ნ.",

    years6: "6 წელი",
    years4: "4 წელი",
    years5: "5 წელი",

    currency: "₾",

    hourly: "საათი",
    dailyPayment: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",
  },

  en: {
    title: "Find a Housekeeper",
    description:
      "Find a trusted person for everyday household tasks and cleaning.",

    allCities: "All cities",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    allServices: "All services",
    cleaning: "House cleaning",
    daily: "Daily assistance",
    cooking: "Cooking",

    allEmployment: "All employment types",
    fullTime: "Full-time",
    partTime: "Part-time",

    allPrices: "All prices",
    under20: "Up to 20 GEL",
    price20to30: "20 - 30 GEL",
    over30: "30 GEL+",

    search: "Search",
    verified: "✓ Verified",
    experience: "Experience",
    viewProfile: "View Profile",
    noReviews: "No reviews yet",
    noResults: "No matching housekeepers found",

    name1: "Natia M.",
    name2: "Tamuna K.",
    name3: "Eka N.",

    years6: "6 years",
    years4: "4 years",
    years5: "5 years",

    currency: "GEL",

    hourly: "hour",
    dailyPayment: "day",
    biweekly: "2 weeks",
    monthly: "month",
  },

  ru: {
    title: "Найти помощника по дому",
    description:
      "Найдите надежного человека для повседневных домашних дел и уборки.",

    allCities: "Все города",
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    allServices: "Все услуги",
    cleaning: "Уборка дома",
    daily: "Ежедневная помощь",
    cooking: "Приготовление еды",

    allEmployment: "Все типы занятости",
    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    allPrices: "Все цены",
    under20: "До 20 GEL",
    price20to30: "20 - 30 GEL",
    over30: "30 GEL+",

    search: "Поиск",
    verified: "✓ Проверенная",
    experience: "Опыт",
    viewProfile: "Посмотреть профиль",
    noReviews: "Пока нет отзывов",
    noResults: "Подходящие помощники по дому не найдены",

    name1: "Натия М.",
    name2: "Тамуна К.",
    name3: "Эка Н.",

    years6: "6 лет",
    years4: "4 года",
    years5: "5 лет",

    currency: "GEL",

    hourly: "час",
    dailyPayment: "день",
    biweekly: "2 недели",
    monthly: "месяц",
  },
};

function Housekeepers() {
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const [selectedService, setSelectedService] = useState("");

  const [selectedPrice, setSelectedPrice] = useState("");

  const [selectedEmployment, setSelectedEmployment] = useState("");

  const [appliedCity, setAppliedCity] = useState(selectedCity);

  const [appliedService, setAppliedService] = useState("");

  const [appliedPrice, setAppliedPrice] = useState("");

  const [appliedEmployment, setAppliedEmployment] = useState("");

  /* =========================
     DEFAULT HOUSEKEEPERS
  ========================= */

  const defaultHousekeepers = [
    {
      id: "1",
      name: t.name1,
      cityValue: "tbilisi",
      services: ["cleaning", "daily"],
      experience: t.years6,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 20,
      rating: 4.9,
      reviews: 41,
      verified: true,
      isCustom: false,
    },

    {
      id: "2",
      name: t.name2,
      cityValue: "tbilisi",
      services: ["cleaning", "cooking"],
      experience: t.years4,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 18,
      rating: 4.8,
      reviews: 28,
      verified: true,
      isCustom: false,
    },

    {
      id: "3",
      name: t.name3,
      cityValue: "batumi",
      services: ["daily", "cooking"],
      experience: t.years5,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 17,
      rating: 4.7,
      reviews: 20,
      verified: false,
      isCustom: false,
    },
  ];

  /* =========================
     SAVED SPECIALISTS
  ========================= */

  const getSavedSpecialists = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaSpecialists"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const getSafeName = (profile) => {
    const firstName = profile.firstName || "";

    const lastName = profile.lastName || "";

    const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

    return (
      `${firstName} ${lastInitial}`.trim() ||
      (language === "ka"
        ? "სახლის დამხმარე"
        : language === "ru"
          ? "Помощник по дому"
          : "Housekeeper")
    );
  };

  const getServices = (profile) => {
    if (Array.isArray(profile.services) && profile.services.length > 0) {
      return profile.services;
    }

    if (profile.serviceType) {
      return [profile.serviceType];
    }

    if (profile.service) {
      const service = String(profile.service).toLowerCase();

      if (
        service === "cleaning" ||
        service === "daily" ||
        service === "cooking"
      ) {
        return [service];
      }
    }

    /*
      ძველი/ზოგადი პროფილი თუ კონკრეტულ
      მომსახურებას არ ინახავს, ყველა
      მომსახურების ფილტრში არ დავმალოთ.
    */
    return ["cleaning", "daily", "cooking"];
  };

  const customHousekeepers = getSavedSpecialists()
    .filter(
      (profile) =>
        profile.profession === "housekeeper" && profile.status !== "inactive",
    )
    .map((profile) => ({
      id: String(profile.id),

      ownerId: profile.ownerId,

      name: getSafeName(profile),

      cityValue: profile.city || "other",

      services: getServices(profile),

      experience: profile.experience || "",

      employmentType: profile.employmentType || "part-time",

      paymentType: profile.paymentType || "hourly",

      priceValue: Number(profile.priceValue) || 0,

      rating:
        profile.rating !== null && profile.rating !== undefined
          ? Number(profile.rating)
          : null,

      reviews: Number(profile.reviews) || 0,

      verified: profile.verified === true,

      isCustom: true,
    }));

  /* =========================
     ALL HOUSEKEEPERS
  ========================= */

  const housekeepers = [...customHousekeepers, ...defaultHousekeepers];

  /* =========================
     CITY
  ========================= */

  const cityNames = {
    tbilisi: t.tbilisi,
    batumi: t.batumi,
    kutaisi: t.kutaisi,
    rustavi: t.rustavi,
    gori: t.gori,
    zugdidi: t.zugdidi,
    poti: t.poti,
    telavi: t.telavi,
    other: t.other,
  };

  const getCityName = (city) => {
    return cityNames[city] || city || t.other;
  };

  /* =========================
     EMPLOYMENT
  ========================= */

  const getEmploymentName = (employmentType) => {
    if (employmentType === "full-time") {
      return t.fullTime;
    }

    if (employmentType === "part-time") {
      return t.partTime;
    }

    return "";
  };

  /* =========================
     PAYMENT
  ========================= */

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") {
      return t.monthly;
    }

    if (paymentType === "biweekly") {
      return t.biweekly;
    }

    if (paymentType === "daily") {
      return t.dailyPayment;
    }

    return t.hourly;
  };

  const getPrice = (housekeeper) => {
    return `${housekeeper.priceValue} ${t.currency} / ${getPaymentTypeName(
      housekeeper.paymentType,
    )}`;
  };

  /* =========================
     FILTER
  ========================= */

  const filteredHousekeepers = housekeepers.filter((housekeeper) => {
    const matchesCity = appliedCity
      ? housekeeper.cityValue === appliedCity
      : true;

    const matchesService = appliedService
      ? housekeeper.services.includes(appliedService)
      : true;

    let matchesPrice = true;

    if (appliedPrice === "under20") {
      matchesPrice = housekeeper.priceValue <= 20;
    }

    if (appliedPrice === "20to30") {
      matchesPrice =
        housekeeper.priceValue >= 20 && housekeeper.priceValue <= 30;
    }

    if (appliedPrice === "over30") {
      matchesPrice = housekeeper.priceValue >= 30;
    }

    const matchesEmployment = appliedEmployment
      ? housekeeper.employmentType === appliedEmployment
      : true;

    return matchesCity && matchesService && matchesPrice && matchesEmployment;
  });

  return (
    <div className="drivers-page">
      <header className="drivers-header">
        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>{t.title}</h1>

        <p>{t.description}</p>
      </header>

      {/* FILTERS */}

      <div className="driver-filters">
        {/* CITY */}

        <select
          value={selectedCity}
          onChange={(e) => {
            const city = e.target.value;

            if (city) {
              setSearchParams({
                city,
              });
            } else {
              setSearchParams({});
            }
          }}
        >
          <option value="">{t.allCities}</option>

          <option value="tbilisi">{t.tbilisi}</option>

          <option value="batumi">{t.batumi}</option>

          <option value="kutaisi">{t.kutaisi}</option>

          <option value="rustavi">{t.rustavi}</option>

          <option value="gori">{t.gori}</option>

          <option value="zugdidi">{t.zugdidi}</option>

          <option value="poti">{t.poti}</option>

          <option value="telavi">{t.telavi}</option>

          <option value="other">{t.other}</option>
        </select>

        {/* SERVICE */}

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">{t.allServices}</option>

          <option value="cleaning">{t.cleaning}</option>

          <option value="daily">{t.daily}</option>

          <option value="cooking">{t.cooking}</option>
        </select>

        {/* EMPLOYMENT */}

        <select
          value={selectedEmployment}
          onChange={(e) => setSelectedEmployment(e.target.value)}
        >
          <option value="">{t.allEmployment}</option>

          <option value="full-time">{t.fullTime}</option>

          <option value="part-time">{t.partTime}</option>
        </select>

        {/* PRICE */}

        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">{t.allPrices}</option>

          <option value="under20">{t.under20}</option>

          <option value="20to30">{t.price20to30}</option>

          <option value="over30">{t.over30}</option>
        </select>

        {/* SEARCH */}

        <button
          type="button"
          onClick={() => {
            setAppliedCity(selectedCity);

            setAppliedService(selectedService);

            setAppliedPrice(selectedPrice);

            setAppliedEmployment(selectedEmployment);
          }}
        >
          {t.search}
        </button>
      </div>

      {/* HOUSEKEEPERS */}

      <section className="drivers-list">
        {filteredHousekeepers.length === 0 ? (
          <div
            style={{
              width: "100%",
              padding: "30px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            {t.noResults}
          </div>
        ) : (
          filteredHousekeepers.map((housekeeper) => {
            const hasRating =
              housekeeper.rating !== null &&
              housekeeper.rating !== undefined &&
              housekeeper.rating !== "";

            return (
              <div className="driver-card" key={housekeeper.id}>
                <div className="driver-avatar">🏠</div>

                <div className="driver-info">
                  <div className="driver-name">
                    <h2>{housekeeper.name}</h2>

                    {housekeeper.verified && (
                      <span className="verified">{t.verified}</span>
                    )}
                  </div>

                  <p>📍 {getCityName(housekeeper.cityValue)}</p>

                  <p>
                    💼 {t.experience}: {housekeeper.experience}
                  </p>

                  <p>🕒 {getEmploymentName(housekeeper.employmentType)}</p>

                  <p>{hasRating ? `⭐ ${housekeeper.rating}` : t.noReviews}</p>
                </div>

                <div className="driver-price">
                  <strong>{getPrice(housekeeper)}</strong>

                  <Link
                    to={`/housekeepers/${housekeeper.id}`}
                    className="profile-btn"
                  >
                    {t.viewProfile}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default Housekeepers;
