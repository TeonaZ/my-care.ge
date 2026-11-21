import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "🐕 იპოვე ძაღლის გამსეირნებელი",
    description: "იპოვე სანდო ადამიანი შენი ძაღლის გასეირნებისა და მოვლისთვის.",

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

    allExperience: "ყველა გამოცდილება",
    onePlus: "1+ წელი",
    threePlus: "3+ წელი",
    fivePlus: "5+ წელი",

    allEmployment: "ყველა განაკვეთი",
    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    allPrices: "ყველა ფასი",
    under10: "10 ₾-მდე",
    price10to20: "10 - 20 ₾",
    over20: "20 ₾+",

    search: "ძიება",
    verified: "✓ ვერიფიცირებული",
    experience: "გამოცდილება",
    viewProfile: "პროფილის ნახვა",
    noReviews: "ჯერ არ აქვს შეფასება",
    noResults: "შესაბამისი ძაღლის გამსეირნებელი ვერ მოიძებნა",

    name1: "გიორგი დ.",
    name2: "ანა მ.",
    name3: "ლუკა კ.",

    years5: "5 წელი",
    years3: "3 წელი",
    years4: "4 წელი",

    currency: "₾",
    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",
  },

  en: {
    title: "🐕 Find a Dog Walker",
    description: "Find a trusted person to walk and care for your dog.",

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

    allExperience: "All experience",
    onePlus: "1+ years",
    threePlus: "3+ years",
    fivePlus: "5+ years",

    allEmployment: "All employment types",
    fullTime: "Full-time",
    partTime: "Part-time",

    allPrices: "All prices",
    under10: "Up to 10 GEL",
    price10to20: "10 - 20 GEL",
    over20: "20 GEL+",

    search: "Search",
    verified: "✓ Verified",
    experience: "Experience",
    viewProfile: "View Profile",
    noReviews: "No reviews yet",
    noResults: "No matching dog walkers found",

    name1: "Giorgi D.",
    name2: "Ana M.",
    name3: "Luka K.",

    years5: "5 years",
    years3: "3 years",
    years4: "4 years",

    currency: "GEL",
    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",
  },

  ru: {
    title: "🐕 Найти выгульщика собак",
    description:
      "Найдите надежного человека для прогулок и ухода за вашей собакой.",

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

    allExperience: "Любой опыт",
    onePlus: "1+ год",
    threePlus: "3+ года",
    fivePlus: "5+ лет",

    allEmployment: "Все типы занятости",
    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    allPrices: "Все цены",
    under10: "До 10 GEL",
    price10to20: "10 - 20 GEL",
    over20: "20 GEL+",

    search: "Поиск",
    verified: "✓ Проверенный",
    experience: "Опыт",
    viewProfile: "Посмотреть профиль",
    noReviews: "Пока нет отзывов",
    noResults: "Подходящие выгульщики собак не найдены",

    name1: "Гиорги Д.",
    name2: "Ана М.",
    name3: "Лука К.",

    years5: "5 лет",
    years3: "3 года",
    years4: "4 года",

    currency: "GEL",
    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",
  },
};

