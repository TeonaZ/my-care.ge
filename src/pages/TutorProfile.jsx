import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "ტუტორი ვერ მოიძებნა",
    back: "← ტუტორებზე დაბრუნება",
    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",
    lessonPrice: "გაკვეთილის ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",
    about: "ტუტორის შესახებ",
    subject: "საგანი",
    experience: "გამოცდილება",
    rating: "რეიტინგი",

    // სახელები
    name1: "ნინო ბ.",
    name2: "ანა გ.",
    name3: "მარიამ ლ.",

    // ქალაქები
    tbilisi: "თბილისი",
    batumi: "ბათუმი",

    // საგნები
    english: "ინგლისური ენა",
    math: "მათემატიკა",
    georgian: "ქართული ენა",

    // გამოცდილება
    years6: "6 წელი",
    years4: "4 წელი",
    years5: "5 წელი",

    // ფასი
    currency: "₾",
    perHour: "საათი",

    // აღწერები
    description1:
      "ინგლისური ენის ტუტორი 6 წლიანი გამოცდილებით. ვმუშაობ როგორც მოსწავლეებთან, ასევე ზრდასრულებთან.",

    description2:
      "მათემატიკის რეპეტიტორი. ვეხმარები მოსწავლეებს სასკოლო პროგრამის ათვისებასა და გამოცდებისთვის მომზადებაში.",

    description3:
      "ქართული ენის ტუტორი ბათუმში. ვთავაზობ ინდივიდუალურ გაკვეთილებს სხვადასხვა ასაკის მოსწავლეებს.",
  },

  en: {
    notFound: "Tutor not found",
    back: "← Back to Tutors",
    verified: "✓ Verified",
    reviews: "reviews",
    lessonPrice: "Lesson price",
    contact: "Contact",
    message: "Message",
    about: "About the Tutor",
    subject: "Subject",
    experience: "Experience",
    rating: "Rating",

    // Names
    name1: "Nino B.",
    name2: "Ana G.",
    name3: "Mariam L.",

    // Cities
    tbilisi: "Tbilisi",
    batumi: "Batumi",

    // Subjects
    english: "English",
    math: "Mathematics",
    georgian: "Georgian",

    // Experience
    years6: "6 years",
    years4: "4 years",
    years5: "5 years",

    // Price
    currency: "GEL",
    perHour: "hour",

    // Descriptions
    description1:
      "English tutor with 6 years of experience. I work with both school students and adults.",

    description2:
      "Mathematics tutor. I help students understand the school curriculum and prepare for exams.",

    description3:
      "Georgian language tutor in Batumi. I offer individual lessons for students of different ages.",
  },

  ru: {
    notFound: "Репетитор не найден",
    back: "← Назад к репетиторам",
    verified: "✓ Проверенный",
    reviews: "отзывов",
    lessonPrice: "Стоимость занятия",
    contact: "Связаться",
    message: "Сообщение",
    about: "О репетиторе",
    subject: "Предмет",
    experience: "Опыт",
    rating: "Рейтинг",

    // Имена
    name1: "Нино Б.",
    name2: "Ана Г.",
    name3: "Мариам Л.",

    // Города
    tbilisi: "Тбилиси",
    batumi: "Батуми",

    // Предметы
    english: "Английский язык",
    math: "Математика",
    georgian: "Грузинский язык",

    // Опыт
    years6: "6 лет",
    years4: "4 года",
    years5: "5 лет",

    // Цена
    currency: "GEL",
    perHour: "час",

    // Описания
    description1:
      "Репетитор английского языка с 6-летним опытом. Работаю как со школьниками, так и со взрослыми.",

    description2:
      "Репетитор по математике. Помогаю ученикам освоить школьную программу и подготовиться к экзаменам.",

    description3:
      "Репетитор грузинского языка в Батуми. Предлагаю индивидуальные занятия для учеников разных возрастов.",
  },
};

function TutorProfile() {
  const { id } = useParams();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const tutors = [
    {
      id: 1,
      name: t.name1,
      subject: t.english,
      city: t.tbilisi,
      experience: t.years6,
      price: `30 ${t.currency} / ${t.perHour}`,
      rating: "4.9",
      reviews: 42,
      verified: true,
      description: t.description1,
    },

    {
      id: 2,
      name: t.name2,
      subject: t.math,
      city: t.tbilisi,
      experience: t.years4,
      price: `25 ${t.currency} / ${t.perHour}`,
      rating: "4.8",
      reviews: 31,
      verified: true,
      description: t.description2,
    },

    {
      id: 3,
      name: t.name3,
      subject: t.georgian,
      city: t.batumi,
      experience: t.years5,
      price: `25 ${t.currency} / ${t.perHour}`,
      rating: "4.7",
      reviews: 19,
      verified: false,
      description: t.description3,
    },
  ];

  const tutor = tutors.find(
    (item) => item.id === Number(id)
  );

  if (!tutor) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to="/tutors">
          {t.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <Link
          to="/tutors"
          className="profile-back"
        >
          {t.back}
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              📚
            </div>

            <div className="profile-details">

              <div className="profile-name">

                <h1>{tutor.name}</h1>

                {tutor.verified && (
                  <span className="profile-verified">
                    {t.verified}
                  </span>
                )}

              </div>

              <p className="profile-location">
                📍 {tutor.city}
              </p>

              <p>
                📖 {tutor.subject}
              </p>

              <div className="profile-rating">
                ⭐ {tutor.rating}

                <span>
                  ({tutor.reviews} {t.reviews})
                </span>
              </div>

            </div>
          </div>

          <div className="profile-action">

            <span>
              {t.lessonPrice}
            </span>

            <strong>
              {tutor.price}
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
            {tutor.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>📚</span>

              <p>
                {t.subject}
              </p>

              <strong>
                {tutor.subject}
              </strong>
            </div>

            <div>
              <span>🎓</span>

              <p>
                {t.experience}
              </p>

              <strong>
                {tutor.experience}
              </strong>
            </div>

            <div>
              <span>⭐</span>

              <p>
                {t.rating}
              </p>

              <strong>
                {tutor.rating} / 5
              </strong>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default TutorProfile;