import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "ჩემი განცხადებები",
    description: "მართე შენი განცხადებები, პროფილები და განაცხადები.",

    jobsTitle: "სამუშაოს განცხადებები",
    specialistTitle: "სპეციალისტის პროფილები",

    noJobs: "ჯერ არ გაქვს გამოქვეყნებული სამუშაოს განცხადება.",
    noSpecialist: "ჯერ არ გაქვს შექმნილი სპეციალისტის პროფილი.",

    addJob: "სამუშაოს განცხადების დამატება",
    createSpecialist: "მომსახურების დამატება",

    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი / რეპეტიტორი",
    housekeeper: "სახლის დამხმარე",
    dogWalker: "ძაღლის გამსეირნებელი",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    month: "თვე",
    biweekly: "2 კვირა",
    day: "დღე",
    hour: "საათი",

    pay: "ანაზღაურება",
    experience: "გამოცდილება",
    status: "სტატუსი",

    active: "აქტიური",
    closed: "დახურული",

    close: "დახურვა",
    activate: "გააქტიურება",
    edit: "რედაქტირება",
    delete: "წაშლა",

    receivedApplications: "მიღებული განაცხადები",
    noApplications: "ამ განცხადებაზე ჯერ განაცხადი არ არის.",
    viewProfile: "პროფილის ნახვა",
    applicant: "განმცხადებელი",

    sentApplications: "ჩემი გაგზავნილი განაცხადები",
    noSentApplications: "ჯერ არც ერთ სამუშაოზე არ გაგიგზავნია განაცხადი.",
    jobUnavailable: "სამუშაოს განცხადება აღარ არის ხელმისაწვდომი.",

    applicationSent: "განაცხადი გაგზავნილია",
    applicationReviewed: "დამსაქმებელმა განიხილა თქვენი განაცხადი",
    applicationNextStage: "თქვენი განაცხადი გადავიდა შემდეგ ეტაპზე",
    applicationCompleted: "განაცხადის განხილვა დასრულებულია",

    markReviewed: "განხილულად მონიშვნა",
    moveNextStage: "შემდეგ ეტაპზე გადაყვანა",
    completeReview: "განხილვის დასრულება",

    employerInterests: "დამსაქმებლების დაინტერესება",
    noEmployerInterests:
      "ჯერ არც ერთ დამსაქმებელს არ გამოუგზავნია დაინტერესება.",

    employerInterested: "დამსაქმებელი დაინტერესდა თქვენი პროფილით.",
    jobOffer: "სამუშაოს შეთავაზება",

    interested: "მაინტერესებს შეთავაზება",
    notInterested: "ამ ეტაპზე არ მაინტერესებს",

    interestSent: "ახალი შეთავაზება",
    interestAccepted: "თქვენ დაადასტურეთ, რომ შეთავაზება გაინტერესებთ.",
    interestDeclined:
      "თქვენ მიუთითეთ, რომ ამ ეტაპზე შეთავაზება არ გაინტერესებთ.",

    specialistInterested: "სპეციალისტს აინტერესებს შეთავაზება",
    specialistNotInterested: "სპეციალისტს ამ ეტაპზე შეთავაზება არ აინტერესებს",
    waitingForResponse: "სპეციალისტის პასუხის მოლოდინში",

    sentInterests: "სპეციალისტებისთვის გაგზავნილი შეთავაზებები",
    noSentInterests:
      "ჯერ არც ერთი სპეციალისტისთვის არ გაგიგზავნიათ შეთავაზება.",

    employerContact: "დამსაქმებლის საკონტაქტო ინფორმაცია",
    employerEmail: "ელ. ფოსტა",
    employerPhone: "ტელეფონი",

    deleteJobConfirm: "ნამდვილად გინდა ამ სამუშაოს განცხადების წაშლა?",
    deleteSpecialistConfirm: "ნამდვილად გინდა სპეციალისტის პროფილის წაშლა?",

    loginRequired: "ჩემი განცხადებების სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",

    login: "შესვლა",
    currency: "₾",
  },

  en: {
    back: "← Care Georgia",
    title: "My Jobs",
    description: "Manage your job posts, profiles and applications.",

    jobsTitle: "Job Posts",
    specialistTitle: "Specialist Profiles",

    noJobs: "You haven't posted any jobs yet.",
    noSpecialist: "You haven't created a specialist profile yet.",

    addJob: "Post a Job",
    createSpecialist: "Add Service",

    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor / Teacher",
    housekeeper: "Housekeeper",
    dogWalker: "Dog Walker",

    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    fullTime: "Full-time",
    partTime: "Part-time",

    month: "month",
    biweekly: "2 weeks",
    day: "day",
    hour: "hour",

    pay: "Pay",
    experience: "Experience",
    status: "Status",

    active: "Active",
    closed: "Closed",

    close: "Close",
    activate: "Activate",
    edit: "Edit",
    delete: "Delete",

    receivedApplications: "Received Applications",
    noApplications: "No applications for this job yet.",
    viewProfile: "View Profile",
    applicant: "Applicant",

    sentApplications: "My Sent Applications",
    noSentApplications: "You haven't applied for any jobs yet.",
    jobUnavailable: "This job post is no longer available.",

    applicationSent: "Application sent",
    applicationReviewed: "The employer reviewed your application",
    applicationNextStage: "Your application moved to the next stage",
    applicationCompleted: "Application review has been completed",

    markReviewed: "Mark as reviewed",
    moveNextStage: "Move to next stage",
    completeReview: "Complete review",

    employerInterests: "Employer Interest",
    noEmployerInterests: "No employer has contacted you with an offer yet.",

    employerInterested: "An employer is interested in your profile.",
    jobOffer: "Job Offer",

    interested: "I'm interested",
    notInterested: "Not interested at this time",

    interestSent: "New offer",
    interestAccepted: "You confirmed that you are interested in this offer.",
    interestDeclined: "You indicated that you are not interested at this time.",

    specialistInterested: "The specialist is interested",
    specialistNotInterested: "The specialist is not interested at this time",
    waitingForResponse: "Waiting for specialist response",

    sentInterests: "Offers Sent to Specialists",
    noSentInterests: "You haven't sent an offer to a specialist yet.",

    employerContact: "Employer Contact Information",
    employerEmail: "Email",
    employerPhone: "Phone",

    deleteJobConfirm: "Are you sure you want to delete this job?",
    deleteSpecialistConfirm:
      "Are you sure you want to delete your specialist profile?",

    loginRequired: "You need to log in to view your jobs.",

    login: "Login",
    currency: "GEL",
  },

  ru: {
    back: "← Care Georgia",
    title: "Мои объявления",
    description: "Управляйте объявлениями, профилями и заявками.",

    jobsTitle: "Объявления о работе",
    specialistTitle: "Профили специалиста",

    noJobs: "У вас пока нет опубликованных объявлений.",
    noSpecialist: "У вас пока нет профиля специалиста.",

    addJob: "Добавить объявление о работе",
    createSpecialist: "Добавить услугу",

    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogWalker: "Выгульщик собак",

    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    month: "месяц",
    biweekly: "2 недели",
    day: "день",
    hour: "час",

    pay: "Оплата",
    experience: "Опыт",
    status: "Статус",

    active: "Активно",
    closed: "Закрыто",

    close: "Закрыть",
    activate: "Активировать",
    edit: "Редактировать",
    delete: "Удалить",

    receivedApplications: "Полученные заявки",
    noApplications: "На это объявление пока нет заявок.",
    viewProfile: "Посмотреть профиль",
    applicant: "Кандидат",

    sentApplications: "Мои отправленные заявки",
    noSentApplications: "Вы пока не отправляли заявки на работу.",
    jobUnavailable: "Это объявление больше недоступно.",

    applicationSent: "Заявка отправлена",
    applicationReviewed: "Работодатель рассмотрел вашу заявку",
    applicationNextStage: "Ваша заявка перешла на следующий этап",
    applicationCompleted: "Рассмотрение заявки завершено",

    markReviewed: "Отметить как рассмотренную",
    moveNextStage: "Перевести на следующий этап",
    completeReview: "Завершить рассмотрение",

    employerInterests: "Интерес работодателей",
    noEmployerInterests: "Работодатели пока не отправляли вам предложения.",

    employerInterested: "Работодатель заинтересовался вашим профилем.",
    jobOffer: "Предложение работы",

    interested: "Мне интересно предложение",
    notInterested: "Сейчас не интересно",

    interestSent: "Новое предложение",
    interestAccepted: "Вы подтвердили, что предложение вам интересно.",
    interestDeclined: "Вы указали, что сейчас предложение вам не интересно.",

    specialistInterested: "Специалист заинтересован",
    specialistNotInterested: "Специалист сейчас не заинтересован",
    waitingForResponse: "Ожидание ответа специалиста",

    sentInterests: "Предложения, отправленные специалистам",
    noSentInterests: "Вы пока не отправляли предложения специалистам.",

    employerContact: "Контактная информация работодателя",
    employerEmail: "Эл. почта",
    employerPhone: "Телефон",

    deleteJobConfirm: "Вы уверены, что хотите удалить это объявление?",
    deleteSpecialistConfirm:
      "Вы уверены, что хотите удалить профиль специалиста?",

    loginRequired: "Чтобы увидеть свои объявления, войдите в аккаунт.",

    login: "Войти",
    currency: "GEL",
  },
};

