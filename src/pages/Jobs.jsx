import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "იპოვე სამსახური",
    description: "ნახე დამსაქმებლების მიერ გამოქვეყნებული განცხადებები.",

    noJobs: "ჯერ განცხადებები არ არის გამოქვეყნებული.",

    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი / რეპეტიტორი",
    housekeeper: "სახლის დამხმარე",
    dogwalker: "ძაღლის გამსეირნებელი",

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

    pay: "ანაზღაურება",

    monthly: "თვე",
    biweekly: "2 კვირა",
    daily: "დღე",
    hourly: "საათი",

    employer: "დამსაქმებელი",

    contact: "საკონტაქტო ინფორმაცია",
    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

    noSharedContact: "დამსაქმებელს საკონტაქტო ინფორმაცია არ აქვს გაზიარებული.",

    loginToSeeContact: "საკონტაქტო ინფორმაციის სანახავად გაიარე ავტორიზაცია.",

    login: "შესვლა",

    currency: "₾",

    apply: "განაცხადის გაგზავნა",
    selectProfile: "აირჩიე პროფილი",
    sendApplication: "გაგზავნა",
    sending: "იგზავნება...",
    cancel: "გაუქმება",

    applicationSent: "განაცხადი წარმატებით გაიგზავნა.",

    alreadyApplied: "ამ ვაკანსიაზე განაცხადი უკვე გაგზავნილი გაქვს.",

    noMatchingProfile: "ამ ვაკანსიის შესაბამისი პროფესიული პროფილი არ გაქვს.",

    createProfile: "მომსახურების დამატება",

    loginToApply: "განაცხადის გასაგზავნად ჯერ უნდა შეხვიდე ანგარიშზე.",

    providerOnly:
      "განაცხადის გაგზავნა მხოლოდ მომსახურების მიმწოდებელს შეუძლია.",

    ownJob: "საკუთარ განცხადებაზე განაცხადს ვერ გაგზავნი.",

    chooseProfile: "აირჩიე რომელი პროფილით გინდა განაცხადის გაგზავნა.",

    applyingWith: "განაცხადი გაიგზავნება პროფილით",

    applicationStatus: "განაცხადი გაგზავნილია ✓",

    applicationError: "განაცხადის გაგზავნა ვერ მოხერხდა.",

    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა.",
  },

  en: {
    back: "← Care Georgia",
    title: "Find a Job",
    description: "Browse job posts published by employers.",

    noJobs: "No jobs have been posted yet.",

    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor / Teacher",
    housekeeper: "Housekeeper",
    dogwalker: "Dog Walker",

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

    pay: "Pay",

    monthly: "month",
    biweekly: "2 weeks",
    daily: "day",
    hourly: "hour",

    employer: "Employer",

    contact: "Contact information",
    phone: "Phone",
    email: "Email",

    noSharedContact: "The employer has not shared contact information.",

    loginToSeeContact: "Log in to view contact information.",

    login: "Login",

    currency: "GEL",

    apply: "Apply",
    selectProfile: "Select profile",
    sendApplication: "Send application",
    sending: "Sending...",
    cancel: "Cancel",

    applicationSent: "Application sent successfully.",

    alreadyApplied: "You have already applied for this job.",

    noMatchingProfile:
      "You do not have a professional profile that matches this job.",

    createProfile: "Add Service",

    loginToApply: "Please log in before applying.",

    providerOnly: "Only service providers can apply for jobs.",

    ownJob: "You cannot apply to your own job post.",

    chooseProfile: "Choose which profile you want to use for this application.",

    applyingWith: "Application will be sent with",

    applicationStatus: "Application sent ✓",

    applicationError: "Could not send the application.",

    serverError: "Could not connect to the server.",
  },

  ru: {
    back: "← Care Georgia",
    title: "Найти работу",
    description: "Просмотрите объявления, опубликованные работодателями.",

    noJobs: "Пока нет опубликованных вакансий.",

    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogwalker: "Выгульщик собак",

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

    pay: "Оплата",

    monthly: "месяц",
    biweekly: "2 недели",
    daily: "день",
    hourly: "час",

    employer: "Работодатель",

    contact: "Контактная информация",
    phone: "Телефон",
    email: "Эл. почта",

    noSharedContact: "Работодатель не поделился контактной информацией.",

    loginToSeeContact:
      "Войдите в аккаунт, чтобы увидеть контактную информацию.",

    login: "Войти",

    currency: "GEL",

    apply: "Отправить заявку",
    selectProfile: "Выберите профиль",
    sendApplication: "Отправить",
    sending: "Отправка...",
    cancel: "Отмена",

    applicationSent: "Заявка успешно отправлена.",

    alreadyApplied: "Вы уже отправили заявку на эту вакансию.",

    noMatchingProfile:
      "У вас нет профессионального профиля, соответствующего этой вакансии.",

    createProfile: "Добавить услугу",

    loginToApply: "Для отправки заявки необходимо войти в аккаунт.",

    providerOnly: "Отправлять заявки могут только исполнители.",

    ownJob: "Нельзя отправить заявку на собственное объявление.",

    chooseProfile: "Выберите профиль, с которого хотите отправить заявку.",

    applyingWith: "Заявка будет отправлена с профиля",

    applicationStatus: "Заявка отправлена ✓",

    applicationError: "Не удалось отправить заявку.",

    serverError: "Не удалось подключиться к серверу.",
  },
};

