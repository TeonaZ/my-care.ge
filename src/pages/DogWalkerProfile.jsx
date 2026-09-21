import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    notFound: "პროფილი ვერ მოიძებნა",
    back: "← ძაღლის გამსეირნებლებზე დაბრუნება",

    verified: "✓ ვერიფიცირებული",
    experience: "გამოცდილება",
    employment: "განაკვეთი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    about: "ჩემ შესახებ",
    contact: "დაკავშირება",
    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

    name1: "გიორგი დ.",
    name2: "ანა მ.",
    name3: "ლუკა კ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",

    years5: "5 წელი",
    years3: "3 წელი",
    years4: "4 წელი",

    currency: "₾",
    perHour: "საათი",

    description1:
      "მაქვს ძაღლებთან მუშაობის გამოცდილება. ვასეირნებ როგორც პატარა, ასევე დიდი ზომის ძაღლებს.",

    description2:
      "მიყვარს ცხოველები და პასუხისმგებლობით ვზრუნავ მათ უსაფრთხო გასეირნებაზე.",

    description3:
      "გთავაზობთ ძაღლის გასეირნებას და ყოველდღიურ მოვლაში დახმარებას.",
  },

  en: {
    notFound: "Profile not found",
    back: "← Back to Dog Walkers",

    verified: "✓ Verified",
    experience: "Experience",
    employment: "Employment type",

    fullTime: "Full-time",
    partTime: "Part-time",

    about: "About Me",
    contact: "Contact",
    phone: "Phone",
    email: "Email",

    name1: "Giorgi D.",
    name2: "Ana M.",
    name3: "Luka K.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",

    years5: "5 years",
    years3: "3 years",
    years4: "4 years",

    currency: "GEL",
    perHour: "hour",

    description1:
      "I have experience working with dogs. I walk both small and large dogs.",

    description2:
      "I love animals and take responsibility for providing them with safe and enjoyable walks.",

    description3:
      "I offer dog walking and assistance with everyday pet care.",
  },

  ru: {
    notFound: "Профиль не найден",
    back: "← Назад к выгульщикам собак",

    verified: "✓ Проверенный",
    experience: "Опыт",
    employment: "Тип занятости",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    about: "Обо мне",
    contact: "Связаться",
    phone: "Телефон",
    email: "Эл. почта",

    name1: "Гиорги Д.",
    name2: "Ана М.",
    name3: "Лука К.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",

    years5: "5 лет",
    years3: "3 года",
    years4: "4 года",

    currency: "GEL",
    perHour: "час",

    description1:
      "У меня есть опыт работы с собаками. Выгуливаю как маленьких, так и крупных собак.",

    description2:
      "Я люблю животных и ответственно отношусь к их безопасным прогулкам.",

    description3:
      "Предлагаю выгул собак и помощь в ежедневном уходе за питомцами.",
  },
};

function DogWalkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [showContact, setShowContact] = useState(false);

  const dogWalkers = [
    {
      id: 1,
      name: t.name1,
      city: t.tbilisi,
      experience: t.years5,
      employmentType: "full-time",
      priceValue: 15,
      rating: "⭐ 4.9",
      verified: true,
      phone: "+995 555 12 34 56",
      email: "giorgi@example.com",
      description: t.description1,
    },

    {
      id: 2,
      name: t.name2,
      city: t.tbilisi,
      experience: t.years3,
      employmentType: "part-time",
      priceValue: 12,
      rating: "⭐ 4.8",
      verified: true,
      phone: "+995 599 23 45 67",
      email: "ana@example.com",
      description: t.description2,
    },

    {
      id: 3,
      name: t.name3,
      city: t.batumi,
      experience: t.years4,
      employmentType: "part-time",
      priceValue: 10,
      rating: "⭐ 4.7",
      verified: false,
      phone: "+995 568 34 56 78",
      email: "luka@example.com",
      description: t.description3,
    },
  ];

  const walker = dogWalkers.find(
    (walker) => walker.id === Number(id)
  );

  const handleContact = () => {
    const isLoggedIn =
      localStorage.getItem("careGeorgiaLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setShowContact(true);
  };

  if (!walker) {
    return (
      <div className="drivers-page">
        <h1>{t.notFound}</h1>

        <Link to="/dogwalker" className="back-link">
          {t.back}
        </Link>
      </div>
    );
  }

  const walkerPrice =
    `${walker.priceValue} ${t.currency} / ${t.perHour}`;

  const employmentName =
    walker.employmentType === "full-time"
      ? t.fullTime
      : t.partTime;

  return (
    <div className="drivers-page">

      <header className="drivers-header">

        <Link
          to="/dogwalker"
          className="back-link"
        >
          {t.back}
        </Link>

      </header>

      <section className="driver-card">

        <div className="driver-avatar">
          🐕
        </div>

        <div className="driver-info">

          <div className="driver-name">

            <h1>
              {walker.name}
            </h1>

            {walker.verified && (
              <span className="verified">
                {t.verified}
              </span>
            )}

          </div>

          <p>
            📍 {walker.city}
          </p>

          <p>
            🐕 {t.experience}: {walker.experience}
          </p>

          <p>
            🕒 {t.employment}: {employmentName}
          </p>

          <p>
            {walker.rating}
          </p>

          <h3>
            {t.about}
          </h3>

          <p>
            {walker.description}
          </p>

        </div>

        <div className="driver-price">

          <strong>
            {walkerPrice}
          </strong>

          {!showContact ? (
            <button
              type="button"
              className="profile-btn"
              onClick={handleContact}
            >
              {t.contact}
            </button>
          ) : (
            <div className="contact-info">

              {walker.phone && (
                <div>

                  <p>
                    📞 {t.phone}
                  </p>

                  <a
                    href={`tel:${walker.phone.replace(/\s/g, "")}`}
                  >
                    {walker.phone}
                  </a>

                </div>
              )}

              {walker.email && (
                <div>

                  <p>
                    ✉️ {t.email}
                  </p>

                  <a href={`mailto:${walker.email}`}>
                    {walker.email}
                  </a>

                </div>
              )}

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default DogWalkerProfile;