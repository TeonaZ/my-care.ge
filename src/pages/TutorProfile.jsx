import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const API = "http://localhost:5000";

const translations = {
  ka: {
    notFound: "რეპეტიტორი ვერ მოიძებნა",
    back: "← რეპეტიტორებზე დაბრუნება",
    myJobs: "← ჩემს განცხადებებზე დაბრუნება",
    sentInterests: "← გაგზავნილ დაინტერესებებში დაბრუნება",
    loading: "იტვირთება...",
    lessonPrice: "გაკვეთილის ფასი",
    message: "შეტყობინება",
    contact: "დაკავშირება",
    contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked: "საკონტაქტოდ გაიარეთ ავტორიზაცია.",
    contactUnlocked: "სპეციალისტის საკონტაქტო ინფორმაცია",
    contactUnavailable: "საკონტაქტო ინფორმაცია ხელმისაწვდომი არ არის. შეგიძლიათ სპეციალისტს შიდა ჩატით მისწეროთ.",
    close: "დახურვა",
    phoneHidden: "ტელეფონის ნომერი დამალულია.",
    emailHidden: "ელ. ფოსტა დამალულია.",
    login: "შესვლა",
    register: "რეგისტრაცია",
    phone: "ტელეფონი",
    email: "ელ. ფოსტა",
    about: "რეპეტიტორის შესახებ",
    subject: "საგანი",
    experience: "გამოცდილება",
    noReviews: "ჯერ არ აქვს შეფასება",
    hourly: "საათი",
    daily: "დღე",
    biweekly: "2 კვირა",
    monthly: "თვე",
    currency: "₾",
    interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",
    interestDescription:
      "შეგიძლიათ რეპეტიტორს გაუგზავნოთ დაინტერესება თქვენი შესაბამისი სამუშაოს განცხადებისთვის.",
    sendInterest: "დაინტერესების გაგზავნა",
    chooseJob: "აირჩიეთ სამუშაოს განცხადება",
    selectJob: "აირჩიეთ განცხადება",
    send: "გაგზავნა",
    cancel: "გაუქმება",
    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",
    alreadySent: "ამ სპეციალისტთან დაინტერესება უკვე გაგზავნილია.",
    noJobs: "ჯერ არ გაქვთ რეპეტიტორის შესაბამისი აქტიური ვაკანსია.",
    createJob: "სამუშაოს განცხადების შექმნა",
    clientOnly: "დაინტერესების გაგზავნა მხოლოდ დამსაქმებელს შეუძლია.",
    ownProfile: "საკუთარ პროფილზე დაინტერესებას ვერ გაგზავნით.",
    loginToSend: "დაინტერესების გასაგზავნად შედით ანგარიშში.",
    shareContactTitle: "საკონტაქტო ინფორმაციის გაზიარება",
    shareEmail: "ჩემი ელ. ფოსტის ჩვენება",
    sharePhone: "ჩემი ტელეფონის ნომრის ჩვენება",
    shareContactNote: "მონიშნეთ მხოლოდ ის ინფორმაცია, რომლის გაზიარებაც გსურთ.",
    noPhone: "თქვენს ანგარიშზე ტელეფონი მითითებული არ არის.",
    noEmail: "თქვენს ანგარიშზე ელ. ფოსტა მითითებული არ არის.",
    error: "ოპერაცია ვერ შესრულდა.",
    retry: "ხელახლა ცდა",
    tutor: "რეპეტიტორი",
  },
  en: {
    notFound: "Tutor not found",
    back: "← Back to Tutors",
    myJobs: "← Back to My Jobs",
    sentInterests: "← Back to Sent Interests",
    loading: "Loading...",
    lessonPrice: "Lesson price",
    message: "Message",
    contact: "Contact",
    contactTitle: "Contact Information",
    contactLocked: "Please log in to view contact details.",
    contactUnlocked: "Specialist contact information",
    contactUnavailable: "Contact details are unavailable. You can message the specialist using the in-app chat.",
    close: "Close",
    phoneHidden: "Phone number is hidden.",
    emailHidden: "Email address is hidden.",
    login: "Login",
    register: "Register",
    phone: "Phone",
    email: "Email",
    about: "About the Tutor",
    subject: "Subject",
    experience: "Experience",
    noReviews: "No reviews yet",
    hourly: "hour",
    daily: "day",
    biweekly: "2 weeks",
    monthly: "month",
    currency: "GEL",
    interestTitle: "Interested in this specialist?",
    interestDescription:
      "Send an interest to this tutor for one of your matching job posts.",
    sendInterest: "Send Interest",
    chooseJob: "Choose a job post",
    selectJob: "Select a job",
    send: "Send",
    cancel: "Cancel",
    interestSent: "Interest sent successfully.",
    alreadySent: "You have already sent interest to this specialist.",
    noJobs: "You do not have an active tutor job post yet.",
    createJob: "Create Job Post",
    clientOnly: "Only employers can send interest.",
    ownProfile: "You cannot send interest to your own profile.",
    loginToSend: "Log in to send interest.",
    shareContactTitle: "Share contact information",
    shareEmail: "Show my email",
    sharePhone: "Show my phone",
    shareContactNote: "Select only the information you want to share.",
    noPhone: "No phone number is saved on your account.",
    noEmail: "No email address is saved on your account.",
    error: "The operation failed.",
    retry: "Try again",
    tutor: "Tutor",
  },
  ru: {
    notFound: "Репетитор не найден",
    back: "← Назад к репетиторам",
    myJobs: "← К моим объявлениям",
    sentInterests: "← К отправленным предложениям",
    loading: "Загрузка...",
    lessonPrice: "Стоимость занятия",
    message: "Сообщение",
    contact: "Связаться",
    contactTitle: "Контактная информация",
    contactLocked: "Войдите в аккаунт для просмотра контактов.",
    contactUnlocked: "Контактная информация специалиста",
    contactUnavailable: "Контактная информация недоступна. Вы можете написать специалисту во внутреннем чате.",
    close: "Закрыть",
    phoneHidden: "Номер телефона скрыт.",
    emailHidden: "Электронная почта скрыта.",
    login: "Войти",
    register: "Регистрация",
    phone: "Телефон",
    email: "Эл. почта",
    about: "О репетиторе",
    subject: "Предмет",
    experience: "Опыт",
    noReviews: "Пока нет отзывов",
    hourly: "час",
    daily: "день",
    biweekly: "2 недели",
    monthly: "месяц",
    currency: "GEL",
    interestTitle: "Заинтересованы в этом специалисте?",
    interestDescription:
      "Отправьте предложение репетитору по подходящему объявлению.",
    sendInterest: "Отправить предложение",
    chooseJob: "Выберите объявление",
    selectJob: "Выберите работу",
    send: "Отправить",
    cancel: "Отмена",
    interestSent: "Предложение успешно отправлено.",
    alreadySent: "Вы уже отправили предложение этому специалисту.",
    noJobs: "У вас пока нет активного объявления для репетитора.",
    createJob: "Создать объявление",
    clientOnly: "Отправлять предложения могут только работодатели.",
    ownProfile: "Нельзя отправить предложение самому себе.",
    loginToSend: "Войдите в аккаунт для отправки предложения.",
    shareContactTitle: "Поделиться контактной информацией",
    shareEmail: "Показать мою эл. почту",
    sharePhone: "Показать мой телефон",
    shareContactNote: "Выберите данные, которыми хотите поделиться.",
    noPhone: "В аккаунте нет номера телефона.",
    noEmail: "В аккаунте нет электронной почты.",
    error: "Не удалось выполнить операцию.",
    retry: "Повторить",
    tutor: "Репетитор",
  },
};

