import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "სახლის დამხმარე ვერ მოიძებნა",
    back: "← სახლის დამხმარეებზე დაბრუნება",

    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    about: "ჩემ შესახებ",
    service: "მომსახურება",
    experience: "გამოცდილება",
    employment: "განაკვეთი",
    rating: "რეიტინგი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    name1: "ნათია მ.",
    name2: "თამუნა კ.",
    name3: "ეკა ნ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",

    years6: "6 წელი",
    years4: "4 წელი",
    years5: "5 წელი",

    service1: "სახლის დასუფთავება",
    service2: "ყოველდღიური დახმარება",
    service3: "დასუფთავება და საჭმლის მომზადება",

    currency: "₾",
    perHour: "საათი",

    description1:
      "სახლის მოვლისა და დასუფთავების 6 წლიანი გამოცდილება მაქვს. ვმუშაობ პასუხისმგებლობით და ყურადღებით.",

    description2:
      "ვთავაზობ ოჯახებს ყოველდღიურ დახმარებას, სახლის მოწესრიგებასა და სხვადასხვა საოჯახო საქმეში დახმარებას.",

    description3:
      "ვმუშაობ ბათუმში. შემიძლია სახლის დასუფთავება, მოწესრიგება და საჭმლის მომზადებაში დახმარება.",
  },

  en: {
    notFound: "Housekeeper not found",
    back: "← Back to Housekeepers",

    verified: "✓ Verified",
    reviews: "reviews",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    about: "About Me",
    service: "Service",
    experience: "Experience",
    employment: "Employment type",
    rating: "Rating",

    fullTime: "Full-time",
    partTime: "Part-time",

    name1: "Natia M.",
    name2: "Tamuna K.",
    name3: "Eka N.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",

    years6: "6 years",
    years4: "4 years",
    years5: "5 years",

    service1: "House cleaning",
    service2: "Daily assistance",
    service3: "Cleaning and cooking",

    currency: "GEL",
    perHour: "hour",

    description1:
      "I have 6 years of experience in home care and cleaning. I work responsibly and pay attention to detail.",

    description2:
      "I provide families with daily assistance, home organization and help with various household tasks.",

    description3:
      "I work in Batumi. I can help with house cleaning, organization and cooking.",
  },

  ru: {
    notFound: "Помощник по дому не найден",
    back: "← Назад к помощникам по дому",

    verified: "✓ Проверенная",
    reviews: "отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    about: "Обо мне",
    service: "Услуга",
    experience: "Опыт",
    employment: "Тип занятости",
    rating: "Рейтинг",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    name1: "Натия М.",
    name2: "Тамуна К.",
    name3: "Эка Н.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",

    years6: "6 лет",
    years4: "4 года",
    years5: "5 лет",

    service1: "Уборка дома",
    service2: "Ежедневная помощь",
    service3: "Уборка и приготовление еды",

    currency: "GEL",
    perHour: "час",

    description1:
      "У меня 6 лет опыта в уходе за домом и уборке. Работаю ответственно и внимательно.",

    description2:
      "Предлагаю семьям ежедневную помощь, поддержание порядка в доме и помощь с различными домашними делами.",

    description3:
      "Работаю в Батуми. Могу помочь с уборкой дома, поддержанием порядка и приготовлением еды.",
  },
};

function HousekeeperProfile() {
  const { id } = useParams();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const housekeepers = [
    {
      id: 1,
      name: t.name1,
      city: t.tbilisi,
      experience: t.years6,
      employmentType: "full-time",
      priceValue: 20,
      rating: "4.9",
      reviews: 41,
      verified: true,
      service: t.service1,
      description: t.description1,
    },

    {
      id: 2,
      name: t.name2,
      city: t.tbilisi,
      experience: t.years4,
      employmentType: "part-time",
      priceValue: 18,
      rating: "4.8",
      reviews: 28,
      verified: true,
      service: t.service2,
      description: t.description2,
    },

    {
      id: 3,
      name: t.name3,
      city: t.batumi,
      experience: t.years5,
      employmentType: "part-time",
      priceValue: 17,
      rating: "4.7",
      reviews: 20,
      verified: false,
      service: t.service3,
      description: t.description3,
    },
  ];

  const housekeeper = housekeepers.find(
    (item) => item.id === Number(id)
  );

  if (!housekeeper) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to="/housekeepers">
          {t.back}
        </Link>
      </div>
    );
  }

  const housekeeperPrice =
    `${housekeeper.priceValue} ${t.currency} / ${t.perHour}`;

  const employmentName =
    housekeeper.employmentType === "full-time"
      ? t.fullTime
      : t.partTime;

  return (
    <div className="profile-page">
      <div className="profile-container">

        <Link
          to="/housekeepers"
          className="profile-back"
        >
          {t.back}
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              🏠
            </div>

            <div className="profile-details">

              <div className="profile-name">

                <h1>
                  {housekeeper.name}
                </h1>

                {housekeeper.verified && (
                  <span className="profile-verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p className="profile-location">
                📍 {housekeeper.city}
              </p>

              <p>
                🕒 {employmentName}
              </p>

              <div className="profile-rating">
                ⭐ {housekeeper.rating}

                <span>
                  ({housekeeper.reviews} {t.reviews})
                </span>
              </div>

            </div>
          </div>

          <div className="profile-action">

            <span>
              {t.servicePrice}
            </span>

            <strong>
              {housekeeperPrice}
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
            {housekeeper.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>🏠</span>

              <p>
                {t.service}
              </p>

              <strong>
                {housekeeper.service}
              </strong>
            </div>

            <div>
              <span>💼</span>

              <p>
                {t.experience}
              </p>

              <strong>
                {housekeeper.experience}
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
                {housekeeper.rating} / 5
              </strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default HousekeeperProfile;