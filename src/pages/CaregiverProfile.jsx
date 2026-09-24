import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "მომვლელი ვერ მოიძებნა",
    back: "← მომვლელებზე დაბრუნება",

    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",
    noReviews: "ჯერ არ აქვს შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked:
      "მომვლელთან დასაკავშირებლად გაიარეთ რეგისტრაცია ან შედით თქვენს ანგარიშზე.",
    contactUnlocked: "თქვენ შეგიძლიათ დაუკავშირდეთ ამ სპეციალისტს.",
    phoneHidden: "ტელეფონის ნომერი სპეციალისტმა დამალა.",

    login: "შესვლა",
    register: "რეგისტრაცია",

    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

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
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    other: "სხვა",

    years8: "8 წელი",
    years6: "6 წელი",
    years5: "5 წელი",

    currency: "₾",

    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    description1:
      "ხანდაზმულ ადამიანებზე ზრუნვის 8 წლიანი გამოცდილება მაქვს. შემიძლია ყოველდღიურ საქმიანობაში დახმარება, გასეირნება და თანმხლებად ყოფნა.",
    description2:
      "მაქვს ხანდაზმულ ადამიანებთან მუშაობის გამოცდილება. პასუხისმგებლიანი, ყურადღებიანი და პუნქტუალური ვარ.",
    description3:
      "ვთავაზობ ოჯახებს ხანდაზმული ოჯახის წევრის ყოველდღიურ დახმარებასა და მოვლას ბათუმში.",

    interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",
    interestDescription:
      "შეგიძლიათ სპეციალისტს თქვენი ერთ-ერთი სამუშაო განცხადებიდან გაუგზავნოთ შეთავაზება.",

    sendInterest: "დაინტერესების გაგზავნა",
    chooseJob: "აირჩიეთ განცხადება",
    selectJob: "აირჩიეთ სამუშაო",
    send: "გაგზავნა",
    cancel: "გაუქმება",

    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",
    sentForJob: "ამ განცხადებისთვის დაინტერესება გაგზავნილია",
    alreadySent: "ამ განცხადებისთვის დაინტერესება უკვე გაგზავნილი გაქვთ.",

    noJobs:
      "დაინტერესების გასაგზავნად ჯერ შექმენით შესაბამისი სამუშაო განცხადება.",

    createJob: "განცხადების შექმნა",

    clientOnly:
      "დაინტერესების გაგზავნა მხოლოდ დამსაქმებლის ანგარიშიდან არის შესაძლებელი.",

    ownProfile: "საკუთარ პროფილზე დაინტერესების გაგზავნა შეუძლებელია.",

    loginToSend: "დაინტერესების გასაგზავნად შედით დამსაქმებლის ანგარიშში.",

    shareContactTitle: "რომელი საკონტაქტო ინფორმაცია გამოჩნდეს სპეციალისტთან?",

    shareEmail: "ჩემი ელ. ფოსტის ჩვენება",
    sharePhone: "ჩემი ტელეფონის ნომრის ჩვენება",

    noContactShared:
      "თუ არც ერთს არ მონიშნავთ, სპეციალისტი თქვენს ელ. ფოსტას და ტელეფონის ნომერს ვერ ნახავს.",

    noPhone: "თქვენს ანგარიშზე ტელეფონის ნომერი მითითებული არ არის.",

    applicationManagement: "კანდიდატის განაცხადის მართვა",
    applicationDescription:
      "ამ სპეციალისტმა თქვენს სამუშაო განცხადებაზე განაცხადი გამოგიგზავნათ.",

    applicationJob: "სამუშაო",
    applicationStatus: "განაცხადის სტატუსი",

    applicationSent: "განაცხადი გაგზავნილია",
    applicationReviewed: "დამსაქმებელმა განიხილა კანდიდატის განაცხადი.",
    applicationNextStage: "კანდიდატი გადავიდა შერჩევის შემდეგ ეტაპზე.",
    applicationNotSelected:
      "ამ ეტაპზე გასაუბრებები გაგრძელდება სხვა კანდიდატებთან.",
    applicationCompleted: "განაცხადის განხილვა დასრულებულია.",

    markReviewed: "განხილულად მონიშვნა",
    moveNextStage: "შემდეგ ეტაპზე გადაყვანა",
    continueOthers: "სხვა კანდიდატებთან გაგრძელება",
    completeReview: "განხილვის დასრულება",

    reviewedHelp:
      "განაცხადის განხილვის შემდეგ შეგიძლიათ კანდიდატი გადაიყვანოთ შემდეგ ეტაპზე ან გააგრძელოთ გასაუბრებები სხვა კანდიდატებთან.",

    nextStageHelp:
      "კანდიდატი შერჩევის შემდეგ ეტაპზეა. საჭიროების შემთხვევაში შეგიძლიათ დაუკავშირდეთ.",

    notSelectedHelp:
      "მადლობა დაინტერესებისა და განაცხადისთვის. ამ ეტაპზე დამსაქმებელი გასაუბრებებს სხვა კანდიდატებთან აგრძელებს. წარმატებებს გისურვებთ შემდეგ შესაძლებლობებში!",

    completedHelp: "ამ კანდიდატის განაცხადის განხილვა დასრულებულია.",
  },

  en: {
    notFound: "Caregiver not found",
    back: "← Back to Caregivers",

    verified: "✓ Verified",
    reviews: "reviews",
    noReviews: "No reviews yet",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    contactTitle: "Contact Information",
    contactLocked:
      "Please register or log in to your account to contact this caregiver.",
    contactUnlocked: "You can contact this specialist.",
    phoneHidden: "The specialist has hidden their phone number.",

    login: "Login",
    register: "Register",

    phone: "Phone",
    email: "Email",

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
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    other: "Other",

    years8: "8 years",
    years6: "6 years",
    years5: "5 years",

    currency: "GEL",

    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    description1:
      "I have 8 years of experience caring for elderly people. I can assist with daily activities, walks and companionship.",
    description2:
      "I have experience working with elderly people. I am responsible, attentive and punctual.",
    description3:
      "I provide daily assistance and care for elderly family members in Batumi.",

    interestTitle: "Interested in this specialist?",
    interestDescription:
      "You can send this specialist an offer connected to one of your job posts.",

    sendInterest: "Send Interest",
    chooseJob: "Choose a job post",
    selectJob: "Select job",
    send: "Send",
    cancel: "Cancel",

    interestSent: "Interest sent successfully.",
    sentForJob: "Interest has been sent for this job",
    alreadySent: "You have already sent interest for this job.",

    noJobs: "To send an offer, first create a matching job post.",
    createJob: "Create Job",

    clientOnly: "Only an employer account can send an offer.",
    ownProfile: "You cannot send an offer to your own profile.",

    loginToSend: "Log in with an employer account to send an offer.",

    shareContactTitle: "Which contact information should the specialist see?",

    shareEmail: "Show my email address",
    sharePhone: "Show my phone number",

    noContactShared:
      "If you select neither option, the specialist will not see your email address or phone number.",

    noPhone: "There is no phone number saved on your account.",

    applicationManagement: "Manage Candidate Application",
    applicationDescription:
      "This specialist has applied to one of your job posts.",

    applicationJob: "Job",
    applicationStatus: "Application status",

    applicationSent: "Application sent",
    applicationReviewed: "The employer has reviewed the application.",
    applicationNextStage: "The candidate has moved to the next stage.",
    applicationNotSelected:
      "At this stage, interviews will continue with other candidates.",
    applicationCompleted: "Application review has been completed.",

    markReviewed: "Mark as reviewed",
    moveNextStage: "Move to next stage",
    continueOthers: "Continue with other candidates",
    completeReview: "Complete review",

    reviewedHelp:
      "After reviewing the application, you can move the candidate to the next stage or continue interviews with other candidates.",

    nextStageHelp:
      "The candidate is in the next stage of the selection process. You can contact them if needed.",

    notSelectedHelp:
      "Thank you for your interest and application. At this stage, the employer is continuing interviews with other candidates. We wish you success with future opportunities!",

    completedHelp:
      "The review of this candidate's application has been completed.",
  },

  ru: {
    notFound: "Сиделка не найдена",
    back: "← Назад к сиделкам",

    verified: "✓ Проверенная",
    reviews: "отзывов",
    noReviews: "Пока нет отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    contactTitle: "Контактная информация",
    contactLocked:
      "Чтобы связаться с сиделкой, зарегистрируйтесь или войдите в свой аккаунт.",
    contactUnlocked: "Вы можете связаться с этим специалистом.",
    phoneHidden: "Специалист скрыл номер телефона.",

    login: "Войти",
    register: "Регистрация",

    phone: "Телефон",
    email: "Эл. почта",

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
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    other: "Другой",

    years8: "8 лет",
    years6: "6 лет",
    years5: "5 лет",

    currency: "GEL",

    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    description1:
      "У меня 8 лет опыта ухода за пожилыми людьми. Могу помогать в повседневных делах, сопровождать на прогулках и составлять компанию.",
    description2:
      "У меня есть опыт работы с пожилыми людьми. Я ответственная, внимательная и пунктуальная.",
    description3:
      "Предлагаю семьям ежедневную помощь и уход за пожилым членом семьи в Батуми.",

    interestTitle: "Заинтересованы в этом специалисте?",
    interestDescription:
      "Вы можете отправить специалисту предложение по одному из ваших объявлений о работе.",

    sendInterest: "Отправить предложение",
    chooseJob: "Выберите объявление",
    selectJob: "Выберите работу",
    send: "Отправить",
    cancel: "Отмена",

    interestSent: "Предложение успешно отправлено.",
    sentForJob: "Предложение по этому объявлению отправлено",
    alreadySent: "Вы уже отправили предложение по этому объявлению.",

    noJobs:
      "Чтобы отправить предложение, сначала создайте подходящее объявление.",

    createJob: "Создать объявление",

    clientOnly: "Отправлять предложения может только работодатель.",

    ownProfile: "Нельзя отправить предложение собственному профилю.",

    loginToSend: "Войдите в аккаунт работодателя, чтобы отправить предложение.",

    shareContactTitle: "Какие контактные данные должен видеть специалист?",

    shareEmail: "Показать мой адрес электронной почты",
    sharePhone: "Показать мой номер телефона",

    noContactShared:
      "Если ничего не выбрать, специалист не увидит ваш адрес электронной почты или номер телефона.",

    noPhone: "В вашем аккаунте не указан номер телефона.",

    applicationManagement: "Управление заявкой кандидата",
    applicationDescription:
      "Этот специалист отправил заявку на одно из ваших объявлений.",

    applicationJob: "Работа",
    applicationStatus: "Статус заявки",

    applicationSent: "Заявка отправлена",
    applicationReviewed: "Работодатель рассмотрел заявку кандидата.",
    applicationNextStage: "Кандидат перешел на следующий этап отбора.",
    applicationNotSelected:
      "На этом этапе собеседования продолжатся с другими кандидатами.",
    applicationCompleted: "Рассмотрение заявки завершено.",

    markReviewed: "Отметить как рассмотренную",
    moveNextStage: "Перевести на следующий этап",
    continueOthers: "Продолжить с другими кандидатами",
    completeReview: "Завершить рассмотрение",

    reviewedHelp:
      "После рассмотрения заявки можно перевести кандидата на следующий этап или продолжить собеседования с другими кандидатами.",

    nextStageHelp:
      "Кандидат находится на следующем этапе отбора. При необходимости вы можете связаться с ним.",

    notSelectedHelp:
      "Спасибо за интерес и заявку. На этом этапе работодатель продолжает собеседования с другими кандидатами. Желаем успехов в следующих возможностях!",

    completedHelp: "Рассмотрение заявки этого кандидата завершено.",
  },
};

