import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "ჩემი განცხადებები",
    description: "აქ შეგიძლია მართო შენს მიერ შექმნილი განცხადებები.",

    specialistListing: "ჩემი სპეციალისტის განცხადება",
    jobPosts: "ჩემი სამუშაოს განცხადებები",

    addJob: "ახალი სამუშაოს განცხადება",
    createSpecialist: "სპეციალისტის განცხადების შექმნა",

    noJobs: "ჯერ არ გაქვს გამოქვეყნებული სამუშაოს განცხადება.",
    noSpecialist: "ჯერ არ გაქვს შექმნილი სპეციალისტის განცხადება.",

    loginRequired: "ჩემი განცხადებების სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",
    login: "შესვლა",

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

    experience: "გამოცდილება",
    pay: "ანაზღაურება",
    status: "სტატუსი",

    active: "აქტიური",
    closed: "დახურული",

    edit: "რედაქტირება",
    close: "დახურვა",
    activate: "გააქტიურება",
    delete: "წაშლა",

    closeSpecialistConfirm: "ნამდვილად გინდა სპეციალისტის განცხადების დახურვა?",

    specialistCloseError: "სპეციალისტის განცხადების დახურვა ვერ მოხერხდა.",

    deleteConfirm: "ნამდვილად გინდა ამ სამუშაოს განცხადების წაშლა?",

    deleteError: "განცხადების წაშლა ვერ მოხერხდა.",
    statusError: "განცხადების სტატუსის შეცვლა ვერ მოხერხდა.",
    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა.",

    currency: "₾",
    loading: "იტვირთება...",
  },

  en: {
    back: "← Care Georgia",
    title: "My Listings",
    description: "Manage the listings you have created.",

    specialistListing: "My Specialist Listing",
    jobPosts: "My Job Posts",

    addJob: "Post a New Job",
    createSpecialist: "Create Specialist Listing",

    noJobs: "You haven't posted any jobs yet.",
    noSpecialist: "You haven't created a specialist listing yet.",

    loginRequired: "You need to log in to view your listings.",
    login: "Login",

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

    experience: "Experience",
    pay: "Pay",
    status: "Status",

    active: "Active",
    closed: "Closed",

    edit: "Edit",
    close: "Close",
    activate: "Activate",
    delete: "Delete",

    closeSpecialistConfirm:
      "Are you sure you want to close your specialist listing?",

    specialistCloseError: "Could not close the specialist listing.",

    deleteConfirm: "Are you sure you want to delete this job post?",

    deleteError: "Could not delete the job post.",
    statusError: "Could not change the job status.",
    serverError: "Could not connect to the server.",

    currency: "GEL",
    loading: "Loading...",
  },

  ru: {
    back: "← Care Georgia",
    title: "Мои объявления",
    description: "Здесь вы можете управлять своими объявлениями.",

    specialistListing: "Моё объявление специалиста",
    jobPosts: "Мои объявления о работе",

    addJob: "Добавить объявление о работе",
    createSpecialist: "Создать объявление специалиста",

    noJobs: "У вас пока нет опубликованных объявлений.",
    noSpecialist: "У вас пока нет объявления специалиста.",

    loginRequired: "Чтобы увидеть свои объявления, войдите в аккаунт.",
    login: "Войти",

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

    experience: "Опыт",
    pay: "Оплата",
    status: "Статус",

    active: "Активно",
    closed: "Закрыто",

    edit: "Редактировать",
    close: "Закрыть",
    activate: "Активировать",
    delete: "Удалить",

    closeSpecialistConfirm:
      "Вы уверены, что хотите закрыть объявление специалиста?",

    specialistCloseError: "Не удалось закрыть объявление специалиста.",

    deleteConfirm: "Вы уверены, что хотите удалить это объявление?",

    deleteError: "Не удалось удалить объявление.",
    statusError: "Не удалось изменить статус объявления.",
    serverError: "Не удалось подключиться к серверу.",

    currency: "GEL",
    loading: "Загрузка...",
  },
};

