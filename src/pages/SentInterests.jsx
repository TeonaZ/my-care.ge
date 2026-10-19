import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const serviceLabels = {
  ka: {
    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი / რეპეტიტორი",
    housekeeper: "სახლის დამხმარე",
    dogwalker: "ძაღლის გამსეირნებელი",
    "dog-walker": "ძაღლის გამსეირნებელი",
  },
  en: {
    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor / Teacher",
    housekeeper: "Housekeeper",
    dogwalker: "Dog Walker",
    "dog-walker": "Dog Walker",
  },
  ru: {
    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogwalker: "Выгульщик собак",
    "dog-walker": "Выгульщик собак",
  },
};

const cityLabels = {
  ka: {
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",
  },
  en: {
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",
  },
  ru: {
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",
  },
};

const icons = {
  nanny: "👶",
  caregiver: "👵",
  driver: "🚗",
  tutor: "📚",
  housekeeper: "🏠",
  dogwalker: "🐕",
  "dog-walker": "🐕",
};

const tr = {
  ka: {
    title: "გაგზავნილი დაინტერესებები",
    desc: "აქ ჩანს სპეციალისტებისთვის შენ მიერ გაგზავნილი ყველა შეთავაზება.",

    empty: "ჯერ არც ერთი სპეციალისტისთვის არ გაგიგზავნიათ შეთავაზება.",

    waiting: "სპეციალისტის პასუხის მოლოდინში",
    accepted: "სპეციალისტს აინტერესებს შეთავაზება",
    declined: "სპეციალისტს ამ ეტაპზე შეთავაზება არ აინტერესებს",

    specialist: "სპეციალისტი",
    job: "შენი სამუშაოს განცხადება",

    contact: "საკონტაქტო ინფორმაცია",
    email: "ელფოსტა",
    phone: "ტელეფონი",

    noPersonalContact:
      "სპეციალისტს პირადი საკონტაქტო ინფორმაცია გაზიარებული არ აქვს.",

    contactPrivacy:
      "აქ მხოლოდ სპეციალისტის მიერ გაზიარებული საკონტაქტო ინფორმაცია ჩანს.",

    back: "← Care Georgia",
    loading: "იტვირთება...",

    loginRequired:
      "გაგზავნილი დაინტერესებების სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",

    login: "შესვლა",

    loadError: "დაინტერესებების ჩატვირთვა ვერ მოხერხდა.",
    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა.",
  },

  en: {
    title: "Sent Interests",
    desc: "All offers you sent to specialists appear here.",

    empty: "You haven't sent an offer to a specialist yet.",

    waiting: "Waiting for specialist response",
    accepted: "The specialist is interested",
    declined: "The specialist is not interested at this time",

    specialist: "Specialist",
    job: "Your job post",

    contact: "Contact Information",
    email: "Email",
    phone: "Phone",

    noPersonalContact:
      "The specialist has not shared personal contact information.",

    contactPrivacy:
      "Only contact information shared by the specialist is shown here.",

    back: "← Care Georgia",
    loading: "Loading...",

    loginRequired: "You must log in to view your sent interests.",

    login: "Login",

    loadError: "Could not load sent interests.",
    serverError: "Could not connect to the server.",
  },

  ru: {
    title: "Отправленные предложения",
    desc: "Здесь находятся все предложения, которые вы отправили специалистам.",

    empty: "Вы пока не отправляли предложения специалистам.",

    waiting: "Ожидание ответа специалиста",
    accepted: "Специалист заинтересован",
    declined: "Специалист сейчас не заинтересован",

    specialist: "Специалист",
    job: "Ваше объявление о работе",

    contact: "Контактная информация",
    email: "Электронная почта",
    phone: "Телефон",

    noPersonalContact: "Специалист не поделился личной контактной информацией.",

    contactPrivacy:
      "Здесь отображается только контактная информация, которой поделился специалист.",

    back: "← Care Georgia",
    loading: "Загрузка...",

    loginRequired: "Чтобы увидеть отправленные предложения, войдите в аккаунт.",

    login: "Войти",

    loadError: "Не удалось загрузить отправленные предложения.",
    serverError: "Не удалось подключиться к серверу.",
  },
};