const normalizeService = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/-/g, "");

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("careGeorgiaUser") || "null");
  } catch {
    return null;
  }
}

function TutorProfile() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;
  const token = localStorage.getItem("careGeorgiaToken");
  const currentUser = getCurrentUser();
  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");
  const isLoggedIn = Boolean(token);
  const isClient = currentUser?.accountType === "client";

  const returnFrom = location.state?.from;
  const backPath =
    returnFrom === "my-jobs"
      ? "/my-jobs"
      : returnFrom === "sent-interests"
        ? "/sent-interests"
        : "/tutors";

  const backText =
    returnFrom === "my-jobs"
      ? t.myJobs
      : returnFrom === "sent-interests"
        ? t.sentInterests
        : t.back;

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [sentInterests, setSentInterests] = useState([]);

  const [applications, setApplications] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const [showInterestBox, setShowInterestBox] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [shareEmail, setShareEmail] = useState(false);
  const [sharePhone, setSharePhone] = useState(false);
  const [sending, setSending] = useState(false);
  const [startingChat, setStartingChat] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadTutor = async () => {
      setLoading(true);
      setProfileError("");

      try {
        const response = await fetch(
          `${API}/api/specialists/${encodeURIComponent(id)}`,
        );
        const data = await response.json();

        if (!response.ok || !data.specialist) {
          throw new Error(data.message || t.notFound);
        }

        if (
          normalizeService(data.specialist.profession) !== "tutor" ||
          data.specialist.status !== "active"
        ) {
          throw new Error(t.notFound);
        }

        if (!cancelled) setTutor(data.specialist);
      } catch (error) {
        if (!cancelled) {
          setTutor(null);
          setProfileError(error.message || t.error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTutor();

    return () => {
      cancelled = true;
    };
  }, [id, language]);

  useEffect(() => {
    if (!isLoggedIn || !isClient || !currentUserId || !token) {
      setJobs([]);
      setSentInterests([]);
      return;
    }

    let cancelled = false;

    const loadEmployerData = async () => {
      setJobsLoading(true);

      try {
        const [jobsResponse, interestsResponse] = await Promise.all([
          fetch(`${API}/api/jobs`),
          fetch(`${API}/api/interests/sent`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const jobsData = await jobsResponse.json();
        const interestsData = await interestsResponse.json();

        if (!cancelled) {
          setJobs(
            jobsResponse.ok && Array.isArray(jobsData.jobs)
              ? jobsData.jobs
              : [],
          );
          setSentInterests(
            interestsResponse.ok && Array.isArray(interestsData.interests)
              ? interestsData.interests
              : [],
          );
        }
      } catch (error) {
        console.error("LOAD TUTOR INTEREST DATA:", error);
        if (!cancelled) {
          setJobs([]);
          setSentInterests([]);
        }
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    };

    loadEmployerData();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, isClient, currentUserId, token]);

  useEffect(() => {
  if (!token || !isClient) {
    setApplications([]);
    return;
  }

  let cancelled = false;

  const loadApplications = async () => {
    try {
      const response = await fetch(
        `${API}/api/applications/received`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "შეცდომა");
      }

      if (!cancelled) {
        setApplications(
          Array.isArray(data.applications)
            ? data.applications
            : []
        );
      }
    } catch (error) {
      console.error("Tutor applications:", error);
    }
  };

  loadApplications();

  return () => {
    cancelled = true;
  };
}, [token, isClient]);

  const ownerId = tutor?.ownerId;

  const isOwnProfile =
    Boolean(ownerId && currentUserId) &&
    String(ownerId) === String(currentUserId);

    const employerApplications = applications.filter((application) => {
  const applicantId =
    application.applicantUserId ||
    application.applicant?.userId ||
    application.applicant_id;

  const matchingJob = jobs.find(
    (job) => String(job.id) === String(application.jobId)
  );

  return (
    String(applicantId) === String(ownerId) &&
    (
      application.job?.service === "tutor" ||
      matchingJob?.service === "tutor"
    )
  );
});

  const matchingJobs = jobs.filter(
    (job) =>
      String(job.ownerId) === String(currentUserId) &&
      normalizeService(job.service) === "tutor" &&
      job.status === "active",
  );

  const hasSentInterest = sentInterests.some(
    (interest) =>
      String(interest.specialistId) === String(ownerId) &&
      normalizeService(interest.job?.service) === "tutor",
  );

  const availableJobs = hasSentInterest ? [] : matchingJobs;

  const getCityName = (city) => t[city] || city || "—";

  const getPaymentTypeName = (paymentType) => {
    if (paymentType === "monthly") return t.monthly;
    if (paymentType === "biweekly") return t.biweekly;
    if (paymentType === "daily") return t.daily;
    return t.hourly;
  };

  const resetInterestForm = () => {
    setSelectedJobId("");
    setShareEmail(false);
    setSharePhone(false);
  };

  const handleOpenInterest = () => {
    if (!isLoggedIn) {
      alert(t.loginToSend);
      return;
    }
    if (!isClient) {
      alert(t.clientOnly);
      return;
    }
    if (isOwnProfile) {
      alert(t.ownProfile);
      return;
    }
    setShowInterestBox(true);
  };

  const handleSendInterest = async () => {
    if (!selectedJobId || !ownerId || !token || sending) return;

    const selectedJob = availableJobs.find(
      (job) => String(job.id) === String(selectedJobId),
    );
    if (!selectedJob) return;

    setSending(true);

    try {
      const response = await fetch(`${API}/api/interests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
          specialistId: ownerId,
          showSenderEmail: shareEmail,
          showSenderPhone: sharePhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      setSentInterests((previous) => [
        ...previous,
        {
          ...data.interest,
          specialistId: ownerId,
          job: { service: "tutor" },
        },
      ]);

      setShowInterestBox(false);
      resetInterestForm();
      alert(data.message || t.interestSent);
    } catch (error) {
      alert(error.message || t.error);
    } finally {
      setSending(false);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
  if (!token || updatingId) return;

  setUpdatingId(applicationId);

  try {
    const response = await fetch(
      `${API}/api/applications/${applicationId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "სტატუსის შეცვლა ვერ მოხერხდა."
      );
    }

    setApplications((previous) =>
      previous.map((application) =>
        String(application.id) === String(applicationId)
          ? { ...application, status }
          : application
      )
    );
  } catch (error) {
    alert(error.message || "შეცდომა");
  } finally {
    setUpdatingId(null);
  }
};

  const handleStartChat = async () => {
    if (!isLoggedIn || !token) {
      navigate("/login");
      return;
    }

    if (!ownerId || isOwnProfile || startingChat) return;

    setStartingChat(true);

    try {
      const response = await fetch(`${API}/api/messages/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ providerId: ownerId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      const conversationId =
        data.conversation?.id || data.conversationId || data.id;

      if (!conversationId) {
        throw new Error(t.error);
      }

      navigate(`/messages/${conversationId}`);
    } catch (error) {
      alert(error.message || t.error);
    } finally {
      setStartingChat(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p>{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="profile-not-found">
        <h1>{profileError || t.notFound}</h1>
        <Link to={backPath}>{backText}</Link>
      </div>
    );
  }

  const firstName = tutor.firstName || "";
  const lastInitial = tutor.lastName ? `${tutor.lastName.charAt(0)}.` : "";

  const tutorName = `${firstName} ${lastInitial}`.trim() || t.tutor;

  const tutorPrice = `${Number(tutor.priceValue || 0)} ${
    t.currency
  } / ${getPaymentTypeName(tutor.paymentType)}`;

  const phoneCanBeShown =
    isLoggedIn && tutor.showPhone === true && Boolean(tutor.phone);

  const emailCanBeShown =
    isLoggedIn && tutor.showEmail === true && Boolean(tutor.email);


  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to={backPath} className="profile-back">
          {backText}
        </Link>

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">📚</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{tutorName}</h1>

                {tutor.verified === true && (
                  <span className="profile-verified">✓ ვერიფიცირებული</span>
                )}
              </div>

              <p className="profile-location">📍 {getCityName(tutor.city)}</p>

              <p>🎓 {t.tutor}</p>

              <div className="profile-rating">
                {tutor.rating !== null &&
                tutor.rating !== undefined &&
                tutor.rating !== "" ? (
                  <>
                    ⭐ {tutor.rating}
                    <span> ({tutor.reviews || 0} შეფასება)</span>
                  </>
                ) : (
                  t.noReviews
                )}
              </div>
            </div>
          </div>

          <div className="profile-action">
            <span>{t.lessonPrice}</span>
            <strong>{tutorPrice}</strong>

            {!isOwnProfile && (
              <button
                type="button"
                className="contact-btn"
                onClick={() => setShowContactModal(true)}
              >
                📞 {t.contact}
              </button>
            )}

            {!isOwnProfile && (
              <button
                type="button"
                className="message-btn"
                onClick={handleStartChat}
                disabled={startingChat}
              >
                💬 {t.message}
              </button>
            )}
          </div>
        </div>

        {isLoggedIn && isClient && employerApplications.length > 0 && (
  <section
    style={{
      background: "#fff",
      padding: 24,
      borderRadius: 16,
      marginBottom: 24,
      border: "1px solid #bfdbfe",
    }}
  >
    <h2>📩 კანდიდატის განაცხადის მართვა</h2>
    <p>ამ რეპეტიტორმა თქვენს განცხადებაზე განაცხადი გამოგიგზავნათ.</p>

    {employerApplications.map((application) => {
      const job = jobs.find(
        (item) => String(item.id) === String(application.jobId)
      );

      const status = application.status || "pending";

      const nextStatuses =
        status === "pending"
          ? ["reviewed"]
          : status === "reviewed"
            ? ["next-stage", "not-selected"]
            : status === "next-stage"
              ? ["completed", "not-selected"]
              : [];

      const statusLabels = {
        pending: "ახალი განაცხადი",
        reviewed: "განხილულია",
        "next-stage": "შემდეგ ეტაპზეა",
        completed: "დასრულებულია",
        "not-selected": "არ შეირჩა",
      };

      const buttonLabels = {
        reviewed: "განხილულად მონიშვნა",
        "next-stage": "შემდეგ ეტაპზე გადაყვანა",
        "not-selected": "სხვა კანდიდატებთან გაგრძელება",
        completed: "განხილვის დასრულება",
      };

      return (
        <div
          key={application.id}
          style={{
            padding: 16,
            marginTop: 14,
            background: "#f8fafc",
            borderRadius: 12,
          }}
        >
          <strong>💼 სამუშაო</strong>

          <p>
            📚 {job?.description || application.job?.description || "რეპეტიტორი"}
          </p>

          <p>
            <strong>განაცხადის სტატუსი:</strong>{" "}
            {statusLabels[status] || status}
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {nextStatuses.map((nextStatus) => (
              <button
                key={nextStatus}
                type="button"
                disabled={updatingId === application.id}
                onClick={() =>
                  updateApplicationStatus(application.id, nextStatus)
                }
                style={{
                  padding: "11px 16px",
                  border: 0,
                  borderRadius: 9,
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {buttonLabels[nextStatus]}
              </button>
            ))}
          </div>
        </div>
      );
    })}
  </section>
)}

        {!isOwnProfile && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #bfdbfe",
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >
            <h2>💼 {t.interestTitle}</h2>
            <p>{t.interestDescription}</p>

            {!isLoggedIn ? (
              <p>
                🔒 {t.loginToSend} <Link to="/login">{t.login}</Link>
              </p>
            ) : !isClient ? (
              <p>{t.clientOnly}</p>
            ) : jobsLoading ? (
              <p>{t.loading}</p>
            ) : hasSentInterest ? (
              <p style={{ color: "#166534" }}>✅ {t.alreadySent}</p>
            ) : matchingJobs.length === 0 ? (
              <div>
                <p>{t.noJobs}</p>
                <Link to="/post-job">+ {t.createJob}</Link>
              </div>
            ) : !showInterestBox ? (
              <button
                type="button"
                onClick={handleOpenInterest}
                style={{
                  padding: "12px 18px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                💼 {t.sendInterest}
              </button>
            ) : (
              <div
                style={{
                  padding: "18px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
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

                <div
                  style={{
                    padding: "15px",
                    background: "#eff6ff",
                    borderRadius: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <strong>📇 {t.shareContactTitle}</strong>
                  <p>{t.shareContactNote}</p>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={shareEmail}
                      disabled={!currentUser?.email}
                      onChange={(event) => setShareEmail(event.target.checked)}
                    />{" "}
                    ✉️ {t.shareEmail}
                  </label>

                  {!currentUser?.email && <p>{t.noEmail}</p>}

                  <label style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={sharePhone}
                      disabled={!currentUser?.phone}
                      onChange={(event) => setSharePhone(event.target.checked)}
                    />{" "}
                    📞 {t.sharePhone}
                  </label>

                  {!currentUser?.phone && <p>{t.noPhone}</p>}
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
                    disabled={!selectedJobId || sending}
                    style={{
                      padding: "11px 16px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    📩 {sending ? t.loading : t.send}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowInterestBox(false);
                      resetInterestForm();
                    }}
                    style={{
                      padding: "11px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "25px",
          }}
        >
          <h2>📞 {t.contactTitle}</h2>

          {!isLoggedIn ? (
            <div>
              <p>🔒 {t.contactLocked}</p>
              <Link to="/login">{t.login}</Link>
              {" · "}
              <Link to="/register">{t.register}</Link>
            </div>
          ) : (
            <div>
              <p>{t.contactUnlocked}</p>

              <p>
                <strong>{t.phone}:</strong>{" "}
                {phoneCanBeShown ? tutor.phone : t.phoneHidden}
              </p>

              <p>
                <strong>{t.email}:</strong>{" "}
                {emailCanBeShown ? tutor.email : t.emailHidden}
              </p>
            </div>
          )}
        </div>

        {showContactModal && (
          <div
            role="presentation"
            onClick={() => setShowContactModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(15, 23, 42, 0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="tutor-contact-title"
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "440px",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <h2 id="tutor-contact-title" style={{ margin: 0 }}>📞 {t.contactTitle}</h2>
                <button type="button" onClick={() => setShowContactModal(false)} aria-label={t.close} style={{ border: 0, background: "transparent", fontSize: "22px", cursor: "pointer" }}>×</button>
              </div>

              <p style={{ color: "#64748b", marginTop: "16px" }}>{tutor.firstName || t.tutor} {tutor.lastName || ""}</p>

              {!isLoggedIn ? (
                <div>
                  <p>🔒 {t.contactLocked}</p>
                  <Link to="/login" onClick={() => setShowContactModal(false)}>{t.login}</Link>
                  {" · "}
                  <Link to="/register" onClick={() => setShowContactModal(false)}>{t.register}</Link>
                </div>
              ) : (
                <div>
                  {phoneCanBeShown && (
                    <p><strong>📞 {t.phone}:</strong> {tutor.phone}</p>
                  )}
                  {emailCanBeShown && (
                    <p><strong>✉️ {t.email}:</strong> {tutor.email}</p>
                  )}
                  {!phoneCanBeShown && !emailCanBeShown && (
                    <p>{t.contactUnavailable}</p>
                  )}
                  {!isOwnProfile && (
                    <button
                      type="button"
                      className="message-btn"
                      onClick={handleStartChat}
                      disabled={startingChat}
                      style={{ marginTop: "12px" }}
                    >
                      💬 {startingChat ? t.loading : t.message}
                    </button>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                style={{ marginTop: "18px", padding: "10px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer" }}
              >
                {t.close}
              </button>
            </section>
          </div>
        )}

        <div className="profile-about">
          <h2>{t.about}</h2>
          <p>{tutor.description || "—"}</p>

          <div className="profile-stats">
            <div>
              <span>📍</span>
              <p>{t.contactTitle}</p>
              <strong>{getCityName(tutor.city)}</strong>
            </div>

            <div>
              <span>🎓</span>
              <p>{t.experience}</p>
              <strong>{tutor.experience || "—"}</strong>
            </div>

            <div>
              <span>📚</span>
              <p>{t.subject}</p>
              <strong>{tutor.ageGroupsText || "—"}</strong>
            </div>
            <div>
              <span>⭐</span>
              <p>რეიტინგი</p>
              <strong>
                {tutor.rating !== null &&
                tutor.rating !== undefined &&
                tutor.rating !== ""
                  ? `${tutor.rating} / 5`
                  : "ჯერ არ არის შეფასებული"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
