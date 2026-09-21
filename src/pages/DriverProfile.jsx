import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "მძღოლი ვერ მოიძებნა",
    back: "← მძღოლებზე დაბრუნება",
    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    about: "ჩემ შესახებ",
    experience: "გამოცდილება",
    city: "ქალაქი",
    employment: "განაკვეთი",
    rating: "რეიტინგი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    name1: "გიორგი მ.",
    name2: "ლევან კ.",
    name3: "დავით ნ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",

    years8: "8 წელი",
    years5: "5 წელი",
    years6: "6 წელი",

    currency: "₾",
    perHour: "საათი",

    description1:
      "გამოცდილი მძღოლი 8 წლიანი გამოცდილებით. პასუხისმგებლიანი, პუნქტუალური და ორიენტირებული უსაფრთხო მგზავრობაზე.",

    description2:
      "მაქვს როგორც ქალაქში, ასევე საქალაქთაშორისო მარშრუტებზე მუშაობის გამოცდილება.",

    description3:
      "მძღოლი ბათუმში. ხელმისაწვდომი ვარ როგორც ყოველდღიური, ასევე ერთჯერადი მომსახურებისთვის.",
  },

  en: {
    notFound: "Driver not found",
    back: "← Back to Drivers",
    verified: "✓ Verified",
    reviews: "reviews",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    about: "About Me",
    experience: "Experience",
    city: "City",
    employment: "Employment type",
    rating: "Rating",

    fullTime: "Full-time",
    partTime: "Part-time",

    name1: "Giorgi M.",
    name2: "Levan K.",
    name3: "Davit N.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",

    years8: "8 years",
    years5: "5 years",
    years6: "6 years",

    currency: "GEL",
    perHour: "hour",

    description1:
      "Experienced driver with 8 years of experience. Responsible, punctual and focused on safe travel.",

    description2:
      "I have experience working on both city and intercity routes.",

    description3:
      "Driver based in Batumi. I am available for both daily and one-time services.",
  },

  ru: {
    notFound: "Водитель не найден",
    back: "← Назад к водителям",
    verified: "✓ Проверенный",
    reviews: "отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    about: "Обо мне",
    experience: "Опыт",
    city: "Город",
    employment: "Тип занятости",
    rating: "Рейтинг",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    name1: "Гиорги М.",
    name2: "Леван К.",
    name3: "Давит Н.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",

    years8: "8 лет",
    years5: "5 лет",
    years6: "6 лет",

    currency: "GEL",
    perHour: "час",

    description1:
      "Опытный водитель с 8-летним стажем. Ответственный, пунктуальный и ориентированный на безопасные поездки.",

    description2:
      "Имею опыт работы как на городских, так и на междугородних маршрутах.",

    description3:
      "Водитель в Батуми. Доступен как для ежедневных, так и для разовых услуг.",
  },
};

function DriverProfile() {
  const { id } = useParams();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const drivers = [
    {
      id: 1,
      name: t.name1,
      city: t.tbilisi,
      experience: t.years8,
      employmentType: "full-time",
      priceValue: 25,
      rating: "4.9",
      reviews: 37,
      verified: true,
      description: t.description1,
    },

    {
      id: 2,
      name: t.name2,
      city: t.tbilisi,
      experience: t.years5,
      employmentType: "part-time",
      priceValue: 20,
      rating: "4.8",
      reviews: 24,
      verified: true,
      description: t.description2,
    },

    {
      id: 3,
      name: t.name3,
      city: t.batumi,
      experience: t.years6,
      employmentType: "full-time",
      priceValue: 22,
      rating: "4.7",
      reviews: 18,
      verified: false,
      description: t.description3,
    },
  ];

  const driver = drivers.find(
    (item) => item.id === Number(id)
  );

  if (!driver) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to="/drivers">
          {t.back}
        </Link>
      </div>
    );
  }

  const driverPrice =
    `${driver.priceValue} ${t.currency} / ${t.perHour}`;

  const employmentName =
    driver.employmentType === "full-time"
      ? t.fullTime
      : t.partTime;

  return (
    <div className="profile-page">

      <div className="profile-container">

        <Link
          to="/drivers"
          className="profile-back"
        >
          {t.back}
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              👤
            </div>

            <div className="profile-details">

              <div className="profile-name">

                <h1>
                  {driver.name}
                </h1>

                {driver.verified && (
                  <span className="profile-verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p className="profile-location">
                📍 {driver.city}
              </p>

              <p>
                🕒 {employmentName}
              </p>

              <div className="profile-rating">

                ⭐ {driver.rating}

                <span>
                  ({driver.reviews} {t.reviews})
                </span>

              </div>

            </div>

          </div>

          <div className="profile-action">

            <span>
              {t.servicePrice}
            </span>

            <strong>
              {driverPrice}
            </strong>

            <button className="contact-btn">
              {t.contact}
            </button>

            <button className="message-btn">
              {t.message}
            </button>

          </div>

        </div>

        <div className="profile-about">

          <h2>
            {t.about}
          </h2>

          <p>
            {driver.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>🚗</span>

              <p>
                {t.experience}
              </p>

              <strong>
                {driver.experience}
              </strong>
            </div>

            <div>
              <span>📍</span>

              <p>
                {t.city}
              </p>

              <strong>
                {driver.city}
              </strong>
            </div>

            <div>
              <span>🕒</span>

              <p>
                {t.employment}
              </p>

              <strong>
                {employmentName}
              </strong>
            </div>

            <div>
              <span>⭐</span>

              <p>
                {t.rating}
              </p>

              <strong>
                {driver.rating} / 5
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DriverProfile;