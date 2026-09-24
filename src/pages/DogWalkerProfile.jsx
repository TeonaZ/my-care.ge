import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "პროფილი ვერ მოიძებნა",
    back: "← ძაღლის გამსეირნებლებზე დაბრუნება",

    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",
    noReviews: "ჯერ არ აქვს შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked:
      "ძაღლის გამსეირნებელთან დასაკავშირებლად გაიარეთ რეგისტრაცია ან შედით თქვენს ანგარიშზე.",
    contactUnlocked: "თქვენ შეგიძლიათ დაუკავშირდეთ ამ სპეციალისტს.",
    phoneHidden: "ტელეფონის ნომერი სპეციალისტმა დამალა.",

    login: "შესვლა",
    register: "რეგისტრაცია",

    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

    about: "ჩემ შესახებ",
    experience: "გამოცდილება",
    city: "ქალაქი",
    employment: "განაკვეთი",
    rating: "რეიტინგი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    name1: "გიორგი დ.",
    name2: "ანა მ.",
    name3: "ლუკა კ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    years5: "5 წელი",
    years3: "3 წელი",
    years4: "4 წელი",

    currency: "₾",
    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    description1:
      "მაქვს ძაღლებთან მუშაობის გამოცდილება. ვასეირნებ როგორც პატარა, ასევე დიდი ზომის ძაღლებს.",

    description2:
      "მიყვარს ცხოველები და პასუხისმგებლობით ვზრუნავ მათ უსაფრთხო გასეირნებაზე.",

    description3:
      "გთავაზობთ ძაღლის გასეირნებას და ყოველდღიურ მოვლაში დახმარებას.",

    interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",
    interestDescription:
      "შეგიძლიათ ძაღლის გამსეირნებელს გაუგზავნოთ დაინტერესება თქვენი ერთ-ერთი სამუშაოს განცხადებისთვის.",

    sendInterest: "დაინტერესების გაგზავნა",
    chooseJob: "აირჩიეთ სამუშაოს განცხადება",
    selectJob: "აირჩიეთ განცხადება",
    send: "გაგზავნა",
    cancel: "გაუქმება",

    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",
    alreadySent: "ამ განცხადებისთვის დაინტერესება უკვე გაგზავნილი გაქვთ.",
    sentForJob: "დაინტერესება უკვე გაგზავნილია",

    noJobs:
      "დაინტერესების გასაგზავნად ჯერ უნდა შექმნათ ძაღლის გამსეირნებლის შესაბამისი სამუშაოს განცხადება.",

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
    notFound: "Profile not found",
    back: "← Back to Dog Walkers",

    verified: "✓ Verified",
    reviews: "reviews",
    noReviews: "No reviews yet",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    contactTitle: "Contact Information",
    contactLocked:
      "Please register or log in to your account to contact this dog walker.",
    contactUnlocked: "You can contact this specialist.",
    phoneHidden: "The specialist has hidden their phone number.",

    login: "Login",
    register: "Register",

    phone: "Phone",
    email: "Email",

    about: "About Me",
    experience: "Experience",
    city: "City",
    employment: "Employment type",
    rating: "Rating",

    fullTime: "Full-time",
    partTime: "Part-time",

    name1: "Giorgi D.",
    name2: "Ana M.",
    name3: "Luka K.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    years5: "5 years",
    years3: "3 years",
    years4: "4 years",

    currency: "GEL",
    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    description1:
      "I have experience working with dogs. I walk both small and large dogs.",

    description2:
      "I love animals and take responsibility for providing them with safe and enjoyable walks.",

    description3: "I offer dog walking and assistance with everyday pet care.",

    interestTitle: "Interested in this specialist?",
    interestDescription:
      "You can send your interest to this dog walker for one of your job posts.",

    sendInterest: "Send Interest",
    chooseJob: "Choose a job post",
    selectJob: "Select a job",
    send: "Send",
    cancel: "Cancel",

    interestSent: "Your interest was sent successfully.",
    alreadySent: "You have already sent interest for this job.",
    sentForJob: "Interest already sent",

    noJobs:
      "You need to create a matching dog walker job post before sending interest.",

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
    notFound: "Профиль не найден",
    back: "← Назад к выгульщикам собак",

    verified: "✓ Проверенный",
    reviews: "отзывов",
    noReviews: "Пока нет отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    contactTitle: "Контактная информация",
    contactLocked:
      "Чтобы связаться с выгульщиком собак, зарегистрируйтесь или войдите в свой аккаунт.",
    contactUnlocked: "Вы можете связаться с этим специалистом.",
    phoneHidden: "Специалист скрыл номер телефона.",

    login: "Войти",
    register: "Регистрация",

    phone: "Телефон",
    email: "Эл. почта",

    about: "Обо мне",
    experience: "Опыт",
    city: "Город",
    employment: "Тип занятости",
    rating: "Рейтинг",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    name1: "Гиорги Д.",
    name2: "Ана М.",
    name3: "Лука К.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    years5: "5 лет",
    years3: "3 года",
    years4: "4 года",

    currency: "GEL",
    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    description1:
      "У меня есть опыт работы с собаками. Выгуливаю как маленьких, так и крупных собак.",

    description2:
      "Я люблю животных и ответственно отношусь к их безопасным прогулкам.",

    description3:
      "Предлагаю выгул собак и помощь в ежедневном уходе за питомцами.",

    interestTitle: "Заинтересованы в этом специалисте?",
    interestDescription:
      "Вы можете отправить выгульщику собак предложение по одному из ваших объявлений о работе.",

    sendInterest: "Отправить предложение",
    chooseJob: "Выберите объявление",
    selectJob: "Выберите работу",
    send: "Отправить",
    cancel: "Отмена",

    interestSent: "Предложение успешно отправлено.",
    alreadySent: "Вы уже отправили предложение по этому объявлению.",
    sentForJob: "Предложение уже отправлено",

    noJobs:
      "Чтобы отправить предложение, сначала создайте подходящее объявление для выгульщика собак.",

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