export default function SentInterests() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = tr[language] || tr.ka;

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoggedIn = localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const clearLogin = () => {
    localStorage.removeItem("careGeorgiaToken");
    localStorage.removeItem("careGeorgiaLoggedIn");
    localStorage.removeItem("careGeorgiaCurrentUserId");
    localStorage.removeItem("careGeorgiaUser");
  };

  useEffect(() => {
    const loadInterests = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("careGeorgiaToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/interests/sent",
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

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || t.loadError);
          setInterests([]);
          return;
        }

        setInterests(Array.isArray(data.interests) ? data.interests : []);
      } catch (error) {
        console.error("Load sent interests error:", error);

        setErrorMessage(t.serverError);
        setInterests([]);
      } finally {
        setLoading(false);
      }
    };

    loadInterests();
  }, [isLoggedIn, navigate, t.loadError, t.serverError]);

  const getStatusText = (status) => {
    if (status === "accepted") {
      return `💚 ${t.accepted}`;
    }

    if (status === "declined") {
      return `⚪ ${t.declined}`;
    }

    return `⏳ ${t.waiting}`;
  };

  const getStatusBackground = (status) => {
    if (status === "accepted") {
      return "#f0fdf4";
    }

    if (status === "declined") {
      return "#f8fafc";
    }

    return "#fffbeb";
  };

  if (!isLoggedIn) {
    return (
      <div className="drivers-page">
        <div className="drivers-container">
          <Link to="/" className="back-link">
            {t.back}
          </Link>

          <div
            className="driver-card"
            style={{
              maxWidth: "650px",
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

  if (loading) {
    return (
      <div className="drivers-page">
        <div className="drivers-container">
          <div
            className="driver-card"
            style={{
              maxWidth: "650px",
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

        <div className="drivers-heading">
          <div>
            <h1>📤 {t.title}</h1>
            <p>{t.desc}</p>
          </div>
        </div>

        {errorMessage && (
          <div
            className="driver-card"
            style={{
              padding: "18px",
              marginBottom: "20px",
              border: "1px solid #fecaca",
            }}
          >
            <p style={{ margin: 0 }}>{errorMessage}</p>
          </div>
        )}

        {!errorMessage && interests.length === 0 ? (
          <div className="driver-card" style={{ padding: "30px" }}>
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="drivers-grid">
            {interests.map((interest) => {
              const specialist = interest.specialist || {};
              const job = interest.job || {};

              const service = job.service || specialist.profession || "";

              const hasEmail = Boolean(specialist.email);
              const hasPhone = Boolean(specialist.phone);

              const hasPersonalContact = hasEmail || hasPhone;

              return (
                <div className="driver-card" key={interest.id}>
                  <h3>
                    {icons[service] || "👤"}{" "}
                    {specialist.firstName || t.specialist}{" "}
                    {specialist.lastName
                      ? `${specialist.lastName.charAt(0)}.`
                      : ""}
                  </h3>

                  {service && (
                    <p>{serviceLabels[language]?.[service] || service}</p>
                  )}

                  {job.city && (
                    <p>📍 {cityLabels[language]?.[job.city] || job.city}</p>
                  )}

                  {job.service && (
                    <div
                      style={{
                        marginTop: "14px",
                        padding: "12px",
                        background: "#f8fafc",
                        borderRadius: "10px",
                      }}
                    >
                      <strong>💼 {t.job}:</strong>{" "}
                      {serviceLabels[language]?.[job.service] || job.service}
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: "12px",
                      padding: "12px",
                      background: getStatusBackground(interest.status),
                      borderRadius: "10px",
                    }}
                  >
                    {getStatusText(interest.status)}
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      padding: "15px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      background: "#ffffff",
                    }}
                  >
                    <strong>🔐 {t.contact}</strong>

                    {hasPersonalContact ? (
                      <div style={{ marginTop: "10px" }}>
                        {hasEmail && (
                          <p
                            style={{
                              margin: "6px 0",
                            }}
                          >
                            ✉️ {t.email}: <strong>{specialist.email}</strong>
                          </p>
                        )}

                        {hasPhone && (
                          <p
                            style={{
                              margin: "6px 0",
                            }}
                          >
                            📞 {t.phone}: <strong>{specialist.phone}</strong>
                          </p>
                        )}

                        <p
                          style={{
                            margin: "12px 0 0",
                            fontSize: "13px",
                            color: "#64748b",
                            lineHeight: "1.5",
                          }}
                        >
                          🔒 {t.contactPrivacy}
                        </p>
                      </div>
                    ) : (
                      <p
                        style={{
                          margin: "10px 0 0",
                          color: "#64748b",
                          lineHeight: "1.5",
                        }}
                      >
                        🔒 {t.noPersonalContact}
                      </p>
                    )}
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
