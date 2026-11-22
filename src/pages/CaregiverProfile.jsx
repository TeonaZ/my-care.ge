import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./DriverProfile.css";

const API = "http://localhost:5000/api";

const translations = {
  ka: {
    closeContact: "დახურვა", contactUnavailable: "საკონტაქტო ინფორმაცია მითითებული არ არის ან სპეციალისტმა დამალა.", contactChatHint: "სპეციალისტს შეგიძლიათ მიწეროთ საიტის შიდა ჩატით.",
    back: "← მომვლელებზე დაბრუნება", notFound: "მომვლელი ვერ მოიძებნა",
    loading: "პროფილი იტვირთება...", error: "მონაცემების ჩატვირთვა ვერ მოხერხდა.",
    verified: "✓ ვერიფიცირებული", noReviews: "ჯერ არ არის შეფასებული",
    reviews: "შეფასება", price: "მომსახურების ფასი", contact: "დაკავშირება",
    message: "შეტყობინება", contactTitle: "საკონტაქტო ინფორმაცია",
    contactLocked: "დასაკავშირებლად გაიარეთ რეგისტრაცია ან შედით ანგარიშზე.",
    phoneHidden: "ტელეფონის ნომერი სპეციალისტმა დამალა.",
    emailHidden: "ელ. ფოსტა სპეციალისტმა დამალა.",
    login: "შესვლა", register: "რეგისტრაცია", phone: "ტელეფონი",
    email: "ელ. ფოსტა", about: "ჩემ შესახებ", experience: "გამოცდილება",
    city: "ქალაქი", employment: "განაკვეთი", rating: "რეიტინგი",
    fullTime: "სრული განაკვეთი", partTime: "ნახევარი განაკვეთი",
    hourly: "საათი", daily: "დღე", biweekly: "2 კვირა", monthly: "თვე",
    currency: "₾", interestTitle: "დაინტერესებული ხართ ამ სპეციალისტით?",
    interestDescription: "გაუგზავნეთ მომვლელს დაინტერესება თქვენი სამუშაოს განცხადებისთვის.",
    sendInterest: "დაინტერესების გაგზავნა", chooseJob: "აირჩიეთ განცხადება",
    selectJob: "აირჩიეთ განცხადება", send: "გაგზავნა", cancel: "გაუქმება",
    interestSent: "დაინტერესება წარმატებით გაიგზავნა.",
    alreadySent: "ამ მომვლელისთვის დაინტერესება უკვე გაგზავნილია.",
    noJobs: "ჯერ შექმენით მომვლელის შესაბამისი სამუშაოს განცხადება.",
    noMoreJobs: "ამ მომვლელისთვის დაინტერესება უკვე გაგზავნილია.",
    createJob: "სამუშაოს განცხადების შექმნა",
    clientOnly: "დაინტერესების გაგზავნა შეუძლია მხოლოდ დამსაქმებელს.",
    ownProfile: "საკუთარ პროფილზე დაინტერესებას ვერ გაგზავნით.",
    loginToSend: "შედით დამსაქმებლის ანგარიშში.",
    shareContactTitle: "საკონტაქტო ინფორმაციის გაზიარება",
    shareEmail: "ჩემი ელ. ფოსტის ჩვენება", sharePhone: "ჩემი ტელეფონის ჩვენება",
    noPhone: "ანგარიშზე ტელეფონის ნომერი მითითებული არ არის.",
    applicationManagement: "კანდიდატის განაცხადის მართვა",
    applicationDescription: "ამ მომვლელმა თქვენს განცხადებაზე განაცხადი გამოგიგზავნათ.",
    applicationJob: "სამუშაო", applicationStatus: "განაცხადის სტატუსი",
    pending: "ახალი განაცხადი", reviewed: "განხილულია",
    "next-stage": "შემდეგ ეტაპზეა", completed: "დასრულებულია",
    "not-selected": "არ შეირჩა",
    markReviewed: "განხილულად მონიშვნა", moveNextStage: "შემდეგ ეტაპზე გადაყვანა",
    continueOthers: "სხვა კანდიდატებთან გაგრძელება",
    completeReview: "განხილვის დასრულება",
    statusError: "სტატუსის შეცვლა ვერ მოხერხდა.",
  },
  en: {
    closeContact: "Close", contactUnavailable: "Contact details are unavailable or hidden by the specialist.", contactChatHint: "You can contact the specialist through the internal chat.",
    back: "← Back to Caregivers", notFound: "Caregiver not found",
    loading: "Loading profile...", error: "Could not load data.",
    verified: "✓ Verified", noReviews: "No reviews yet", reviews: "reviews",
    price: "Service price", contact: "Contact", message: "Message",
    contactTitle: "Contact information", contactLocked: "Log in to contact this caregiver.",
    phoneHidden: "The specialist has hidden their phone number.",
    emailHidden: "The specialist has hidden their email.",
    login: "Login", register: "Register", phone: "Phone", email: "Email",
    about: "About me", experience: "Experience", city: "City",
    employment: "Employment type", rating: "Rating",
    fullTime: "Full-time", partTime: "Part-time",
    hourly: "hour", daily: "day", biweekly: "2 weeks", monthly: "month",
    currency: "GEL", interestTitle: "Interested in this specialist?",
    interestDescription: "Send an invitation for one of your job posts.",
    sendInterest: "Send interest", chooseJob: "Choose a job",
    selectJob: "Select a job", send: "Send", cancel: "Cancel",
    interestSent: "Interest sent successfully.",
    alreadySent: "You have already sent interest to this caregiver.",
    noJobs: "Create a matching caregiver job post first.",
    noMoreJobs: "Interest has already been sent to this caregiver.",
    createJob: "Create job post", clientOnly: "Only employers can send interest.",
    ownProfile: "You cannot send interest to your own profile.",
    loginToSend: "Log in as an employer.",
    shareContactTitle: "Share contact details", shareEmail: "Show my email",
    sharePhone: "Show my phone", noPhone: "No phone number on your account.",
    applicationManagement: "Manage candidate application",
    applicationDescription: "This caregiver applied to one of your jobs.",
    applicationJob: "Job", applicationStatus: "Application status",
    pending: "New application", reviewed: "Reviewed",
    "next-stage": "Next stage", completed: "Completed",
    "not-selected": "Not selected",
    markReviewed: "Mark reviewed", moveNextStage: "Move to next stage",
    continueOthers: "Continue with others", completeReview: "Complete review",
    statusError: "Could not update status.",
  },
  ru: {
    closeContact: "Закрыть", contactUnavailable: "Контактные данные не указаны или скрыты специалистом.", contactChatHint: "Вы можете написать специалисту во внутреннем чате сайта.",
    back: "← Назад к сиделкам", notFound: "Сиделка не найден",
    loading: "Загрузка профиля...", error: "Не удалось загрузить данные.",
    verified: "✓ Проверенный", noReviews: "Пока нет отзывов",
    reviews: "отзывов", price: "Стоимость услуги", contact: "Связаться",
    message: "Сообщение", contactTitle: "Контактная информация",
    contactLocked: "Войдите в аккаунт, чтобы связаться с сиделкем.",
    phoneHidden: "Специалист скрыл номер телефона.",
    emailHidden: "Специалист скрыл адрес почты.",
    login: "Войти", register: "Регистрация", phone: "Телефон",
    email: "Эл. почта", about: "Обо мне", experience: "Опыт",
    city: "Город", employment: "Занятость", rating: "Рейтинг",
    fullTime: "Полная занятость", partTime: "Частичная занятость",
    hourly: "час", daily: "день", biweekly: "2 недели", monthly: "месяц",
    currency: "GEL", interestTitle: "Заинтересованы в специалисте?",
    interestDescription: "Отправьте приглашение по вашему объявлению.",
    sendInterest: "Отправить предложение", chooseJob: "Выберите объявление",
    selectJob: "Выберите объявление", send: "Отправить", cancel: "Отмена",
    interestSent: "Предложение отправлено.",
    alreadySent: "Предложение этому сиделке уже отправлено.",
    noJobs: "Сначала создайте подходящее объявление для сиделкя.",
    noMoreJobs: "Предложение этому сиделке уже отправлено.",
    createJob: "Создать объявление",
    clientOnly: "Отправлять предложения могут только работодатели.",
    ownProfile: "Нельзя отправить предложение самому себе.",
    loginToSend: "Войдите как работодатель.",
    shareContactTitle: "Поделиться контактами", shareEmail: "Показать email",
    sharePhone: "Показать телефон", noPhone: "В аккаунте нет номера телефона.",
    applicationManagement: "Управление заявкой",
    applicationDescription: "Этот сиделкь откликнулся на вашу вакансию.",
    applicationJob: "Работа", applicationStatus: "Статус заявки",
    pending: "Новая заявка", reviewed: "Рассмотрена",
    "next-stage": "Следующий этап", completed: "Завершена",
    "not-selected": "Не выбран",
    markReviewed: "Отметить рассмотренной", moveNextStage: "Следующий этап",
    continueOthers: "Продолжить с другими", completeReview: "Завершить",
    statusError: "Не удалось изменить статус.",
  },
};