function CaregiverProfile() {
  const { id } = useParams();

  
  const location = useLocation();
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

  const getSavedSpecialists = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaSpecialists"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const getSavedJobs = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaJobs"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const getSavedInterests = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaInterests"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const getSavedApplications = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaApplications"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const currentUser = getCurrentUser();

  const isClient = currentUser?.accountType === "client";

  const returnFrom = location.state?.from;

  const backPath =
    returnFrom === "my-jobs"
      ? "/my-jobs"
      : returnFrom === "sent-interests"
        ? "/sent-interests"
        : "/caregivers";

  const backText =
    returnFrom === "my-jobs"
      ? language === "ka"
        ? "← ჩემს განცხადებებზე დაბრუნება"
        : language === "ru"
          ? "← Вернуться к моим объявлениям"
          : "← Back to My Jobs"
      : returnFrom === "sent-interests"
        ? language === "ka"
          ? "← გაგზავნილ დაინტერესებებში დაბრუნება"
          : language === "ru"
            ? "← Вернуться к отправленным предложениям"
            : "← Back to Sent Interests"
        : t.back;

  const defaultCaregivers = [
    {
      id: "1",
      ownerId: null,
      isCustom: false,
      name: t.name1,
      city: t.tbilisi,
      rawCity: "tbilisi",
      experience: t.years8,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 22,
      rating: 4.9,
      reviews: 51,
      verified: true,
      description: t.description1,
      phone: "+995 555 41 22 33",
      email: "maia@example.com",
      showPhone: true,
    },
    {
      id: "2",
      ownerId: null,
      isCustom: false,
      name: t.name2,
      city: t.kutaisi,
      rawCity: "kutaisi",
      experience: t.years6,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 18,
      rating: 4.8,
      reviews: 34,
      verified: true,
      description: t.description2,
      phone: "+995 555 42 33 44",
      email: "eka@example.com",
      showPhone: true,
    },
    {
      id: "3",
      ownerId: null,
      isCustom: false,
      name: t.name3,
      city: t.batumi,
      rawCity: "batumi",
      experience: t.years5,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 17,
      rating: 4.7,
      reviews: 22,
      verified: false,
      description: t.description3,
      phone: "+995 555 43 44 55",
      email: "nana@example.com",
      showPhone: true,
    },
  ];

  const savedProfile = getSavedSpecialists().find(
    (profile) =>
      String(profile.id) === String(id) &&
      profile.profession === "caregiver" &&
      profile.status !== "inactive",
  );

  const getCityName = (city) => {
    const cities = {
      tbilisi: t.tbilisi,
      batumi: t.batumi,
      kutaisi: t.kutaisi,
      rustavi: t.rustavi,
      gori: t.gori,
      zugdidi: t.zugdidi,
      other: t.other,
    };

    return cities[city] || city || t.other;
  };

  const getSafeName = (profile) => {
    const firstName = profile.firstName || "";
    const lastName = profile.lastName || "";
    const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

    return (
      `${firstName} ${lastInitial}`.trim() ||
      (language === "ka"
        ? "მომვლელი"
        : language === "ru"
          ? "Сиделка"
          : "Caregiver")
    );
  };

  let caregiver = null;

  if (savedProfile) {
    caregiver = {
      id: String(savedProfile.id),
      ownerId: savedProfile.ownerId,
      isCustom: true,
      name: getSafeName(savedProfile),
      city: getCityName(savedProfile.city),
      rawCity: savedProfile.city,
      experience: savedProfile.experience || "",
      employmentType: savedProfile.employmentType || "",
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
    };
  } else {
    caregiver = defaultCaregivers.find(
      (item) => String(item.id) === String(id),
    );
  }

  const [interests, setInterests] = useState(getSavedInterests);
  const [applications, setApplications] = useState(getSavedApplications);

  const [showInterestBox, setShowInterestBox] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [shareEmail, setShareEmail] = useState(false);
  const [sharePhone, setSharePhone] = useState(false);

  if (!caregiver) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>
        <Link to={backPath}>{backText}</Link>
      </div>
    );
  }

  const savedJobs = getSavedJobs();

  const myMatchingJobs = savedJobs.filter(
    (job) =>
      String(job.ownerId) === String(currentUserId) &&
      job.service === "caregiver" &&
      job.status !== "closed",
  );

  /*
    მხოლოდ იმ დამსაქმებლის განაცხადები,
    ვისაც ეს სამუშაო ეკუთვნის.
  */
  const employerApplications = applications.filter(
    (application) =>
      caregiver.isCustom &&
      String(application.specialistProfileId) === String(caregiver.id) &&
      String(application.jobOwnerId) === String(currentUserId) &&
      (!caregiver.ownerId ||
        !application.applicantUserId ||
        String(application.applicantUserId) === String(caregiver.ownerId)),
  );

  const getApplicationJob = (application) => {
    return savedJobs.find(
      (job) =>
        String(job.id) === String(application.jobId) &&
        String(job.ownerId) === String(currentUserId),
    );
  };

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") return t.monthly;
    if (paymentType === "biweekly") return t.biweekly;
    if (paymentType === "daily") return t.daily;

    return t.hourly;
  };

  const caregiverPrice = `${caregiver.priceValue} ${
    t.currency
  } / ${getPaymentTypeName(caregiver.paymentType)}`;

  const employmentName =
    caregiver.employmentType === "full-time" ? t.fullTime : t.partTime;

  const hasRating = caregiver.rating !== null && caregiver.rating !== undefined;

  const phoneCanBeShown = caregiver.phone && caregiver.showPhone === true;

  /*
    APPLICATION STATUS
  */

  const normalizeApplicationStatus = (status) => {
    if (status === "reviewed") return "reviewed";
    if (status === "next-stage") return "next-stage";
    if (status === "not-selected") return "not-selected";
    if (status === "completed") return "completed";

    return "pending";
  };

  const getApplicationStatusInfo = (application) => {
    const status = normalizeApplicationStatus(application?.status);

    if (status === "reviewed") {
      return {
        icon: "👀",
        text: t.applicationReviewed,
        help: t.reviewedHelp,
        backgroundColor: "#eff6ff",
        borderColor: "#bfdbfe",
        color: "#1d4ed8",
      };
    }

    if (status === "next-stage") {
      return {
        icon: "➡️",
        text: t.applicationNextStage,
        help: t.nextStageHelp,
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        color: "#15803d",
      };
    }

    if (status === "not-selected") {
      return {
        icon: "🌿",
        text: t.applicationNotSelected,
        help: t.notSelectedHelp,
        backgroundColor: "#f8fafc",
        borderColor: "#cbd5e1",
        color: "#475569",
      };
    }

    if (status === "completed") {
      return {
        icon: "✅",
        text: t.applicationCompleted,
        help: t.completedHelp,
        backgroundColor: "#f8fafc",
        borderColor: "#cbd5e1",
        color: "#475569",
      };
    }

    return {
      icon: "📨",
      text: t.applicationSent,
      help: "",
      backgroundColor: "#fffbeb",
      borderColor: "#fde68a",
      color: "#92400e",
    };
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    const application = applications.find(
      (item) => String(item.id) === String(applicationId),
    );

    if (!application) return;

    /*
      სტატუსის შეცვლა მხოლოდ სამუშაოს მფლობელს შეუძლია.
    */
    if (String(application.jobOwnerId) !== String(currentUserId)) {
      return;
    }

    /*
      განაცხადი აუცილებლად ამ გახსნილ პროფილს
      უნდა ეკუთვნოდეს.
    */
    if (String(application.specialistProfileId) !== String(caregiver.id)) {
      return;
    }

    const now = new Date().toISOString();

    const updatedApplications = applications.map((item) => {
      if (String(item.id) !== String(applicationId)) {
        return item;
      }

      const updatedApplication = {
        ...item,
        status: newStatus,
        statusUpdatedAt: now,
      };

      if (newStatus === "reviewed") {
        updatedApplication.reviewedAt = now;
      }

      if (newStatus === "next-stage") {
        updatedApplication.nextStageAt = now;
      }

      if (newStatus === "not-selected") {
        updatedApplication.notSelectedAt = now;
      }

      if (newStatus === "completed") {
        updatedApplication.completedAt = now;
      }

      return updatedApplication;
    });

    setApplications(updatedApplications);

    localStorage.setItem(
      "careGeorgiaApplications",
      JSON.stringify(updatedApplications),
    );
  };

  /*
    EMPLOYER INTEREST
  */

  const hasInterestForJob = (jobId) => {
    return interests.some(
      (interest) =>
        String(interest.employerUserId) === String(currentUserId) &&
        String(interest.specialistProfileId) === String(caregiver.id) &&
        String(interest.jobId) === String(jobId),
    );
  };

  const alreadySentInterests = myMatchingJobs.filter((job) =>
    hasInterestForJob(job.id),
  );

  const availableJobs = myMatchingJobs.filter(
    (job) => !hasInterestForJob(job.id),
  );

  const handleOpenInterest = () => {
    if (!isLoggedIn || !currentUserId) {
      alert(t.loginToSend);
      return;
    }

    if (!isClient) {
      alert(t.clientOnly);
      return;
    }

    if (!caregiver.isCustom || !caregiver.ownerId) {
      return;
    }

    if (String(caregiver.ownerId) === String(currentUserId)) {
      alert(t.ownProfile);
      return;
    }

    setSelectedJobId("");
    setShareEmail(false);
    setSharePhone(false);
    setShowInterestBox(true);
  };

  const handleSendInterest = () => {
    if (!selectedJobId) return;

    if (!isLoggedIn || !currentUserId || !isClient) {
      return;
    }

    if (!caregiver.isCustom || !caregiver.ownerId) {
      return;
    }

    if (String(caregiver.ownerId) === String(currentUserId)) {
      return;
    }

    const selectedJob = myMatchingJobs.find(
      (job) => String(job.id) === String(selectedJobId),
    );

    if (!selectedJob) return;

    if (hasInterestForJob(selectedJob.id)) {
      alert(t.alreadySent);
      return;
    }

    const newInterest = {
      id: crypto.randomUUID(),
      employerUserId: String(currentUserId),
      specialistUserId: String(caregiver.ownerId),
      specialistProfileId: String(caregiver.id),
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

    window.dispatchEvent(
      new Event("careGeorgiaInterestsUpdated"),
    );

    setSelectedJobId("");
    setShareEmail(false);
    setSharePhone(false);
    setShowInterestBox(false);

    alert(t.interestSent);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to={backPath} className="profile-back">{backText}</Link>

        {/* MAIN PROFILE */}

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">👵</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{caregiver.name}</h1>

                {caregiver.verified && (
                  <span className="profile-verified">{t.verified}</span>
                )}
              </div>

              <p className="profile-location">📍 {caregiver.city}</p>

              <p>🕒 {employmentName}</p>

              {hasRating ? (
                <div className="profile-rating">
                  ⭐ {caregiver.rating}
                  <span>
                    ({caregiver.reviews} {t.reviews})
                  </span>
                </div>
              ) : (
                <div className="profile-rating">{t.noReviews}</div>
              )}
            </div>
          </div>

          <div className="profile-action">
            <span>{t.servicePrice}</span>

            <strong>{caregiverPrice}</strong>

            {isLoggedIn ? (
              <>
                {phoneCanBeShown && (
                  <a
                    href={`tel:${String(caregiver.phone).replace(/\s/g, "")}`}
                    className="contact-btn"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    {t.contact}
                  </a>
                )}

                {caregiver.email && (
                  <a
                    href={`mailto:${caregiver.email}`}
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

        {/* APPLICATION MANAGEMENT */}

        {isLoggedIn && isClient && employerApplications.length > 0 && (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #bfdbfe",
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                marginTop: "0",
                marginBottom: "8px",
              }}
            >
              📩 {t.applicationManagement}
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              {t.applicationDescription}
            </p>

            {employerApplications.map((application) => {
              const job = getApplicationJob(application);

              const status = normalizeApplicationStatus(application.status);

              const statusInfo = getApplicationStatusInfo(application);

              return (
                <div
                  key={application.id}
                  style={{
                    padding: "18px",
                    marginTop: "14px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                >
                  {job && (
                    <div
                      style={{
                        marginBottom: "18px",
                        lineHeight: "1.7",
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          marginBottom: "7px",
                        }}
                      >
                        💼 {t.applicationJob}
                      </strong>

                      <div>
                        👵{" "}
                        {language === "ka"
                          ? "მომვლელი"
                          : language === "ru"
                            ? "Сиделка"
                            : "Caregiver"}
                      </div>

                      <div>📍 {getCityName(job.city)}</div>

                      <div>
                        🕒{" "}
                        {job.employmentType === "full-time"
                          ? t.fullTime
                          : t.partTime}
                      </div>

                      <div>
                        💰 {job.budget} {t.currency} /{" "}
                        {getPaymentTypeName(job.paymentType)}
                      </div>

                      {job.description && (
                        <div
                          style={{
                            marginTop: "8px",
                            color: "#64748b",
                          }}
                        >
                          {job.description}
                        </div>
                      )}
                    </div>
                  )}

                  <strong
                    style={{
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {t.applicationStatus}
                  </strong>

                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: statusInfo.backgroundColor,
                      border: `1px solid ${statusInfo.borderColor}`,
                      color: statusInfo.color,
                      borderRadius: "10px",
                      fontWeight: "700",
                      lineHeight: "1.5",
                    }}
                  >
                    {statusInfo.icon} {statusInfo.text}
                    {statusInfo.help && (
                      <div
                        style={{
                          marginTop: "7px",
                          fontWeight: "400",
                          lineHeight: "1.6",
                        }}
                      >
                        {statusInfo.help}
                      </div>
                    )}
                  </div>

                  {/* PENDING */}

                  {status === "pending" && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "16px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateApplicationStatus(application.id, "reviewed")
                        }
                        style={{
                          padding: "11px 15px",
                          border: "none",
                          borderRadius: "9px",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        👀 {t.markReviewed}
                      </button>
                    </div>
                  )}

                  {/* REVIEWED */}

                  {status === "reviewed" && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "16px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateApplicationStatus(application.id, "next-stage")
                        }
                        style={{
                          padding: "11px 15px",
                          border: "none",
                          borderRadius: "9px",
                          backgroundColor: "#16a34a",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        ➡️ {t.moveNextStage}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "not-selected",
                          )
                        }
                        style={{
                          padding: "11px 15px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "9px",
                          backgroundColor: "#ffffff",
                          color: "#475569",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        🌿 {t.continueOthers}
                      </button>
                    </div>
                  )}

                  {/* NEXT STAGE */}

                  {status === "next-stage" && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "16px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateApplicationStatus(application.id, "completed")
                        }
                        style={{
                          padding: "11px 15px",
                          border: "none",
                          borderRadius: "9px",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        ✅ {t.completeReview}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateApplicationStatus(
                            application.id,
                            "not-selected",
                          )
                        }
                        style={{
                          padding: "11px 15px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "9px",
                          backgroundColor: "#ffffff",
                          color: "#475569",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        🌿 {t.continueOthers}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* EMPLOYER INTEREST */}

        {caregiver.isCustom &&
          caregiver.ownerId &&
          String(caregiver.ownerId) !== String(currentUserId) && (
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

              {alreadySentInterests.length > 0 && (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <strong
                    style={{
                      color: "#166534",
                    }}
                  >
                    ✅ {t.interestSent}
                  </strong>

                  {alreadySentInterests.map((job) => (
                    <div
                      key={job.id}
                      style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid #dcfce7",
                      }}
                    >
                      <div
                        style={{
                          color: "#166534",
                          fontWeight: "700",
                          marginBottom: "5px",
                        }}
                      >
                        ✓ {t.sentForJob}
                      </div>

                      <div
                        style={{
                          color: "#475569",
                          fontSize: "14px",
                        }}
                      >
                        📍 {getCityName(job.city)}
                        {" — "}
                        {job.budget} {t.currency} /{" "}
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
              ) : availableJobs.length === 0 ? null : !showInterestBox ? (
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
                      marginBottom: "16px",
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
                      marginBottom: "16px",
                      padding: "14px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0",
                        marginBottom: "12px",
                        fontWeight: "700",
                      }}
                    >
                      {t.shareContactTitle}
                    </p>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "12px",
                        cursor: currentUser?.email ? "pointer" : "not-allowed",
                        opacity: currentUser?.email ? 1 : 0.6,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={shareEmail}
                        onChange={(event) =>
                          setShareEmail(event.target.checked)
                        }
                        disabled={!currentUser?.email}
                      />

                      <span>
                        ✉️ {t.shareEmail}
                        {currentUser?.email ? ` (${currentUser.email})` : ""}
                      </span>
                    </label>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: currentUser?.phone ? "pointer" : "not-allowed",
                        opacity: currentUser?.phone ? 1 : 0.6,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={sharePhone}
                        onChange={(event) =>
                          setSharePhone(event.target.checked)
                        }
                        disabled={!currentUser?.phone}
                      />

                      <span>
                        📞 {t.sharePhone}
                        {currentUser?.phone ? ` (${currentUser.phone})` : ""}
                      </span>
                    </label>

                    {!currentUser?.phone && (
                      <p
                        style={{
                          marginBottom: "0",
                          marginTop: "10px",
                          color: "#b45309",
                          fontSize: "14px",
                        }}
                      >
                        {t.noPhone}
                      </p>
                    )}

                    {!shareEmail && !sharePhone && (
                      <p
                        style={{
                          marginBottom: "0",
                          marginTop: "12px",
                          color: "#64748b",
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {t.noContactShared}
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
                        backgroundColor: selectedJobId ? "#2563eb" : "#94a3b8",
                        color: "#ffffff",
                        cursor: selectedJobId ? "pointer" : "not-allowed",
                        fontWeight: "700",
                      }}
                    >
                      📩 {t.send}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowInterestBox(false);
                        setSelectedJobId("");
                        setShareEmail(false);
                        setSharePhone(false);
                      }}
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
                  <a href={`tel:${String(caregiver.phone).replace(/\s/g, "")}`}>
                    {caregiver.phone}
                  </a>
                </p>
              ) : caregiver.phone ? (
                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  🔒 {t.phoneHidden}
                </p>
              ) : null}

              {caregiver.email && (
                <p>
                  <strong>{t.email}:</strong>{" "}
                  <a href={`mailto:${caregiver.email}`}>{caregiver.email}</a>
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

        {/* ABOUT */}

        <div className="profile-about">
          <h2>{t.about}</h2>

          <p>{caregiver.description}</p>

          <div className="profile-stats">
            <div>
              <span>💼</span>
              <p>{t.experience}</p>
              <strong>{caregiver.experience}</strong>
            </div>

            <div>
              <span>📍</span>
              <p>{t.city}</p>
              <strong>{caregiver.city}</strong>
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
                {hasRating ? `${caregiver.rating} / 5` : t.noReviews}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaregiverProfile;
