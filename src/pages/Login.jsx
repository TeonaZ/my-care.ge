import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    title: "შესვლა",
    description: "შედი შენს ანგარიშში და გააგრძელე Care Georgia-ს გამოყენება.",

    email: "ელ. ფოსტა",
    password: "პაროლი",
    passwordPlaceholder: "შენი პაროლი",

    login: "შესვლა",
    loggingIn: "შესვლა...",

    noAccount: "ჯერ არ გაქვს ანგარიში?",
    register: "რეგისტრაცია",

    wrongCredentials: "ელ. ფოსტა ან პაროლი არასწორია.",

    loginSuccess: "შესვლა წარმატებულია!",

    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა. სცადე თავიდან.",
  },

  en: {
    title: "Login",
    description: "Log in to your account and continue using Care Georgia.",

    email: "Email",
    password: "Password",
    passwordPlaceholder: "Your password",

    login: "Login",
    loggingIn: "Logging in...",

    noAccount: "Don't have an account yet?",
    register: "Register",

    wrongCredentials: "Email or password is incorrect.",

    loginSuccess: "Login successful!",

    serverError: "Could not connect to the server. Please try again.",
  },

  ru: {
    title: "Войти",
    description:
      "Войдите в свой аккаунт и продолжайте пользоваться Care Georgia.",

    email: "Эл. почта",
    password: "Пароль",
    passwordPlaceholder: "Ваш пароль",

    login: "Войти",
    loggingIn: "Вход...",

    noAccount: "Еще нет аккаунта?",
    register: "Регистрация",

    wrongCredentials: "Неверная эл. почта или пароль.",

    loginSuccess: "Вход выполнен успешно!",

    serverError: "Не удалось подключиться к серверу. Попробуйте снова.",
  },
};

function Login() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // LOGIN THROUGH BACKEND
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginError("");

    const normalizedEmail = email.trim().toLowerCase();

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const data = await response.json();
      console.log("LOGIN STATUS:", response.status);
console.log("LOGIN EMAIL:", normalizedEmail);
console.log("PASSWORD LENGTH:", password.length);
console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        if (response.status === 401 || response.status === 400) {
          setLoginError(t.wrongCredentials);
        } else {
          setLoginError(data.message || t.serverError);
        }

        return;
      }

      if (!data.user || !data.token) {
        setLoginError(t.serverError);

        return;
      }

      // =========================
      // SAVE JWT TOKEN
      // =========================

      localStorage.setItem("careGeorgiaToken", data.token);

      // =========================
      // ACTIVE USER
      //
      // ამას დროებით ვინარჩუნებთ,
      // რადგან საიტის სხვა გვერდები
      // careGeorgiaUser-ს იყენებენ.
      // =========================

      localStorage.setItem("careGeorgiaUser", JSON.stringify(data.user));

      // =========================
      // LOGGED IN
      // =========================

      localStorage.setItem("careGeorgiaLoggedIn", "true");

      // =========================
      // CURRENT USER ID
      // =========================

      localStorage.setItem("careGeorgiaCurrentUserId", String(data.user.id));

      alert(t.loginSuccess);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setLoginError(t.serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          🇬🇪 Care Georgia
        </Link>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>{t.title}</h1>

            <p>{t.description}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="form-group">
              <label>{t.email}</label>

              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);

                  setLoginError("");
                }}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label>{t.password}</label>

              <input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);

                  setLoginError("");
                }}
                required
              />
            </div>

            {/* ERROR */}

            {loginError && (
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
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.loggingIn : t.login}
            </button>
          </form>

          <p className="auth-bottom">
            {t.noAccount} <Link to="/register">{t.register}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
