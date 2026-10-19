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

const tr = {
  ka: {
    title: "დამსაქმებლის დაინტერესება",
    desc: "აქ ჩანს დამსაქმებლებისგან შენს სპეციალისტის პროფილზე მიღებული შეთავაზებები.",
    empty: "ჯერ არც ერთ დამსაქმებელს არ გამოუგზავნია დაინტერესება.",

    interested: "მაინტერესებს შეთავაზება",
    notInterested: "ამ ეტაპზე არ მაინტერესებს",

    new: "ახალი შეთავაზება",
    accepted: "თქვენ დაადასტურეთ, რომ შეთავაზება გაინტერესებთ.",
    declined: "თქვენ მიუთითეთ, რომ ამ ეტაპზე შეთავაზება არ გაინტერესებთ.",

    contact: "დამსაქმებლის საკონტაქტო ინფორმაცია",
    email: "ელფოსტა",
    phone: "ტელეფონი",

    noContact: "დამსაქმებელს პირადი საკონტაქტო ინფორმაცია გაზიარებული არ აქვს.",

    privacy:
      "აქ მხოლოდ დამსაქმებლის მიერ ამ შეთავაზებისთვის გაზიარებული ინფორმაცია ჩანს.",

    loading: "იტვირთება...",
    back: "← Care Georgia",

    loginRequired:
      "მიღებული დაინტერესებების სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",
    login: "შესვლა",

    loadError: "დაინტერესებების ჩატვირთვა ვერ მოხერხდა.",
    updateError: "პასუხის შენახვა ვერ მოხერხდა.",
    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა.",
  },

  en: {
    title: "Employer Interests",
    desc: "Employer offers sent to your specialist profile appear here.",
    empty: "No employer has sent you an offer yet.",

    interested: "I'm interested",
    notInterested: "Not interested at this time",

    new: "New offer",
    accepted: "You confirmed that you are interested.",
    declined: "You indicated that you are not interested at this time.",

    contact: "Employer Contact Information",
    email: "Email",
    phone: "Phone",

    noContact: "The employer has not shared personal contact information.",

    privacy:
      "Only contact information shared by the employer for this offer is shown here.",

    loading: "Loading...",
    back: "← Care Georgia",

    loginRequired: "You must log in to view received interests.",
    login: "Login",

    loadError: "Could not load received interests.",
    updateError: "Could not save your response.",
    serverError: "Could not connect to the server.",
  },

  ru: {
    title: "Интерес работодателя",
    desc: "Здесь находятся предложения работодателей для вашего профиля специалиста.",
    empty: "Работодатели пока не отправляли вам предложения.",

    interested: "Мне интересно",
    notInterested: "Сейчас не интересно",

    new: "Новое предложение",
    accepted: "Вы подтвердили интерес к предложению.",
    declined: "Вы указали, что предложение сейчас не интересно.",

    contact: "Контактная информация работодателя",
    email: "Электронная почта",
    phone: "Телефон",

    noContact: "Работодатель не поделился личной контактной информацией.",

    privacy:
      "Здесь отображается только контактная информация, которой работодатель поделился для этого предложения.",

    loading: "Загрузка...",
    back: "← Care Georgia",

    loginRequired: "Чтобы увидеть полученные предложения, войдите в аккаунт.",
    login: "Войти",

    loadError: "Не удалось загрузить предложения.",
    updateError: "Не удалось сохранить ответ.",
    serverError: "Не удалось подключиться к серверу.",
  },
};

