import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const getArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "ჩემი განცხადებები",
    description: "აქ მართავ მხოლოდ შენს მიერ გამოქვეყნებულ სამუშაოს განცხადებებს.",
    addJob: "ახალი განცხადების დამატება",
    noJobs: "ჯერ არ გაქვს გამოქვეყნებული სამუშაოს განცხადება.",
    loginRequired: "ჩემი განცხადებების სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",
    login: "შესვლა",
    employerOnly: "ეს გვერდი განკუთვნილია დამსაქმებლის განცხადებებისთვის.",

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
    status: "სტატუსი",
    active: "აქტიური",
    closed: "დახურული",

    receivedApplications: "მიღებული განაცხადები",
    noApplications: "ამ განცხადებაზე ჯერ განაცხადი არ არის.",
    applicant: "განმცხადებელი",
    experience: "გამოცდილება",
    viewProfile: "პროფილის ნახვა",

    applicationSent: "განაცხადი გაგზავნილია",
    applicationReviewed: "განაცხადი განხილულია",
    applicationNextStage: "განაცხადი გადავიდა შემდეგ ეტაპზე",
    applicationNotSelected: "სხვა კანდიდატებთან გაგრძელება",
    applicationCompleted: "განაცხადის განხილვა დასრულებულია",

    edit: "რედაქტირება",
    close: "დახურვა",
    activate: "გააქტიურება",
    delete: "წაშლა",
    deleteConfirm: "ნამდვილად გინდა ამ სამუშაოს განცხადების წაშლა?",
    currency: "₾",
  },

  en: {
    back: "← Care Georgia",
    title: "My Job Posts",
    description: "Manage only the job posts you have published.",
    addJob: "Post a New Job",
    noJobs: "You haven't posted any jobs yet.",
    loginRequired: "You need to log in to view your job posts.",
    login: "Login",
    employerOnly: "This page is for employer job posts.",

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
    status: "Status",
    active: "Active",
    closed: "Closed",

    receivedApplications: "Received Applications",
    noApplications: "No applications for this job yet.",
    applicant: "Applicant",
    experience: "Experience",
    viewProfile: "View Profile",

    applicationSent: "Application sent",
    applicationReviewed: "Application reviewed",
    applicationNextStage: "Application moved to the next stage",
    applicationNotSelected: "Continuing with other candidates",
    applicationCompleted: "Application review completed",

    edit: "Edit",
    close: "Close",
    activate: "Activate",
    delete: "Delete",
    deleteConfirm: "Are you sure you want to delete this job post?",
    currency: "GEL",
  },

  ru: {
    back: "← Care Georgia",
    title: "Мои объявления",
    description: "Здесь находятся только опубликованные вами объявления о работе.",
    addJob: "Добавить объявление",
    noJobs: "У вас пока нет опубликованных объявлений.",
    loginRequired: "Чтобы увидеть свои объявления, войдите в аккаунт.",
    login: "Войти",
    employerOnly: "Эта страница предназначена для объявлений работодателя.",

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
    status: "Статус",
    active: "Активно",
    closed: "Закрыто",

    receivedApplications: "Полученные заявки",
    noApplications: "На это объявление пока нет заявок.",
    applicant: "Кандидат",
    experience: "Опыт",
    viewProfile: "Посмотреть профиль",

    applicationSent: "Заявка отправлена",
    applicationReviewed: "Заявка рассмотрена",
    applicationNextStage: "Заявка перешла на следующий этап",
    applicationNotSelected: "Продолжение с другими кандидатами",
    applicationCompleted: "Рассмотрение заявки завершено",

    edit: "Редактировать",
    close: "Закрыть",
    activate: "Активировать",
    delete: "Удалить",
    deleteConfirm: "Вы уверены, что хотите удалить это объявление?",
    currency: "GEL",
  },
};

