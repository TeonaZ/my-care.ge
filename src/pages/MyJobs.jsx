import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "ჩემი განცხადებები",
    description: "მართე შენ მიერ გამოქვეყნებული განცხადებები.",

    noJobs: "ჯერ არ გაქვს გამოქვეყნებული განცხადება.",
    addJob: "განცხადების დამატება",

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

    close: "დახურვა",
    activate: "გააქტიურება",
    edit: "რედაქტირება",
    delete: "წაშლა",

    deleteConfirm:
      "ნამდვილად გინდა ამ განცხადების წაშლა?",

    loginRequired:
      "ჩემი განცხადებების სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",

    login: "შესვლა",

    currency: "₾",
  },

  en: {
    back: "← Care Georgia",
    title: "My Jobs",
    description: "Manage the jobs you have posted.",

    noJobs: "You haven't posted any jobs yet.",
    addJob: "Post a Job",

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

    close: "Close",
    activate: "Activate",
    edit: "Edit",
    delete: "Delete",

    deleteConfirm:
      "Are you sure you want to delete this job?",

    loginRequired:
      "You need to log in to view your jobs.",

    login: "Login",

    currency: "GEL",
  },

  ru: {
    back: "← Care Georgia",
    title: "Мои объявления",
    description: "Управляйте своими объявлениями.",

    noJobs: "У вас пока нет опубликованных объявлений.",
    addJob: "Добавить объявление",

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

    close: "Закрыть",
    activate: "Активировать",
    edit: "Редактировать",
    delete: "Удалить",

    deleteConfirm:
      "Вы уверены, что хотите удалить это объявление?",

    loginRequired:
      "Чтобы увидеть свои объявления, войдите в аккаунт.",

    login: "Войти",

    currency: "GEL",
  },
};

function MyJobs() {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const isLoggedIn =
    localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const currentUserId =
    localStorage.getItem("careGeorgiaCurrentUserId");

  const getSavedJobs = () => {
    const savedJobs =
      localStorage.getItem("careGeorgiaJobs");

    if (!savedJobs) {
      return [];
    }

    try {
      const parsedJobs = JSON.parse(savedJobs);

      return Array.isArray(parsedJobs)
        ? parsedJobs
        : [];
    } catch {
      return [];
    }
  };

  const [jobs, setJobs] = useState(getSavedJobs);

  // მხოლოდ შესული მომხმარებლის განცხადებები
  const myJobs = jobs
    .filter((job) => job.ownerId === currentUserId)
    .reverse();

  const getServiceName = (service) => {
    if (service === "nanny") return t.nanny;
    if (service === "caregiver") return t.caregiver;
    if (service === "driver") return t.driver;
    if (service === "tutor") return t.tutor;
    if (service === "housekeeper") return t.housekeeper;

    if (
      service === "dogwalker" ||
      service === "dog-walker"
    ) {
      return t.dogWalker;
    }

    return service;
  };

  const getServiceIcon = (service) => {
    if (service === "nanny") return "👶";
    if (service === "caregiver") return "👵";
    if (service === "driver") return "🚗";
    if (service === "tutor") return "📚";
    if (service === "housekeeper") return "🏠";

    if (
      service === "dogwalker" ||
      service === "dog-walker"
    ) {
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

    return city;
  };

  const getEmploymentName = (employmentType) => {
    if (employmentType === "full-time") {
      return t.fullTime;
    }

    if (employmentType === "part-time") {
      return t.partTime;
    }

    return employmentType;
  };

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") return t.month;
    if (paymentType === "biweekly") return t.biweekly;
    if (paymentType === "daily") return t.day;
    if (paymentType === "hourly") return t.hour;

    return t.hour;
  };

  // განცხადების დახურვა / გააქტიურება
  const toggleStatus = (jobId) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id !== jobId) {
        return job;
      }

      // დამატებითი დაცვა:
      // სხვისი განცხადება არ შეიცვალოს
      if (job.ownerId !== currentUserId) {
        return job;
      }

      return {
        ...job,
        status:
          job.status === "closed"
            ? "active"
            : "closed",
      };
    });

    setJobs(updatedJobs);

    localStorage.setItem(
      "careGeorgiaJobs",
      JSON.stringify(updatedJobs)
    );
  };

  // განცხადების წაშლა
  const deleteJob = (jobId) => {
    const jobToDelete = jobs.find(
      (job) => job.id === jobId
    );

    if (
      !jobToDelete ||
      jobToDelete.ownerId !== currentUserId
    ) {
      return;
    }

    const confirmed =
      window.confirm(t.deleteConfirm);

    if (!confirmed) {
      return;
    }

    const updatedJobs = jobs.filter(
      (job) => job.id !== jobId
    );

    setJobs(updatedJobs);

    localStorage.setItem(
      "careGeorgiaJobs",
      JSON.stringify(updatedJobs)
    );
  };

  // თუ ავტორიზებული არ არის
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

        <div className="drivers-heading">
          <div>
            <h1>{t.title}</h1>
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
              fontWeight: "600",
            }}
          >
            + {t.addJob}
          </Link>
        </div>

        {myJobs.length === 0 ? (
          <div
            className="driver-card"
            style={{
              marginTop: "30px",
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
          <div
            className="drivers-grid"
            style={{ marginTop: "30px" }}
          >
            {myJobs.map((job) => (
              <div
                className="driver-card"
                key={job.id}
                style={{
                  opacity:
                    job.status === "closed"
                      ? "0.7"
                      : "1",
                }}
              >
                <div>
                  <h3>
                    {getServiceIcon(job.service)}{" "}
                    {getServiceName(job.service)}
                  </h3>

                  <p>
                    📍 {getCityName(job.city)}
                  </p>

                  <p>
                    💼{" "}
                    {getEmploymentName(
                      job.employmentType
                    )}
                  </p>

                  <p>
                    💰 {t.pay}: {job.budget}{" "}
                    {t.currency} /{" "}
                    {getPaymentTypeName(
                      job.paymentType
                    )}
                  </p>

                  <p>
                    <strong>
                      {t.status}:
                    </strong>{" "}
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
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "18px",
                    paddingTop: "16px",
                    borderTop:
                      "1px solid #e5e7eb",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/edit-job/${job.id}`
                      )
                    }
                    style={{
                      padding: "9px 13px",
                      border:
                        "1px solid #2563eb",
                      borderRadius: "8px",
                      backgroundColor:
                        "#ffffff",
                      color: "#2563eb",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    ✏️ {t.edit}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      toggleStatus(job.id)
                    }
                    style={{
                      padding: "9px 13px",
                      border:
                        "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor:
                        "#ffffff",
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
                    onClick={() =>
                      deleteJob(job.id)
                    }
                    style={{
                      padding: "9px 13px",
                      border:
                        "1px solid #dc2626",
                      borderRadius: "8px",
                      backgroundColor:
                        "#ffffff",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    🗑️ {t.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;