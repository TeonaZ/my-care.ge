import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "ტუტორი ვერ მოიძებნა",
    back: "← ტუტორებზე დაბრუნება",
    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",
    noReviews: "ჯერ არ აქვს შეფასება",

    lessonPrice: "გაკვეთილის ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked:
      "ტუტორთან დასაკავშირებლად გაიარეთ რეგისტრაცია ან შედით თქვენს ანგარიშზე.",
    contactUnlocked: "თქვენ შეგიძლიათ დაუკავშირდეთ ამ სპეციალისტს.",
    phoneHidden: "ტელეფონის ნომერი სპეციალისტმა დამალა.",

    login: "შესვლა",
    register: "რეგისტრაცია",

    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

    about: "ტუტორის შესახებ",
    subject: "საგანი",
    subjectNotSpecified: "საგანი არ არის მითითებული",
    experience: "გამოცდილება",
    rating: "რეიტინგი",

    name1: "ნინო ბ.",
    name2: "ანა გ.",
    name3: "მარიამ ლ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    other: "სხვა",

    english: "ინგლისური ენა",
    math: "მათემატიკა",
    georgian: "ქართული ენა",
    history: "ისტორია",

    years6: "6 წელი",
    years4: "4 წელი",
    years5: "5 წელი",

    currency: "₾",

    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    description1:
      "ინგლისური ენის ტუტორი 6 წლიანი გამოცდილებით. ვმუშაობ როგორც მოსწავლეებთან, ასევე ზრდასრულებთან.",

    description2:
      "მათემატიკის რეპეტიტორი. ვეხმარები მოსწავლეებს სასკოლო პროგრამის ათვისებასა და გამოცდებისთვის მომზადებაში.",

    description3:
      "ქართული ენის ტუტორი ბათუმში. ვთავაზობ ინდივიდუალურ გაკვეთილებს სხვადასხვა ასაკის მოსწავლეებს.",

    interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",

    interestDescription:
      "შეგიძლიათ ტუტორს გაუგზავნოთ დაინტერესება თქვენი ერთ-ერთი სამუშაოს განცხადებისთვის.",

    sendInterest: "დაინტერესების გაგზავნა",
    chooseJob: "აირჩიეთ სამუშაოს განცხადება",
    selectJob: "აირჩიეთ განცხადება",
    send: "გაგზავნა",
    cancel: "გაუქმება",

    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",

    alreadySent: "ამ განცხადებისთვის დაინტერესება უკვე გაგზავნილი გაქვთ.",

    sentForJob: "დაინტერესება უკვე გაგზავნილია",

    noJobs:
      "დაინტერესების გასაგზავნად ჯერ უნდა შექმნათ ტუტორის შესაბამისი სამუშაოს განცხადება.",

    noMoreJobs:
      "ყველა შესაბამის განცხადებაზე დაინტერესება უკვე გაგზავნილი გაქვთ.",

    createJob: "სამუშაოს განცხადების შექმნა",

    clientOnly: "დაინტერესების გაგზავნა შეუძლია მხოლოდ დამსაქმებლის ანგარიშს.",

    ownProfile: "საკუთარ პროფილზე დაინტერესებას ვერ გაგზავნით.",

    loginToSend: "დაინტერესების გასაგზავნად შედით დამსაქმებლის ანგარიშში.",

    shareContactTitle: "საკონტაქტო ინფორმაციის გაზიარება",

    shareEmail: "ჩემი ელ. ფოსტის ჩვენება",

    sharePhone: "ჩემი ტელეფონის ნომრის ჩვენება",

    shareContactNote:
      "მონიშნეთ მხოლოდ ის ინფორმაცია, რომლის ჩვენებაც გსურთ სპეციალისტისთვის.",

    noPhone: "თქვენს ანგარიშზე ტელეფონის ნომერი მითითებული არ არის.",

    noEmail: "თქვენს ანგარიშზე ელ. ფოსტა მითითებული არ არის.",
  },

  en: {
    notFound: "Tutor not found",
    back: "← Back to Tutors",
    verified: "✓ Verified",
    reviews: "reviews",
    noReviews: "No reviews yet",

    lessonPrice: "Lesson price",
    contact: "Contact",
    message: "Message",

    contactTitle: "Contact Information",
    contactLocked:
      "Please register or log in to your account to contact this tutor.",
    contactUnlocked: "You can contact this specialist.",
    phoneHidden: "The specialist has hidden their phone number.",

    login: "Login",
    register: "Register",

    phone: "Phone",
    email: "Email",

    about: "About the Tutor",
    subject: "Subject",
    subjectNotSpecified: "Subject not specified",
    experience: "Experience",
    rating: "Rating",

    name1: "Nino B.",
    name2: "Ana G.",
    name3: "Mariam L.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    other: "Other",

    english: "English",
    math: "Mathematics",
    georgian: "Georgian",
    history: "History",

    years6: "6 years",
    years4: "4 years",
    years5: "5 years",

    currency: "GEL",

    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    description1:
      "English tutor with 6 years of experience. I work with both school students and adults.",

    description2:
      "Mathematics tutor. I help students understand the school curriculum and prepare for exams.",

    description3:
      "Georgian language tutor in Batumi. I offer individual lessons for students of different ages.",

    interestTitle: "Interested in this specialist?",

    interestDescription:
      "You can send your interest to this tutor for one of your job posts.",

    sendInterest: "Send Interest",
    chooseJob: "Choose a job post",
    selectJob: "Select a job",
    send: "Send",
    cancel: "Cancel",

    interestSent: "Your interest was sent successfully.",

    alreadySent: "You have already sent interest for this job.",

    sentForJob: "Interest already sent",

    noJobs:
      "You need to create a matching tutor job post before sending interest.",

    noMoreJobs: "You have already sent interest for all matching job posts.",

    createJob: "Create Job Post",

    clientOnly: "Only employer accounts can send interest.",

    ownProfile: "You cannot send interest to your own profile.",

    loginToSend: "Log in with an employer account to send interest.",

    shareContactTitle: "Share contact information",

    shareEmail: "Show my email address",

    sharePhone: "Show my phone number",

    shareContactNote:
      "Select only the contact information you want to share with the specialist.",

    noPhone: "There is no phone number saved on your account.",

    noEmail: "There is no email address saved on your account.",
  },

  ru: {
    notFound: "Репетитор не найден",
    back: "← Назад к репетиторам",
    verified: "✓ Проверенный",
    reviews: "отзывов",
    noReviews: "Пока нет отзывов",

    lessonPrice: "Стоимость занятия",
    contact: "Связаться",
    message: "Сообщение",

    contactTitle: "Контактная информация",
    contactLocked:
      "Чтобы связаться с репетитором, зарегистрируйтесь или войдите в свой аккаунт.",
    contactUnlocked: "Вы можете связаться с этим специалистом.",
    phoneHidden: "Специалист скрыл номер телефона.",

    login: "Войти",
    register: "Регистрация",

    phone: "Телефон",
    email: "Эл. почта",

    about: "О репетиторе",
    subject: "Предмет",
    subjectNotSpecified: "Предмет не указан",
    experience: "Опыт",
    rating: "Рейтинг",

    name1: "Нино Б.",
    name2: "Ана Г.",
    name3: "Мариам Л.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    other: "Другой",

    english: "Английский язык",
    math: "Математика",
    georgian: "Грузинский язык",
    history: "История",

    years6: "6 лет",
    years4: "4 года",
    years5: "5 лет",

    currency: "GEL",

    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    description1:
      "Репетитор английского языка с 6-летним опытом. Работаю как со школьниками, так и со взрослыми.",

    description2:
      "Репетитор по математике. Помогаю ученикам освоить школьную программу и подготовиться к экзаменам.",

    description3:
      "Репетитор грузинского языка в Батуми. Предлагаю индивидуальные занятия для учеников разных возрастов.",

    interestTitle: "Заинтересованы в этом специалисте?",

    interestDescription:
      "Вы можете отправить репетитору предложение по одному из ваших объявлений о работе.",

    sendInterest: "Отправить предложение",
    chooseJob: "Выберите объявление",
    selectJob: "Выберите работу",
    send: "Отправить",
    cancel: "Отмена",

    interestSent: "Предложение успешно отправлено.",

    alreadySent: "Вы уже отправили предложение по этому объявлению.",

    sentForJob: "Предложение уже отправлено",

    noJobs:
      "Чтобы отправить предложение, сначала создайте подходящее объявление для репетитора.",

    noMoreJobs: "Вы уже отправили предложения по всем подходящим объявлениям.",

    createJob: "Создать объявление",

    clientOnly: "Отправлять предложения может только работодатель.",

    ownProfile: "Нельзя отправить предложение собственному профилю.",

    loginToSend: "Войдите в аккаунт работодателя, чтобы отправить предложение.",

    shareContactTitle: "Поделиться контактной информацией",

    shareEmail: "Показать мой адрес электронной почты",

    sharePhone: "Показать мой номер телефона",

    shareContactNote:
      "Выберите только те контактные данные, которые хотите показать специалисту.",

    noPhone: "В вашем аккаунте не указан номер телефона.",

    noEmail: "В вашем аккаунте не указан адрес электронной почты.",
  },
};