function MyJobs() {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const isLoggedIn = localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");

  const getCurrentUser = () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("careGeorgiaUser"));

      return savedUser || null;
    } catch {
      return null;
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

  const getSavedSpecialists = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaSpecialists"));

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

  const getSavedInterests = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaInterests"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const currentUser = getCurrentUser();

  const isProvider = currentUser?.accountType === "provider";

  const [jobs, setJobs] = useState(getSavedJobs);

  const [specialists, setSpecialists] = useState(getSavedSpecialists);

  const [applications, setApplications] = useState(getSavedApplications);

  const [interests, setInterests] = useState(getSavedInterests);

  const [openApplicationsJobId, setOpenApplicationsJobId] = useState(null);

  /* =========================
     MY DATA
  ========================= */

  const myJobs = jobs
    .filter((job) => String(job.ownerId) === String(currentUserId))
    .reverse();

  const mySpecialists = specialists
    .filter((profile) => String(profile.ownerId) === String(currentUserId))
    .reverse();

  const receivedInterests = interests
    .filter(
      (interest) => String(interest.specialistUserId) === String(currentUserId),
    )
    .reverse();

  const sentInterests = interests
    .filter(
      (interest) => String(interest.employerUserId) === String(currentUserId),
    )
    .reverse();

  const sentApplications = applications
    .filter(
      (application) =>
        String(application.applicantUserId) === String(currentUserId),
    )
    .reverse();

  /* =========================
     HELPERS
  ========================= */

  const getServiceName = (service) => {
    if (service === "nanny") {
      return t.nanny;
    }

    if (service === "caregiver") {
      return t.caregiver;
    }

    if (service === "driver") {
      return t.driver;
    }

    if (service === "tutor") {
      return t.tutor;
    }

    if (service === "housekeeper") {
      return t.housekeeper;
    }

    if (service === "dogwalker" || service === "dog-walker") {
      return t.dogWalker;
    }

    return service || "";
  };

  const getServiceIcon = (service) => {
    if (service === "nanny") {
      return "👶";
    }

    if (service === "caregiver") {
      return "👵";
    }

    if (service === "driver") {
      return "🚗";
    }

    if (service === "tutor") {
      return "📚";
    }

    if (service === "housekeeper") {
      return "🏠";
    }

    if (service === "dogwalker" || service === "dog-walker") {
      return "🐕";
    }

    return "💼";
  };

  const getCityName = (city) => {
    if (city === "tbilisi") return t.tbilisi;
    if (city === "batumi") return t.batumi;
    if (city === "kutaisi") return t.kutaisi;
    if (city === "rustavi") return t.rustavi;
    if (city === "gori") return t.gori;
    if (city === "zugdidi") return t.zugdidi;
    if (city === "poti") return t.poti;
    if (city === "telavi") return t.telavi;
    if (city === "other") return t.other;

    return city || "";
  };

  const getEmploymentName = (employmentType) => {
    if (employmentType === "full-time") {
      return t.fullTime;
    }

    if (employmentType === "part-time") {
      return t.partTime;
    }

    return employmentType || "";
  };

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") {
      return t.month;
    }

    if (paymentType === "biweekly") {
      return t.biweekly;
    }

    if (paymentType === "daily") {
      return t.day;
    }

    return t.hour;
  };

  const getApplicantName = (profile) => {
    if (!profile) {
      return "";
    }

    const firstName = profile.firstName || "";

    const lastName = profile.lastName || "";

    const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

    return (
      `${firstName} ${lastInitial}`.trim() || getServiceName(profile.profession)
    );
  };

  const getProfilePath = (profile) => {
    if (!profile) {
      return "/";
    }

    const profession = profile.profession;

    if (profession === "nanny") {
      return `/nannies/${profile.id}`;
    }

    if (profession === "caregiver") {
      return `/caregivers/${profile.id}`;
    }

    if (profession === "driver") {
      return `/drivers/${profile.id}`;
    }

    if (profession === "tutor") {
      return `/tutors/${profile.id}`;
    }

    if (profession === "housekeeper") {
      return `/housekeepers/${profile.id}`;
    }

    if (profession === "dogwalker" || profession === "dog-walker") {
      return `/dogwalker/${profile.id}`;
    }

    return "/";
  };

  const getJobApplications = (jobId) => {
    return applications.filter(
      (application) =>
        String(application.jobId) === String(jobId) &&
        String(application.jobOwnerId) === String(currentUserId),
    );
  };

  const getApplicationProfile = (application) => {
    return specialists.find(
      (profile) =>
        String(profile.id) === String(application.specialistProfileId) &&
        String(profile.ownerId) === String(application.applicantUserId),
    );
  };

  const getApplicationJob = (application) => {
    return jobs.find((job) => String(job.id) === String(application.jobId));
  };

  const getInterestJob = (interest) => {
    return jobs.find((job) => String(job.id) === String(interest.jobId));
  };

  const getInterestProfile = (interest) => {
    return specialists.find(
      (profile) => String(profile.id) === String(interest.specialistProfileId),
    );
  };

  /* =========================
     APPLICATION STATUS
  ========================= */

  const normalizeApplicationStatus = (status) => {
    if (status === "reviewed") {
      return "reviewed";
    }

    if (status === "next-stage") {
      return "next-stage";
    }

    if (status === "completed") {
      return "completed";
    }

    return "pending";
  };

  const getApplicationStatusInfo = (application) => {
    const status = normalizeApplicationStatus(application?.status);

    if (status === "reviewed") {
      return {
        icon: "👀",
        text: t.applicationReviewed,
        backgroundColor: "#eff6ff",
        borderColor: "#bfdbfe",
        color: "#1d4ed8",
      };
    }

    if (status === "next-stage") {
      return {
        icon: "➡️",
        text: t.applicationNextStage,
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        color: "#15803d",
      };
    }

    if (status === "completed") {
      return {
        icon: "✅",
        text: t.applicationCompleted,
        backgroundColor: "#f8fafc",
        borderColor: "#cbd5e1",
        color: "#475569",
      };
    }

    return {
      icon: "📨",
      text: t.applicationSent,
      backgroundColor: "#fffbeb",
      borderColor: "#fde68a",
      color: "#92400e",
    };
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    const allowedStatuses = ["pending", "reviewed", "next-stage", "completed"];

    if (!allowedStatuses.includes(newStatus)) {
      return;
    }

    const application = applications.find(
      (item) => String(item.id) === String(applicationId),
    );

    if (!application) {
      return;
    }

    if (String(application.jobOwnerId) !== String(currentUserId)) {
      return;
    }

    const updatedApplications = applications.map((item) => {
      if (String(item.id) !== String(applicationId)) {
        return item;
      }

      return {
        ...item,
        status: newStatus,
        statusUpdatedAt: new Date().toISOString(),
      };
    });

    setApplications(updatedApplications);

    localStorage.setItem(
      "careGeorgiaApplications",
      JSON.stringify(updatedApplications),
    );
  };

  /* =========================
     INTEREST STATUS
  ========================= */

  const updateInterestStatus = (interestId, newStatus) => {
    const updatedInterests = interests.map((interest) => {
      if (String(interest.id) !== String(interestId)) {
        return interest;
      }

      if (String(interest.specialistUserId) !== String(currentUserId)) {
        return interest;
      }

      return {
        ...interest,
        status: newStatus,
        specialistSeen: true,
        respondedAt: new Date().toISOString(),
      };
    });

    setInterests(updatedInterests);

    localStorage.setItem(
      "careGeorgiaInterests",
      JSON.stringify(updatedInterests),
    );
  };

  const getReceivedInterestStatus = (interest) => {
    if (interest.status === "interested") {
      return `💚 ${t.interestAccepted}`;
    }

    if (interest.status === "not-interested") {
      return `⚪ ${t.interestDeclined}`;
    }

    return `🔔 ${t.interestSent}`;
  };

  const getEmployerInterestStatus = (interest) => {
    if (interest.status === "interested") {
      return `💚 ${t.specialistInterested}`;
    }

    if (interest.status === "not-interested") {
      return `⚪ ${t.specialistNotInterested}`;
    }

    return `⏳ ${t.waitingForResponse}`;
  };

  /* =========================
     JOB ACTIONS
  ========================= */

  const toggleJobStatus = (jobId) => {
    const updatedJobs = jobs.map((job) => {
      if (String(job.id) !== String(jobId)) {
        return job;
      }

      if (String(job.ownerId) !== String(currentUserId)) {
        return job;
      }

      return {
        ...job,
        status: job.status === "closed" ? "active" : "closed",
      };
    });

    setJobs(updatedJobs);

    localStorage.setItem("careGeorgiaJobs", JSON.stringify(updatedJobs));
  };

  const deleteJob = (jobId) => {
    const job = jobs.find((item) => String(item.id) === String(jobId));

    if (!job || String(job.ownerId) !== String(currentUserId)) {
      return;
    }

    const confirmed = window.confirm(t.deleteJobConfirm);

    if (!confirmed) {
      return;
    }

    const updatedJobs = jobs.filter(
      (item) => String(item.id) !== String(jobId),
    );

    setJobs(updatedJobs);

    localStorage.setItem("careGeorgiaJobs", JSON.stringify(updatedJobs));
  };

  /* =========================
     SPECIALIST ACTIONS
  ========================= */

  const toggleSpecialistStatus = (profileId) => {
    const updatedProfiles = specialists.map((profile) => {
      if (String(profile.id) !== String(profileId)) {
        return profile;
      }

      if (String(profile.ownerId) !== String(currentUserId)) {
        return profile;
      }

      return {
        ...profile,
        status: profile.status === "inactive" ? "active" : "inactive",
      };
    });

    setSpecialists(updatedProfiles);

    localStorage.setItem(
      "careGeorgiaSpecialists",
      JSON.stringify(updatedProfiles),
    );
  };

  const deleteSpecialist = (profileId) => {
    const profile = specialists.find(
      (item) => String(item.id) === String(profileId),
    );

    if (!profile || String(profile.ownerId) !== String(currentUserId)) {
      return;
    }

    const confirmed = window.confirm(t.deleteSpecialistConfirm);

    if (!confirmed) {
      return;
    }

    const updatedProfiles = specialists.filter(
      (item) => String(item.id) !== String(profileId),
    );

    setSpecialists(updatedProfiles);

    localStorage.setItem(
      "careGeorgiaSpecialists",
      JSON.stringify(updatedProfiles),
    );
  };

  /* =========================
     LOGIN REQUIRED
  ========================= */

  if (!isLoggedIn || !currentUserId) {
    return (
      <div className="drivers-page">
        <div className="drivers-container">
          <Link to="/" className="back-link">
            {t.back}
          </Link>

          <div
            className="driver-card"
            style={{
              maxWidth: "600px",
              margin: "40px auto",
              textAlign: "center",
              padding: "30px",
            }}
          >
            <p>{t.loginRequired}</p>

            <Link
              to="/login"
              style={{
                display: "inline-block",
                marginTop: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              {t.login} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="drivers-page">
      <div className="drivers-container">
        <Link to="/" className="back-link">
          {t.back}
        </Link>

        {/* =========================
            PAGE HEADING
        ========================= */}

        <div className="drivers-heading">
          <div>
            <h1>{t.title}</h1>
            <p>{t.description}</p>
          </div>

          {isProvider ? (
            <Link
              to="/create-specialist-profile"
              style={{
                display: "inline-block",
                padding: "12px 18px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              + {t.createSpecialist}
            </Link>
          ) : (
            <Link
              to="/post-job"
              style={{
                display: "inline-block",
                padding: "12px 18px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              + {t.addJob}
            </Link>
          )}
        </div>

        {/* =========================
            PROVIDER:
            SENT APPLICATIONS
        ========================= */}

        {isProvider && (
          <div
            style={{
              marginTop: "35px",
            }}
          >
            <h2
              style={{
                marginBottom: "18px",
                color: "#172033",
              }}
            >
              📨 {t.sentApplications} ({sentApplications.length})
            </h2>

            {sentApplications.length === 0 ? (
              <div
                className="driver-card"
                style={{
                  padding: "25px",
                }}
              >
                <p>{t.noSentApplications}</p>
              </div>
            ) : (
              <div className="drivers-grid">
                {sentApplications.map((application) => {
                  const job = getApplicationJob(application);

                  const profile = getApplicationProfile(application);

                  const statusInfo = getApplicationStatusInfo(application);

                  return (
                    <div className="driver-card" key={application.id}>
                      {job ? (
                        <>
                          <h3>
                            {getServiceIcon(job.service)}{" "}
                            {getServiceName(job.service)}
                          </h3>

                          <p>📍 {getCityName(job.city)}</p>

                          <p>💼 {getEmploymentName(job.employmentType)}</p>

                          <p>
                            💰 {t.pay}: {job.budget} {t.currency} /{" "}
                            {getPaymentTypeName(job.paymentType)}
                          </p>

                          {job.description && (
                            <p
                              style={{
                                marginTop: "12px",
                              }}
                            >
                              {job.description}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>{t.jobUnavailable}</p>
                      )}

                      {profile && (
                        <p
                          style={{
                            marginTop: "12px",
                            color: "#64748b",
                          }}
                        >
                          👤 {getServiceName(profile.profession)}
                        </p>
                      )}

                      <div
                        style={{
                          marginTop: "16px",
                          padding: "13px",
                          border: `1px solid ${statusInfo.borderColor}`,
                          backgroundColor: statusInfo.backgroundColor,
                          color: statusInfo.color,
                          borderRadius: "10px",
                          fontWeight: "600",
                          lineHeight: "1.5",
                        }}
                      >
                        {statusInfo.icon} {statusInfo.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================
            PROVIDER:
            RECEIVED INTERESTS
        ========================= */}

        {isProvider && (
          <div
            style={{
              marginTop: "35px",
            }}
          >
            <h2
              style={{
                marginBottom: "18px",
                color: "#172033",
              }}
            >
              🔔 {t.employerInterests} ({receivedInterests.length})
            </h2>

            {receivedInterests.length === 0 ? (
              <div
                className="driver-card"
                style={{
                  padding: "25px",
                }}
              >
                <p>{t.noEmployerInterests}</p>
              </div>
            ) : (
              <div className="drivers-grid">
                {receivedInterests.map((interest) => {
                  const job = getInterestJob(interest);

                  const profile = getInterestProfile(interest);

                  const hasSharedEmail =
                    interest.showEmployerEmail === true &&
                    Boolean(interest.employerEmail);

                  const hasSharedPhone =
                    interest.showEmployerPhone === true &&
                    Boolean(interest.employerPhone);

                  return (
                    <div
                      key={interest.id}
                      className="driver-card"
                      style={{
                        border:
                          interest.status === "sent"
                            ? "2px solid #bfdbfe"
                            : "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <h3>🔔 {t.employerInterested}</h3>

                        {profile && (
                          <p>
                            {getServiceIcon(profile.profession)}{" "}
                            <strong>
                              {getServiceName(profile.profession)}
                            </strong>
                          </p>
                        )}

                        {job && (
                          <>
                            <p>
                              💼 <strong>{t.jobOffer}:</strong>{" "}
                              {getServiceName(job.service)}
                            </p>

                            <p>📍 {getCityName(job.city)}</p>

                            <p>🕒 {getEmploymentName(job.employmentType)}</p>

                            <p>
                              💰 {t.pay}: {job.budget} {t.currency} /{" "}
                              {getPaymentTypeName(job.paymentType)}
                            </p>

                            {job.description && (
                              <p
                                style={{
                                  marginTop: "12px",
                                }}
                              >
                                {job.description}
                              </p>
                            )}
                          </>
                        )}

                        <div
                          style={{
                            marginTop: "15px",
                            padding: "12px",
                            backgroundColor: "#f8fafc",
                            borderRadius: "10px",
                            color: "#475569",
                            lineHeight: "1.5",
                          }}
                        >
                          {getReceivedInterestStatus(interest)}
                        </div>

                        {(hasSharedEmail || hasSharedPhone) && (
                          <div
                            style={{
                              marginTop: "15px",
                              padding: "14px",
                              backgroundColor: "#eff6ff",
                              border: "1px solid #bfdbfe",
                              borderRadius: "10px",
                            }}
                          >
                            <strong
                              style={{
                                display: "block",
                                marginBottom: "10px",
                                color: "#1e40af",
                              }}
                            >
                              📇 {t.employerContact}
                            </strong>

                            {hasSharedEmail && (
                              <p
                                style={{
                                  margin: "6px 0",
                                }}
                              >
                                ✉️ <strong>{t.employerEmail}:</strong>{" "}
                                <a href={`mailto:${interest.employerEmail}`}>
                                  {interest.employerEmail}
                                </a>
                              </p>
                            )}

                            {hasSharedPhone && (
                              <p
                                style={{
                                  margin: "6px 0",
                                }}
                              >
                                📞 <strong>{t.employerPhone}:</strong>{" "}
                                <a
                                  href={`tel:${String(
                                    interest.employerPhone,
                                  ).replace(/\s/g, "")}`}
                                >
                                  {interest.employerPhone}
                                </a>
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {interest.status === "sent" && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginTop: "18px",
                            paddingTop: "16px",
                            borderTop: "1px solid #e5e7eb",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              updateInterestStatus(interest.id, "interested")
                            }
                            style={{
                              padding: "10px 14px",
                              border: "none",
                              borderRadius: "8px",
                              backgroundColor: "#16a34a",
                              color: "#ffffff",
                              cursor: "pointer",
                              fontWeight: "700",
                            }}
                          >
                            💚 {t.interested}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateInterestStatus(
                                interest.id,
                                "not-interested",
                              )
                            }
                            style={{
                              padding: "10px 14px",
                              border: "1px solid #cbd5e1",
                              borderRadius: "8px",
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            {t.notInterested}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================
            PROVIDER PROFILES
        ========================= */}

        {isProvider && (
          <div
            style={{
              marginTop: "35px",
            }}
          >
            <h2
              style={{
                marginBottom: "18px",
                color: "#172033",
              }}
            >
              🧑‍💼 {t.specialistTitle}
            </h2>

            {mySpecialists.length === 0 ? (
              <div
                className="driver-card"
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                <p>{t.noSpecialist}</p>

                <Link
                  to="/create-specialist-profile"
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  + {t.createSpecialist}
                </Link>
              </div>
            ) : (
              <div className="drivers-grid">
                {mySpecialists.map((profile) => {
                  const isInactive = profile.status === "inactive";

                  return (
                    <div
                      className="driver-card"
                      key={profile.id}
                      style={{
                        opacity: isInactive ? "0.7" : "1",
                      }}
                    >
                      <div>
                        <h3>
                          {getServiceIcon(profile.profession)}{" "}
                          {getServiceName(profile.profession)}
                        </h3>

                        <p>📍 {getCityName(profile.city)}</p>

                        <p>💼 {getEmploymentName(profile.employmentType)}</p>

                        <p>
                          🧰 {t.experience}: {profile.experience}
                        </p>

                        <p>
                          💰 {t.pay}: {profile.priceValue} {t.currency} /{" "}
                          {getPaymentTypeName(profile.paymentType)}
                        </p>

                        <p>
                          <strong>{t.status}:</strong>{" "}
                          {isInactive ? `🔴 ${t.closed}` : `🟢 ${t.active}`}
                        </p>

                        {profile.description && (
                          <p
                            style={{
                              marginTop: "12px",
                            }}
                          >
                            {profile.description}
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "18px",
                          paddingTop: "16px",
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/edit-specialist/${profile.id}`)
                          }
                          style={{
                            padding: "9px 13px",
                            border: "1px solid #2563eb",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          ✏️ {t.edit}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSpecialistStatus(profile.id)}
                          style={{
                            padding: "9px 13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          {isInactive ? `🟢 ${t.activate}` : `🔒 ${t.close}`}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteSpecialist(profile.id)}
                          style={{
                            padding: "9px 13px",
                            border: "1px solid #dc2626",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            color: "#dc2626",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          🗑️ {t.delete}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================
            CLIENT SENT INTERESTS
        ========================= */}

        {!isProvider && (
          <div
            style={{
              marginTop: "35px",
            }}
          >
            <h2
              style={{
                marginBottom: "18px",
                color: "#172033",
              }}
            >
              📤 {t.sentInterests}
            </h2>

            {sentInterests.length === 0 ? (
              <div
                className="driver-card"
                style={{
                  padding: "25px",
                }}
              >
                <p>{t.noSentInterests}</p>
              </div>
            ) : (
              <div className="drivers-grid">
                {sentInterests.map((interest) => {
                  const job = getInterestJob(interest);

                  const profile = getInterestProfile(interest);

                  return (
                    <div className="driver-card" key={interest.id}>
                      {profile && (
                        <>
                          <h3>
                            {getServiceIcon(profile.profession)}{" "}
                            {getApplicantName(profile)}
                          </h3>

                          <p>{getServiceName(profile.profession)}</p>

                          <p>📍 {getCityName(profile.city)}</p>
                        </>
                      )}

                      {job && <p>💼 {getServiceName(job.service)}</p>}

                      <div
                        style={{
                          marginTop: "15px",
                          padding: "12px",
                          backgroundColor:
                            interest.status === "interested"
                              ? "#f0fdf4"
                              : "#f8fafc",
                          borderRadius: "10px",
                          lineHeight: "1.5",
                        }}
                      >
                        {getEmployerInterestStatus(interest)}
                      </div>

                      {profile && (
                        <Link
                          to={getProfilePath(profile)}
                          style={{
                            display: "inline-block",
                            marginTop: "15px",
                            padding: "9px 13px",
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontWeight: "600",
                          }}
                        >
                          👤 {t.viewProfile}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================
            CLIENT JOBS
        ========================= */}

        {!isProvider && (
          <div
            style={{
              marginTop: "35px",
            }}
          >
            <h2
              style={{
                marginBottom: "18px",
                color: "#172033",
              }}
            >
              📋 {t.jobsTitle}
            </h2>

            {myJobs.length === 0 ? (
              <div
                className="driver-card"
                style={{
                  textAlign: "center",
                  padding: "35px",
                }}
              >
                <p>{t.noJobs}</p>

                <Link
                  to="/post-job"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  + {t.addJob}
                </Link>
              </div>
            ) : (
              <div className="drivers-grid">
                {myJobs.map((job) => {
                  const jobApplications = getJobApplications(job.id);

                  const isApplicationsOpen =
                    String(openApplicationsJobId) === String(job.id);

                  return (
                    <div
                      className="driver-card"
                      key={job.id}
                      style={{
                        opacity: job.status === "closed" ? "0.7" : "1",
                      }}
                    >
                      <div>
                        <h3>
                          {getServiceIcon(job.service)}{" "}
                          {getServiceName(job.service)}
                        </h3>

                        <p>📍 {getCityName(job.city)}</p>

                        <p>💼 {getEmploymentName(job.employmentType)}</p>

                        <p>
                          💰 {t.pay}: {job.budget} {t.currency} /{" "}
                          {getPaymentTypeName(job.paymentType)}
                        </p>

                        <p>
                          <strong>{t.status}:</strong>{" "}
                          {job.status === "closed"
                            ? `🔴 ${t.closed}`
                            : `🟢 ${t.active}`}
                        </p>

                        {job.description && (
                          <p
                            style={{
                              marginTop: "12px",
                            }}
                          >
                            {job.description}
                          </p>
                        )}

                        {/* RECEIVED APPLICATIONS */}

                        <div
                          style={{
                            marginTop: "18px",
                            paddingTop: "16px",
                            borderTop: "1px solid #e5e7eb",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenApplicationsJobId(
                                isApplicationsOpen ? null : job.id,
                              )
                            }
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              border: "1px solid #bfdbfe",
                              borderRadius: "10px",
                              backgroundColor: "#eff6ff",
                              color: "#1d4ed8",
                              cursor: "pointer",
                              fontWeight: "700",
                              textAlign: "left",
                            }}
                          >
                            📩 {t.receivedApplications} (
                            {jobApplications.length}){" "}
                            {isApplicationsOpen ? "▲" : "▼"}
                          </button>

                          {isApplicationsOpen && (
                            <div
                              style={{
                                marginTop: "12px",
                              }}
                            >
                              {jobApplications.length === 0 ? (
                                <div
                                  style={{
                                    padding: "14px",
                                    backgroundColor: "#f8fafc",
                                    borderRadius: "10px",
                                    color: "#64748b",
                                  }}
                                >
                                  {t.noApplications}
                                </div>
                              ) : (
                                jobApplications.map((application) => {
                                  const profile =
                                    getApplicationProfile(application);

                                  if (!profile) {
                                    return null;
                                  }

                                  const statusInfo =
                                    getApplicationStatusInfo(application);

                                  const applicationStatus =
                                    normalizeApplicationStatus(
                                      application.status,
                                    );

                                  return (
                                    <div
                                      key={application.id}
                                      style={{
                                        padding: "16px",
                                        marginBottom: "10px",
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "12px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          gap: "12px",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        <div
                                          style={{
                                            flex: "1",
                                            minWidth: "220px",
                                          }}
                                        >
                                          <strong>
                                            👤 {t.applicant}:{" "}
                                            {getApplicantName(profile)}
                                          </strong>

                                          <p
                                            style={{
                                              margin: "8px 0 0",
                                            }}
                                          >
                                            {getServiceIcon(profile.profession)}{" "}
                                            {getServiceName(profile.profession)}
                                          </p>

                                          <p
                                            style={{
                                              margin: "6px 0 0",
                                              color: "#64748b",
                                            }}
                                          >
                                            📍 {getCityName(profile.city)}
                                          </p>

                                          {profile.experience && (
                                            <p
                                              style={{
                                                margin: "6px 0 0",
                                                color: "#64748b",
                                              }}
                                            >
                                              🧰 {t.experience}:{" "}
                                              {profile.experience}
                                            </p>
                                          )}
                                        </div>

                                        <Link
                                          to={getProfilePath(profile)}
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            alignSelf: "flex-start",
                                            padding: "10px 14px",
                                            backgroundColor: "#2563eb",
                                            color: "#ffffff",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            fontWeight: "700",
                                          }}
                                        >
                                          👤 {t.viewProfile}
                                        </Link>
                                      </div>

                                      {/* CURRENT STATUS */}

                                      <div
                                        style={{
                                          marginTop: "14px",
                                          padding: "12px",
                                          border: `1px solid ${statusInfo.borderColor}`,
                                          backgroundColor:
                                            statusInfo.backgroundColor,
                                          color: statusInfo.color,
                                          borderRadius: "10px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {statusInfo.icon} {statusInfo.text}
                                      </div>

                                      {/* STATUS BUTTONS */}

                                      {applicationStatus !== "completed" && (
                                        <div
                                          style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "8px",
                                            marginTop: "14px",
                                          }}
                                        >
                                          {applicationStatus === "pending" && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                updateApplicationStatus(
                                                  application.id,
                                                  "reviewed",
                                                )
                                              }
                                              style={{
                                                padding: "9px 13px",
                                                border: "1px solid #2563eb",
                                                borderRadius: "8px",
                                                backgroundColor: "#ffffff",
                                                color: "#2563eb",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                              }}
                                            >
                                              👀 {t.markReviewed}
                                            </button>
                                          )}

                                          {(applicationStatus === "pending" ||
                                            applicationStatus ===
                                              "reviewed") && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                updateApplicationStatus(
                                                  application.id,
                                                  "next-stage",
                                                )
                                              }
                                              style={{
                                                padding: "9px 13px",
                                                border: "none",
                                                borderRadius: "8px",
                                                backgroundColor: "#16a34a",
                                                color: "#ffffff",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                              }}
                                            >
                                              ➡️ {t.moveNextStage}
                                            </button>
                                          )}

                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateApplicationStatus(
                                                application.id,
                                                "completed",
                                              )
                                            }
                                            style={{
                                              padding: "9px 13px",
                                              border: "1px solid #64748b",
                                              borderRadius: "8px",
                                              backgroundColor: "#ffffff",
                                              color: "#475569",
                                              cursor: "pointer",
                                              fontWeight: "600",
                                            }}
                                          >
                                            ✅ {t.completeReview}
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* JOB BUTTONS */}

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "18px",
                          paddingTop: "16px",
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => navigate(`/edit-job/${job.id}`)}
                          style={{
                            padding: "9px 13px",
                            border: "1px solid #2563eb",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          ✏️ {t.edit}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleJobStatus(job.id)}
                          style={{
                            padding: "9px 13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          {job.status === "closed"
                            ? `🟢 ${t.activate}`
                            : `🔒 ${t.close}`}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteJob(job.id)}
                          style={{
                            padding: "9px 13px",
                            border: "1px solid #dc2626",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            color: "#dc2626",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          🗑️ {t.delete}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;
