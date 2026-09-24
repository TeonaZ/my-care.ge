import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";

const translations = {
  ka: {
    home: "მთავარი",
    findSpecialist: "იპოვე სპეციალისტი",
    findJob: "იპოვე სამსახური",
    myJobs: "ჩემი განცხადებები",
    myProfile: "ჩემი პროფილი",
    createSpecialistProfile: "სპეციალისტის პროფილის შექმნა",
    about: "ჩვენ შესახებ",
    support: "Support",
    login: "შესვლა",
    register: "რეგისტრაცია",
    logout: "გამოსვლა",
    user: "მომხმარებელი",
  },

  en: {
    home: "Home",
    findSpecialist: "Find a Specialist",
    findJob: "Find a Job",
    myJobs: "My Jobs",
    myProfile: "My Profile",
    createSpecialistProfile: "Create Specialist Profile",
    about: "About Us",
    support: "Support",
    login: "Login",
    register: "Register",
    logout: "Logout",
    user: "User",
  },

  ru: {
    home: "Главная",
    findSpecialist: "Найти специалиста",
    findJob: "Найти работу",
    myJobs: "Мои объявления",
    myProfile: "Мой профиль",
    createSpecialistProfile: "Создать профиль специалиста",
    about: "О нас",
    support: "Support",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    user: "Пользователь",
  },
};

function Header() {
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguage();

  const t = translations[language] || translations.ka;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  /* =========================
     LOGIN STATE
  ========================= */

  const isLoggedIn = localStorage.getItem("careGeorgiaLoggedIn") === "true";

  /* =========================
     CURRENT USER
  ========================= */

  let user = null;

  try {
    const savedUser = localStorage.getItem("careGeorgiaUser");

    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = null;
  }

  /* =========================
     CLOSE USER MENU
  ========================= */

  const closeMenu = () => {
    setIsUserMenuOpen(false);
  };

  /* =========================
     LANGUAGE
  ========================= */

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);

    setIsUserMenuOpen(false);
  };

  /* =========================
     FIND SPECIALIST
  ========================= */

  const handleFindSpecialist = () => {
    setIsUserMenuOpen(false);

    /*
      ჯერ მთავარ გვერდზე გადავდივართ.
    */

    navigate("/");

    /*
      შემდეგ ვპოულობთ services
      სექციას და ჩამოვდივართ მასთან.
    */

    setTimeout(() => {
      const servicesSection = document.getElementById("services");

      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("careGeorgiaLoggedIn");

    localStorage.removeItem("careGeorgiaCurrentUserId");

    localStorage.removeItem("careGeorgiaUser");

    setIsUserMenuOpen(false);

    navigate("/");
  };

  return (
    <header className="header">
      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        🇬🇪 Care Georgia
      </Link>

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="nav">
        {/* HOME */}

        <Link to="/" onClick={closeMenu}>
          {t.home}
        </Link>

        {/* FIND SPECIALIST */}

        <button
          type="button"
          onClick={handleFindSpecialist}
          style={{
            border: "none",
            background: "transparent",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          {t.findSpecialist}
        </button>

        {/* FIND JOB */}

        <Link to="/jobs" onClick={closeMenu}>
          {t.findJob}
        </Link>

        {/* MY JOBS */}

        {isLoggedIn && (
          <Link to="/my-jobs" onClick={closeMenu}>
            {t.myJobs}
          </Link>
        )}

        {/* ABOUT */}

        <Link to="/about" onClick={closeMenu}>
          {t.about}
        </Link>

        {/* SUPPORT */}

        <Link to="/support" onClick={closeMenu}>
          🛠️ {t.support}
        </Link>
      </nav>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="header-buttons">
        {/* LANGUAGE */}

        <select
          className="language-select"
          value={language}
          onChange={handleLanguageChange}
          aria-label="Language"
        >
          <option value="ka">🇬🇪 ქართული</option>

          <option value="en">🇬🇧 English</option>

          <option value="ru">🇷🇺 Русский</option>
        </select>

        {/* =========================
            LOGGED IN
        ========================= */}

        {isLoggedIn ? (
          <div
            style={{
              position: "relative",
            }}
          >
            {/* USER NAME */}

            <button
              type="button"
              className="user-name"
              onClick={() =>
                setIsUserMenuOpen((previousValue) => !previousValue)
              }
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                color: "inherit",
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span>👤 {user?.firstName || t.user}</span>

              <span
                style={{
                  fontSize: "11px",

                  transform: isUserMenuOpen ? "rotate(180deg)" : "rotate(0deg)",

                  transition: "transform 0.2s ease",
                }}
              >
                ▼
              </span>
            </button>

            {/* =========================
                DROPDOWN
            ========================= */}

            {isUserMenuOpen && (
              <div
                style={{
                  position: "absolute",

                  top: "calc(100% + 8px)",

                  right: "0",

                  width: "290px",

                  backgroundColor: "#ffffff",

                  border: "1px solid #e2e8f0",

                  borderRadius: "12px",

                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.14)",

                  padding: "8px",

                  zIndex: "9999",
                }}
              >
                {/* MY PROFILE */}

                <Link
                  to="/my-profile"
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#1e293b",
                    fontWeight: "600",
                  }}
                >
                  <span>👤</span>

                  <span>{t.myProfile}</span>
                </Link>

                {/* MY JOBS */}

                <Link
                  to="/my-jobs"
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#1e293b",
                    fontWeight: "600",
                  }}
                >
                  <span>📋</span>

                  <span>{t.myJobs}</span>
                </Link>

                {/* =========================
                    PROVIDER ONLY
                ========================= */}

                {user?.accountType === "provider" && (
                  <Link
                    to="/create-specialist-profile"
                    onClick={closeMenu}
                    style={{
                      display: "flex",

                      alignItems: "center",

                      gap: "10px",

                      padding: "12px 14px",

                      borderRadius: "8px",

                      textDecoration: "none",

                      color: "#1e293b",

                      fontWeight: "600",
                    }}
                  >
                    <span>🧑‍💼</span>

                    <span>{t.createSpecialistProfile}</span>
                  </Link>
                )}

                {/* DIVIDER */}

                <div
                  style={{
                    height: "1px",

                    backgroundColor: "#e2e8f0",

                    margin: "6px 0",
                  }}
                />

                {/* =========================
                    LOGOUT
                ========================= */}

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: "100%",

                    display: "flex",

                    alignItems: "center",

                    gap: "10px",

                    padding: "12px 14px",

                    border: "none",

                    borderRadius: "8px",

                    backgroundColor: "transparent",

                    color: "#dc2626",

                    fontFamily: "inherit",

                    fontSize: "inherit",

                    fontWeight: "600",

                    cursor: "pointer",

                    textAlign: "left",
                  }}
                >
                  <span>🚪</span>

                  <span>{t.logout}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* =========================
             LOGGED OUT
          ========================= */

          <>
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              {t.login}
            </Link>

            <Link to="/register" className="register-btn" onClick={closeMenu}>
              {t.register}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