const cityNames = {
  tbilisi: { ka: "თბილისი", en: "Tbilisi", ru: "Тбилиси" },
  batumi: { ka: "ბათუმი", en: "Batumi", ru: "Батуми" },
  kutaisi: { ka: "ქუთაისი", en: "Kutaisi", ru: "Кутаиси" },
  rustavi: { ka: "რუსთავი", en: "Rustavi", ru: "Рустави" },
  gori: { ka: "გორი", en: "Gori", ru: "Гори" },
  zugdidi: { ka: "ზუგდიდი", en: "Zugdidi", ru: "Зугдиди" },
};

function CaregiverProfile() {
  const { id } = useParams();
  const location = useLocation();
  const { language } = useLanguage();
  const lang = translations[language] ? language : "ka";
  const t = translations[lang];
  const token = localStorage.getItem("careGeorgiaToken");
  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("careGeorgiaUser") || "null");
  } catch {
    currentUser = null;
  }
  const isLoggedIn = Boolean(token);
  const isClient = currentUser?.accountType === "client";

  const returnFrom = location.state?.from;
  const backPath =
    returnFrom === "my-jobs" ? "/my-jobs" :
    returnFrom === "sent-interests" ? "/sent-interests" :
    returnFrom === "received-applications" ? "/received-applications" : "/caregivers";

  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [interests, setInterests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showInterestBox, setShowInterestBox] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [shareEmail, setShareEmail] = useState(false);
  const [sharePhone, setSharePhone] = useState(false);
  const [sendingInterest, setSendingInterest] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const cityName = (city) => cityNames[city]?.[lang] || city || "—";
  const paymentName = (payment) => t[payment] || t.hourly;

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API}/specialists/${encodeURIComponent(id)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || t.notFound);
        const profile = data.profile || data.specialist || data;
        if (!profile || profile.profession !== "caregiver" || profile.status === "inactive") {
          throw new Error(t.notFound);
        }
        if (!cancelled) setCaregiver(profile);
      } catch (err) {
        if (!cancelled) {
          setCaregiver(null);
          setError(err.message || t.error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProfile();
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    async function loadJobs() {
      try {
        const response = await fetch(`${API}/jobs`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        if (!cancelled) setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (err) {
        console.error("Caregiver jobs:", err);
        if (!cancelled) setJobs([]);
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    }
    loadJobs();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!token || !isClient) {
      setInterests([]);
      setApplications([]);
      return;
    }
    let cancelled = false;
    async function loadEmployerData() {
      const headers = { Authorization: `Bearer ${token}` };
      const [interestsResult, applicationsResult] = await Promise.allSettled([
        fetch(`${API}/interests/sent`, { headers }),
        fetch(`${API}/applications/received`, { headers }),
      ]);
      if (interestsResult.status === "fulfilled" && interestsResult.value.ok) {
        const data = await interestsResult.value.json();
        if (!cancelled) setInterests(Array.isArray(data.interests) ? data.interests : []);
      }
      if (applicationsResult.status === "fulfilled" && applicationsResult.value.ok) {
        const data = await applicationsResult.value.json();
        if (!cancelled) setApplications(Array.isArray(data.applications) ? data.applications : []);
      }
    }
    loadEmployerData().catch((err) => console.error("Caregiver employer data:", err));
    return () => { cancelled = true; };
  }, [token, isClient]);

  if (loading) return <div className="profile-not-found"><p>{t.loading}</p></div>;
  if (!caregiver) {
    return (
      <div className="profile-not-found">
        <h1>{error || t.notFound}</h1>
        <Link to={backPath}>{t.back}</Link>
      </div>
    );
  }

  const ownerId = caregiver.ownerId;
  const name = `${caregiver.firstName || ""} ${caregiver.lastName ? `${caregiver.lastName.charAt(0)}.` : ""}`.trim() || (lang === "ka" ? "მომვლელი" : lang === "ru" ? "Сиделка" : "Caregiver");
  const isOwnProfile = String(ownerId) === String(currentUserId);
  const phoneVisible = isLoggedIn && caregiver.showPhone === true && Boolean(caregiver.phone);
  const emailVisible = isLoggedIn && caregiver.showEmail === true && Boolean(caregiver.email);
  const hasRating = caregiver.rating !== null && caregiver.rating !== undefined && caregiver.rating !== "";
  const price = `${Number(caregiver.priceValue) || 0} ${t.currency} / ${paymentName(caregiver.paymentType)}`;
  const myJobs = jobs.filter((job) =>
    String(job.ownerId) === String(currentUserId) &&
    job.service === "caregiver" && job.status === "active"
  );
  const alreadyInterested = interests.some((interest) =>
    String(interest.senderId) === String(currentUserId) &&
    String(interest.specialistId) === String(ownerId) &&
    interest.job?.service === "caregiver"
  );
  const employerApplications = applications.filter((application) =>
    String(application.applicantUserId || application.applicant?.userId || application.applicant_id) === String(ownerId) &&
    (application.job?.service === "caregiver" || jobs.some((job) =>
      String(job.id) === String(application.jobId) && job.service === "caregiver"))
  );

  const handleStartChat = async () => {
    if (!token) { alert(t.contactLocked); return; }
    if (!isClient) { alert(t.clientOnly); return; }
    if (!ownerId || isOwnProfile) { alert(t.ownProfile); return; }
    try {
      const response = await fetch(`${API}/messages/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ providerId: ownerId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || t.error);
      window.location.href = `/messages/${data.conversationId}`;
    } catch (err) { alert(err.message); }
  };

  const handleSendInterest = async () => {
    if (!selectedJobId || sendingInterest || alreadyInterested || !isClient || isOwnProfile) return;
    setSendingInterest(true);
    try {
      const response = await fetch(`${API}/interests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          jobId: String(selectedJobId), specialistId: String(ownerId),
          showSenderEmail: shareEmail, showSenderPhone: sharePhone,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 409 ? t.alreadySent : data.message || t.error);
      if (data.interest) setInterests((prev) => [data.interest, ...prev]);
      setShowInterestBox(false);
      setSelectedJobId("");
      setShareEmail(false);
      setSharePhone(false);
      window.dispatchEvent(new Event("careGeorgiaInterestsUpdated"));
      alert(t.interestSent);
    } catch (err) { alert(err.message); }
    finally { setSendingInterest(false); }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    setUpdatingId(applicationId);
    try {
      const response = await fetch(`${API}/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || t.statusError);
      setApplications((prev) => prev.map((app) =>
        String(app.id) === String(applicationId) ? { ...app, status } : app
      ));
    } catch (err) { alert(err.message); }
    finally { setUpdatingId(null); }
  };

  const actionStyle = {
    padding: "11px 16px", border: 0, borderRadius: 9,
    backgroundColor: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: 700,
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to={backPath} className="profile-back">{t.back}</Link>

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">👵</div>
            <div className="profile-details">
              <div className="profile-name">
                <h1>{name}</h1>
                {caregiver.verified === true && <span className="profile-verified">{t.verified}</span>}
              </div>
              <p className="profile-location">📍 {cityName(caregiver.city)}</p>
              <p>🕒 {caregiver.employmentType === "full-time" ? t.fullTime : t.partTime}</p>
              <div className="profile-rating">
                {hasRating ? <>⭐ {caregiver.rating} <span>({caregiver.reviews || 0} {t.reviews})</span></> : t.noReviews}
              </div>
            </div>
          </div>
          <div className="profile-action">
            <span>{t.price}</span>
            <strong>{price}</strong>
            {isLoggedIn && !isOwnProfile && (
              <button type="button" className="contact-btn"
                onClick={() => setShowContactModal(true)}
                style={{ cursor: "pointer", width: "100%" }}>
                📞 {t.contact}
              </button>
            )}
            {isLoggedIn && isClient && !isOwnProfile && ownerId && (
              <button className="message-btn" type="button" onClick={handleStartChat}
                style={{ cursor: "pointer", width: "100%" }}>
                💬 {t.message}
              </button>
            )}
            {!isLoggedIn && <p>🔒 {t.contactLocked}</p>}
          </div>
        </div>

        {showContactModal && isLoggedIn && (
          <div role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowContactModal(false);
          }} style={{ position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(15,23,42,.6)", display: "flex", alignItems: "center",
            justifyContent: "center", padding: 16 }}>
            <section role="dialog" aria-modal="true" aria-label={t.contactTitle}
              style={{ width: "100%", maxWidth: 440, background: "#fff",
                borderRadius: 18, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <h2 style={{ margin: 0 }}>📞 {t.contactTitle}</h2>
                <button type="button" aria-label={t.closeContact}
                  onClick={() => setShowContactModal(false)}
                  style={{ border: 0, background: "transparent", cursor: "pointer", fontSize: 24 }}>×</button>
              </div>
              <p style={{ marginTop: 16, fontWeight: 700 }}>{name}</p>
              {phoneVisible && <p>📞 <strong>{t.phone}:</strong> {caregiver.phone}</p>}
              {emailVisible && <p>✉️ <strong>{t.email}:</strong> {caregiver.email}</p>}
              {!phoneVisible && !emailVisible && (
                <p style={{ color: "#64748b", lineHeight: 1.6 }}>{t.contactUnavailable}</p>
              )}
              {!isOwnProfile && isClient && ownerId && (
                <>
                  <p style={{ color: "#64748b", fontSize: 14 }}>{t.contactChatHint}</p>
                  <button type="button" className="message-btn" onClick={() => {
                    setShowContactModal(false);
                    handleStartChat();
                  }} style={{ width: "100%", cursor: "pointer", marginBottom: 10 }}>
                    💬 {t.message}
                  </button>
                </>
              )}
              <button type="button" onClick={() => setShowContactModal(false)}
                style={{ width: "100%", padding: 11, borderRadius: 9,
                  border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer" }}>
                {t.closeContact}
              </button>
            </section>
          </div>
        )}

        {isLoggedIn && isClient && employerApplications.length > 0 && (
          <section style={{ background: "#fff", padding: 24, borderRadius: 16, marginBottom: 24, border: "1px solid #bfdbfe" }}>
            <h2>📩 {t.applicationManagement}</h2>
            <p>{t.applicationDescription}</p>
            {employerApplications.map((app) => {
              const job = jobs.find((item) => String(item.id) === String(app.jobId));
              const status = app.status || "pending";
              const nextStatuses = status === "pending" ? ["reviewed"] :
                status === "reviewed" ? ["next-stage", "not-selected"] :
                status === "next-stage" ? ["completed", "not-selected"] : [];
              const labels = {
                reviewed: t.markReviewed, "next-stage": t.moveNextStage,
                "not-selected": t.continueOthers, completed: t.completeReview,
              };
              return (
                <div key={app.id} style={{ padding: 16, marginTop: 14, background: "#f8fafc", borderRadius: 12 }}>
                  <strong>💼 {t.applicationJob}</strong>
                  <p>👵 {job?.description || app.job?.description || "Caregiver"} · 📍 {cityName(job?.city || app.job?.city)}</p>
                  <p><strong>{t.applicationStatus}:</strong> {t[status] || status}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {nextStatuses.map((next) => (
                      <button key={next} type="button" style={actionStyle}
                        disabled={updatingId === app.id}
                        onClick={() => updateApplicationStatus(app.id, next)}>
                        {labels[next]}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {isClient && !isOwnProfile && ownerId && (
          <section style={{ background: "#fff", padding: 24, borderRadius: 16, marginBottom: 24, border: "1px solid #bfdbfe" }}>
            <h2>💼 {t.interestTitle}</h2>
            <p>{t.interestDescription}</p>
            {alreadyInterested ? (
              <p>✅ {t.alreadySent}</p>
            ) : jobsLoading ? (
              <p>...</p>
            ) : myJobs.length === 0 ? (
              <p>{t.noJobs} <Link to="/post-job">+ {t.createJob}</Link></p>
            ) : !showInterestBox ? (
              <button type="button" style={actionStyle} onClick={() => setShowInterestBox(true)}>
                💼 {t.sendInterest}
              </button>
            ) : (
              <div>
                <label htmlFor="caregiver-job">{t.chooseJob}</label>
                <select id="caregiver-job" value={selectedJobId}
                  onChange={(event) => setSelectedJobId(event.target.value)}
                  style={{ display: "block", width: "100%", padding: 12, margin: "10px 0 16px" }}>
                  <option value="">{t.selectJob}</option>
                  {myJobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {cityName(job.city)} — {job.budget} {t.currency} / {paymentName(job.paymentType)}
                    </option>
                  ))}
                </select>
                <h3>📇 {t.shareContactTitle}</h3>
                <label style={{ display: "block", marginBottom: 10 }}>
                  <input type="checkbox" checked={shareEmail}
                    onChange={(event) => setShareEmail(event.target.checked)} /> {t.shareEmail}
                </label>
                <label style={{ display: "block", marginBottom: 12 }}>
                  <input type="checkbox" checked={sharePhone} disabled={!currentUser?.phone}
                    onChange={(event) => setSharePhone(event.target.checked)} /> {t.sharePhone}
                </label>
                {!currentUser?.phone && <p>{t.noPhone}</p>}
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" style={actionStyle} disabled={!selectedJobId || sendingInterest}
                    onClick={handleSendInterest}>{t.send}</button>
                  <button type="button" onClick={() => setShowInterestBox(false)}>{t.cancel}</button>
                </div>
              </div>
            )}
          </section>
        )}

        <section style={{ background: "#fff", padding: 24, borderRadius: 16, marginBottom: 24 }}>
          <h2>📞 {t.contactTitle}</h2>
          {!isLoggedIn ? (
            <p>🔒 {t.contactLocked} <Link to="/login">{t.login}</Link> · <Link to="/register">{t.register}</Link></p>
          ) : (
            <>
              <p>{t.phone}: {phoneVisible ?
                <a href={`tel:${String(caregiver.phone).replace(/\s/g, "")}`}>{caregiver.phone}</a> :
                `🔒 ${t.phoneHidden}`}</p>
              <p>{t.email}: {emailVisible ?
                <a href={`mailto:${caregiver.email}`}>{caregiver.email}</a> :
                `🔒 ${t.emailHidden}`}</p>
            </>
          )}
        </section>

        <div className="profile-about">
          <h2>{t.about}</h2>
          <p>{caregiver.description || "—"}</p>
          <div className="profile-stats">
            <div><span>👵</span><p>{t.experience}</p><strong>{caregiver.experience || "—"}</strong></div>
            <div><span>📍</span><p>{t.city}</p><strong>{cityName(caregiver.city)}</strong></div>
            <div><span>🕒</span><p>{t.employment}</p><strong>{caregiver.employmentType === "full-time" ? t.fullTime : t.partTime}</strong></div>
            <div><span>⭐</span><p>{t.rating}</p><strong>{hasRating ? `${caregiver.rating} / 5` : t.noReviews}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaregiverProfile;
