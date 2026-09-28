import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    back: "← მთავარი",
    title: "ჩემი პროფილი",
    description: "ნახე და შეცვალე შენი პირადი ინფორმაცია.",

    firstName: "სახელი",
    lastName: "გვარი",
    email: "ელ. ფოსტა",
    phone: "ტელეფონი",
    phonePlaceholder: "მაგ: +995 555 12 34 56",

    save: "ცვლილებების შენახვა",
    saving: "ინახება...",
    loading: "პროფილი იტვირთება...",
    success: "ცვლილებები წარმატებით შეინახა!",

    emailExists: "ამ ელ. ფოსტას უკვე სხვა ანგარიში იყენებს.",
    loadError: "პროფილის ჩატვირთვა ვერ მოხერხდა.",
    saveError: "ცვლილებების შენახვა ვერ მოხერხდა.",

    loginRequired: "პროფილის სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",
    sessionExpired: "სესიის ვადა გავიდა. გთხოვ, თავიდან შეხვიდე.",

    login: "შესვლა",

    phonePrivacy: "ტელეფონის ნომრის გამოჩენა",
    showPhone:
      "ჩემი ტელეფონის ნომერი გამოჩნდეს დაინტერესებული ავტორიზებული მომხმარებლებისთვის.",

    logout: "გამოსვლა",
  },

  en: {
    back: "← Home",
    title: "My Profile",
    description: "View and update your personal information.",

    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    phonePlaceholder: "Example: +995 555 12 34 56",

    save: "Save Changes",
    saving: "Saving...",
    loading: "Loading profile...",
    success: "Changes saved successfully!",

    emailExists: "This email is already used by another account.",
    loadError: "Could not load your profile.",
    saveError: "Could not save your changes.",

    loginRequired: "You need to log in to view your profile.",
    sessionExpired: "Your session has expired. Please log in again.",

    login: "Login",

    phonePrivacy: "Phone visibility",
    showPhone: "Show my phone number to interested logged-in users.",

    logout: "Logout",
  },

  ru: {
    back: "← Главная",
    title: "Мой профиль",
    description: "Просматривайте и изменяйте свою личную информацию.",

    firstName: "Имя",
    lastName: "Фамилия",
    email: "Эл. почта",
    phone: "Телефон",
    phonePlaceholder: "Например: +995 555 12 34 56",

    save: "Сохранить изменения",
    saving: "Сохранение...",
    loading: "Загрузка профиля...",
    success: "Изменения успешно сохранены!",

    emailExists: "Эта электронная почта уже используется другим аккаунтом.",
    loadError: "Не удалось загрузить профиль.",
    saveError: "Не удалось сохранить изменения.",

    loginRequired: "Чтобы открыть профиль, войдите в аккаунт.",
    sessionExpired: "Срок сессии истек. Войдите снова.",

    login: "Войти",

    phonePrivacy: "Отображение телефона",
    showPhone:
      "Показывать мой номер заинтересованным авторизованным пользователям.",

    logout: "Выйти",
  },
};

function MyProfile() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const token = localStorage.getItem("careGeorgiaToken");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ========================================
  // CLEAR LOGIN DATA
  // ========================================

  const clearLoginData = () => {
    localStorage.removeItem("careGeorgiaToken");
    localStorage.removeItem("careGeorgiaLoggedIn");
    localStorage.removeItem("careGeorgiaCurrentUserId");
    localStorage.removeItem("careGeorgiaUser");
  };

  // ========================================
  // LOAD PROFILE FROM POSTGRESQL
  // ========================================

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          clearLoginData();
          setIsLoading(false);
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok || !data.user) {
          setErrorMessage(data.message || t.loadError);
          setIsLoading(false);
          return;
        }

        const user = data.user;

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setShowPhone(user.showPhone === true);

        // განვაახლოთ localStorage-იც,
        // რადგან საიტის სხვა გვერდები ჯერ კიდევ იყენებენ მას.
        localStorage.setItem("careGeorgiaUser", JSON.stringify(user));

        localStorage.setItem("careGeorgiaCurrentUserId", String(user.id));

        localStorage.setItem("careGeorgiaLoggedIn", "true");
      } catch (error) {
        console.error("Load profile error:", error);
        setErrorMessage(t.loadError);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [token, navigate, t.loadError]);

  // ========================================
  // SAVE PROFILE TO POSTGRESQL
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          showPhone,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        clearLoginData();
        navigate("/login", { replace: true });
        return;
      }

      if (response.status === 409) {
        setErrorMessage(t.emailExists);
        return;
      }

      if (!response.ok || !data.user) {
        setErrorMessage(data.message || t.saveError);
        return;
      }

      const updatedUser = data.user;

      setFirstName(updatedUser.firstName || "");
      setLastName(updatedUser.lastName || "");
      setEmail(updatedUser.email || "");
      setPhone(updatedUser.phone || "");
      setShowPhone(updatedUser.showPhone === true);

      // საიტის ძველი ნაწილებისთვის localStorage-საც ვაახლებთ.
      localStorage.setItem("careGeorgiaUser", JSON.stringify(updatedUser));

      localStorage.setItem("careGeorgiaCurrentUserId", String(updatedUser.id));

      setSuccessMessage(t.success);
    } catch (error) {
      console.error("Save profile error:", error);
      setErrorMessage(t.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    clearLoginData();
    navigate("/", { replace: true });
  };

  // ========================================
  // NOT LOGGED IN
  // ========================================

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <Link to="/" className="auth-logo">
            🇬🇪 Care Georgia
          </Link>

          <div className="auth-card">
            <div className="auth-heading">
              <h1>{t.title}</h1>
              <p>{t.loginRequired}</p>
            </div>

            <Link
              to="/login"
              className="auth-submit"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // LOADING
  // ========================================

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-heading">
              <h1>👤 {t.title}</h1>
              <p>{t.loading}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // PROFILE
  // ========================================

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          {t.back}
        </Link>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>👤 {t.title}</h1>
            <p>{t.description}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t.firstName}</label>

              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>{t.lastName}</label>

              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>{t.email}</label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>{t.phone}</label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                placeholder={t.phonePlaceholder}
              />
            </div>

            <div
              style={{
                padding: "15px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                backgroundColor: "#f8fafc",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                🔒 {t.phonePrivacy}
              </strong>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  cursor: "pointer",
                  lineHeight: "1.5",
                }}
              >
                <input
                  type="checkbox"
                  checked={showPhone}
                  onChange={(e) => {
                    setShowPhone(e.target.checked);
                    setSuccessMessage("");
                    setErrorMessage("");
                  }}
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "2px",
                  }}
                />

                <span>{t.showPhone}</span>
              </label>
            </div>

            {errorMessage && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  margin: "0",
                  padding: "10px 12px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                }}
              >
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p
                style={{
                  color: "#166534",
                  fontSize: "14px",
                  margin: "0",
                  padding: "10px 12px",
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                }}
              >
                ✅ {successMessage}
              </p>
            )}

            <button type="submit" className="auth-submit" disabled={isSaving}>
              {isSaving ? t.saving : `💾 ${t.save}`}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #dc2626",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#dc2626",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🚪 {t.logout}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