function TutorProfile() {
  const { id } = useParams();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const isLoggedIn = localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");

  const getCurrentUser = () => {
    try {
      const saved = localStorage.getItem("careGeorgiaUser");

      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  const isClient = currentUser?.accountType === "client";

  /* =========================
     DEFAULT TUTORS
  ========================= */

  const defaultTutors = [
    {
      id: "1",
      ownerId: null,
      name: t.name1,
      subject: t.english,
      city: t.tbilisi,
      cityValue: "tbilisi",
      experience: t.years6,
      paymentType: "hourly",
      priceValue: 30,
      rating: 4.9,
      reviews: 42,
      verified: true,
      description: t.description1,
      phone: "+995 555 61 22 33",
      email: "nino.tutor@example.com",
      showPhone: true,
      isCustom: false,
    },

    {
      id: "2",
      ownerId: null,
      name: t.name2,
      subject: t.math,
      city: t.tbilisi,
      cityValue: "tbilisi",
      experience: t.years4,
      paymentType: "hourly",
      priceValue: 25,
      rating: 4.8,
      reviews: 31,
      verified: true,
      description: t.description2,
      phone: "+995 555 62 33 44",
      email: "ana.tutor@example.com",
      showPhone: true,
      isCustom: false,
    },

    {
      id: "3",
      ownerId: null,
      name: t.name3,
      subject: t.georgian,
      city: t.batumi,
      cityValue: "batumi",
      experience: t.years5,
      paymentType: "hourly",
      priceValue: 25,
      rating: 4.7,
      reviews: 19,
      verified: false,
      description: t.description3,
      phone: "+995 555 63 44 55",
      email: "mariam.tutor@example.com",
      showPhone: true,
      isCustom: false,
    },
  ];

  /* =========================
     SAVED SPECIALISTS
  ========================= */

  const getSavedSpecialists = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaSpecialists"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const savedProfile = getSavedSpecialists().find(
    (profile) =>
      String(profile.id) === String(id) &&
      profile.profession === "tutor" &&
      profile.status !== "inactive",
  );

  const getCityName = (city) => {
    return t[city] || city || t.other;
  };

  const getSubjectName = (subject) => {
    if (!subject) {
      return t.subjectNotSpecified;
    }

    return t[subject] || subject;
  };

  const getSafeName = (profile) => {
    const firstName = profile.firstName || "";

    const lastName = profile.lastName || "";

    const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

    return (
      `${firstName} ${lastInitial}`.trim() ||
      (language === "ka" ? "ტუტორი" : language === "ru" ? "Репетитор" : "Tutor")
    );
  };

  let customTutor = null;

  if (savedProfile) {
    customTutor = {
      id: String(savedProfile.id),

      ownerId: savedProfile.ownerId,

      name: getSafeName(savedProfile),

      subject: getSubjectName(savedProfile.subject),

      city: getCityName(savedProfile.city),

      cityValue: savedProfile.city || "other",

      experience: savedProfile.experience || "",

      paymentType: savedProfile.paymentType || "hourly",

      priceValue: Number(savedProfile.priceValue) || 0,

      rating:
        savedProfile.rating !== null && savedProfile.rating !== undefined
          ? savedProfile.rating
          : null,

      reviews: Number(savedProfile.reviews) || 0,

      verified: savedProfile.verified === true,

      description: savedProfile.description || "",

      phone: savedProfile.phone || "",

      email: savedProfile.email || "",

      showPhone: savedProfile.showPhone === true,

      isCustom: true,
    };
  }

  const defaultTutor = defaultTutors.find(
    (item) => String(item.id) === String(id),
  );

  const tutor = customTutor || defaultTutor;

  /* =========================
     SAVED JOBS
  ========================= */

  const getSavedJobs = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaJobs"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  /* =========================
     SAVED INTERESTS
  ========================= */

  const getSavedInterests = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaInterests"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const [interests, setInterests] = useState(getSavedInterests);

  const [showInterestBox, setShowInterestBox] = useState(false);

  const [selectedJobId, setSelectedJobId] = useState("");

  const [shareEmail, setShareEmail] = useState(false);

  const [sharePhone, setSharePhone] = useState(false);

  if (!tutor) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to="/tutors">{t.back}</Link>
      </div>
    );
  }

  /* =========================
     PAYMENT
  ========================= */

  const getPaymentTypeName = (paymentType) => {
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

  const tutorPrice = `${tutor.priceValue} ${t.currency} / ${getPaymentTypeName(
    tutor.paymentType,
  )}`;

  /* =========================
     RATING
  ========================= */

  const hasRating =
    tutor.rating !== null && tutor.rating !== undefined && tutor.rating !== "";

  /* =========================
     CONTACT
  ========================= */

  const phoneCanBeShown = isLoggedIn && tutor.phone && tutor.showPhone === true;

  const cleanPhone = tutor.phone ? String(tutor.phone).replace(/\s/g, "") : "";

  /* =========================
     MATCHING JOBS
  ========================= */

  const myMatchingJobs = getSavedJobs().filter(
    (job) =>
      String(job.ownerId) === String(currentUserId) &&
      job.service === "tutor" &&
      job.status !== "closed",
  );

  /* =========================
     DUPLICATE INTEREST
  ========================= */

  const hasInterestForJob = (jobId) => {
    return interests.some(
      (interest) =>
        String(interest.employerUserId) === String(currentUserId) &&
        String(interest.specialistProfileId) === String(tutor.id) &&
        String(interest.jobId) === String(jobId),
    );
  };

  const alreadySentInterests = myMatchingJobs.filter((job) =>
    hasInterestForJob(job.id),
  );

  const availableJobs = myMatchingJobs.filter(
    (job) => !hasInterestForJob(job.id),
  );

  /* =========================
     INTEREST FORM
  ========================= */

  const resetInterestForm = () => {
    setSelectedJobId("");
    setShareEmail(false);
    setSharePhone(false);
  };

  const handleOpenInterest = () => {
    if (!isLoggedIn || !currentUserId) {
      alert(t.loginToSend);

      return;
    }

    if (!isClient) {
      alert(t.clientOnly);

      return;
    }

    if (!tutor.isCustom || !tutor.ownerId) {
      return;
    }

    if (String(tutor.ownerId) === String(currentUserId)) {
      alert(t.ownProfile);

      return;
    }

    resetInterestForm();

    setShowInterestBox(true);
  };

  const handleCancelInterest = () => {
    setShowInterestBox(false);

    resetInterestForm();
  };

  const handleSendInterest = () => {
    if (!selectedJobId) {
      return;
    }

    if (!isLoggedIn || !currentUserId || !isClient) {
      return;
    }

    if (!tutor.isCustom || !tutor.ownerId) {
      return;
    }

    if (String(tutor.ownerId) === String(currentUserId)) {
      return;
    }

    const selectedJob = availableJobs.find(
      (job) => String(job.id) === String(selectedJobId),
    );

    if (!selectedJob) {
      return;
    }

    if (hasInterestForJob(selectedJob.id)) {
      alert(t.alreadySent);

      return;
    }

    const newInterest = {
      id: crypto.randomUUID(),

      employerUserId: String(currentUserId),

      specialistUserId: String(tutor.ownerId),

      specialistProfileId: String(tutor.id),

      jobId: String(selectedJob.id),

      showEmployerEmail: shareEmail,

      showEmployerPhone: sharePhone,

      employerEmail: shareEmail ? currentUser?.email || "" : "",

      employerPhone: sharePhone ? currentUser?.phone || "" : "",

      status: "sent",

      specialistSeen: false,

      createdAt: new Date().toISOString(),
    };

    const updatedInterests = [...interests, newInterest];

    setInterests(updatedInterests);

    localStorage.setItem(
      "careGeorgiaInterests",
      JSON.stringify(updatedInterests),
    );

    setShowInterestBox(false);

    resetInterestForm();

    alert(t.interestSent);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to="/tutors" className="profile-back">
          {t.back}
        </Link>

        {/* =========================
            MAIN PROFILE
        ========================= */}

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">📚</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{tutor.name}</h1>

                {tutor.verified && (
                  <span className="profile-verified">{t.verified}</span>
                )}
              </div>

              <p className="profile-location">📍 {tutor.city}</p>

              <p>📖 {tutor.subject}</p>

              {hasRating ? (
                <div className="profile-rating">
                  ⭐ {tutor.rating}
                  <span>
                    ({tutor.reviews} {t.reviews})
                  </span>
                </div>
              ) : (
                <div className="profile-rating">{t.noReviews}</div>
              )}
            </div>
          </div>

          <div className="profile-action">
            <span>{t.lessonPrice}</span>

            <strong>{tutorPrice}</strong>

            {isLoggedIn ? (
              <>
                {phoneCanBeShown && (
                  <a
                    href={`tel:${cleanPhone}`}
                    className="contact-btn"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    {t.contact}
                  </a>
                )}

                {tutor.email && (
                  <a
                    href={`mailto:${tutor.email}`}
                    className="message-btn"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    {t.message}
                  </a>
                )}
              </>
            ) : (
              <div
                style={{
                  marginTop: "15px",
                  padding: "14px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                🔒 {t.contactLocked}
              </div>
            )}
          </div>
        </div>

        {/* =========================
            EMPLOYER INTEREST
        ========================= */}

        {tutor.isCustom &&
          tutor.ownerId &&
          String(tutor.ownerId) !== String(currentUserId) && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bfdbfe",
                borderRadius: "16px",
                padding: "25px",
                marginBottom: "25px",
              }}
            >
              <h2
                style={{
                  marginTop: "0",
                  marginBottom: "10px",
                }}
              >
                💼 {t.interestTitle}
              </h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  marginBottom: "18px",
                }}
              >
                {t.interestDescription}
              </p>

              {/* ALREADY SENT */}

              {isLoggedIn && isClient && alreadySentInterests.length > 0 && (
                <div
                  style={{
                    marginBottom: "18px",
                  }}
                >
                  {alreadySentInterests.map((job) => (
                    <div
                      key={job.id}
                      style={{
                        padding: "14px",
                        marginBottom: "8px",
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: "10px",
                        color: "#166534",
                      }}
                    >
                      <strong>✅ {t.sentForJob}</strong>

                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "14px",
                        }}
                      >
                        📍 {getCityName(job.city)} — 💰 {job.budget}{" "}
                        {t.currency} / {getPaymentTypeName(job.paymentType)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isLoggedIn ? (
                <div>
                  <p
                    style={{
                      color: "#64748b",
                    }}
                  >
                    🔒 {t.loginToSend}
                  </p>

                  <Link
                    to="/login"
                    style={{
                      display: "inline-block",
                      marginTop: "8px",
                      padding: "10px 15px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    {t.login}
                  </Link>
                </div>
              ) : !isClient ? (
                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  {t.clientOnly}
                </p>
              ) : myMatchingJobs.length === 0 ? (
                <div>
                  <p
                    style={{
                      color: "#64748b",
                    }}
                  >
                    {t.noJobs}
                  </p>

                  <Link
                    to="/post-job"
                    style={{
                      display: "inline-block",
                      marginTop: "8px",
                      padding: "10px 15px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    + {t.createJob}
                  </Link>
                </div>
              ) : availableJobs.length === 0 ? (
                <div
                  style={{
                    padding: "14px",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "10px",
                    color: "#166534",
                  }}
                >
                  ✅ {t.noMoreJobs}
                </div>
              ) : !showInterestBox ? (
                <button
                  type="button"
                  onClick={handleOpenInterest}
                  style={{
                    padding: "12px 18px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  💼 {t.sendInterest}
                </button>
              ) : (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "18px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "700",
                    }}
                  >
                    {t.chooseJob}
                  </label>

                  <select
                    value={selectedJobId}
                    onChange={(event) => setSelectedJobId(event.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      backgroundColor: "#ffffff",
                      marginBottom: "18px",
                    }}
                  >
                    <option value="">{t.selectJob}</option>

                    {availableJobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {getCityName(job.city)} — {job.budget} {t.currency} /{" "}
                        {getPaymentTypeName(job.paymentType)}
                      </option>
                    ))}
                  </select>

                  {/* CONTACT SHARING */}

                  <div
                    style={{
                      padding: "15px",
                      marginBottom: "16px",
                      backgroundColor: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: "10px",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "7px",
                        color: "#1e40af",
                      }}
                    >
                      📇 {t.shareContactTitle}
                    </strong>

                    <p
                      style={{
                        margin: "0 0 12px",
                        color: "#64748b",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                    >
                      {t.shareContactNote}
                    </p>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        marginBottom: "10px",
                        cursor: currentUser?.email ? "pointer" : "not-allowed",
                        opacity: currentUser?.email ? 1 : 0.55,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={shareEmail}
                        disabled={!currentUser?.email}
                        onChange={(event) =>
                          setShareEmail(event.target.checked)
                        }
                      />
                      ✉️ {t.shareEmail}
                    </label>

                    {!currentUser?.email && (
                      <p
                        style={{
                          margin: "-3px 0 10px 25px",
                          color: "#64748b",
                          fontSize: "13px",
                        }}
                      >
                        {t.noEmail}
                      </p>
                    )}

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        cursor: currentUser?.phone ? "pointer" : "not-allowed",
                        opacity: currentUser?.phone ? 1 : 0.55,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={sharePhone}
                        disabled={!currentUser?.phone}
                        onChange={(event) =>
                          setSharePhone(event.target.checked)
                        }
                      />
                      📞 {t.sharePhone}
                    </label>

                    {!currentUser?.phone && (
                      <p
                        style={{
                          margin: "8px 0 0 25px",
                          color: "#64748b",
                          fontSize: "13px",
                        }}
                      >
                        {t.noPhone}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleSendInterest}
                      disabled={!selectedJobId}
                      style={{
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: !selectedJobId ? "#94a3b8" : "#2563eb",
                        color: "#ffffff",
                        cursor: !selectedJobId ? "not-allowed" : "pointer",
                        fontWeight: "700",
                      }}
                    >
                      📩 {t.send}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelInterest}
                      style={{
                        padding: "10px 16px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      {t.cancel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* =========================
            CONTACT INFORMATION
        ========================= */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              marginTop: "0",
              marginBottom: "15px",
            }}
          >
            📞 {t.contactTitle}
          </h2>

          {isLoggedIn ? (
            <div>
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "18px",
                }}
              >
                {t.contactUnlocked}
              </p>

              {phoneCanBeShown ? (
                <p>
                  <strong>{t.phone}:</strong>{" "}
                  <a href={`tel:${cleanPhone}`}>{tutor.phone}</a>
                </p>
              ) : tutor.phone ? (
                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  🔒 {t.phoneHidden}
                </p>
              ) : null}

              {tutor.email && (
                <p>
                  <strong>{t.email}:</strong>{" "}
                  <a href={`mailto:${tutor.email}`}>{tutor.email}</a>
                </p>
              )}
            </div>
          ) : (
            <div>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                }}
              >
                🔒 {t.contactLocked}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to="/login"
                  className="login-btn"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {t.login}
                </Link>

                <Link
                  to="/register"
                  className="register-btn"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {t.register}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* =========================
            ABOUT
        ========================= */}

        <div className="profile-about">
          <h2>{t.about}</h2>

          <p>{tutor.description}</p>

          <div className="profile-stats">
            <div>
              <span>📚</span>

              <p>{t.subject}</p>

              <strong>{tutor.subject}</strong>
            </div>

            <div>
              <span>🎓</span>

              <p>{t.experience}</p>

              <strong>{tutor.experience}</strong>
            </div>

            <div>
              <span>⭐</span>

              <p>{t.rating}</p>

              <strong>{hasRating ? `${tutor.rating} / 5` : t.noReviews}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
