import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "იპოვე მძღოლი",
    description:
      "შეარჩიე შენთვის სასურველი მძღოლი ქალაქის, გამოცდილების, განაკვეთისა და ფასის მიხედვით.",

    allCities: "ყველა ქალაქი",

    allEmployment: "ყველა განაკვეთი",
    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    allPrices: "ყველა ფასი",
    under20: "20 ₾-მდე",
    price20to30: "20 - 30 ₾",
    over30: "30 ₾+",

    search: "ძიება",
    verified: "✓ ვერიფიცირებული",
    viewProfile: "პროფილის ნახვა",

    name1: "გიორგი მ.",
    name2: "ლევან კ.",
    name3: "დავით ნ.",

    years8: "8 წლიანი გამოცდილება",
    years5: "5 წლიანი გამოცდილება",
    years6: "6 წლიანი გამოცდილება",

    currency: "₾",

    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    telavi: "თელავი",
    akhaltsikhe: "ახალციხე",
    ozurgeti: "ოზურგეთი",
    poti: "ფოთი",
    mtskheta: "მცხეთა",
    khashuri: "ხაშური",
    kobuleti: "ქობულეთი",
    borjomi: "ბორჯომი",
    samtredia: "სამტრედია",
    senaki: "სენაკი",
    marneuli: "მარნეული",
    kvareli: "ყვარელი",
    lagodekhi: "ლაგოდეხი",
    akhmeta: "ახმეტა",
    dusheti: "დუშეთი",
    kaspi: "კასპი",
    chiatura: "ჭიათურა",
    zestafoni: "ზესტაფონი",
    tkibuli: "ტყიბული",
    tsqaltubo: "წყალტუბო",
    ambrolauri: "ამბროლაური",
    oni: "ონი",
    other: "სხვა",
  },

  en: {
    title: "Find a Driver",
    description:
      "Find the right driver by city, experience, employment type and price.",

    allCities: "All cities",

    allEmployment: "All employment types",
    fullTime: "Full-time",
    partTime: "Part-time",

    allPrices: "All prices",
    under20: "Up to 20 GEL",
    price20to30: "20 - 30 GEL",
    over30: "30 GEL+",

    search: "Search",
    verified: "✓ Verified",
    viewProfile: "View Profile",

    name1: "Giorgi M.",
    name2: "Levan K.",
    name3: "Davit N.",

    years8: "8 years of experience",
    years5: "5 years of experience",
    years6: "6 years of experience",

    currency: "GEL",

    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    telavi: "Telavi",
    akhaltsikhe: "Akhaltsikhe",
    ozurgeti: "Ozurgeti",
    poti: "Poti",
    mtskheta: "Mtskheta",
    khashuri: "Khashuri",
    kobuleti: "Kobuleti",
    borjomi: "Borjomi",
    samtredia: "Samtredia",
    senaki: "Senaki",
    marneuli: "Marneuli",
    kvareli: "Kvareli",
    lagodekhi: "Lagodekhi",
    akhmeta: "Akhmeta",
    dusheti: "Dusheti",
    kaspi: "Kaspi",
    chiatura: "Chiatura",
    zestafoni: "Zestafoni",
    tkibuli: "Tkibuli",
    tsqaltubo: "Tskaltubo",
    ambrolauri: "Ambrolauri",
    oni: "Oni",
    other: "Other",
  },

  ru: {
    title: "Найти водителя",
    description:
      "Найдите подходящего водителя по городу, опыту, типу занятости и цене.",

    allCities: "Все города",

    allEmployment: "Все типы занятости",
    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    allPrices: "Все цены",
    under20: "До 20 GEL",
    price20to30: "20 - 30 GEL",
    over30: "30 GEL+",

    search: "Поиск",
    verified: "✓ Проверенный",
    viewProfile: "Посмотреть профиль",

    name1: "Гиорги М.",
    name2: "Леван К.",
    name3: "Давит Н.",

    years8: "8 лет опыта",
    years5: "5 лет опыта",
    years6: "6 лет опыта",

    currency: "GEL",

    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    telavi: "Телави",
    akhaltsikhe: "Ахалцихе",
    ozurgeti: "Озургети",
    poti: "Поти",
    mtskheta: "Мцхета",
    khashuri: "Хашури",
    kobuleti: "Кобулети",
    borjomi: "Боржоми",
    samtredia: "Самтредиа",
    senaki: "Сенаки",
    marneuli: "Марнеули",
    kvareli: "Кварели",
    lagodekhi: "Лагодехи",
    akhmeta: "Ахмета",
    dusheti: "Душети",
    kaspi: "Каспи",
    chiatura: "Чиатура",
    zestafoni: "Зестафони",
    tkibuli: "Ткибули",
    tsqaltubo: "Цхалтубо",
    ambrolauri: "Амбролаури",
    oni: "Они",
    other: "Другой",
  },
};

const cities = [
  "tbilisi",
  "batumi",
  "kutaisi",
  "rustavi",
  "gori",
  "zugdidi",
  "telavi",
  "akhaltsikhe",
  "ozurgeti",
  "poti",
  "mtskheta",
  "khashuri",
  "kobuleti",
  "borjomi",
  "samtredia",
  "senaki",
  "marneuli",
  "kvareli",
  "lagodekhi",
  "akhmeta",
  "dusheti",
  "kaspi",
  "chiatura",
  "zestafoni",
  "tkibuli",
  "tsqaltubo",
  "ambrolauri",
  "oni",
  "other",
];