function DogWalkers() {
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const [selectedExperience, setSelectedExperience] = useState("");

  const [selectedEmployment, setSelectedEmployment] = useState("");

  const [selectedPrice, setSelectedPrice] = useState("");

  const [appliedCity, setAppliedCity] = useState(selectedCity);

  const [appliedExperience, setAppliedExperience] = useState("");

  const [appliedEmployment, setAppliedEmployment] = useState("");

  const [appliedPrice, setAppliedPrice] = useState("");

  // Only real specialist profiles from PostgreSQL are displayed.
  const [dogWalkers, setDogWalkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const response = await fetch("http://localhost:5000/api/specialists?profession=dog-walker");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Request failed");
        const profiles = Array.isArray(data.specialists) ? data.specialists : [];
        const mapped = profiles
          .filter((profile) =>
            ["dog-walker", "dogwalker"].includes(profile.profession) &&
            profile.status !== "inactive"
          )
          .map((profile) => {
            const firstName = profile.firstName || "";
            const lastInitial = profile.lastName ? `${profile.lastName.charAt(0)}.` : "";
            return {
              id: profile.id,
              ownerId: profile.ownerId,
              name: `${firstName} ${lastInitial}`.trim() ||
                (language === "en" ? "Dog Walker" : language === "ru" ? "Выгульщик собак" : "ძაღლის გამსეირნებელი"),
              cityValue: profile.city || "other",
              experience: profile.experience || "",
              experienceYears: Number(String(profile.experience || "0").match(/\d+/)?.[0] || 0),
              employmentType: profile.employmentType || "part-time",
              paymentType: profile.paymentType || "hourly",
              priceValue: Number(profile.priceValue) || 0,
              rating: profile.rating ?? null,
              reviews: Number(profile.reviews) || 0,
              verified: profile.verified === true,
            };
          });
        if (!cancelled) setDogWalkers(mapped);
      } catch (error) {
        console.error("Load dog walkers error:", error);
        if (!cancelled) { setLoadError(error.message || "Request failed"); setDogWalkers([]); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [language]);

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
      return t.daily;
    }

    return t.hourly;
  };

  const getPrice = (walker) => {
    return `${walker.priceValue} ${t.currency} / ${getPaymentTypeName(
      walker.paymentType,
    )}`;
  };

  /* =========================
     FILTER
  ========================= */

  const filteredDogWalkers = dogWalkers.filter((walker) => {
    const matchesCity = appliedCity ? walker.cityValue === appliedCity : true;

    let matchesExperience = true;

    if (appliedExperience === "1") {
      matchesExperience = walker.experienceYears >= 1;
    }

    if (appliedExperience === "3") {
      matchesExperience = walker.experienceYears >= 3;
    }

    if (appliedExperience === "5") {
      matchesExperience = walker.experienceYears >= 5;
    }

    const matchesEmployment = appliedEmployment
      ? walker.employmentType === appliedEmployment
      : true;

    let matchesPrice = true;

    if (appliedPrice === "under10") {
      matchesPrice = walker.priceValue <= 10;
    }

    if (appliedPrice === "10to20") {
      matchesPrice = walker.priceValue >= 10 && walker.priceValue <= 20;
    }

    if (appliedPrice === "over20") {
      matchesPrice = walker.priceValue >= 20;
    }

    return (
      matchesCity && matchesExperience && matchesEmployment && matchesPrice
    );
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

        {/* EXPERIENCE */}

        <select
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
        >
          <option value="">{t.allExperience}</option>

          <option value="1">{t.onePlus}</option>

          <option value="3">{t.threePlus}</option>

          <option value="5">{t.fivePlus}</option>
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

          <option value="under10">{t.under10}</option>

          <option value="10to20">{t.price10to20}</option>

          <option value="over20">{t.over20}</option>
        </select>

        {/* SEARCH */}

        <button
          type="button"
          onClick={() => {
            setAppliedCity(selectedCity);

            setAppliedExperience(selectedExperience);

            setAppliedEmployment(selectedEmployment);

            setAppliedPrice(selectedPrice);
          }}
        >
          {t.search}
        </button>
      </div>

      {/* DOG WALKERS */}

      <section className="drivers-list">
        {loading ? (
          <p>{language === "en" ? "Loading dog walkers..." : language === "ru" ? "Загрузка..." : "ძაღლის გამსეირნებლები იტვირთება..."}</p>
        ) : loadError ? (
          <p role="alert">{language === "en" ? "Could not load profiles. Check the server." : language === "ru" ? "Не удалось загрузить профили." : "პროფილების ჩატვირთვა ვერ მოხერხდა. შეამოწმე სერვერი."}</p>
        ) : filteredDogWalkers.length === 0 ? (
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
          filteredDogWalkers.map((walker) => {
            const hasRating =
              walker.rating !== null &&
              walker.rating !== undefined &&
              walker.rating !== "";

            return (
              <div className="driver-card" key={walker.id}>
                <div className="driver-avatar">🐕</div>

                <div className="driver-info">
                  <div className="driver-name">
                    <h2>{walker.name}</h2>

                    {walker.verified && (
                      <span className="verified">{t.verified}</span>
                    )}
                  </div>

                  <p>📍 {getCityName(walker.cityValue)}</p>

                  <p>
                    🐕 {t.experience}: {walker.experience}
                  </p>

                  <p>🕒 {getEmploymentName(walker.employmentType)}</p>

                  <p>{hasRating ? `⭐ ${walker.rating}` : t.noReviews}</p>
                </div>

                <div className="driver-price">
                  <strong>{getPrice(walker)}</strong>

                  <Link to={`/dogwalker/${walker.id}`} className="profile-btn">
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

export default DogWalkers;