function DogWalkerProfile() {
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
     DEFAULT DOG WALKERS
  ========================= */

  const defaultDogWalkers = [
    {
      id: "1",
      ownerId: null,
      name: t.name1,
      city: t.tbilisi,
      cityValue: "tbilisi",
      experience: t.years5,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 15,
      rating: 4.9,
      reviews: 35,
      verified: true,
      phone: "+995 555 12 34 56",
      email: "giorgi@example.com",
      showPhone: true,
      description: t.description1,
      isCustom: false,
    },

    {
      id: "2",
      ownerId: null,
      name: t.name2,
      city: t.tbilisi,
      cityValue: "tbilisi",
      experience: t.years3,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 12,
      rating: 4.8,
      reviews: 27,
      verified: true,
      phone: "+995 599 23 45 67",
      email: "ana@example.com",
      showPhone: true,
      description: t.description2,
      isCustom: false,
    },

    {
      id: "3",
      ownerId: null,
      name: t.name3,
      city: t.batumi,
      cityValue: "batumi",
      experience: t.years4,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 10,
      rating: 4.7,
      reviews: 19,
      verified: false,
      phone: "+995 568 34 56 78",
      email: "luka@example.com",
      showPhone: true,
      description: t.description3,
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
      profile.profession === "dog-walker" &&
      profile.status !== "inactive",
  );

  const getCityName = (city) => {
    return t[city] || city || t.other;
  };

  const getSafeName = (profile) => {
    const firstName = profile.firstName || "";

    const lastName = profile.lastName || "";

    const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

    return (
      `${firstName} ${lastInitial}`.trim() ||
      (language === "ka"
        ? "ძაღლის გამსეირნებელი"
        : language === "ru"
          ? "Выгульщик собак"
          : "Dog Walker")
    );
  };

  let customWalker = null;

  if (savedProfile) {
    customWalker = {
      id: String(savedProfile.id),

      ownerId: savedProfile.ownerId,

      name: getSafeName(savedProfile),

      city: getCityName(savedProfile.city),

      cityValue: savedProfile.city || "other",

      experience: savedProfile.experience || "",

      employmentType: savedProfile.employmentType || "part-time",

      paymentType: savedProfile.paymentType || "hourly",

      priceValue: Number(savedProfile.priceValue) || 0,

      rating:
        savedProfile.rating !== null && savedProfile.rating !== undefined
          ? savedProfile.rating
          : null,

      reviews: Number(savedProfile.reviews) || 0,

      verified: savedProfile.verified === true,

      phone: savedProfile.phone || "",

      email: savedProfile.email || "",

      showPhone: savedProfile.showPhone === true,

      description: savedProfile.description || "",

      isCustom: true,
    };
  }

  const defaultWalker = defaultDogWalkers.find(
    (item) => String(item.id) === String(id),
  );

  const walker = customWalker || defaultWalker;

  /* =========================
     JOBS
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
     INTERESTS
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

  if (!walker) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to="/dogwalker">{t.back}</Link>
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

  const walkerPrice = `${walker.priceValue} ${
    t.currency
  } / ${getPaymentTypeName(walker.paymentType)}`;

  /* =========================
     EMPLOYMENT
  ========================= */

  const employmentName =
    walker.employmentType === "full-time" ? t.fullTime : t.partTime;

  /* =========================
     RATING
  ========================= */

  const hasRating =
    walker.rating !== null &&
    walker.rating !== undefined &&
    walker.rating !== "";

  /* =========================
     CONTACT
  ========================= */

  const phoneCanBeShown =
    isLoggedIn && walker.phone && walker.showPhone === true;

  const cleanPhone = walker.phone
    ? String(walker.phone).replace(/\s/g, "")
    : "";

  /* =========================
     MATCHING JOBS

     CreateJob-ში Dog Walker-ის
     service მნიშვნელობა არის
     "dogwalker"
  ========================= */

  const myMatchingJobs = getSavedJobs().filter(
    (job) =>
      String(job.ownerId) === String(currentUserId) &&
      (job.service === "dogwalker" || job.service === "dog-walker") &&
      job.status !== "closed",
  );

  /* =========================
     DUPLICATE INTEREST
  ========================= */

  const hasInterestForJob = (jobId) => {
    return interests.some(
      (interest) =>
        String(interest.employerUserId) === String(currentUserId) &&
        String(interest.specialistProfileId) === String(walker.id) &&
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
     INTEREST ACTIONS
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

    if (!walker.isCustom || !walker.ownerId) {
      return;
    }

    if (String(walker.ownerId) === String(currentUserId)) {
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

    if (!walker.isCustom || !walker.ownerId) {
      return;
    }

    if (String(walker.ownerId) === String(currentUserId)) {
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

      specialistUserId: String(walker.ownerId),

      specialistProfileId: String(walker.id),

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
        <Link to="/dogwalker" className="profile-back">
          {t.back}
        </Link>

        {/* MAIN PROFILE */}

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">🐕</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{walker.name}</h1>

                {walker.verified && (
                  <span className="profile-verified">{t.verified}</span>
                )}
              </div>

              <p className="profile-location">📍 {walker.city}</p>

              <p>🕒 {employmentName}</p>

              {hasRating ? (
                <div className="profile-rating">
                  ⭐ {walker.rating}
                  <span>
                    {" "}
                    ({walker.reviews} {t.reviews})
                  </span>
                </div>
              ) : (
                <div className="profile-rating">{t.noReviews}</div>
              )}
            </div>
          </div>

          {/* PRICE + CONTACT */}

          <div className="profile-action">
            <span>{t.servicePrice}</span>

            <strong>{walkerPrice}</strong>

            {isLoggedIn ? (
              <>
                {phoneCanBeShown && (
                  <a
                    href={`tel:${cleanPhone}`}
                    className="contact-btn"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    {t.contact}
                  </a>
                )}

                {walker.email && (
                  <a
                    href={`mailto:${walker.email}`}
                    className="message-btn"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    {t.message}
                  </a>
                )}
              </>
            ) : (
              <div
                style={{
                  marginTop: "10px",
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

        {/* EMPLOYER INTEREST */}

        {walker.isCustom &&
          walker.ownerId &&
          String(walker.ownerId) !== String(currentUserId) && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bfdbfe",
                borderRadius: "16px",
                padding: "25px",
                marginTop: "25px",
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
                        📍 {getCityName(job.city)}
                        {" — "}
                        💰 {job.budget} {t.currency}
                        {" / "}
                        {getPaymentTypeName(job.paymentType)}
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
                    onChange={(e) => setSelectedJobId(e.target.value)}
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
                        {getCityName(job.city)}
                        {" — "}
                        {job.budget} {t.currency}
                        {" / "}
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
                        onChange={(e) => setShareEmail(e.target.checked)}
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
                        onChange={(e) => setSharePhone(e.target.checked)}
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

        {/* CONTACT INFORMATION */}

        <div
          className="profile-about"
          style={{
            marginTop: "25px",
          }}
        >
          <h2>📞 {t.contactTitle}</h2>

          {isLoggedIn ? (
            <div>
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "20px",
                }}
              >
                {t.contactUnlocked}
              </p>

              {phoneCanBeShown ? (
                <p
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  <strong>📞 {t.phone}:</strong>{" "}
                  <a href={`tel:${cleanPhone}`}>{walker.phone}</a>
                </p>
              ) : walker.phone ? (
                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  🔒 {t.phoneHidden}
                </p>
              ) : null}

              {walker.email && (
                <p>
                  <strong>✉️ {t.email}:</strong>{" "}
                  <a href={`mailto:${walker.email}`}>{walker.email}</a>
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
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to="/login"
                  className="message-btn"
                  style={{
                    width: "auto",
                    minWidth: "110px",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  {t.login}
                </Link>

                <Link
                  to="/register"
                  className="contact-btn"
                  style={{
                    width: "auto",
                    minWidth: "130px",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  {t.register}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ABOUT */}

        <div className="profile-about">
          <h2>{t.about}</h2>

          <p>{walker.description}</p>

          <div className="profile-stats">
            <div>
              <span>🐕</span>

              <p>{t.experience}</p>

              <strong>{walker.experience}</strong>
            </div>

            <div>
              <span>📍</span>

              <p>{t.city}</p>

              <strong>{walker.city}</strong>
            </div>

            <div>
              <span>🕒</span>

              <p>{t.employment}</p>

              <strong>{employmentName}</strong>
            </div>

            <div>
              <span>⭐</span>

              <p>{t.rating}</p>

              <strong>
                {hasRating ? `${walker.rating} / 5` : t.noReviews}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogWalkerProfile;