function Drivers() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState("");

  const [appliedCity, setAppliedCity] = useState(selectedCity);
  const [appliedPrice, setAppliedPrice] = useState("");
  const [appliedEmployment, setAppliedEmployment] = useState("");

  /* =========================
     DEFAULT DRIVERS
  ========================= */

  const defaultDrivers = [
    {
      id: 1,
      name: t.name1,
      cityValue: "tbilisi",
      experience: t.years8,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 25,
      rating: "⭐ 4.9",
      verified: true,
    },
    {
      id: 2,
      name: t.name2,
      cityValue: "tbilisi",
      experience: t.years5,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 20,
      rating: "⭐ 4.8",
      verified: true,
    },
    {
      id: 3,
      name: t.name3,
      cityValue: "batumi",
      experience: t.years6,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 22,
      rating: "⭐ 4.7",
      verified: false,
    },
  ];

  /* =========================
     SAVED SPECIALISTS
  ========================= */

  let savedSpecialists = [];

  try {
    const savedData = JSON.parse(
      localStorage.getItem("careGeorgiaSpecialists")
    );

    if (Array.isArray(savedData)) {
      savedSpecialists = savedData;
    }
  } catch {
    savedSpecialists = [];
  }

  /* =========================
     CUSTOM DRIVERS
  ========================= */

  const customDrivers = savedSpecialists
    .filter(
      (profile) =>
        profile.profession === "driver" &&
        profile.status !== "inactive"
    )
    .map((profile) => {
      const firstName = profile.firstName || "";

      const lastNameInitial = profile.lastName
        ? `${profile.lastName.charAt(0)}.`
        : "";

      const displayName =
        `${firstName} ${lastNameInitial}`.trim() ||
        "Care Georgia";

      return {
        id: profile.id,

        name: displayName,

        cityValue: profile.city || "other",

        experience: profile.experience || "",

        employmentType:
          profile.employmentType || "full-time",

        paymentType:
          profile.paymentType || "hourly",

        priceValue: Number(profile.priceValue) || 0,

        rating: profile.rating
          ? `⭐ ${profile.rating}`
          : "⭐ —",

        verified: profile.verified === true,

        isCustom: true,
      };
    });

  /* =========================
     ALL DRIVERS
  ========================= */

  const drivers = [
    ...defaultDrivers,
    ...customDrivers,
  ];

  /* =========================
     EMPLOYMENT NAME
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
     PAYMENT TYPE
  ========================= */

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "daily") {
      return t.daily;
    }

    if (paymentType === "biweekly") {
      return t.biweekly;
    }

    if (paymentType === "monthly") {
      return t.monthly;
    }

    return t.hourly;
  };

  /* =========================
     FILTER
  ========================= */

  const filteredDrivers = drivers.filter((driver) => {
    const matchesCity = appliedCity
      ? driver.cityValue === appliedCity
      : true;

    let matchesPrice = true;

    if (appliedPrice === "under20") {
      matchesPrice = driver.priceValue <= 20;
    }

    if (appliedPrice === "20to30") {
      matchesPrice =
        driver.priceValue >= 20 &&
        driver.priceValue <= 30;
    }

    if (appliedPrice === "over30") {
      matchesPrice = driver.priceValue >= 30;
    }

    const matchesEmployment = appliedEmployment
      ? driver.employmentType === appliedEmployment
      : true;

    return (
      matchesCity &&
      matchesPrice &&
      matchesEmployment
    );
  });

  /* =========================
     PRICE
  ========================= */

  const getPrice = (driver) => {
    return `${driver.priceValue} ${t.currency} / ${getPaymentTypeName(
      driver.paymentType
    )}`;
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

          {cities.map((city) => (
            <option
              key={city}
              value={city}
            >
              {t[city] || city}
            </option>
          ))}
        </select>

        {/* EMPLOYMENT */}

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
            setAppliedCity(selectedCity);
            setAppliedPrice(selectedPrice);
            setAppliedEmployment(
              selectedEmployment
            );
          }}
        >
          {t.search}
        </button>
      </div>

      {/* =========================
          DRIVERS LIST
      ========================= */}

      <section className="drivers-list">
        {filteredDrivers.map((driver) => (
          <div
            className="driver-card"
            key={driver.id}
          >
            <div className="driver-avatar">
              👤
            </div>

            <div className="driver-info">
              <div className="driver-name">
                <h2>
                  {driver.name}
                </h2>

                {driver.verified && (
                  <span className="verified">
                    {t.verified}
                  </span>
                )}
              </div>

              <p>
                📍{" "}
                {t[driver.cityValue] ||
                  driver.cityValue}
              </p>

              <p>
                🚗 {driver.experience}
              </p>

              <p>
                🕒{" "}
                {getEmploymentName(
                  driver.employmentType
                )}
              </p>

              <p>
                {driver.rating}
              </p>
            </div>

            <div className="driver-price">
              <strong>
                {getPrice(driver)}
              </strong>

              <Link
                to={`/drivers/${driver.id}`}
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

export default Drivers;