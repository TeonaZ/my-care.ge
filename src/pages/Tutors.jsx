
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const API = "http://localhost:5000";

const translations = {
  ka: {
    title: "იპოვე რეპეტიტორი",
    description:
      "იპოვე შენთვის სასურველი მასწავლებელი ან რეპეტიტორი ქალაქისა და ფასის მიხედვით.",
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
    price20to30: "20–30 ₾",
    over30: "30 ₾-ზე მეტი",
    search: "ძიება",
    experience: "გამოცდილება",
    viewProfile: "პროფილის ნახვა",
    currency: "₾",
    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",
    noResults: "ამ ფილტრებით რეპეტიტორი ვერ მოიძებნა.",
    loading: "რეპეტიტორები იტვირთება...",
    error: "რეპეტიტორების ჩატვირთვა ვერ მოხერხდა.",
    retry: "ხელახლა ცდა",
    tutor: "რეპეტიტორი",
  },
  en: {
    title: "Find a Tutor",
    description: "Find a teacher or tutor by city and price.",
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
    price20to30: "20–30 GEL",
    over30: "Over 30 GEL",
    search: "Search",
    experience: "Experience",
    viewProfile: "View Profile",
    currency: "GEL",
    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",
    noResults: "No tutors were found with these filters.",
    loading: "Loading tutors...",
    error: "Could not load tutors.",
    retry: "Try again",
    tutor: "Tutor",
  },
  ru: {
    title: "Найти репетитора",
    description: "Найдите репетитора по городу и цене.",
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
    price20to30: "20–30 GEL",
    over30: "Более 30 GEL",
    search: "Поиск",
    experience: "Опыт",
    viewProfile: "Посмотреть профиль",
    currency: "GEL",
    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",
    noResults: "По этим фильтрам репетиторы не найдены.",
    loading: "Загрузка репетиторов...",
    error: "Не удалось загрузить репетиторов.",
    retry: "Повторить",
    tutor: "Репетитор",
  },
};

function Tutors() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const [selectedPrice, setSelectedPrice] = useState("");
  const [appliedCity, setAppliedCity] = useState(selectedCity);
  const [appliedPrice, setAppliedPrice] = useState("");

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadTutors = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API}/api/specialists?profession=tutor`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t.error);
        }

        const specialists = Array.isArray(data.specialists)
          ? data.specialists
          : [];

        if (!cancelled) {
          setTutors(
            specialists.filter(
              (profile) =>
                String(profile.profession || "").toLowerCase() ===
                "tutor"
            )
          );
        }
      } catch (err) {
        console.error("LOAD TUTORS ERROR:", err);

        if (!cancelled) {
          setTutors([]);
          setError(err.message || t.error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTutors();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const cityNames = {
    tbilisi: t.tbilisi,
    batumi: t.batumi,
    kutaisi: t.kutaisi,
    rustavi: t.rustavi,
    gori: t.gori,
    zugdidi: t.zugdidi,
    other: t.other,
  };

  const getCityName = (city) =>
    cityNames[city] || city || t.other;

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") return t.monthly;
    if (paymentType === "biweekly") return t.biweekly;
    if (paymentType === "daily") return t.daily;
    return t.hourly;
  };

  const getSafeName = (profile) => {
    const firstName = profile.firstName || "";
    const lastName = profile.lastName || "";
    const lastInitial = lastName
      ? `${lastName.charAt(0)}.`
      : "";

    return `${firstName} ${lastInitial}`.trim() || t.tutor;
  };

  const filteredTutors = tutors.filter((profile) => {
    const matchesCity = appliedCity
      ? profile.city === appliedCity
      : true;

    const price = Number(profile.priceValue || 0);

    let matchesPrice = true;

    if (appliedPrice === "under20") {
      matchesPrice = price <= 20;
    } else if (appliedPrice === "20to30") {
      matchesPrice = price >= 20 && price <= 30;
    } else if (appliedPrice === "over30") {
      matchesPrice = price > 30;
    }

    return matchesCity && matchesPrice;
  });

  const getPrice = (profile) =>
    `${Number(profile.priceValue || 0)} ${
      t.currency
    } / ${getPaymentTypeName(profile.paymentType)}`;

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
        <select
          value={selectedCity}
          onChange={(event) => {
            const city = event.target.value;
            setSearchParams(city ? { city } : {});
          }}
        >
          <option value="">{t.allCities}</option>
          <option value="tbilisi">{t.tbilisi}</option>
          <option value="batumi">{t.batumi}</option>
          <option value="kutaisi">{t.kutaisi}</option>
          <option value="rustavi">{t.rustavi}</option>
          <option value="gori">{t.gori}</option>
          <option value="zugdidi">{t.zugdidi}</option>
          <option value="other">{t.other}</option>
        </select>

        <select
          value={selectedPrice}
          onChange={(event) =>
            setSelectedPrice(event.target.value)
          }
        >
          <option value="">{t.allPrices}</option>
          <option value="under20">{t.under20}</option>
          <option value="20to30">{t.price20to30}</option>
          <option value="over30">{t.over30}</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setAppliedCity(selectedCity);
            setAppliedPrice(selectedPrice);
          }}
        >
          {t.search}
        </button>
      </div>

      <section className="drivers-list">
        {loading ? (
          <div className="driver-card">
            <p>{t.loading}</p>
          </div>
        ) : error ? (
          <div className="driver-card">
            <p>{error}</p>
            <button
              type="button"
              onClick={() =>
                setReloadKey((previous) => previous + 1)
              }
            >
              {t.retry}
            </button>
          </div>
        ) : filteredTutors.length === 0 ? (
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
          filteredTutors.map((profile) => (
            <div
              className="driver-card"
              key={profile.id}
            >
              <div className="driver-avatar">📚</div>

              <div className="driver-info">
                <div className="driver-name">
                  <h2>{getSafeName(profile)}</h2>
                </div>

                <p>
                  📍 {getCityName(profile.city)}
                </p>

                <p>
                  🎓 {t.experience}:{" "}
                  {profile.experience || "—"}
                </p>
              </div>

              <div className="driver-price">
                <strong>{getPrice(profile)}</strong>

                <Link
                  to={`/tutors/${profile.id}`}
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
