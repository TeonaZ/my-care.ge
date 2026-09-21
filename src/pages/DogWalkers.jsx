import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "🐕 იპოვე ძაღლის გამსეირნებელი",
    description:
      "იპოვე სანდო ადამიანი შენი ძაღლის გასეირნებისა და მოვლისთვის.",

    allCities: "ყველა ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",

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

    name1: "გიორგი დ.",
    name2: "ანა მ.",
    name3: "ლუკა კ.",

    years5: "5 წელი",
    years3: "3 წელი",
    years4: "4 წელი",

    currency: "₾",
    perHour: "საათი",
  },

  en: {
    title: "🐕 Find a Dog Walker",
    description:
      "Find a trusted person to walk and care for your dog.",

    allCities: "All cities",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",

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

    name1: "Giorgi D.",
    name2: "Ana M.",
    name3: "Luka K.",

    years5: "5 years",
    years3: "3 years",
    years4: "4 years",

    currency: "GEL",
    perHour: "hour",
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

    name1: "Гиорги Д.",
    name2: "Ана М.",
    name3: "Лука К.",

    years5: "5 лет",
    years3: "3 года",
    years4: "4 года",

    currency: "GEL",
    perHour: "час",
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

  const dogWalkers = [
    {
      id: 1,
      name: t.name1,
      cityValue: "tbilisi",
      experience: t.years5,
      experienceYears: 5,
      employmentType: "full-time",
      priceValue: 15,
      rating: "⭐ 4.9",
      verified: true,
    },

    {
      id: 2,
      name: t.name2,
      cityValue: "tbilisi",
      experience: t.years3,
      experienceYears: 3,
      employmentType: "part-time",
      priceValue: 12,
      rating: "⭐ 4.8",
      verified: true,
    },

    {
      id: 3,
      name: t.name3,
      cityValue: "batumi",
      experience: t.years4,
      experienceYears: 4,
      employmentType: "part-time",
      priceValue: 10,
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

  const getPrice = (walker) => {
    return `${walker.priceValue} ${t.currency} / ${t.perHour}`;
  };

  const filteredDogWalkers = dogWalkers.filter((walker) => {
    const matchesCity = appliedCity
      ? walker.cityValue === appliedCity
      : true;

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
      matchesPrice =
        walker.priceValue >= 10 &&
        walker.priceValue <= 20;
    }

    if (appliedPrice === "over20") {
      matchesPrice = walker.priceValue >= 20;
    }

    return (
      matchesCity &&
      matchesExperience &&
      matchesEmployment &&
      matchesPrice
    );
  });

  return (
    <div className="drivers-page">

      <header className="drivers-header">

        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>
          {t.title}
        </h1>

        <p>
          {t.description}
        </p>

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

        {/* გამოცდილება */}
        <select
          value={selectedExperience}
          onChange={(e) =>
            setSelectedExperience(e.target.value)
          }
        >
          <option value="">
            {t.allExperience}
          </option>

          <option value="1">
            {t.onePlus}
          </option>

          <option value="3">
            {t.threePlus}
          </option>

          <option value="5">
            {t.fivePlus}
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

          <option value="under10">
            {t.under10}
          </option>

          <option value="10to20">
            {t.price10to20}
          </option>

          <option value="over20">
            {t.over20}
          </option>
        </select>

        {/* ძიება */}
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

      <section className="drivers-list">

        {filteredDogWalkers.map((walker) => (

          <div
            className="driver-card"
            key={walker.id}
          >

            <div className="driver-avatar">
              🐕
            </div>

            <div className="driver-info">

              <div className="driver-name">

                <h2>
                  {walker.name}
                </h2>

                {walker.verified && (
                  <span className="verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p>
                📍 {cityNames[walker.cityValue]}
              </p>

              <p>
                🐕 {t.experience}: {walker.experience}
              </p>

              <p>
                🕒 {getEmploymentName(walker.employmentType)}
              </p>

              <p>
                {walker.rating}
              </p>

            </div>

            <div className="driver-price">

              <strong>
                {getPrice(walker)}
              </strong>

              <Link
                to={`/dogwalker/${walker.id}`}
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

export default DogWalkers;