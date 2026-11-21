import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";

const translations = {
  ka: {
    home: "მთავარი",
    findSpecialist: "იპოვე სპეციალისტი",
    findJob: "იპოვე სამსახური",
    myJobs: "ჩემი განცხადებები",
    myApplications: "ჩემი განაცხადები",
    receivedApplications: "მიღებული განაცხადები",
    receivedInterests: "დამსაქმებლის დაინტერესება",
    sentInterests: "გაგზავნილი დაინტერესებები",
    myProfile: "ჩემი პროფილი",
    createSpecialistProfile:
      "სპეციალისტის პროფილის შექმნა",
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
    myJobs: "My Job Posts",
    myApplications: "My Applications",
    receivedApplications: "Received Applications",
    receivedInterests: "Employer Interests",
    sentInterests: "Sent Interests",
    myProfile: "My Profile",
    createSpecialistProfile:
      "Create Specialist Profile",
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
    myApplications: "Мои заявки",
    receivedApplications: "Полученные заявки",
    receivedInterests: "Интерес работодателя",
    sentInterests: "Отправленные предложения",
    myProfile: "Мой профиль",
    createSpecialistProfile:
      "Создать профиль специалиста",
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
  const { language, setLanguage } =
    useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const [
    isUserMenuOpen,
    setIsUserMenuOpen,
  ] = useState(false);

  const [isNotificationMenuOpen, setIsNotificationMenuOpen] =
  useState(false);

  const [
    unreadInterests,
    setUnreadInterests,
  ] = useState(0);

  
const [unreadMessages, setUnreadMessages] = useState(0);

const [unreadApplications, setUnreadApplications] = useState(0);



  const isLoggedIn =
    localStorage.getItem(
      "careGeorgiaLoggedIn",
    ) === "true";

  let user = null;

  try {
    const savedUser =
      localStorage.getItem(
        "careGeorgiaUser",
      );

    user = savedUser
      ? JSON.parse(savedUser)
      : null;
  } catch {
    user = null;
  }

  const currentUserId =
    localStorage.getItem(
      "careGeorgiaCurrentUserId",
    );

  const token =
    localStorage.getItem(
      "careGeorgiaToken",
    );

  // ========================================
  // UNSEEN RECEIVED INTERESTS
  // ========================================

  useEffect(() => {
    let isMounted = true;

    const loadReceivedInterests =
      async () => {
        if (
          !isLoggedIn ||
          !currentUserId ||
          user?.accountType !==
            "provider" ||
          !token
        ) {
          if (isMounted) {
            setUnreadInterests(0);
          }

          return;
        }

        try {
          const response =
            await fetch(
              "http://localhost:5000/api/interests/received",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              },
            );

          if (
            response.status === 401
          ) {
            if (isMounted) {
              setUnreadInterests(0);
            }

            return;
          }

          const data =
            await response.json();

          if (!response.ok) {
            console.error(
              "Header received interests error:",
              data,
            );

            if (isMounted) {
              setUnreadInterests(0);
            }

            return;
          }

          const interests =
            Array.isArray(
              data.interests,
            )
              ? data.interests
              : [];

          const unseenInterests =
            interests.filter(
              (interest) =>
                interest.isSeen ===
                false,
            );

          if (isMounted) {
            setUnreadInterests(
              unseenInterests.length,
            );
          }
        } catch (error) {
          console.error(
            "Header received interests error:",
            error,
          );

          if (isMounted) {
            setUnreadInterests(0);
          }
        }
      };

    loadReceivedInterests();

    const handleInterestsUpdated =
      () => {
        loadReceivedInterests();
      };

    window.addEventListener(
      "careGeorgiaInterestsUpdated",
      handleInterestsUpdated,
    );

    return () => {
      isMounted = false;

      window.removeEventListener(
        "careGeorgiaInterestsUpdated",
        handleInterestsUpdated,
      );
    };
  }, [
    isLoggedIn,
    currentUserId,
    user?.accountType,
    token,
  ]);

  
useEffect(() => {
  if (!isLoggedIn || !token) {
    setUnreadMessages(0);
    return;
  }

  let active = true;

  const loadUnreadMessages = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/messages/unread/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      if (active) {
        setUnreadMessages(data.unreadCount ?? 0);
      }
    } catch (error) {
      console.error("Unread messages error:", error);
    }
  };

  loadUnreadMessages();

  const interval = setInterval(loadUnreadMessages, 10000);

  return () => {
    active = false;
    clearInterval(interval);
  };
}, [isLoggedIn, token]);



    
useEffect(() => {
  if (!isLoggedIn || !token || user?.accountType !== "client") {
    setUnreadApplications(0);
    return;
  }

  let active = true;

  const loadUnreadApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/applications/unread/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      if (active) {
        setUnreadApplications(data.unreadCount ?? 0);
      }
    } catch (error) {
      console.error("Unread applications error:", error);
    }
  };

  loadUnreadApplications();

  const interval = setInterval(loadUnreadApplications, 10000);

  return () => {
    active = false;
    clearInterval(interval);
  };
}, [isLoggedIn, token, user?.accountType]);

    const closeMenu = () => {
  setIsUserMenuOpen(false);
};

  const handleLanguageChange = (
    e,
  ) => {
    setLanguage(e.target.value);
    setIsUserMenuOpen(false);
  };

  const handleFindSpecialist = () => {
    setIsUserMenuOpen(false);

    navigate("/");

    setTimeout(() => {
      const servicesSection =
        document.getElementById(
          "services",
        );

      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "careGeorgiaToken",
    );

    localStorage.removeItem(
      "careGeorgiaLoggedIn",
    );

    localStorage.removeItem(
      "careGeorgiaCurrentUserId",
    );

    localStorage.removeItem(
      "careGeorgiaUser",
    );

    setUnreadInterests(0);
    setIsUserMenuOpen(false);

    navigate("/");
  };

  const menuLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#1e293b",
    fontWeight: "600",
  };

  return (
    <header className="header">
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

      <nav className="nav">
        <Link
          to="/"
          onClick={closeMenu}
        >
          {t.home}
        </Link>

        <button
          type="button"
          onClick={
            handleFindSpecialist
          }
          style={{
            border: "none",
            background:
              "transparent",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          {t.findSpecialist}
        </button>

        <Link
          to="/jobs"
          onClick={closeMenu}
        >
          {t.findJob}
        </Link>

        <Link
          to="/about"
          onClick={closeMenu}
        >
          {t.about}
        </Link>

        <Link
          to="/support"
          onClick={closeMenu}
        >
          🛠️ {t.support}
        </Link>
      </nav>

      <div className="header-buttons">
        <select
          className="language-select"
          value={language}
          onChange={
            handleLanguageChange
          }
          aria-label="Language"
        >
          <option value="ka">
            🇬🇪 ქართული
          </option>

          <option value="en">
            🇬🇧 English
          </option>

          <option value="ru">
            🇷🇺 Русский
          </option>
        </select>

        {isLoggedIn ? (
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
             {(user?.accountType === "provider" ||
  user?.accountType === "client") && (
                <button
                  type="button"
                  
onClick={() => {
  setIsUserMenuOpen(false);
  setIsNotificationMenuOpen((previous) => !previous);
}}

                  aria-label={
                    t.receivedInterests
                  }
                  title={
                    t.receivedInterests
                  }
                  style={{
                    position:
                      "relative",
                    border: "none",
                    background:
                      "transparent",
                    cursor:
                      "pointer",
                    fontSize: "20px",
                    padding: "7px",
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                     

opacity:
  unreadMessages +
    (user?.accountType === "provider"
      ? unreadInterests
      : unreadApplications) > 0
    ? 1
    : 0.55,


                    }}
                  >
                    🔔
                  </span>

                  

{(unreadMessages +
  (user?.accountType === "provider"
    ? unreadInterests
    : unreadApplications)) > 0 && (


                    <span
                      style={{
                        position:
                          "absolute",
                        top: "0",
                        right: "0",
                        minWidth:
                          "17px",
                        height: "17px",
                        padding:
                          "0 4px",
                        borderRadius:
                          "999px",
                        backgroundColor:
                          "#dc2626",
                        color:
                          "#ffffff",
                        fontSize:
                          "10px",
                        fontWeight:
                          "800",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        boxSizing:
                          "border-box",
                      }}
                    >
                     

{(unreadMessages +
  (user?.accountType === "provider"
    ? unreadInterests
    : unreadApplications)) > 9
  ? "9+"
  : unreadMessages +
    (user?.accountType === "provider"
      ? unreadInterests
      : unreadApplications)}


                    </span>
                  )}
                </button>
              )}

              
{isNotificationMenuOpen && (
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
      zIndex: 10000,
    }}
  >
    

   
{(user?.accountType === "provider" ||
  user?.accountType === "client") && (
  <Link
    to={
      user?.accountType === "client"
        ? "/received-applications"
        : "/received-interests"
    }
    onClick={() => setIsNotificationMenuOpen(false)}
    style={menuLinkStyle}
  >
    <span>❤️</span>
    
<span>
  მიღებული დაინტერესებები
  {(user?.accountType === "provider"
    ? unreadInterests
    : unreadApplications) > 0
    ? ` (${
        user?.accountType === "provider"
          ? unreadInterests
          : unreadApplications
      })`
    : ""}
</span>

  </Link>
)}


    <Link
      to="/messages"
      onClick={() => setIsNotificationMenuOpen(false)}
      style={menuLinkStyle}
    >
      <span>💬</span>
      <span>
        მიღებული წერილები
        {unreadMessages > 0 ? ` (${unreadMessages})` : ""}
      </span>
    </Link>
  </div>
)}


              <button
                type="button"
                className="user-name"
                onClick={() =>
                  setIsUserMenuOpen(
                    (
                      previousValue,
                    ) =>
                      !previousValue,
                  )
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  cursor: "pointer",
                  fontFamily:
                    "inherit",
                  fontSize:
                    "inherit",
                  color: "inherit",
                  padding:
                    "8px 10px",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "5px",
                }}
              >
                <span>
                  👤{" "}
                  {user?.firstName ||
                    t.user}
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    transform:
                      isUserMenuOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition:
                      "transform 0.2s ease",
                  }}
                >
                  ▼
                </span>
              </button>
            </div>

            {isUserMenuOpen && (
              <div
                style={{
                  position:
                    "absolute",
                  top:
                    "calc(100% + 8px)",
                  right: "0",
                  width: "290px",
                  backgroundColor:
                    "#ffffff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius:
                    "12px",
                  boxShadow:
                    "0 12px 35px rgba(0, 0, 0, 0.14)",
                  padding: "8px",
                  zIndex: "9999",
                }}
              >
                <Link
                  to="/my-profile"
                  onClick={
                    closeMenu
                  }
                  style={
                    menuLinkStyle
                  }
                >
                  <span>👤</span>
                  <span>
                    {t.myProfile}
                  </span>
                </Link>

                
<Link
  to="/messages"
  onClick={closeMenu}
  style={menuLinkStyle}
>
  <span>💬</span>
  <span>
    {language === "ka"
      ? "ჩემი შეტყობინებები"
      : language === "ru"
        ? "Мои сообщения"
        : "My Messages"}
  </span>
</Link>



                {user?.accountType ===
                  "client" && (
                  <>
                    <Link
                      to="/my-jobs"
                      onClick={
                        closeMenu
                      }
                      style={
                        menuLinkStyle
                      }
                    >
                      <span>
                        📋
                      </span>
                      <span>
                        {t.myJobs}
                      </span>
                    </Link>

                    <Link
                      to="/received-applications"
                      onClick={closeMenu}
                      style={menuLinkStyle}
                    >
                      <span>📥</span>
                      <span>{t.receivedApplications}</span>
                    </Link>

                    <Link
                      to="/sent-interests"
                      onClick={
                        closeMenu
                      }
                      style={
                        menuLinkStyle
                      }
                    >
                      <span>
                        📤
                      </span>
                      <span>
                        {
                          t.sentInterests
                        }
                      </span>
                    </Link>
                  </>
                )}

                {user?.accountType ===
                  "provider" && (
                  <>
                    <Link
                      to="/my-jobs"
                      onClick={
                        closeMenu
                      }
                      style={
                        menuLinkStyle
                      }
                    >
                      <span>
                        📋
                      </span>
                      <span>
                        {t.myJobs}
                      </span>
                    </Link>

                    <Link
                      to="/my-applications"
                      onClick={
                        closeMenu
                      }
                      style={
                        menuLinkStyle
                      }
                    >
                      <span>
                        📨
                      </span>
                      <span>
                        {
                          t.myApplications
                        }
                      </span>
                    </Link>

                    <Link
                      to="/received-interests"
                      onClick={
                        closeMenu
                      }
                      style={
                        menuLinkStyle
                      }
                    >
                      <span>
                        🔔
                      </span>

                      <span>
                        {
                          t.receivedInterests
                        }

                        {unreadInterests >
                        0
                          ? ` (${unreadInterests})`
                          : ""}
                      </span>
                    </Link>

                    <Link
                      to="/create-specialist-profile"
                      onClick={
                        closeMenu
                      }
                      style={
                        menuLinkStyle
                      }
                    >
                      <span>
                        🧑‍💼
                      </span>

                      <span>
                        {
                          t.createSpecialistProfile
                        }
                      </span>
                    </Link>
                  </>
                )}

                <div
                  style={{
                    height: "1px",
                    backgroundColor:
                      "#e2e8f0",
                    margin:
                      "6px 0",
                  }}
                />

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                    padding:
                      "12px 14px",
                    border: "none",
                    borderRadius:
                      "8px",
                    backgroundColor:
                      "transparent",
                    color:
                      "#dc2626",
                    fontFamily:
                      "inherit",
                    fontSize:
                      "inherit",
                    fontWeight:
                      "600",
                    cursor:
                      "pointer",
                    textAlign:
                      "left",
                  }}
                >
                  <span>🚪</span>
                  <span>
                    {t.logout}
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              {t.login}
            </Link>

            <Link
              to="/register"
              className="register-btn"
              onClick={closeMenu}
            >
              {t.register}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;