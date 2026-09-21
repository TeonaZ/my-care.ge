import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "იპოვე ძიძა",
    description:
      "იპოვე სანდო ძიძა ბავშვის ასაკის, ქალაქის, გამოცდილების, განაკვეთისა და ფასის მიხედვით.",

    allCities: "ყველა ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",

    allAges: "ყველა ასაკი",
    age01: "0 - 1 წელი",
    age13: "1 - 3 წელი",
    age36: "3 - 6 წელი",
    age6plus: "6+ წელი",

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

    name1: "თამარ მ.",
    name2: "ნინო კ.",
    name3: "მარიამ გ.",

    years7: "7 წელი",
    years5: "5 წელი",
    years4: "4 წელი",

    currency: "₾",
    perHour: "საათი",
  },

  en: {
    title: "Find a Nanny",
    description:
      "Find a trusted nanny by the child's age, city, experience, employment type and price.",

    allCities: "All cities",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",

    allAges: "All ages",
    age01: "0 - 1 year",
    age13: "1 - 3 years",
    age36: "3 - 6 years",
    age6plus: "6+ years",

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

    name1: "Tamar M.",
    name2: "Nino K.",
    name3: "Mariam G.",

    years7: "7 years",
    years5: "5 years",
    years4: "4 years",

    currency: "GEL",
    perHour: "hour",
  },

  ru: {
    title: "Найти няню",
    description:
      "Найдите надежную няню по возрасту ребенка, городу, опыту, типу занятости и цене.",

    allCities: "Все города",
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",

    allAges: "Все возрасты",
    age01: "0 - 1 год",
    age13: "1 - 3 года",
    age36: "3 - 6 лет",
    age6plus: "6+ лет",

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

    name1: "Тамар М.",
    name2: "Нино К.",
    name3: "Мариам Г.",

    years7: "7 лет",
    years5: "5 лет",
    years4: "4 года",

    currency: "GEL",
    perHour: "час",
  },
};

function Nannies() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState("");

  const [appliedCity, setAppliedCity] = useState(selectedCity);
  const [appliedPrice, setAppliedPrice] = useState("");
  const [appliedAge, setAppliedAge] = useState("");
  const [appliedEmployment, setAppliedEmployment] = useState("");

  const nannies = [
    {
      id: 1,
      name: t.name1,
      cityValue: "tbilisi",
      ageGroups: ["0-1", "1-3", "3-6"],
      experience: t.years7,
      employmentType: "full-time",
      priceValue: 20,
      rating: "⭐ 4.9",
      verified: true,
    },

    {
      id: 2,
      name: t.name2,
      cityValue: "tbilisi",
      ageGroups: ["1-3", "3-6", "6+"],
      experience: t.years5,
      employmentType: "part-time",
      priceValue: 18,
      rating: "⭐ 4.8",
      verified: true,
    },

    {
      id: 3,
      name: t.name3,
      cityValue: "batumi",
      ageGroups: ["0-1", "1-3"],
      experience: t.years4,
      employmentType: "part-time",
      priceValue: 15,
      rating: "⭐ 4.7",
      verified: false,
    },
  ];

  const cityNames = {
    tbilisi: t.tbilisi,
    batumi: t.batumi,
    kutaisi: t.kutaisi,
    rustavi: t.rustavi,
    gori: t.gori,
    zugdidi: t.zugdidi,
  };

  const getEmploymentName = (employmentType) => {
    if (employmentType === "full-time") {
      return t.fullTime;
    }

    if (employmentType === "part-time") {
      return t.partTime;
    }

    return "";
  };

  const filteredNannies = nannies.filter((nanny) => {
    const matchesCity = appliedCity
      ? nanny.cityValue === appliedCity
      : true;

    let matchesPrice = true;

    if (appliedPrice === "under20") {
      matchesPrice = nanny.priceValue <= 20;
    }

    if (appliedPrice === "20to30") {
      matchesPrice =
        nanny.priceValue >= 20 &&
        nanny.priceValue <= 30;
    }

    if (appliedPrice === "over30") {
      matchesPrice = nanny.priceValue >= 30;
    }

    const matchesAge = appliedAge
      ? nanny.ageGroups.includes(appliedAge)
      : true;

    const matchesEmployment = appliedEmployment
      ? nanny.employmentType === appliedEmployment
      : true;

    return (
      matchesCity &&
      matchesPrice &&
      matchesAge &&
      matchesEmployment
    );
  });

  const getPrice = (nanny) => {
    return `${nanny.priceValue} ${t.currency} / ${t.perHour}`;
  };

  return (
    <div className="drivers-page">

      <header className="drivers-header">
        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>{t.title}</h1>

        <p>{t.description}</p>
      </header>

      <div className="driver-filters">

        {/* ქალაქი */}
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
        </select>

        {/* ბავშვის ასაკი */}
        <select
          value={selectedAge}
          onChange={(e) =>
            setSelectedAge(e.target.value)
          }
        >
          <option value="">
            {t.allAges}
          </option>

          <option value="0-1">
            {t.age01}
          </option>

          <option value="1-3">
            {t.age13}
          </option>

          <option value="3-6">
            {t.age36}
          </option>

          <option value="6+">
            {t.age6plus}
          </option>
        </select>

        {/* განაკვეთი */}
        <select
          value={selectedEmployment}
          onChange={(e) =>
            setSelectedEmployment(e.target.value)
          }
        >
          <option value="">
            {t.allEmployment}
          </option>

          <option value="full-time">
            {t.fullTime}
          </option>

          <option value="part-time">
            {t.partTime}
          </option>
        </select>

        {/* ფასი */}
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

        {/* ძიება */}
        <button
          type="button"
          onClick={() => {
            setAppliedCity(selectedCity);
            setAppliedPrice(selectedPrice);
            setAppliedAge(selectedAge);
            setAppliedEmployment(selectedEmployment);
          }}
        >
          {t.search}
        </button>

      </div>

      <section className="drivers-list">

        {filteredNannies.map((nanny) => (
          <div
            className="driver-card"
            key={nanny.id}
          >

            <div className="driver-avatar">
              👶
            </div>

            <div className="driver-info">

              <div className="driver-name">

                <h2>
                  {nanny.name}
                </h2>

                {nanny.verified && (
                  <span className="verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p>
                📍 {cityNames[nanny.cityValue]}
              </p>

              <p>
                👶 {t.experience}: {nanny.experience}
              </p>

              <p>
                🕒 {getEmploymentName(nanny.employmentType)}
              </p>

              <p>
                {nanny.rating}
              </p>

            </div>

            <div className="driver-price">

              <strong>
                {getPrice(nanny)}
              </strong>

              <Link
                to={`/nannies/${nanny.id}`}
                className="profile-btn"
              >
                {t.viewProfile}
              </Link>

            </div>

          </div>
        ))}

      </section>

    </div>
  );
}

export default Nannies;