function Jobs() {
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const isLoggedIn = localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");

  // ========================================
  // CURRENT USER
  // ========================================

  const getCurrentUser = () => {
    try {
      const saved = localStorage.getItem("careGeorgiaUser");

      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  // ========================================
  // APPLICATIONS
  // ========================================

  const [applications, setApplications] = useState([]);

  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const [sendingApplication, setSendingApplication] = useState(false);

  const [applyingJobId, setApplyingJobId] = useState(null);

  const [selectedProfileId, setSelectedProfileId] = useState("");

  // ========================================
  // JOBS
  // ========================================

  const [jobs, setJobs] = useState([]);

  const [jobsLoading, setJobsLoading] = useState(true);

  // ========================================
  // LOAD JOBS
  // ========================================

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");

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
  }, []);

  // ========================================
  // LOAD MY APPLICATIONS FROM POSTGRESQL
  // ========================================

  useEffect(() => {
    const loadApplications = async () => {
      const token = localStorage.getItem("careGeorgiaToken");

      if (!token || !isLoggedIn) {
        setApplications([]);
        return;
      }

      try {
        setApplicationsLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/applications/my",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Load applications error:", data);

          setApplications([]);

          return;
        }

        setApplications(
          Array.isArray(data.applications) ? data.applications : [],
        );
      } catch (error) {
        console.error("Load applications error:", error);

        setApplications([]);
      } finally {
        setApplicationsLoading(false);
      }
    };

    loadApplications();
  }, [isLoggedIn]);

  // ========================================
  // SPECIALISTS
  //
  // პროფილები ჯერ ისევ localStorage-შია.
  // Applications უკვე PostgreSQL-ზე გადავიდა.
  // ========================================

  const getSpecialists = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("careGeorgiaSpecialists"));

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const specialists = getSpecialists();

  // ========================================
  // HELPERS
  // ========================================

  const getServiceName = (service) => {
    if (service === "dog-walker" || service === "dogwalker") {
      return t.dogwalker;
    }

    return t[service] || service;
  };

  const getCityName = (city) => {
    return t[city] || city;
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
      return t.monthly;
    }

    if (paymentType === "biweekly") {
      return t.biweekly;
    }

    if (paymentType === "daily") {
      return t.daily;
    }

    if (paymentType === "hourly") {
      return t.hourly;
    }

    return t.hourly;
  };

  const getServiceIcon = (service) => {
    const icons = {
      nanny: "👶",
      caregiver: "👵",
      driver: "🚗",
      tutor: "📚",
      housekeeper: "🏠",
      dogwalker: "🐕",
      "dog-walker": "🐕",
    };

    return icons[service] || "💼";
  };

  const getSafeEmployerName = (fullName) => {
    if (!fullName || typeof fullName !== "string") {
      return "";
    }

    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 0) {
      return "";
    }

    const firstName = parts[0];

    if (parts.length === 1) {
      return firstName;
    }

    const lastName = parts[parts.length - 1];

    const lastInitial = lastName.charAt(0);

    return `${firstName} ${lastInitial}.`;
  };

  const getProfileName = (profile) => {
    const firstName = profile.firstName || "";

    const lastName = profile.lastName || "";

    const lastInitial = lastName ? `${lastName.charAt(0)}.` : "";

    return (
      `${firstName} ${lastInitial}`.trim() || getServiceName(profile.profession)
    );
  };

  const normalizeService = (service) => {
    if (service === "dogwalker" || service === "dog-walker") {
      return "dog-walker";
    }

    return service;
  };

  // ========================================
  // MATCHING PROFILES
  // ========================================

  const getMatchingProfiles = (job) => {
    if (!currentUserId) {
      return [];
    }

    return specialists.filter(
      (profile) =>
        String(profile.ownerId) === String(currentUserId) &&
        profile.status !== "inactive" &&
        normalizeService(profile.profession) === normalizeService(job.service),
    );
  };

  // ========================================
  // APPLICATION CHECK
  // ========================================

  const hasApplied = (jobId) => {
    if (!currentUserId) {
      return false;
    }

    return applications.some(
      (application) =>
        String(application.jobId) === String(jobId) &&
        String(application.applicantUserId) === String(currentUserId),
    );
  };

  // ========================================
  // OPEN APPLICATION
  // ========================================

  const openApplication = (job) => {
    if (!isLoggedIn) {
      alert(t.loginToApply);
      return;
    }

    if (!currentUser || currentUser.accountType !== "provider") {
      alert(t.providerOnly);
      return;
    }

    if (String(job.ownerId) === String(currentUserId)) {
      alert(t.ownJob);
      return;
    }

    if (hasApplied(job.id)) {
      alert(t.alreadyApplied);
      return;
    }

    const matchingProfiles = getMatchingProfiles(job);

    if (matchingProfiles.length === 0) {
      alert(t.noMatchingProfile);
      return;
    }

    setApplyingJobId(String(job.id));

    if (matchingProfiles.length === 1) {
      setSelectedProfileId(String(matchingProfiles[0].id));
    } else {
      setSelectedProfileId("");
    }
  };

  // ========================================
  // CANCEL APPLICATION
  // ========================================

  const cancelApplication = () => {
    setApplyingJobId(null);
    setSelectedProfileId("");
  };

  // ========================================
  // SEND APPLICATION TO POSTGRESQL
  // ========================================

  const sendApplication = async (job) => {
    if (sendingApplication) {
      return;
    }

    if (!isLoggedIn || !currentUserId) {
      alert(t.loginToApply);
      return;
    }

    if (!currentUser || currentUser.accountType !== "provider") {
      alert(t.providerOnly);
      return;
    }

    if (String(job.ownerId) === String(currentUserId)) {
      alert(t.ownJob);

      cancelApplication();

      return;
    }

    if (hasApplied(job.id)) {
      alert(t.alreadyApplied);

      cancelApplication();

      return;
    }

    const matchingProfiles = getMatchingProfiles(job);

    const selectedProfile = matchingProfiles.find(
      (profile) => String(profile.id) === String(selectedProfileId),
    );

    if (!selectedProfile) {
      alert(t.chooseProfile);
      return;
    }

    const token = localStorage.getItem("careGeorgiaToken");

    if (!token) {
      alert(t.loginToApply);
      return;
    }

    try {
      setSendingApplication(true);

      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          jobId: job.id,
        }),
      });

      const data = await response.json();

      // JWT აღარ არის მოქმედი
      if (response.status === 401) {
        localStorage.removeItem("careGeorgiaToken");

        localStorage.removeItem("careGeorgiaLoggedIn");

        localStorage.removeItem("careGeorgiaCurrentUserId");

        localStorage.removeItem("careGeorgiaUser");

        alert(t.loginToApply);

        return;
      }

      // უკვე არსებობს განაცხადი
      if (response.status === 409) {
        alert(t.alreadyApplied);

        // თავიდან წამოვიღოთ ბაზიდან,
        // რათა UI-მაც იცოდეს რომ უკვე გაგზავნილია.
        try {
          const reloadResponse = await fetch(
            "http://localhost:5000/api/applications/my",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const reloadData = await reloadResponse.json();

          if (reloadResponse.ok && Array.isArray(reloadData.applications)) {
            setApplications(reloadData.applications);
          }
        } catch (reloadError) {
          console.error("Reload applications error:", reloadError);
        }

        cancelApplication();

        return;
      }

      if (!response.ok) {
        alert(data.message || t.applicationError);

        return;
      }

      if (data.application) {
        setApplications((previous) => [...previous, data.application]);
      }

      cancelApplication();

      alert(t.applicationSent);
    } catch (error) {
      console.error("Send application error:", error);

      alert(t.serverError);
    } finally {
      setSendingApplication(false);
    }
  };

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="drivers-page">
      <header className="drivers-header">
        <Link to="/" className="back-link">
          {t.back}
        </Link>

        <h1>{t.title}</h1>

        <p>{t.description}</p>
      </header>

      <section className="drivers-list">
        {jobsLoading ? (
          <div
            className="driver-card"
            style={{
              justifyContent: "center",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <p>...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div
            className="driver-card"
            style={{
              justifyContent: "center",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <p>{t.noJobs}</p>
          </div>
        ) : (
          jobs
            .slice()
            .reverse()
            .map((job) => {
              const matchingProfiles = getMatchingProfiles(job);

              const applicationOpen = String(applyingJobId) === String(job.id);

              const alreadyApplied = hasApplied(job.id);

              const hasSharedEmail =
                job.showEmployerEmail === true && Boolean(job.employerEmail);

              const hasSharedPhone =
                job.showEmployerPhone === true && Boolean(job.employerPhone);

              const hasSharedContact = hasSharedEmail || hasSharedPhone;

              return (
                <div className="driver-card" key={job.id}>
                  <div className="driver-avatar">
                    {getServiceIcon(job.service)}
                  </div>

                  <div className="driver-info">
                    <div className="driver-name">
                      <h2>{getServiceName(job.service)}</h2>
                    </div>

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
                          lineHeight: "1.6",
                        }}
                      >
                        {job.description}
                      </p>
                    )}

                    {job.employerName && (
                      <p>
                        👤 {t.employer}: {getSafeEmployerName(job.employerName)}
                      </p>
                    )}

                    {/* CONTACT */}

                    {hasSharedContact ? (
                      isLoggedIn ? (
                        <div
                          style={{
                            marginTop: "14px",
                            padding: "14px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "10px",
                          }}
                        >
                          <strong
                            style={{
                              display: "block",
                              marginBottom: "10px",
                            }}
                          >
                            📇 {t.contact}
                          </strong>

                          {hasSharedEmail && (
                            <p
                              style={{
                                margin: "6px 0",
                              }}
                            >
                              ✉️ <strong>{t.email}:</strong>{" "}
                              <a href={`mailto:${job.employerEmail}`}>
                                {job.employerEmail}
                              </a>
                            </p>
                          )}

                          {hasSharedPhone && (
                            <p
                              style={{
                                margin: "6px 0",
                              }}
                            >
                              📞 <strong>{t.phone}:</strong>{" "}
                              <a
                                href={`tel:${String(job.employerPhone).replace(
                                  /\s/g,
                                  "",
                                )}`}
                              >
                                {job.employerPhone}
                              </a>
                            </p>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "14px",
                            padding: "14px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "10px",
                          }}
                        >
                          <p
                            style={{
                              margin: "0 0 8px",
                            }}
                          >
                            🔒 {t.loginToSeeContact}
                          </p>

                          <Link
                            to="/login"
                            style={{
                              color: "#2563eb",
                              fontWeight: "600",
                              textDecoration: "none",
                            }}
                          >
                            {t.login} →
                          </Link>
                        </div>
                      )
                    ) : (
                      <div
                        style={{
                          marginTop: "14px",
                          padding: "12px 14px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          color: "#64748b",
                          fontSize: "14px",
                        }}
                      >
                        🔒 {t.noSharedContact}
                      </div>
                    )}

                    {/* APPLICATION */}

                    {isLoggedIn &&
                      currentUser?.accountType === "provider" &&
                      String(job.ownerId) !== String(currentUserId) && (
                        <div
                          style={{
                            marginTop: "18px",
                            paddingTop: "16px",
                            borderTop: "1px solid #e5e7eb",
                          }}
                        >
                          {applicationsLoading ? (
                            <span>...</span>
                          ) : alreadyApplied ? (
                            <strong
                              style={{
                                color: "#16a34a",
                              }}
                            >
                              {t.applicationStatus}
                            </strong>
                          ) : !applicationOpen ? (
                            <>
                              <button
                                type="button"
                                className="profile-btn"
                                onClick={() => openApplication(job)}
                                style={{
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                {t.apply}
                              </button>

                              {matchingProfiles.length === 0 && (
                                <div
                                  style={{
                                    marginTop: "10px",
                                  }}
                                >
                                  <Link
                                    to="/create-specialist-profile"
                                    style={{
                                      color: "#2563eb",
                                      fontWeight: "600",
                                      textDecoration: "none",
                                    }}
                                  >
                                    + {t.createProfile}
                                  </Link>
                                </div>
                              )}
                            </>
                          ) : (
                            <div
                              style={{
                                padding: "16px",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0 0 12px",
                                  fontWeight: "600",
                                }}
                              >
                                {t.chooseProfile}
                              </p>

                              <select
                                value={selectedProfileId}
                                onChange={(event) =>
                                  setSelectedProfileId(event.target.value)
                                }
                                style={{
                                  width: "100%",
                                  minHeight: "46px",
                                  padding: "0 12px",
                                  border: "1px solid #cbd5e1",
                                  borderRadius: "8px",
                                  marginBottom: "12px",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <option value="">{t.selectProfile}</option>

                                {matchingProfiles.map((profile) => (
                                  <option key={profile.id} value={profile.id}>
                                    {getServiceName(profile.profession)} —{" "}
                                    {getProfileName(profile)}
                                  </option>
                                ))}
                              </select>

                              {selectedProfileId && (
                                <p
                                  style={{
                                    color: "#64748b",
                                    fontSize: "14px",
                                  }}
                                >
                                  {t.applyingWith}:{" "}
                                  {getServiceName(
                                    matchingProfiles.find(
                                      (profile) =>
                                        String(profile.id) ===
                                        String(selectedProfileId),
                                    )?.profession,
                                  )}
                                </p>
                              )}

                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => sendApplication(job)}
                                  disabled={sendingApplication}
                                  style={{
                                    padding: "10px 18px",
                                    border: "none",
                                    borderRadius: "8px",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    fontWeight: "700",
                                    cursor: sendingApplication
                                      ? "not-allowed"
                                      : "pointer",
                                    opacity: sendingApplication ? 0.7 : 1,
                                  }}
                                >
                                  {sendingApplication
                                    ? t.sending
                                    : t.sendApplication}
                                </button>

                                <button
                                  type="button"
                                  onClick={cancelApplication}
                                  disabled={sendingApplication}
                                  style={{
                                    padding: "10px 18px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    backgroundColor: "#ffffff",
                                    color: "#334155",
                                    fontWeight: "600",
                                    cursor: sendingApplication
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                >
                                  {t.cancel}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })
        )}
      </section>
    </div>
  );
}

export default Jobs;