export default function MyJobs() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const isLoggedIn =
    localStorage.getItem("careGeorgiaLoggedIn") === "true";
  const currentUserId =
    localStorage.getItem("careGeorgiaCurrentUserId");

  const [jobs, setJobs] = useState(() =>
    getArray("careGeorgiaJobs")
  );
  const applications = getArray("careGeorgiaApplications");
  const specialists = getArray("careGeorgiaSpecialists");
  const [openJobId, setOpenJobId] = useState(null);

  const myJobs = jobs
    .filter(
      (job) =>
        String(job.ownerId) === String(currentUserId)
    )
    .reverse();

  const getServiceName = (service) => {
    if (service === "nanny") return t.nanny;
    if (service === "caregiver") return t.caregiver;
    if (service === "driver") return t.driver;
    if (service === "tutor") return t.tutor;
    if (service === "housekeeper") return t.housekeeper;
    if (service === "dogwalker" || service === "dog-walker")
      return t.dogWalker;
    return service || "";
  };

  const getServiceIcon = (service) => {
    if (service === "nanny") return "👶";
    if (service === "caregiver") return "👵";
    if (service === "driver") return "🚗";
    if (service === "tutor") return "📚";
    if (service === "housekeeper") return "🏠";
    if (service === "dogwalker" || service === "dog-walker")
      return "🐕";
    return "💼";
  };

  const getCityName = (city) =>
    t[city] || city || "";

  const getEmploymentName = (type) => {
    if (type === "full-time") return t.fullTime;
    if (type === "part-time") return t.partTime;
    return type || "";
  };

  const getPaymentName = (type) => {
    if (type === "monthly") return t.month;
    if (type === "biweekly") return t.biweekly;
    if (type === "daily") return t.day;
    return t.hour;
  };

  const getJobApplications = (jobId) =>
    applications.filter(
      (application) =>
        String(application.jobId) === String(jobId) &&
        String(application.jobOwnerId) ===
          String(currentUserId)
    );

  const getProfile = (application) =>
    specialists.find(
      (profile) =>
        String(profile.id) ===
          String(application.specialistProfileId) &&
        String(profile.ownerId) ===
          String(application.applicantUserId)
    );

  const getProfilePath = (profile) => {
    if (!profile) return "/";
    const p = profile.profession;
    if (p === "nanny") return `/nannies/${profile.id}`;
    if (p === "caregiver")
      return `/caregivers/${profile.id}`;
    if (p === "driver") return `/drivers/${profile.id}`;
    if (p === "tutor") return `/tutors/${profile.id}`;
    if (p === "housekeeper")
      return `/housekeepers/${profile.id}`;
    if (p === "dogwalker" || p === "dog-walker")
      return `/dogwalker/${profile.id}`;
    return "/";
  };

  const getApplicantName = (profile) => {
    if (!profile) return "";
    const first = profile.firstName || "";
    const last = profile.lastName || "";
    const initial = last ? `${last.charAt(0)}.` : "";
    return `${first} ${initial}`.trim() ||
      getServiceName(profile.profession);
  };

  const getApplicationStatus = (application) => {
    if (application.status === "reviewed")
      return `👀 ${t.applicationReviewed}`;
    if (application.status === "next-stage")
      return `➡️ ${t.applicationNextStage}`;
    if (application.status === "not-selected")
      return `🌿 ${t.applicationNotSelected}`;
    if (application.status === "completed")
      return `✅ ${t.applicationCompleted}`;
    return `📨 ${t.applicationSent}`;
  };

  const toggleJobStatus = (jobId) => {
    const next = jobs.map((job) => {
      if (
        String(job.id) !== String(jobId) ||
        String(job.ownerId) !== String(currentUserId)
      ) {
        return job;
      }

      return {
        ...job,
        status:
          job.status === "closed" ? "active" : "closed",
      };
    });

    setJobs(next);
    localStorage.setItem(
      "careGeorgiaJobs",
      JSON.stringify(next)
    );
  };

  const deleteJob = (jobId) => {
    const job = jobs.find(
      (item) => String(item.id) === String(jobId)
    );

    if (
      !job ||
      String(job.ownerId) !== String(currentUserId)
    ) {
      return;
    }

    if (!window.confirm(t.deleteConfirm)) return;

    const next = jobs.filter(
      (item) => String(item.id) !== String(jobId)
    );

    setJobs(next);
    localStorage.setItem(
      "careGeorgiaJobs",
      JSON.stringify(next)
    );
  };

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
            <Link to="/login">{t.login} →</Link>
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

        <div className="drivers-heading">
          <div>
            <h1>📋 {t.title}</h1>
            <p>{t.description}</p>
          </div>

          <Link
            to="/post-job"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            + {t.addJob}
          </Link>
        </div>

        {myJobs.length === 0 ? (
          <div
            className="driver-card"
            style={{
              padding: "35px",
              textAlign: "center",
            }}
          >
            <p>{t.noJobs}</p>
          </div>
        ) : (
          <div className="drivers-grid">
            {myJobs.map((job) => {
              const jobApplications =
                getJobApplications(job.id);
              const open =
                String(openJobId) === String(job.id);

              return (
                <div
                  className="driver-card"
                  key={job.id}
                  style={{
                    opacity:
                      job.status === "closed" ? 0.72 : 1,
                  }}
                >
                  <h3>
                    {getServiceIcon(job.service)}{" "}
                    {getServiceName(job.service)}
                  </h3>

                  <p>📍 {getCityName(job.city)}</p>
                  <p>
                    💼{" "}
                    {getEmploymentName(job.employmentType)}
                  </p>
                  <p>
                    💰 {t.pay}: {job.budget} {t.currency} /{" "}
                    {getPaymentName(job.paymentType)}
                  </p>

                  <p>
                    <strong>{t.status}:</strong>{" "}
                    {job.status === "closed"
                      ? `🔴 ${t.closed}`
                      : `🟢 ${t.active}`}
                  </p>

                  {job.description && (
                    <p style={{ marginTop: "12px" }}>
                      {job.description}
                    </p>
                  )}

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
                        setOpenJobId(open ? null : job.id)
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
                      {open ? "▲" : "▼"}
                    </button>

                    {open && (
                      <div style={{ marginTop: "12px" }}>
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
                          jobApplications.map(
                            (application) => {
                              const profile =
                                getProfile(application);

                              if (!profile) return null;

                              return (
                                <div
                                  key={application.id}
                                  style={{
                                    padding: "16px",
                                    marginBottom: "10px",
                                    backgroundColor: "#ffffff",
                                    border:
                                      "1px solid #e2e8f0",
                                    borderRadius: "12px",
                                  }}
                                >
                                  <strong>
                                    👤 {t.applicant}:{" "}
                                    {getApplicantName(profile)}
                                  </strong>

                                  <p>
                                    {getServiceIcon(
                                      profile.profession
                                    )}{" "}
                                    {getServiceName(
                                      profile.profession
                                    )}
                                  </p>

                                  <p>
                                    📍{" "}
                                    {getCityName(profile.city)}
                                  </p>

                                  {profile.experience && (
                                    <p>
                                      🧰 {t.experience}:{" "}
                                      {profile.experience}
                                    </p>
                                  )}

                                  <div
                                    style={{
                                      margin: "12px 0",
                                      padding: "10px",
                                      backgroundColor:
                                        "#f8fafc",
                                      borderRadius: "8px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {getApplicationStatus(
                                      application
                                    )}
                                  </div>

                                  <Link
                                    to={getProfilePath(profile)}
                                    state={{ from: "my-jobs" }}
                                    style={{
                                      display:
                                        "inline-block",
                                      padding:
                                        "9px 13px",
                                      backgroundColor:
                                        "#2563eb",
                                      color: "#ffffff",
                                      borderRadius: "8px",
                                      textDecoration: "none",
                                      fontWeight: "700",
                                    }}
                                  >
                                    👤 {t.viewProfile}
                                  </Link>
                                </div>
                              );
                            }
                          )
                        )}
                      </div>
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
                        navigate(`/edit-job/${job.id}`)
                      }
                      style={{
                        padding: "10px 14px",
                        border: "1px solid #2563eb",
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        color: "#2563eb",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      ✏️ {t.edit}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleJobStatus(job.id)
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
                      {job.status === "closed"
                        ? `🟢 ${t.activate}`
                        : `🔒 ${t.close}`}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      style={{
                        padding: "10px 14px",
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
    </div>
  );
}