export default function ReceivedInterests() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = tr[language] || tr.ka;

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

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
        setLoading(true);
        setErrorMessage("");

        // First load interests.
        const response = await fetch(
          "http://localhost:5000/api/interests/received",
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

        const loadedInterests = Array.isArray(data.interests)
          ? data.interests
          : [];

        setInterests(loadedInterests);

        // The provider has now opened this page.
        // Mark all received interests as seen.
        const hasUnseen = loadedInterests.some(
          (interest) => interest.isSeen === false,
        );

        if (hasUnseen) {
          const seenResponse = await fetch(
            "http://localhost:5000/api/interests/received/seen",
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (seenResponse.status === 401) {
            clearLogin();
            navigate("/login", { replace: true });
            return;
          }

          const seenData = await seenResponse.json();

          if (!seenResponse.ok) {
            console.error("Mark interests as seen error:", seenData);
          } else {
            setInterests((current) =>
              current.map((interest) => ({
                ...interest,
                isSeen: true,
              })),
            );

            // Tell Header to refresh the bell count.
            window.dispatchEvent(new Event("careGeorgiaInterestsUpdated"));
          }
        }
      } catch (error) {
        console.error("Load received interests error:", error);

        setErrorMessage(t.serverError);
        setInterests([]);
      } finally {
        setLoading(false);
      }
    };

    loadInterests();
  }, [isLoggedIn, navigate, t.loadError, t.serverError]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("careGeorgiaToken");

    if (!token) {
      clearLogin();
      navigate("/login");
      return;
    }

    setUpdatingId(id);
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/interests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      if (response.status === 401) {
        clearLogin();
        navigate("/login", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || t.updateError);
        return;
      }

      setInterests((current) =>
        current.map((interest) =>
          String(interest.id) === String(id)
            ? {
                ...interest,
                status,
                isSeen: true,
              }
            : interest,
        ),
      );

      window.dispatchEvent(new Event("careGeorgiaInterestsUpdated"));
    } catch (error) {
      console.error("Update interest status error:", error);

      setErrorMessage(t.serverError);
    } finally {
      setUpdatingId(null);
    }
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
            <h1>💼 {t.title}</h1>
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

        {interests.length === 0 ? (
          <div className="driver-card" style={{ padding: "30px" }}>
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="drivers-grid">
            {interests.map((interest) => {
              const job = interest.job || {};
              const employer = interest.employer || {};

              const email = employer.email || null;

              const phone = employer.phone || null;

              const hasContact = Boolean(email) || Boolean(phone);

              return (
                <div className="driver-card" key={interest.id}>
                  <h3>
                    💼 {serviceLabels[language]?.[job.service] || job.service}
                  </h3>

                  {(employer.firstName || employer.lastName) && (
                    <p>
                      👤 {employer.firstName || ""} {employer.lastName || ""}
                    </p>
                  )}

                  {job.city && (
                    <p>📍 {cityLabels[language]?.[job.city] || job.city}</p>
                  )}

                  {job.description && <p>{job.description}</p>}

                  <div
                    style={{
                      padding: "12px",
                      background:
                        interest.status === "accepted"
                          ? "#f0fdf4"
                          : interest.status === "declined"
                            ? "#f8fafc"
                            : "#fffbeb",
                      borderRadius: "10px",
                      marginTop: "12px",
                    }}
                  >
                    {interest.status === "accepted"
                      ? `💚 ${t.accepted}`
                      : interest.status === "declined"
                        ? `⚪ ${t.declined}`
                        : `🔔 ${t.new}`}
                  </div>

                  <div
                    style={{
                      marginTop: "12px",
                      padding: "14px",
                      background: "#eff6ff",
                      borderRadius: "10px",
                    }}
                  >
                    <strong>📇 {t.contact}</strong>

                    {hasContact ? (
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        {email && (
                          <p
                            style={{
                              margin: "6px 0",
                            }}
                          >
                            ✉️ {t.email}: <strong>{email}</strong>
                          </p>
                        )}

                        {phone && (
                          <p
                            style={{
                              margin: "6px 0",
                            }}
                          >
                            📞 {t.phone}: <strong>{phone}</strong>
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
                          🔒 {t.privacy}
                        </p>
                      </div>
                    ) : (
                      <p
                        style={{
                          margin: "10px 0 0",
                          color: "#64748b",
                        }}
                      >
                        🔒 {t.noContact}
                      </p>
                    )}
                  </div>

                  {interest.status === "sent" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "14px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        type="button"
                        disabled={updatingId === interest.id}
                        onClick={() => updateStatus(interest.id, "accepted")}
                      >
                        💚 {t.interested}
                      </button>

                      <button
                        type="button"
                        disabled={updatingId === interest.id}
                        onClick={() => updateStatus(interest.id, "declined")}
                      >
                        ⚪ {t.notInterested}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