export default function MyJobs() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const isLoggedIn = localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");

  let currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem("careGeorgiaUser") || "null");
  } catch {
    currentUser = null;
  }

  const accountType = currentUser?.accountType;

  const isProvider = accountType === "provider";
  const isClient = accountType === "client";

  const [jobs, setJobs] = useState([]);
  const [specialistProfiles, setSpecialistProfiles] = useState([]);
  const [changingProfileId, setChangingProfileId] = useState(null);

  const [jobsLoading, setJobsLoading] = useState(isClient);
  const [profileLoading, setProfileLoading] = useState(isProvider);

  const clearLogin = () => {
    localStorage.removeItem("careGeorgiaToken");
    localStorage.removeItem("careGeorgiaLoggedIn");
    localStorage.removeItem("careGeorgiaCurrentUserId");
    localStorage.removeItem("careGeorgiaUser");
  };

  // ==========================================
  // PROVIDER - LOAD SPECIALIST PROFILE
  // ==========================================

  useEffect(() => {
    if (!isProvider) {
      setProfileLoading(false);
      return;
    }

    const loadProfile = async () => {
      const token = localStorage.getItem("careGeorgiaToken");

      if (!token) {
        setProfileLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/specialists/mine",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 401) {
          clearLogin();
          navigate("/login", { replace: true });
          return;
        }

        if (response.status === 404) {
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          console.error("Load specialist error:", data);
          return;
        }

        const profiles = Array.isArray(data.profiles) ? data.profiles : [];

        setSpecialistProfiles(profiles);
      } catch (error) {
        console.error("Load specialist error:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [isProvider, navigate]);

  // ==========================================
  // CLIENT - LOAD JOB POSTS
  // ==========================================

  useEffect(() => {
    if (!isClient) {
      setJobsLoading(false);
      return;
    }

    const loadJobs = async () => {
      const token = localStorage.getItem("careGeorgiaToken");

      if (!token) {
        setJobsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/jobs/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          clearLogin();
          navigate("/login", { replace: true });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          console.error("Load jobs error:", data);
          setJobs([]);
          return;
        }

        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (error) {
        console.error("Load jobs error:", error);
        setJobs([]);
      } finally {
        setJobsLoading(false);
      }
    };

    loadJobs();
  }, [isClient, navigate]);

  // ==========================================
  // HELPERS
  // ==========================================

  const getServiceName = (service) => {
    if (service === "nanny") return t.nanny;
    if (service === "caregiver") return t.caregiver;
    if (service === "driver") return t.driver;
    if (service === "tutor") return t.tutor;
    if (service === "housekeeper") return t.housekeeper;

    if (service === "dogwalker" || service === "dog-walker") {
      return t.dogWalker;
    }

    return service || "";
  };

  const getServiceIcon = (service) => {
    if (service === "nanny") return "👶";
    if (service === "caregiver") return "👵";
    if (service === "driver") return "🚗";
    if (service === "tutor") return "📚";
    if (service === "housekeeper") return "🏠";

    if (service === "dogwalker" || service === "dog-walker") {
      return "🐕";
    }

    return "💼";
  };

  const getCityName = (city) => {
    return t[city] || city || "";
  };

  const getEmploymentName = (type) => {
    if (type === "full-time") return t.fullTime;
    if (type === "part-time") return t.partTime;

    return type || "";
  };

  const getPaymentName = (type) => {
    if (type === "monthly") return t.month;
    if (type === "biweekly") return t.biweekly;
    if (type === "daily") return t.day;
    if (type === "hourly") return t.hour;

    return type || t.hour;
  };

  // Update only the selected profile, never all profiles at once.
  const changeSpecialistStatus = async (profile) => {
    const nextStatus = profile.status === "inactive" ? "active" : "inactive";
    if (nextStatus === "inactive" && !window.confirm(t.closeSpecialistConfirm))
      return;
    const token = localStorage.getItem("careGeorgiaToken");
    if (!token) {
      clearLogin();
      navigate("/login");
      return;
    }
    setChangingProfileId(profile.id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/specialists/${profile.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );
      if (response.status === 401) {
        clearLogin();
        navigate("/login", { replace: true });
        return;
      }
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || t.statusError);
        return;
      }
      setSpecialistProfiles((current) =>
        current.map((item) =>
          item.id === profile.id ? { ...item, status: nextStatus } : item,
        ),
      );
    } catch (error) {
      console.error("Change specialist status error:", error);
      alert(t.serverError);
    } finally {
      setChangingProfileId(null);
    }
  };

  // ==========================================
  // CLIENT - CLOSE / ACTIVATE JOB
  // ==========================================

  const toggleJobStatus = async (jobId) => {
    const token = localStorage.getItem("careGeorgiaToken");

    if (!token) {
      clearLogin();
      navigate("/login");
      return;
    }

    const job = jobs.find((item) => String(item.id) === String(jobId));

    if (!job) return;

    const newStatus = job.status === "closed" ? "active" : "closed";

    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        clearLogin();
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok || !data.job) {
        alert(data.message || t.statusError);
        return;
      }

      setJobs((currentJobs) =>
        currentJobs.map((item) =>
          String(item.id) === String(jobId) ? data.job : item,
        ),
      );
    } catch (error) {
      console.error("Change job status error:", error);
      alert(t.serverError);
    }
  };

  // ==========================================
  // CLIENT - DELETE JOB
  // ==========================================

  const deleteJob = async (jobId) => {
    if (!window.confirm(t.deleteConfirm)) {
      return;
    }

    const token = localStorage.getItem("careGeorgiaToken");

    if (!token) {
      clearLogin();
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        clearLogin();
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        alert(data.message || t.deleteError);
        return;
      }

      setJobs((currentJobs) =>
        currentJobs.filter((item) => String(item.id) !== String(jobId)),
      );
    } catch (error) {
      console.error("Delete job error:", error);
      alert(t.serverError);
    }
  };

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

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
              padding: "30px",
              textAlign: "center",
            }}
          >
            <p>{t.loginRequired}</p>

            <Link to="/login">{t.login} →</Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if ((isProvider && profileLoading) || (isClient && jobsLoading)) {
    return (
      <div className="drivers-page">
        <div className="drivers-container">
          <div
            className="driver-card"
            style={{
              maxWidth: "600px",
              margin: "40px auto",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <p>{t.loading}</p>
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

        <div className="drivers-heading" style={{ marginBottom: "30px" }}>
          <div>
            <h1>📋 {t.title}</h1>
            <p>{t.description}</p>
          </div>
        </div>

        {/* =====================================
            PROVIDER
            მხოლოდ სპეციალისტის განცხადება
        ====================================== */}

        {isProvider && (
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              <h2 style={{ margin: 0 }}>👤 {t.specialistListing}</h2>
              <Link
                to="/create-specialist-profile"
                style={{
                  padding: "11px 16px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "9px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                + {t.createSpecialist}
              </Link>
            </div>

            {specialistProfiles.length === 0 ? (
              <div className="driver-card">
                <p>{t.noSpecialist}</p>
              </div>
            ) : (
              <div className="drivers-grid">
                {specialistProfiles.map((profile) => (
                  <div
                    className="driver-card"
                    key={profile.id}
                    style={{
                      opacity: profile.status === "inactive" ? 0.72 : 1,
                    }}
                  >
                    <div style={{ fontSize: "42px", marginBottom: "12px" }}>
                      {getServiceIcon(profile.profession)}
                    </div>
                    <h3>{getServiceName(profile.profession)}</h3>
                    <p>📍 {getCityName(profile.city)}</p>
                    {profile.experience && (
                      <p>
                        💼 {t.experience}: {profile.experience}
                      </p>
                    )}
                    {profile.employmentType && (
                      <p>💼 {getEmploymentName(profile.employmentType)}</p>
                    )}
                    <p>
                      💰 {t.pay}: {profile.priceValue} {t.currency} /{" "}
                      {getPaymentName(profile.paymentType)}
                    </p>
                    <p>
                      <strong>{t.status}:</strong>{" "}
                      {profile.status === "inactive"
                        ? `🔴 ${t.closed}`
                        : `🟢 ${t.active}`}
                    </p>
                    {profile.description && (
                      <p style={{ marginTop: "12px" }}>{profile.description}</p>
                    )}
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
                          navigate(`/edit-specialist/${profile.id}`)
                        }
                        title="განცხადების რედაქტირება"
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          background: "#f3f4f6",
                          color: "#6b7280",
                          cursor: "pointer",
                          fontWeight: 700,
                          width: "170px",
                          minHeight: "52px",
                          flexShrink: 0,
                        }}
                      >
                        ✏️ {t.edit}
                      </button>
                      <button
                        type="button"
                        disabled={changingProfileId === profile.id}
                        onClick={() => changeSpecialistStatus(profile)}
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          background: "#ffffff",
                          cursor:
                            changingProfileId === profile.id
                              ? "wait"
                              : "pointer",
                          fontWeight: 700,
                        }}
                      >
                        {changingProfileId === profile.id
                          ? t.loading
                          : profile.status === "inactive"
                            ? `🟢 ${t.activate}`
                            : `🔒 ${t.close}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* =====================================
            CLIENT
            მხოლოდ სამუშაოს განცხადებები
        ====================================== */}

        {isClient && (
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "18px",
              }}
            >
              <h2 style={{ margin: 0 }}>💼 {t.jobPosts}</h2>

              <Link
                to="/post-job"
                style={{
                  display: "inline-block",
                  padding: "12px 18px",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "700",
                }}
              >
                + {t.addJob}
              </Link>
            </div>

            {jobs.length === 0 ? (
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
                {jobs.map((job) => (
                  <div
                    className="driver-card"
                    key={job.id}
                    style={{
                      opacity: job.status === "closed" ? 0.72 : 1,
                    }}
                  >
                    <h3>
                      {getServiceIcon(job.service)}{" "}
                      {getServiceName(job.service)}
                    </h3>

                    <p>📍 {getCityName(job.city)}</p>

                    <p>💼 {getEmploymentName(job.employmentType)}</p>

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
                      <p style={{ marginTop: "12px" }}>{job.description}</p>
                    )}

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
                          padding: "10px 14px",
                          border: "1px solid #2563eb",
                          borderRadius: "8px",
                          background: "#ffffff",
                          color: "#2563eb",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        ✏️ {t.edit}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleJobStatus(job.id)}
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          background: "#ffffff",
                          cursor: "pointer",
                          fontWeight: "700",
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
                          background: "#ffffff",
                          color: "#dc2626",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                      >
                        🗑️ {t.delete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
