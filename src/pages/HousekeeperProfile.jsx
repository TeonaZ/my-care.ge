import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const API = "http://localhost:5000/api";

const translations = {
  ka: {
    notFound: "სახლის დამხმარე ვერ მოიძებნა",
    back: "← სახლის დამხმარეებზე დაბრუნება",

    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",
    noReviews: "ჯერ არ აქვს შეფასება",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked:
      "სახლის დამხმარესთან დასაკავშირებლად გაიარეთ რეგისტრაცია ან შედით თქვენს ანგარიშზე.",
    contactUnlocked: "თქვენ შეგიძლიათ დაუკავშირდეთ ამ სპეციალისტს.",
    phoneHidden: "ტელეფონის ნომერი სპეციალისტმა დამალა.",
    noPublicPhone: "ტელეფონის ნომერი მითითებული არ არის ან დამალულია.",
    noPublicEmail: "ელფოსტა მითითებული არ არის ან დამალულია.",
    contactChatHint: "სპეციალისტთან დაკავშირება შეგიძლიათ საიტის შიდა ჩატით.",
    openChat: "შიდა ჩატის გახსნა",
    closeContact: "დახურვა",

    login: "შესვლა",
    register: "რეგისტრაცია",

    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

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
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    years6: "6 წელი",
    years4: "4 წელი",
    years5: "5 წელი",

    service1: "სახლის დასუფთავება",
    service2: "ყოველდღიური დახმარება",
    service3: "დასუფთავება და საჭმლის მომზადება",
    defaultService: "სახლის დახმარება",

    currency: "₾",
    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    description1:
      "სახლის მოვლისა და დასუფთავების 6 წლიანი გამოცდილება მაქვს. ვმუშაობ პასუხისმგებლობით და ყურადღებით.",

    description2:
      "ვთავაზობ ოჯახებს ყოველდღიურ დახმარებას, სახლის მოწესრიგებასა და სხვადასხვა საოჯახო საქმეში დახმარებას.",

    description3:
      "ვმუშაობ ბათუმში. შემიძლია სახლის დასუფთავება, მოწესრიგება და საჭმლის მომზადებაში დახმარება.",

    interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",
    interestDescription:
      "შეგიძლიათ სახლის დამხმარეს გაუგზავნოთ დაინტერესება თქვენი ერთ-ერთი სამუშაოს განცხადებისთვის.",

    sendInterest: "დაინტერესების გაგზავნა",
    chooseJob: "აირჩიეთ სამუშაოს განცხადება",
    selectJob: "აირჩიეთ განცხადება",
    send: "გაგზავნა",
    cancel: "გაუქმება",

    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",
    alreadySent: "ამ განცხადებისთვის დაინტერესება უკვე გაგზავნილი გაქვთ.",
    sentForJob: "დაინტერესება უკვე გაგზავნილია",

    noJobs:
      "დაინტერესების გასაგზავნად ჯერ უნდა შექმნათ სახლის დამხმარის შესაბამისი სამუშაოს განცხადება.",

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

    applicationManagement: "კანდიდატის განაცხადის მართვა",
    applicationDescription:
      "ამ სახლის დამხმარემ თქვენს სამუშაო განცხადებაზე განაცხადი გამოგიგზავნათ.",
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
    notFound: "Housekeeper not found",
    back: "← Back to Housekeepers",

    verified: "✓ Verified",
    reviews: "reviews",
    noReviews: "No reviews yet",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    contactTitle: "Contact Information",
    contactLocked:
      "Please register or log in to your account to contact this housekeeper.",
    contactUnlocked: "You can contact this specialist.",
    phoneHidden: "The specialist has hidden their phone number.",
    noPublicPhone: "Phone number is unavailable or hidden.",
    noPublicEmail: "Email address is unavailable or hidden.",
    contactChatHint: "You can contact the specialist using the site chat.",
    openChat: "Open chat",
    closeContact: "Close",

    login: "Login",
    register: "Register",

    phone: "Phone",
    email: "Email",

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
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    years6: "6 years",
    years4: "4 years",
    years5: "5 years",

    service1: "House cleaning",
    service2: "Daily assistance",
    service3: "Cleaning and cooking",
    defaultService: "Household assistance",

    currency: "GEL",
    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    description1:
      "I have 6 years of experience in home care and cleaning. I work responsibly and pay attention to detail.",

    description2:
      "I provide families with daily assistance, home organization and help with various household tasks.",

    description3:
      "I work in Batumi. I can help with house cleaning, organization and cooking.",

    interestTitle: "Interested in this specialist?",
    interestDescription:
      "You can send your interest to this housekeeper for one of your job posts.",

    sendInterest: "Send Interest",
    chooseJob: "Choose a job post",
    selectJob: "Select a job",
    send: "Send",
    cancel: "Cancel",

    interestSent: "Your interest was sent successfully.",
    alreadySent: "You have already sent interest for this job.",
    sentForJob: "Interest already sent",

    noJobs:
      "You need to create a matching housekeeper job post before sending interest.",

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

    applicationManagement: "Manage Candidate Application",
    applicationDescription:
      "This housekeeper has applied to one of your job posts.",
    applicationJob: "Job",
    applicationStatus: "Application status",
    applicationSent: "Application sent",
    applicationReviewed:
      "The employer has reviewed the candidate's application.",
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
    notFound: "Помощник по дому не найден",
    back: "← Назад к помощникам по дому",

    verified: "✓ Проверенная",
    reviews: "отзывов",
    noReviews: "Пока нет отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    contactTitle: "Контактная информация",
    contactLocked:
      "Чтобы связаться с помощником по дому, зарегистрируйтесь или войдите в свой аккаунт.",
    contactUnlocked: "Вы можете связаться с этим специалистом.",
    phoneHidden: "Специалист скрыл номер телефона.",
    noPublicPhone: "Номер телефона не указан или скрыт.",
    noPublicEmail: "Эл. почта не указана или скрыта.",
    contactChatHint: "Вы можете связаться со специалистом через чат сайта.",
    openChat: "Открыть чат",
    closeContact: "Закрыть",

    login: "Войти",
    register: "Регистрация",

    phone: "Телефон",
    email: "Эл. почта",

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
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    years6: "6 лет",
    years4: "4 года",
    years5: "5 лет",

    service1: "Уборка дома",
    service2: "Ежедневная помощь",
    service3: "Уборка и приготовление еды",
    defaultService: "Помощь по дому",

    currency: "GEL",
    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    description1:
      "У меня 6 лет опыта в уходе за домом и уборке. Работаю ответственно и внимательно.",

    description2:
      "Предлагаю семьям ежедневную помощь, поддержание порядка в доме и помощь с различными домашними делами.",

    description3:
      "Работаю в Батуми. Могу помочь с уборкой дома, поддержанием порядка и приготовлением еды.",

    interestTitle: "Заинтересованы в этом специалисте?",
    interestDescription:
      "Вы можете отправить помощнику по дому предложение по одному из ваших объявлений о работе.",

    sendInterest: "Отправить предложение",
    chooseJob: "Выберите объявление",
    selectJob: "Выберите работу",
    send: "Отправить",
    cancel: "Отмена",

    interestSent: "Предложение успешно отправлено.",
    alreadySent: "Вы уже отправили предложение по этому объявлению.",
    sentForJob: "Предложение уже отправлено",

    noJobs:
      "Чтобы отправить предложение, сначала создайте подходящее объявление для помощника по дому.",

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

    applicationManagement: "Управление заявкой кандидата",
    applicationDescription:
      "Этот помощник по дому отправил заявку на одно из ваших объявлений.",
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

function HousekeeperProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const isLoggedIn = Boolean(localStorage.getItem("careGeorgiaToken"));

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

  const [backendProfile, setBackendProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const response = await fetch(
          `${API}/specialists/${encodeURIComponent(id)}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Profile not found");
        }

        const profile = data.profile || data.specialist || data;

        if (
          profile?.profession !== "housekeeper" ||
          profile?.status === "inactive"
        ) {
          throw new Error("Housekeeper not found");
        }

        if (!cancelled) {
          setBackendProfile(profile);
        }
      } catch (error) {
        console.error("HOUSEKEEPER PROFILE ERROR:", error);
        if (!cancelled) setBackendProfile(null);
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const isClient = currentUser?.accountType === "client";

  const returnFrom = location.state?.from;

  const backPath =
    returnFrom === "my-jobs"
      ? "/my-jobs"
      : returnFrom === "sent-interests"
        ? "/sent-interests"
        : "/housekeepers";

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

  const getCityName = (city) => t[city] || city || t.other;

  const housekeeper = backendProfile
    ? {
        id: String(backendProfile.id),
        ownerId: backendProfile.ownerId,

        name:
          `${backendProfile.firstName || ""} ${
            backendProfile.lastName
              ? backendProfile.lastName.charAt(0) + "."
              : ""
          }`.trim() || t.defaultService,

        city: getCityName(backendProfile.city),
        cityValue: backendProfile.city || "other",

        experience: backendProfile.experience || "",
        employmentType: backendProfile.employmentType || "part-time",
        paymentType: backendProfile.paymentType || "hourly",
        priceValue: Number(backendProfile.priceValue) || 0,

        rating: backendProfile.rating ?? null,
        reviews: Number(backendProfile.reviews) || 0,
        verified: backendProfile.verified === true,

        service: t.defaultService,
        description: backendProfile.description || "",

        phone: backendProfile.phone || "",
        email: backendProfile.email || "",

        showPhone: backendProfile.showPhone === true,
        showEmail: backendProfile.showEmail === true,

        isCustom: true,
      }
    : null;

  /* =========================
     JOBS
  ========================= */

  // ========================================
  // JOBS FROM POSTGRESQL
  // ========================================

  const [savedJobs, setSavedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();

        if (!response.ok) {
          console.error("Load jobs error:", data);
          setSavedJobs([]);
          return;
        }

        setSavedJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (error) {
        console.error("Load jobs error:", error);
        setSavedJobs([]);
      } finally {
        setJobsLoading(false);
      }
    };

    loadJobs();
  }, []);

  /* =========================
     INTERESTS
  ========================= */

  const [interests, setInterests] = useState([]);
  const [applications, setApplications] = useState([]);
  useEffect(() => {
  const token = localStorage.getItem("careGeorgiaToken");

  if (!token || !isClient) {
    setApplications([]);
    return;
  }

  let cancelled = false;

  const loadApplications = async () => {
    try {
      const response = await fetch(`${API}/applications/received`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load applications");
      }

      if (!cancelled) {
        setApplications(
          Array.isArray(data.applications) ? data.applications : []
        );
      }
    } catch (error) {
      console.error("HOUSEKEEPER APPLICATIONS ERROR:", error);

      if (!cancelled) setApplications([]);
    }
  };

  loadApplications();

  return () => {
    cancelled = true;
  };
}, [isClient]);

  useEffect(() => {
    const token = localStorage.getItem("careGeorgiaToken");

    if (!token || !isClient) {
      setInterests([]);
      return;
    }

    const loadInterests = async () => {
      try {
        const response = await fetch(`${API}/interests/sent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load interests");
        }

        setInterests(Array.isArray(data.interests) ? data.interests : []);
      } catch (error) {
        console.error("HOUSEKEEPER INTERESTS ERROR:", error);
        setInterests([]);
      }
    };

    loadInterests();
  }, [isClient]);

  const [showInterestBox, setShowInterestBox] = useState(false);

  const [selectedJobId, setSelectedJobId] = useState("");

  const [shareEmail, setShareEmail] = useState(false);

  const [sharePhone, setSharePhone] = useState(false);

  if (!housekeeper) {
    if (profileLoading) {
      return (
        <div className="profile-not-found">
          <p>
            {language === "ka"
              ? "პროფილი იტვირთება..."
              : language === "ru"
                ? "Загрузка профиля..."
                : "Loading profile..."}
          </p>
        </div>
      );
    }

    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to={backPath}>{backText}</Link>
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

  const housekeeperPrice = `${housekeeper.priceValue} ${
    t.currency
  } / ${getPaymentTypeName(housekeeper.paymentType)}`;

  /* =========================
     EMPLOYMENT
  ========================= */

  const employmentName =
    housekeeper.employmentType === "full-time" ? t.fullTime : t.partTime;

  /* =========================
     RATING
  ========================= */

  const hasRating =
    housekeeper.rating !== null &&
    housekeeper.rating !== undefined &&
    housekeeper.rating !== "";

  /* =========================
     CONTACT
  ========================= */

  const phoneCanBeShown =
    Boolean(isLoggedIn && housekeeper.phone && housekeeper.showPhone === true);
  const emailCanBeShown =
    Boolean(isLoggedIn && housekeeper.email && housekeeper.showEmail === true);

  /* =========================
     MATCHING JOBS
  ========================= */

  const myMatchingJobs = savedJobs.filter(
    (job) =>
      String(job.ownerId) === String(currentUserId) &&
      job.service === "housekeeper" &&
      job.status === "active",
  );

 const employerApplications = applications.filter(
  (application) =>
    String(application.specialistId) === String(housekeeper.ownerId) &&
    String(application.job?.ownerId) === String(currentUserId)
);

  const getApplicationJob = (application) =>
    savedJobs.find(
      (job) =>
        String(job.id) === String(application.jobId) &&
        String(job.ownerId) === String(currentUserId),
    );

  const normalizeApplicationStatus = (status) => {
    if (status === "reviewed") return "reviewed";
    if (status === "next-stage") return "next-stage";
    if (status === "not-selected") return "not-selected";
    if (status === "completed") return "completed";
    return "pending";
  };

  const getApplicationStatusInfo = (application) => {
    const status = normalizeApplicationStatus(application?.status);
    if (status === "reviewed")
      return {
        icon: "👀",
        text: t.applicationReviewed,
        help: t.reviewedHelp,
        bg: "#eff6ff",
        border: "#bfdbfe",
        color: "#1d4ed8",
      };
    if (status === "next-stage")
      return {
        icon: "➡️",
        text: t.applicationNextStage,
        help: t.nextStageHelp,
        bg: "#f0fdf4",
        border: "#bbf7d0",
        color: "#15803d",
      };
    if (status === "not-selected")
      return {
        icon: "🌿",
        text: t.applicationNotSelected,
        help: t.notSelectedHelp,
        bg: "#f0fdf4",
        border: "#bbf7d0",
        color: "#166534",
      };
    if (status === "completed")
      return {
        icon: "✅",
        text: t.applicationCompleted,
        help: t.completedHelp,
        bg: "#f8fafc",
        border: "#cbd5e1",
        color: "#475569",
      };
    return {
      icon: "📨",
      text: t.applicationSent,
      help: "",
      bg: "#fffbeb",
      border: "#fde68a",
      color: "#92400e",
    };
  };

 const updateApplicationStatus = async (applicationId, newStatus) => {
  const application = applications.find(
    (item) => String(item.id) === String(applicationId)
  );

  if (!application) return;

  if (
    String(application.job?.ownerId) !== String(currentUserId)
  ) {
    return;
  }

  if (
    String(application.specialistId) !==
    String(housekeeper.ownerId)
  ) {
    return;
  }

  const token = localStorage.getItem("careGeorgiaToken");

  if (!token) return;

  try {
    const response = await fetch(
      `${API}/applications/${applicationId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "სტატუსის შეცვლა ვერ მოხერხდა."
      );
    }

    setApplications((prev) =>
      prev.map((item) =>
        String(item.id) === String(applicationId)
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  } catch (error) {
    console.error(
      "HOUSEKEEPER APPLICATION STATUS ERROR:",
      error
    );

    alert(error.message);
  }
};
  /* =========================
     DUPLICATE INTEREST
  ========================= */

  const hasInterestForJob = (jobId) => {
    return interests.some(
      (interest) =>
        String(interest.senderId) === String(currentUserId) &&
        String(interest.specialistId) === String(housekeeper.ownerId) &&
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
     INTEREST
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

    if (!housekeeper.isCustom || !housekeeper.ownerId) {
      return;
    }

    if (String(housekeeper.ownerId) === String(currentUserId)) {
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

 const handleSendInterest = async () => {
  if (!selectedJobId || !isLoggedIn || !isClient) return;

  const token = localStorage.getItem("careGeorgiaToken");

  if (!token) {
    alert(t.loginToSend);
    return;
  }

  if (!housekeeper.ownerId) return;

  if (String(housekeeper.ownerId) === String(currentUserId)) {
    alert(t.ownProfile);
    return;
  }

  const selectedJob = availableJobs.find(
    (job) => String(job.id) === String(selectedJobId)
  );

  if (!selectedJob) return;

  if (hasInterestForJob(selectedJob.id)) {
    alert(t.alreadySent);
    return;
  }

  try {
    const response = await fetch(`${API}/interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobId: String(selectedJob.id),
        specialistId: String(housekeeper.ownerId),
        showSenderEmail: shareEmail,
        showSenderPhone: sharePhone,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        response.status === 409
          ? t.alreadySent
          : data.message || "დაინტერესების გაგზავნა ვერ მოხერხდა."
      );
    }

    if (data.interest) {
      setInterests((prev) => [data.interest, ...prev]);
    }

    window.dispatchEvent(
      new Event("careGeorgiaInterestsUpdated")
    );

    setShowInterestBox(false);
    resetInterestForm();

    alert(t.interestSent);
  } catch (error) {
    console.error("HOUSEKEEPER INTEREST ERROR:", error);
    alert(error.message);
  }
};

  const handleStartChat = async () => {
    const token = localStorage.getItem("careGeorgiaToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!housekeeper.ownerId || String(housekeeper.ownerId) === String(currentUserId)) {
      return;
    }

    try {
      const response = await fetch(`${API}/messages/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ providerId: housekeeper.ownerId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "ჩატის გახსნა ვერ მოხერხდა.");
      }
      if (!data.conversationId) {
        throw new Error("ჩატის ID ვერ მოიძებნა.");
      }
      navigate(`/messages/${data.conversationId}`);
    } catch (error) {
      console.error("HOUSEKEEPER CHAT ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to={backPath} className="profile-back">
          {backText}
        </Link>

        {/* MAIN PROFILE */}

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">🏠</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{housekeeper.name}</h1>

                {housekeeper.verified && (
                  <span className="profile-verified">{t.verified}</span>
                )}
              </div>

              <p className="profile-location">📍 {housekeeper.city}</p>

              <p>🕒 {employmentName}</p>

              {hasRating ? (
                <div className="profile-rating">
                  ⭐ {housekeeper.rating}
                  <span>
                    {" "}
                    ({housekeeper.reviews} {t.reviews})
                  </span>
                </div>
              ) : (
                <div className="profile-rating">{t.noReviews}</div>
              )}
            </div>
          </div>

          <div className="profile-action">
            <span>{t.servicePrice}</span>

            <strong>{housekeeperPrice}</strong>

            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="contact-btn"
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  {t.contact}
                </button>

                {housekeeper.ownerId && String(housekeeper.ownerId) !== String(currentUserId) && (
                  <button
                    type="button"
                    onClick={handleStartChat}
                    className="message-btn"
                    style={{ textAlign: "center", cursor: "pointer" }}
                  >
                    {t.message}
                  </button>
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

        {showContactModal && isLoggedIn && (
          <div
            role="presentation"
            onClick={() => setShowContactModal(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              backgroundColor: "rgba(15, 23, 42, 0.55)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "16px",
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="housekeeper-contact-title"
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "100%", maxWidth: "420px", background: "#fff",
                borderRadius: "16px", padding: "24px",
                boxShadow: "0 20px 55px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <h2 id="housekeeper-contact-title" style={{ margin: 0, fontSize: "22px" }}>
                  📞 {t.contactTitle}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  aria-label={t.closeContact}
                  style={{ border: "none", background: "transparent", fontSize: "24px", cursor: "pointer" }}
                >
                  ×
                </button>
              </div>
              <p style={{ fontWeight: 700, margin: "20px 0" }}>{housekeeper.name}</p>
              <p style={{ lineHeight: 1.6 }}>
                📞 <strong>{t.phone}:</strong>{" "}
                {phoneCanBeShown ? housekeeper.phone : t.noPublicPhone}
              </p>
              <p style={{ lineHeight: 1.6 }}>
                ✉️ <strong>{t.email}:</strong>{" "}
                {emailCanBeShown ? housekeeper.email : t.noPublicEmail}
              </p>
              {!phoneCanBeShown && !emailCanBeShown && (
                <p style={{ background: "#eff6ff", padding: "12px", borderRadius: "10px", color: "#1e40af" }}>
                  {t.contactChatHint}
                </p>
              )}
              {housekeeper.ownerId && String(housekeeper.ownerId) !== String(currentUserId) && (
                <button
                  type="button"
                  onClick={() => {
                    setShowContactModal(false);
                    handleStartChat();
                  }}
                  style={{
                    width: "100%", marginTop: "12px", padding: "13px",
                    border: "none", borderRadius: "10px", background: "#2563eb",
                    color: "white", fontWeight: 700, cursor: "pointer",
                  }}
                >
                  💬 {t.openChat}
                </button>
              )}
            </div>
          </div>
        )}

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
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
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
              const info = getApplicationStatusInfo(application);

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
                    <div style={{ marginBottom: "18px", lineHeight: "1.7" }}>
                      <strong style={{ display: "block", marginBottom: "7px" }}>
                        💼 {t.applicationJob}
                      </strong>
                      <div>
                        🏠{" "}
                        {language === "ka"
                          ? "სახლის დამხმარე"
                          : language === "ru"
                            ? "Помощник по дому"
                            : "Housekeeper"}
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
                        <div style={{ marginTop: "8px", color: "#64748b" }}>
                          {job.description}
                        </div>
                      )}
                    </div>
                  )}

                  <strong style={{ display: "block", marginBottom: "8px" }}>
                    {t.applicationStatus}
                  </strong>
                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: info.bg,
                      border: `1px solid ${info.border}`,
                      color: info.color,
                      borderRadius: "10px",
                      fontWeight: "700",
                      lineHeight: "1.5",
                    }}
                  >
                    {info.icon} {info.text}
                    {info.help && (
                      <div
                        style={{
                          marginTop: "7px",
                          fontWeight: "400",
                          lineHeight: "1.6",
                        }}
                      >
                        {info.help}
                      </div>
                    )}
                  </div>

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
                          color: "#fff",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        👀 {t.markReviewed}
                      </button>
                    </div>
                  )}

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
                          color: "#fff",
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
                          border: "1px solid #bbf7d0",
                          borderRadius: "9px",
                          backgroundColor: "#f0fdf4",
                          color: "#166534",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        🌿 {t.continueOthers}
                      </button>
                    </div>
                  )}

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
                          color: "#fff",
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
                          border: "1px solid #bbf7d0",
                          borderRadius: "9px",
                          backgroundColor: "#f0fdf4",
                          color: "#166534",
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

        {housekeeper.isCustom &&
          housekeeper.ownerId &&
          String(housekeeper.ownerId) !== String(currentUserId) && (
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
                        💰 {job.budget} {t.currency} /{" "}
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
              ) : jobsLoading ? (
                <p style={{ color: "#64748b" }}>...</p>
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
                        {getCityName(job.city)}
                        {" — "}
                        {job.budget} {t.currency} /{" "}
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
                  <span>{housekeeper.phone}</span>
                </p>
              ) : housekeeper.phone ? (
                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  🔒 {t.phoneHidden}
                </p>
              ) : null}

              {housekeeper.showEmail && housekeeper.email && (
                <p>
                  <strong>{t.email}:</strong>{" "}
                  <span>{housekeeper.email}</span>
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

          <p>{housekeeper.description}</p>

          <div className="profile-stats">
            <div>
              <span>🏠</span>
              <p>{t.service}</p>
              <strong>{housekeeper.service}</strong>
            </div>

            <div>
              <span>💼</span>
              <p>{t.experience}</p>
              <strong>{housekeeper.experience}</strong>
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
                {hasRating ? `${housekeeper.rating} / 5` : t.noReviews}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HousekeeperProfile;
