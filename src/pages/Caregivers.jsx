import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "იპოვე მომვლელი",
    description:
      "იპოვე სანდო და გამოცდილი ადამიანი ხანდაზმული ოჯახის წევრის მოვლისა და დახმარებისთვის.",

    allCities: "ყველა ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    other: "სხვა",

    allExperience: "ყველა გამოცდილება",
    onePlus: "1+ წელი",
    threePlus: "3+ წელი",
    fivePlus: "5+ წელი",

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

    name1: "მაია კ.",
    name2: "ეკა მ.",
    name3: "ნანა გ.",

    years8: "8 წელი",
    years6: "6 წელი",
    years5: "5 წელი",

    currency: "₾",

    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    noResults: "ამ ფილტრებით მომვლელი ვერ მოიძებნა.",
    loading: "მომვლელები იტვირთება...",
    loadError: "მომვლელების ჩატვირთვა ვერ მოხერხდა.",
  },

  en: {
    title: "Find a Caregiver",
    description:
      "Find a trusted and experienced person to care for and assist an elderly family member.",

    allCities: "All cities",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    other: "Other",

    allExperience: "All experience",
    onePlus: "1+ years",
    threePlus: "3+ years",
    fivePlus: "5+ years",

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

    name1: "Maia K.",
    name2: "Eka M.",
    name3: "Nana G.",

    years8: "8 years",
    years6: "6 years",
    years5: "5 years",

    currency: "GEL",

    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    noResults:
      "No caregivers were found with these filters.",
    loading: "Loading caregivers...",
    loadError: "Could not load caregivers.",
  },

  ru: {
    title: "Найти сиделку",
    description:
      "Найдите надежного и опытного человека для ухода и помощи пожилому члену семьи.",

    allCities: "Все города",
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    other: "Другой",

    allExperience: "Любой опыт",
    onePlus: "1+ год",
    threePlus: "3+ года",
    fivePlus: "5+ лет",

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

    name1: "Майя К.",
    name2: "Эка М.",
    name3: "Нана Г.",

    years8: "8 лет",
    years6: "6 лет",
    years5: "5 лет",

    currency: "GEL",

    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    noResults:
      "По этим фильтрам сиделки не найдены.",
    loading: "Загрузка сиделок...",
    loadError: "Не удалось загрузить сиделок.",
  },
};

