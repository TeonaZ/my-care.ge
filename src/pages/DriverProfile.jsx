import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const translations = {
  ka: {
    notFound: "მძღოლი ვერ მოიძებნა",
    back: "← მძღოლებზე დაბრუნება",
    verified: "✓ ვერიფიცირებული",
    reviews: "შეფასება",
    noReviews: "ჯერ არ არის შეფასებული",

    servicePrice: "მომსახურების ფასი",
    contact: "დაკავშირება",
    message: "შეტყობინება",

    contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked:
      "მძღოლთან დასაკავშირებლად გაიარეთ რეგისტრაცია ან შედით თქვენს ანგარიშზე.",
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

    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",

    name1: "გიორგი მ.",
    name2: "ლევან კ.",
    name3: "დავით ნ.",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    telavi: "თელავი",
    akhaltsikhe: "ახალციხე",
    ozurgeti: "ოზურგეთი",
    poti: "ფოთი",
    mtskheta: "მცხეთა",
    khashuri: "ხაშური",
    kobuleti: "ქობულეთი",
    borjomi: "ბორჯომი",
    samtredia: "სამტრედია",
    senaki: "სენაკი",
    marneuli: "მარნეული",
    kvareli: "ყვარელი",
    lagodekhi: "ლაგოდეხი",
    akhmeta: "ახმეტა",
    dusheti: "დუშეთი",
    kaspi: "კასპი",
    chiatura: "ჭიათურა",
    zestafoni: "ზესტაფონი",
    tkibuli: "ტყიბული",
    tsqaltubo: "წყალტუბო",
    ambrolauri: "ამბროლაური",
    oni: "ონი",
    other: "სხვა",

    years8: "8 წელი",
    years5: "5 წელი",
    years6: "6 წელი",

    currency: "₾",

    description1:
      "გამოცდილი მძღოლი 8 წლიანი გამოცდილებით. პასუხისმგებლიანი, პუნქტუალური და ორიენტირებული უსაფრთხო მგზავრობაზე.",

    description2:
      "მაქვს როგორც ქალაქში, ასევე საქალაქთაშორისო მარშრუტებზე მუშაობის გამოცდილება.",

    description3:
      "მძღოლი ბათუმში. ხელმისაწვდომი ვარ როგორც ყოველდღიური, ასევე ერთჯერადი მომსახურებისთვის.",

    interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",
    interestDescription:
      "შეგიძლიათ მძღოლს გაუგზავნოთ დაინტერესება თქვენი ერთ-ერთი სამუშაოს განცხადებისთვის.",

    sendInterest: "დაინტერესების გაგზავნა",
    chooseJob: "აირჩიეთ სამუშაოს განცხადება",
    selectJob: "აირჩიეთ განცხადება",
    send: "გაგზავნა",
    cancel: "გაუქმება",

    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",
    alreadySent: "ამ განცხადებისთვის დაინტერესება უკვე გაგზავნილი გაქვთ.",
    sentForJob: "დაინტერესება უკვე გაგზავნილია",

    noJobs:
      "დაინტერესების გასაგზავნად ჯერ უნდა შექმნათ მძღოლის შესაბამისი სამუშაოს განცხადება.",

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

    applicationManagement: "კანდიდატის განაცხადის მართვა",
    applicationDescription:
      "ამ მძღოლმა თქვენს სამუშაო განცხადებაზე განაცხადი გამოგიგზავნათ.",
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
    notFound: "Driver not found",
    back: "← Back to Drivers",
    verified: "✓ Verified",
    reviews: "reviews",
    noReviews: "No reviews yet",

    servicePrice: "Service price",
    contact: "Contact",
    message: "Message",

    contactTitle: "Contact Information",
    contactLocked:
      "Please register or log in to your account to contact this driver.",
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

    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",

    name1: "Giorgi M.",
    name2: "Levan K.",
    name3: "Davit N.",

    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    telavi: "Telavi",
    akhaltsikhe: "Akhaltsikhe",
    ozurgeti: "Ozurgeti",
    poti: "Poti",
    mtskheta: "Mtskheta",
    khashuri: "Khashuri",
    kobuleti: "Kobuleti",
    borjomi: "Borjomi",
    samtredia: "Samtredia",
    senaki: "Senaki",
    marneuli: "Marneuli",
    kvareli: "Kvareli",
    lagodekhi: "Lagodekhi",
    akhmeta: "Akhmeta",
    dusheti: "Dusheti",
    kaspi: "Kaspi",
    chiatura: "Chiatura",
    zestafoni: "Zestafoni",
    tkibuli: "Tkibuli",
    tsqaltubo: "Tskaltubo",
    ambrolauri: "Ambrolauri",
    oni: "Oni",
    other: "Other",

    years8: "8 years",
    years5: "5 years",
    years6: "6 years",

    currency: "GEL",

    description1:
      "Experienced driver with 8 years of experience. Responsible, punctual and focused on safe travel.",

    description2:
      "I have experience working on both city and intercity routes.",

    description3:
      "Driver based in Batumi. I am available for both daily and one-time services.",

    interestTitle: "Interested in this specialist?",

    interestDescription:
      "You can send your interest to this driver for one of your job posts.",

    sendInterest: "Send Interest",
    chooseJob: "Choose a job post",
    selectJob: "Select a job",
    send: "Send",
    cancel: "Cancel",

    interestSent: "Your interest was sent successfully.",

    alreadySent: "You have already sent interest for this job.",

    sentForJob: "Interest already sent",

    noJobs:
      "You need to create a matching driver job post before sending interest.",

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

    applicationManagement: "Manage Candidate Application",
    applicationDescription: "This driver has applied to one of your job posts.",
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
    notFound: "Водитель не найден",
    back: "← Назад к водителям",
    verified: "✓ Проверенный",
    reviews: "отзывов",
    noReviews: "Пока нет отзывов",

    servicePrice: "Стоимость услуги",
    contact: "Связаться",
    message: "Сообщение",

    contactTitle: "Контактная информация",
    contactLocked:
      "Чтобы связаться с водителем, зарегистрируйтесь или войдите в свой аккаунт.",
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

    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",

    name1: "Гиорги М.",
    name2: "Леван К.",
    name3: "Давит Н.",

    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    telavi: "Телави",
    akhaltsikhe: "Ахалцихе",
    ozurgeti: "Озургети",
    poti: "Поти",
    mtskheta: "Мцхета",
    khashuri: "Хашури",
    kobuleti: "Кобулети",
    borjomi: "Боржоми",
    samtredia: "Самтредиа",
    senaki: "Сенаки",
    marneuli: "Марнеули",
    kvareli: "Кварели",
    lagodekhi: "Лагодехи",
    akhmeta: "Ахмета",
    dusheti: "Душети",
    kaspi: "Каспи",
    chiatura: "Чиатура",
    zestafoni: "Зестафони",
    tkibuli: "Ткибули",
    tsqaltubo: "Цхалтубо",
    ambrolauri: "Амбролаури",
    oni: "Они",
    other: "Другой",

    years8: "8 лет",
    years5: "5 лет",
    years6: "6 лет",

    currency: "GEL",

    description1:
      "Опытный водитель с 8-летним стажем. Ответственный, пунктуальный и ориентированный на безопасные поездки.",

    description2:
      "Имею опыт работы как на городских, так и на междугородних маршрутах.",

    description3:
      "Водитель в Батуми. Доступен как для ежедневных, так и для разовых услуг.",

    interestTitle: "Заинтересованы в этом специалисте?",

    interestDescription:
      "Вы можете отправить водителю предложение по одному из ваших объявлений о работе.",

    sendInterest: "Отправить предложение",
    chooseJob: "Выберите объявление",
    selectJob: "Выберите работу",
    send: "Отправить",
    cancel: "Отмена",

    interestSent: "Предложение успешно отправлено.",

    alreadySent: "Вы уже отправили предложение по этому объявлению.",

    sentForJob: "Предложение уже отправлено",

    noJobs:
      "Чтобы отправить предложение, сначала создайте подходящее объявление для водителя.",

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

    applicationManagement: "Управление заявкой кандидата",
    applicationDescription:
      "Этот водитель отправил заявку на одно из ваших объявлений.",
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

function DriverProfile() {
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

  const currentUser = getCurrentUser();

  const isClient = currentUser?.accountType === "client";

  const returnFrom = location.state?.from;

  const backPath =
    returnFrom === "my-jobs"
      ? "/my-jobs"
      : returnFrom === "sent-interests"
        ? "/sent-interests"
        : "/drivers";

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

  /* =========================
     DEFAULT DRIVERS
  ========================= */

  const defaultDrivers = [
    {
      id: "1",
      ownerId: null,
      name: t.name1,
      cityValue: "tbilisi",
      experience: t.years8,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 25,
      rating: "4.9",
      reviews: 37,
      verified: true,
      description: t.description1,
      phone: "+995 555 51 22 33",
      email: "giorgi@example.com",
      showPhone: true,
      isCustom: false,
    },

    {
      id: "2",
      ownerId: null,
      name: t.name2,
      cityValue: "tbilisi",
      experience: t.years5,
      employmentType: "part-time",
      paymentType: "hourly",
      priceValue: 20,
      rating: "4.8",
      reviews: 24,
      verified: true,
      description: t.description2,
      phone: "+995 555 52 33 44",
      email: "levan@example.com",
      showPhone: true,
      isCustom: false,
    },

    {
      id: "3",
      ownerId: null,
      name: t.name3,
      cityValue: "batumi",
      experience: t.years6,
      employmentType: "full-time",
      paymentType: "hourly",
      priceValue: 22,
      rating: "4.7",
      reviews: 18,
      verified: false,
      description: t.description3,
      phone: "+995 555 53 44 55",
      email: "davit@example.com",
      showPhone: true,
      isCustom: false,
    },
  ];

  const defaultDriver = defaultDrivers.find(
    (item) => String(item.id) === String(id),
  );

  /* =========================
     SAVED DRIVER
  ========================= */

  const getSavedSpecialists = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaSpecialists"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const savedDriver = getSavedSpecialists().find(
    (profile) =>
      String(profile.id) === String(id) &&
      profile.profession === "driver" &&
      profile.status !== "inactive",
  );

  let customDriver = null;

  if (savedDriver) {
    const firstName = savedDriver.firstName || "";

    const lastNameInitial = savedDriver.lastName
      ? `${savedDriver.lastName.charAt(0)}.`
      : "";

    customDriver = {
      id: String(savedDriver.id),

      ownerId: savedDriver.ownerId,

      name: `${firstName} ${lastNameInitial}`.trim() || "Care Georgia",

      cityValue: savedDriver.city || "other",

      experience: savedDriver.experience || "",

      employmentType: savedDriver.employmentType || "full-time",

      paymentType: savedDriver.paymentType || "hourly",

      priceValue: Number(savedDriver.priceValue) || 0,

      rating:
        savedDriver.rating !== null && savedDriver.rating !== undefined
          ? String(savedDriver.rating)
          : null,

      reviews: Number(savedDriver.reviews) || 0,

      verified: savedDriver.verified === true,

      description: savedDriver.description || "",

      phone: savedDriver.phone || "",

      email: savedDriver.email || "",

      showPhone: savedDriver.showPhone === true,

      isCustom: true,
    };
  }

  const driver = defaultDriver || customDriver;

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

  const getSavedApplications = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaApplications"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const [interests, setInterests] = useState(getSavedInterests);
  const [applications, setApplications] = useState(getSavedApplications);

  const [showInterestBox, setShowInterestBox] = useState(false);

  const [selectedJobId, setSelectedJobId] = useState("");

  const [shareEmail, setShareEmail] = useState(false);

  const [sharePhone, setSharePhone] = useState(false);

  if (!driver) {
    return (
      <div className="profile-not-found">
        <h1>{t.notFound}</h1>

        <Link to={backPath}>{backText}</Link>
      </div>
    );
  }

  /* =========================
     CITY
  ========================= */

  const cityName = t[driver.cityValue] || driver.cityValue || "";

  const getCityName = (city) => {
    return t[city] || city || t.other;
  };

  /* =========================
     EMPLOYMENT
  ========================= */

  const employmentName =
    driver.employmentType === "full-time" ? t.fullTime : t.partTime;

  /* =========================
     PAYMENT
  ========================= */

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "daily") {
      return t.daily;
    }

    if (paymentType === "biweekly") {
      return t.biweekly;
    }

    if (paymentType === "monthly") {
      return t.monthly;
    }

    return t.hourly;
  };

  const driverPrice = `${
    driver.priceValue
  } ${t.currency} / ${getPaymentTypeName(driver.paymentType)}`;

  /* =========================
     CONTACT
  ========================= */

  const canShowPhone = isLoggedIn && driver.phone && driver.showPhone === true;

  const cleanPhone = driver.phone
    ? String(driver.phone).replace(/\s/g, "")
    : "";

  /* =========================
     RATING
  ========================= */

  const hasRating =
    driver.rating !== null &&
    driver.rating !== undefined &&
    driver.rating !== "";

  /* =========================
     MATCHING JOBS
  ========================= */

  const savedJobs = getSavedJobs();

  const myMatchingJobs = savedJobs.filter(
    (job) =>
      String(job.ownerId) === String(currentUserId) &&
      job.service === "driver" &&
      job.status !== "closed",
  );

  const employerApplications = applications.filter(
    (application) =>
      String(application.specialistProfileId) === String(driver.id) &&
      String(application.jobOwnerId) === String(currentUserId),
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

  const updateApplicationStatus = (applicationId, newStatus) => {
    const application = applications.find(
      (item) => String(item.id) === String(applicationId),
    );

    if (!application) return;
    if (String(application.jobOwnerId) !== String(currentUserId)) return;
    if (String(application.specialistProfileId) !== String(driver.id)) return;

    const now = new Date().toISOString();

    const updatedApplications = applications.map((item) => {
      if (String(item.id) !== String(applicationId)) return item;

      return {
        ...item,
        status: newStatus,
        statusUpdatedAt: now,
        ...(newStatus === "reviewed" ? { reviewedAt: now } : {}),
        ...(newStatus === "next-stage" ? { nextStageAt: now } : {}),
        ...(newStatus === "not-selected" ? { notSelectedAt: now } : {}),
        ...(newStatus === "completed" ? { completedAt: now } : {}),
      };
    });

    setApplications(updatedApplications);
    localStorage.setItem(
      "careGeorgiaApplications",
      JSON.stringify(updatedApplications),
    );
  };

  const hasInterestForJob = (jobId) => {
    return interests.some(
      (interest) =>
        String(interest.employerUserId) === String(currentUserId) &&
        String(interest.specialistProfileId) === String(driver.id) &&
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

    if (!driver.isCustom || !driver.ownerId) {
      return;
    }

    if (String(driver.ownerId) === String(currentUserId)) {
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

    if (!driver.isCustom || !driver.ownerId) {
      return;
    }

    if (String(driver.ownerId) === String(currentUserId)) {
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

      specialistUserId: String(driver.ownerId),

      specialistProfileId: String(driver.id),

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

    setShowInterestBox(false);

    resetInterestForm();

    alert(t.interestSent);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to={backPath} className="profile-back">{backText}</Link>

        {/* MAIN CARD */}

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">🚗</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{driver.name}</h1>

                {driver.verified && (
                  <span className="profile-verified">{t.verified}</span>
                )}
              </div>

              <p className="profile-location">📍 {cityName}</p>

              <p>🕒 {employmentName}</p>

              <div className="profile-rating">
                {hasRating ? (
                  <>
                    ⭐ {driver.rating}
                    <span>
                      ({driver.reviews} {t.reviews})
                    </span>
                  </>
                ) : (
                  <span>{t.noReviews}</span>
                )}
              </div>
            </div>
          </div>

          <div className="profile-action">
            <span>{t.servicePrice}</span>

            <strong>{driverPrice}</strong>

            {isLoggedIn ? (
              <>
                {canShowPhone && (
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

                {driver.email && (
                  <a
                    href={`mailto:${driver.email}`}
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
                        🚗{" "}
                        {language === "ka"
                          ? "მძღოლი"
                          : language === "ru"
                            ? "Водитель"
                            : "Driver"}
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

        {driver.isCustom &&
          driver.ownerId &&
          String(driver.ownerId) !== String(currentUserId) && (
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
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={shareEmail}
                        onChange={(event) =>
                          setShareEmail(event.target.checked)
                        }
                      />
                      ✉️ {t.shareEmail}
                    </label>

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

              {canShowPhone ? (
                <p>
                  <strong>{t.phone}:</strong>{" "}
                  <a href={`tel:${cleanPhone}`}>{driver.phone}</a>
                </p>
              ) : driver.phone ? (
                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  🔒 {t.phoneHidden}
                </p>
              ) : null}

              {driver.email && (
                <p>
                  <strong>{t.email}:</strong>{" "}
                  <a href={`mailto:${driver.email}`}>{driver.email}</a>
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

          <p>{driver.description}</p>

          <div className="profile-stats">
            <div>
              <span>🚗</span>

              <p>{t.experience}</p>

              <strong>{driver.experience}</strong>
            </div>

            <div>
              <span>📍</span>

              <p>{t.city}</p>

              <strong>{cityName}</strong>
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
                {hasRating ? `${driver.rating} / 5` : t.noReviews}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
