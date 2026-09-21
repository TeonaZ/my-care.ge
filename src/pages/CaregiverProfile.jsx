import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "მომვლელი ვერ მოიძებნა",
    back: "← მომვლელებზე დაბრუნება",

    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    about: "მომვლელის შესახებ",
    experience: "გამოცდილება",
    city: "ქალაქი",
    employment: "განაკვეთი",
    rating: "რეიტინგი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    name1: "მაია კ.",
    name2: "ეკა მ.",
    name3: "ნანა გ.",

    tbilisi: "თბილისი",
    kutaisi: "ქუთაისი",
    batumi: "ბათუმი",

    years8: "8 წელი",
    years6: "6 წელი",
    years5: "5 წელი",

    currency: "₾",
    perHour: "საათი",

    description1:
      "ხანდაზმულ ადამიანებზე ზრუნვის 8 წლიანი გამოცდილება მაქვს. შემიძლია ყოველდღიურ საქმიანობაში დახმარება, გასეირნება და თანმხლებად ყოფნა.",

    description2:
      "მაქვს ხანდაზმულ ადამიანებთან მუშაობის გამოცდილება. პასუხისმგებლიანი, ყურადღებიანი და პუნქტუალური ვარ.",

    description3:
      "ვთავაზობ ოჯახებს ხანდაზმული ოჯახის წევრის ყოველდღიურ დახმარებასა და მოვლას ბათუმში.",
  },

  en: {
    notFound: "Caregiver not found",
    back: "← Back to Caregivers",

    verified: "✓ Verified",
    reviews: "reviews",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    about: "About the Caregiver",
    experience: "Experience",
    city: "City",
    employment: "Employment type",
    rating: "Rating",

    fullTime: "Full-time",
    partTime: "Part-time",

    name1: "Maia K.",
    name2: "Eka M.",
    name3: "Nana G.",

    tbilisi: "Tbilisi",
    kutaisi: "Kutaisi",
    batumi: "Batumi",

    years8: "8 years",
    years6: "6 years",
    years5: "5 years",

    currency: "GEL",
    perHour: "hour",

    description1:
      "I have 8 years of experience caring for elderly people. I can assist with daily activities, walks and companionship.",

    description2:
      "I have experience working with elderly people. I am responsible, attentive and punctual.",

    description3:
      "I provide daily assistance and care for elderly family members in Batumi.",
  },

  ru: {
    notFound: "Сиделка не найдена",
    back: "← Назад к сиделкам",

    verified: "✓ Проверенная",
    reviews: "отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    about: "О сиделке",
    experience: "Опыт",
    city: "Город",
    employment: "Тип занятости",
    rating: "Рейтинг",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    name1: "Майя К.",
    name2: "Эка М.",
    name3: "Нана Г.",

    tbilisi: "Тбилиси",
    kutaisi: "Кутаиси",
    batumi: "Батуми",

    years8: "8 лет",
    years6: "6 лет",
    years5: "5 лет",

    currency: "GEL",
    perHour: "час",

    description1:
      "У меня 8 лет опыта ухода за пожилыми людьми. Могу помогать в повседневных делах, сопровождать на прогулках и составлять компанию.",

    description2:
      "У меня есть опыт работы с пожилыми людьми. Я ответственная, внимательная и пунктуальная.",

    description3:
      "Предлагаю семьям ежедневную помощь и уход за пожилым членом семьи в Батуми.",
  },
};

function CaregiverProfile() {
  const { id } = useParams();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const caregivers = [
    {
      id: 1,
      name: t.name1,
      city: t.tbilisi,
      experience: t.years8,
      employmentType: "full-time",
      priceValue: 22,
      rating: "4.9",
      reviews: 51,
      verified: true,
      description: t.description1,
    },

    {
      id: 2,
      name: t.name2,
      city: t.kutaisi,
      experience: t.years6,
      employmentType: "part-time",
      priceValue: 18,
      rating: "4.8",
      reviews: 34,
      verified: true,
      description: t.description2,
    },

    {
      id: 3,
      name: t.name3,
      city: t.batumi,
      experience: t.years5,
      employmentType: "full-time",
      priceValue: 17,
      rating: "4.7",
      reviews: 22,
      verified: false,
      description: t.description3,
    },
  ];

  const caregiver = caregivers.find(
    (item) => item.id === Number(id)
  );

  if (!caregiver) {
    return (
      <div className="profile-not-found">

        <h1>
          {t.notFound}
        </h1>

        <Link to="/caregivers">
          {t.back}
        </Link>

      </div>
    );
  }

  const caregiverPrice =
    `${caregiver.priceValue} ${t.currency} / ${t.perHour}`;

  const employmentName =
    caregiver.employmentType === "full-time"
      ? t.fullTime
      : t.partTime;

  return (
    <div className="profile-page">

      <div className="profile-container">

        <Link
          to="/caregivers"
          className="profile-back"
        >
          {t.back}
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              👵
            </div>

            <div className="profile-details">

              <div className="profile-name">

                <h1>
                  {caregiver.name}
                </h1>

                {caregiver.verified && (
                  <span className="profile-verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p className="profile-location">
                📍 {caregiver.city}
              </p>

              <p>
                🕒 {employmentName}
              </p>

              <div className="profile-rating">

                ⭐ {caregiver.rating}

                <span>
                  ({caregiver.reviews} {t.reviews})
                </span>

              </div>

            </div>

          </div>

          <div className="profile-action">

            <span>
              {t.servicePrice}
            </span>

            <strong>
              {caregiverPrice}
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
            {caregiver.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>💼</span>

              <p>
                {t.experience}
              </p>

              <strong>
                {caregiver.experience}
              </strong>
            </div>

            <div>
              <span>📍</span>

              <p>
                {t.city}
              </p>

              <strong>
                {caregiver.city}
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
                {caregiver.rating} / 5
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CaregiverProfile;