function Caregivers() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] =
    useSearchParams();

  const selectedCity =
    searchParams.get("city") || "";

  const [selectedExperience, setSelectedExperience] =
    useState("");

  const [selectedEmployment, setSelectedEmployment] =
    useState("");

  const [selectedPrice, setSelectedPrice] =
    useState("");

  const [appliedCity, setAppliedCity] =
    useState(selectedCity);

  const [appliedExperience, setAppliedExperience] =
    useState("");

  const [appliedEmployment, setAppliedEmployment] =
    useState("");

  const [appliedPrice, setAppliedPrice] =
    useState("");

  // რეალური მომვლელები PostgreSQL-იდან (backend API).
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    const loadCaregivers = async () => {
      try {
        setLoading(true);
        setLoadError(false);
        const response = await fetch(
          "http://localhost:5000/api/specialists?profession=caregiver"
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.specialists)
            ? data.specialists
            : Array.isArray(data.profiles)
              ? data.profiles
              : [];
        if (active) setProfiles(list);
      } catch (error) {
        console.error("Load caregivers error:", error);
        if (active) {
          setProfiles([]);
          setLoadError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadCaregivers();
    return () => { active = false; };
  }, []);

  const getExperienceYears = (experience) => {
    const match = String(experience ?? "").match(/\d+([.,]\d+)?/);
    return match ? Number(match[0].replace(",", ".")) : 0;
  };

  const caregivers = profiles
    .filter((profile) =>
      String(profile.profession || "").toLowerCase() === "caregiver" &&
      profile.status !== "inactive"
    )
    .map((profile) => {
      const firstName = profile.firstName || "";
      const lastName = profile.lastName || "";
      const name = `${firstName} ${lastName ? `${lastName.charAt(0)}.` : ""}`.trim();
      const rating = profile.rating;
      return {
        id: profile.id,
        name: name || (language === "ka" ? "მომვლელი" : language === "ru" ? "Сиделка" : "Caregiver"),
        cityValue: profile.city || "other",
        experience: profile.experience || "",
        experienceYears: getExperienceYears(profile.experience),
        employmentType: profile.employmentType || "",
        paymentType: profile.paymentType || "hourly",
        priceValue: Number(profile.priceValue) || 0,
        rating: rating !== null && rating !== undefined && rating !== "" ? `⭐ ${rating}` : "",
        verified: profile.verified === true,
      };
    });

  const cityNames = {
    tbilisi: t.tbilisi,
    batumi: t.batumi,
    kutaisi: t.kutaisi,
    rustavi: t.rustavi,
    gori: t.gori,
    zugdidi: t.zugdidi,
    other: t.other,
  };

  const getEmploymentName = (
    employmentType
  ) => {
    if (
      employmentType === "full-time"
    ) {
      return t.fullTime;
    }

    if (
      employmentType === "part-time"
    ) {
      return t.partTime;
    }

    return "";
  };

  const getPaymentTypeName = (
    paymentType
  ) => {
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

  const filteredCaregivers =
    caregivers.filter((caregiver) => {
      const matchesCity =
        appliedCity
          ? caregiver.cityValue ===
            appliedCity
          : true;

      let matchesExperience = true;

      if (
        appliedExperience === "1"
      ) {
        matchesExperience =
          caregiver.experienceYears >= 1;
      }

      if (
        appliedExperience === "3"
      ) {
        matchesExperience =
          caregiver.experienceYears >= 3;
      }

      if (
        appliedExperience === "5"
      ) {
        matchesExperience =
          caregiver.experienceYears >= 5;
      }

      const matchesEmployment =
        appliedEmployment
          ? caregiver.employmentType ===
            appliedEmployment
          : true;

      let matchesPrice = true;

      if (
        appliedPrice === "under20"
      ) {
        matchesPrice =
          caregiver.priceValue <= 20;
      }

      if (
        appliedPrice === "20to30"
      ) {
        matchesPrice =
          caregiver.priceValue >= 20 &&
          caregiver.priceValue <= 30;
      }

      if (
        appliedPrice === "over30"
      ) {
        matchesPrice =
          caregiver.priceValue >= 30;
      }

      return (
        matchesCity &&
        matchesExperience &&
        matchesEmployment &&
        matchesPrice
      );
    });

  const getPrice = (caregiver) => {
    return `${caregiver.priceValue} ${
      t.currency
    } / ${getPaymentTypeName(
      caregiver.paymentType
    )}`;
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
        {/* ქალაქი */}

        <select
          value={selectedCity}
          onChange={(e) => {
            const city =
              e.target.value;

            if (city) {
              setSearchParams({
                city,
              });
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

        {/* გამოცდილება */}

        <select
          value={selectedExperience}
          onChange={(e) =>
            setSelectedExperience(
              e.target.value
            )
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
            setSelectedEmployment(
              e.target.value
            )
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
            setSelectedPrice(
              e.target.value
            )
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
            setAppliedCity(
              selectedCity
            );

            setAppliedExperience(
              selectedExperience
            );

            setAppliedEmployment(
              selectedEmployment
            );

            setAppliedPrice(
              selectedPrice
            );
          }}
        >
          {t.search}
        </button>
      </div>

      <section className="drivers-list">
        {loading ? (
          <p>{t.loading}</p>
        ) : loadError ? (
          <p style={{ color: "#dc2626" }}>{t.loadError}</p>
        ) : filteredCaregivers.length ===
        0 ? (
          <div
            className="driver-card"
            style={{
              justifyContent:
                "center",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <p>
              {t.noResults}
            </p>
          </div>
        ) : (
          filteredCaregivers.map(
            (caregiver) => (
              <div
                className="driver-card"
                key={caregiver.id}
              >
                <div className="driver-avatar">
                  👵
                </div>

                <div className="driver-info">
                  <div className="driver-name">
                    <h2>
                      {
                        caregiver.name
                      }
                    </h2>

                    {caregiver.verified && (
                      <span className="verified">
                        {
                          t.verified
                        }
                      </span>
                    )}
                  </div>

                  <p>
                    📍{" "}
                    {cityNames[
                      caregiver
                        .cityValue
                    ] ||
                      caregiver.cityValue}
                  </p>

                  <p>
                    💼{" "}
                    {t.experience}:{" "}
                    {
                      caregiver.experience
                    }
                  </p>

                  <p>
                    🕒{" "}
                    {getEmploymentName(
                      caregiver.employmentType
                    )}
                  </p>

                  {caregiver.rating && (
                    <p>
                      {
                        caregiver.rating
                      }
                    </p>
                  )}
                </div>

                <div className="driver-price">
                  <strong>
                    {getPrice(
                      caregiver
                    )}
                  </strong>

                  <Link
                    to={`/caregivers/${caregiver.id}`}
                    className="profile-btn"
                  >
                    {
                      t.viewProfile
                    }
                  </Link>
                </div>
              </div>
            )
          )
        )}
      </section>
    </div>
  );
}

export default Caregivers;