import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "ძიძა ვერ მოიძებნა",
    back: "← ძიძებზე დაბრუნება",
    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    about: "ძიძის შესახებ",
    childAge: "ბავშვის ასაკი",
    experience: "გამოცდილება",
    employment: "განაკვეთი",
    rating: "რეიტინგი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    name1: "თამარ მ.",
    name2: "ნინო კ.",
    name3: "მარიამ გ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",

    years7: "7 წელი",
    years5: "5 წელი",
    years4: "4 წელი",

    age06: "0-6 წელი",
    age18: "1-8 წელი",
    age310: "3-10 წელი",

    currency: "₾",
    perHour: "საათი",

    description1:
      "ბავშვებთან მუშაობის 7 წლიანი გამოცდილება მაქვს. შემიძლია ბავშვის მოვლა, კვება, გასეირნება და ასაკის შესაბამისი აქტივობების დაგეგმვა.",

    description2:
      "მაქვს ძიძად მუშაობის 5 წლიანი გამოცდილება. პასუხისმგებლიანი და პუნქტუალური ვარ და მიყვარს ბავშვებთან მუშაობა.",

    description3:
      "ვმუშაობ ძიძად ბათუმში. შემიძლია როგორც ყოველდღიური, ასევე რამდენიმე საათით ბავშვის მოვლა.",
  },

  en: {
    notFound: "Nanny not found",
    back: "← Back to Nannies",
    verified: "✓ Verified",
    reviews: "reviews",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    about: "About the Nanny",
    childAge: "Child's age",
    experience: "Experience",
    employment: "Employment type",
    rating: "Rating",

    fullTime: "Full-time",
    partTime: "Part-time",

    name1: "Tamar M.",
    name2: "Nino K.",
    name3: "Mariam G.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",

    years7: "7 years",
    years5: "5 years",
    years4: "4 years",

    age06: "0-6 years",
    age18: "1-8 years",
    age310: "3-10 years",

    currency: "GEL",
    perHour: "hour",

    description1:
      "I have 7 years of experience working with children. I can provide childcare, prepare meals, take children for walks and plan age-appropriate activities.",

    description2:
      "I have 5 years of experience working as a nanny. I am responsible, punctual and enjoy working with children.",

    description3:
      "I work as a nanny in Batumi. I am available for both daily childcare and care for a few hours.",
  },

  ru: {
    notFound: "Няня не найдена",
    back: "← Назад к няням",
    verified: "✓ Проверенная",
    reviews: "отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    about: "О няне",
    childAge: "Возраст ребенка",
    experience: "Опыт",
    employment: "Тип занятости",
    rating: "Рейтинг",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    name1: "Тамар М.",
    name2: "Нино К.",
    name3: "Мариам Г.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",

    years7: "7 лет",
    years5: "5 лет",
    years4: "4 года",

    age06: "0-6 лет",
    age18: "1-8 лет",
    age310: "3-10 лет",

    currency: "GEL",
    perHour: "час",

    description1:
      "У меня 7 лет опыта работы с детьми. Могу ухаживать за ребенком, готовить еду, гулять и планировать занятия в соответствии с возрастом.",

    description2:
      "У меня 5 лет опыта работы няней. Я ответственная, пунктуальная и люблю работать с детьми.",

    description3:
      "Работаю няней в Батуми. Доступна как для ежедневного ухода за ребенком, так и на несколько часов.",
  },
};

function NannyProfile() {
  const { id } = useParams();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const nannies = [
    {
      id: 1,
      name: t.name1,
      city: t.tbilisi,
      experience: t.years7,
      employmentType: "full-time",
      priceValue: 20,
      rating: "4.9",
      reviews: 45,
      verified: true,
      ageGroups: t.age06,
      description: t.description1,
    },

    {
      id: 2,
      name: t.name2,
      city: t.tbilisi,
      experience: t.years5,
      employmentType: "part-time",
      priceValue: 18,
      rating: "4.8",
      reviews: 32,
      verified: true,
      ageGroups: t.age18,
      description: t.description2,
    },

    {
      id: 3,
      name: t.name3,
      city: t.batumi,
      experience: t.years4,
      employmentType: "part-time",
      priceValue: 15,
      rating: "4.7",
      reviews: 21,
      verified: false,
      ageGroups: t.age310,
      description: t.description3,
    },
  ];

  const nanny = nannies.find(
    (item) => item.id === Number(id)
  );

  if (!nanny) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to="/nannies">
          {t.back}
        </Link>
      </div>
    );
  }

  const nannyPrice =
    `${nanny.priceValue} ${t.currency} / ${t.perHour}`;

  const employmentName =
    nanny.employmentType === "full-time"
      ? t.fullTime
      : t.partTime;

  return (
    <div className="profile-page">
      <div className="profile-container">

        <Link
          to="/nannies"
          className="profile-back"
        >
          {t.back}
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              👶
            </div>

            <div className="profile-details">

              <div className="profile-name">

                <h1>
                  {nanny.name}
                </h1>

                {nanny.verified && (
                  <span className="profile-verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p className="profile-location">
                📍 {nanny.city}
              </p>

              <p>
                🕒 {employmentName}
              </p>

              <div className="profile-rating">

                ⭐ {nanny.rating}

                <span>
                  ({nanny.reviews} {t.reviews})
                </span>

              </div>

            </div>
          </div>

          <div className="profile-action">

            <span>
              {t.servicePrice}
            </span>

            <strong>
              {nannyPrice}
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
            {nanny.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>👶</span>

              <p>
                {t.childAge}
              </p>

              <strong>
                {nanny.ageGroups}
              </strong>
            </div>

            <div>
              <span>💼</span>

              <p>
                {t.experience}
              </p>

              <strong>
                {nanny.experience}
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
                {nanny.rating} / 5
              </strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default NannyProfile;