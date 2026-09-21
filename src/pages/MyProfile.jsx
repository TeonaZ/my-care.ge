import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    back: "← მთავარი",
    title: "ჩემი პროფილი",
    description:
      "ნახე და შეცვალე შენი პირადი ინფორმაცია.",

    firstName: "სახელი",
    lastName: "გვარი",
    email: "ელ. ფოსტა",
    phone: "ტელეფონი",

    phonePlaceholder:
      "მაგ: +995 555 12 34 56",

    save: "ცვლილებების შენახვა",
    success:
      "ცვლილებები წარმატებით შეინახა!",

    emailExists:
      "ამ ელ. ფოსტას უკვე სხვა ანგარიში იყენებს.",

    loginRequired:
      "პროფილის სანახავად ჯერ უნდა შეხვიდე ანგარიშში.",

    login: "შესვლა",

    myJobs: "ჩემი განცხადებები",
    postJob: "განცხადების დამატება",

    phonePrivacy:
      "ტელეფონის ნომრის გამოჩენა",

    showPhone:
      "ჩემი ტელეფონის ნომერი გამოჩნდეს დაინტერესებული ავტორიზებული მომხმარებლებისთვის.",

    logout: "გამოსვლა",
  },

  en: {
    back: "← Home",
    title: "My Profile",
    description:
      "View and update your personal information.",

    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",

    phonePlaceholder:
      "Example: +995 555 12 34 56",

    save: "Save Changes",
    success:
      "Changes saved successfully!",

    emailExists:
      "This email is already used by another account.",

    loginRequired:
      "You need to log in to view your profile.",

    login: "Login",

    myJobs: "My Jobs",
    postJob: "Post a Job",

    phonePrivacy:
      "Phone visibility",

    showPhone:
      "Show my phone number to interested logged-in users.",

    logout: "Logout",
  },

  ru: {
    back: "← Главная",
    title: "Мой профиль",
    description:
      "Просматривайте и изменяйте свою личную информацию.",

    firstName: "Имя",
    lastName: "Фамилия",
    email: "Эл. почта",
    phone: "Телефон",

    phonePlaceholder:
      "Например: +995 555 12 34 56",

    save: "Сохранить изменения",
    success:
      "Изменения успешно сохранены!",

    emailExists:
      "Эта электронная почта уже используется другим аккаунтом.",

    loginRequired:
      "Чтобы открыть профиль, войдите в аккаунт.",

    login: "Войти",

    myJobs: "Мои объявления",
    postJob: "Добавить объявление",

    phonePrivacy:
      "Отображение телефона",

    showPhone:
      "Показывать мой номер заинтересованным авторизованным пользователям.",

    logout: "Выйти",
  },
};

function MyProfile() {
  const navigate = useNavigate();

  const { language } =
    useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const isLoggedIn =
    localStorage.getItem(
      "careGeorgiaLoggedIn"
    ) === "true";

  const currentUserId =
    localStorage.getItem(
      "careGeorgiaCurrentUserId"
    );

  /* =========================
     GET CURRENT USER
  ========================= */

  const getSavedUser = () => {
    const savedUser =
      localStorage.getItem(
        "careGeorgiaUser"
      );

    if (!savedUser) {
      return null;
    }

    try {
      const parsedUser =
        JSON.parse(savedUser);

      if (
        !parsedUser ||
        typeof parsedUser !==
          "object"
      ) {
        return null;
      }

      return parsedUser;
    } catch {
      return null;
    }
  };

  const savedUser =
    getSavedUser();

  const [
    firstName,
    setFirstName,
  ] = useState(
    savedUser?.firstName || ""
  );

  const [
    lastName,
    setLastName,
  ] = useState(
    savedUser?.lastName || ""
  );

  const [
    email,
    setEmail,
  ] = useState(
    savedUser?.email || ""
  );

  const [
    phone,
    setPhone,
  ] = useState(
    savedUser?.phone || ""
  );

  const [
    showPhone,
    setShowPhone,
  ] = useState(
    savedUser?.showPhone ??
      false
  );

  /* =========================
     GET ALL USERS
  ========================= */

  const getUsers = () => {
    const savedUsers =
      localStorage.getItem(
        "careGeorgiaUsers"
      );

    if (!savedUsers) {
      return [];
    }

    try {
      const parsedUsers =
        JSON.parse(savedUsers);

      return Array.isArray(
        parsedUsers
      )
        ? parsedUsers
        : [];
    } catch {
      return [];
    }
  };

  /* =========================
     SAVE PROFILE
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !savedUser ||
      !currentUserId
    ) {
      navigate("/login");
      return;
    }

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();

    let users = getUsers();

    /*
      ვამოწმებთ, იგივე Email
      სხვა account-ს ხომ არ აქვს.
    */

    const emailUsedByAnotherUser =
      users.some((user) => {
        const userEmail =
          String(
            user.email || ""
          )
            .trim()
            .toLowerCase();

        return (
          userEmail ===
            normalizedEmail &&
          String(user.id) !==
            String(
              currentUserId
            )
        );
      });

    if (
      emailUsedByAnotherUser
    ) {
      alert(t.emailExists);
      return;
    }

    /* UPDATED USER */

    const updatedUser = {
      ...savedUser,

      id:
        savedUser.id ||
        currentUserId,

      firstName:
        firstName.trim(),

      lastName:
        lastName.trim(),

      email:
        normalizedEmail,

      phone:
        phone.trim(),

      showPhone,

      updatedAt:
        new Date().toISOString(),
    };

    /* =========================
       UPDATE USERS ARRAY
    ========================= */

    const userExistsInArray =
      users.some(
        (user) =>
          String(user.id) ===
          String(
            currentUserId
          )
      );

    if (userExistsInArray) {
      users =
        users.map((user) => {
          if (
            String(user.id) ===
            String(
              currentUserId
            )
          ) {
            return {
              ...user,
              ...updatedUser,
            };
          }

          return user;
        });
    } else {
      /*
        ძველი account თუ სიაში
        ჯერ არ არის, დავამატებთ.
      */

      users.push(
        updatedUser
      );
    }

    localStorage.setItem(
      "careGeorgiaUsers",
      JSON.stringify(users)
    );

    /* =========================
       UPDATE ACTIVE USER
    ========================= */

    localStorage.setItem(
      "careGeorgiaUser",
      JSON.stringify(
        updatedUser
      )
    );

    /* =========================
       UPDATE USER'S JOBS
    ========================= */

    const savedJobs =
      localStorage.getItem(
        "careGeorgiaJobs"
      );

    if (savedJobs) {
      try {
        const parsedJobs =
          JSON.parse(
            savedJobs
          );

        if (
          Array.isArray(
            parsedJobs
          )
        ) {
          const updatedJobs =
            parsedJobs.map(
              (job) => {
                if (
                  String(
                    job.ownerId
                  ) !==
                  String(
                    currentUserId
                  )
                ) {
                  return job;
                }

                return {
                  ...job,

                  employerName:
                    `${updatedUser.firstName} ${updatedUser.lastName}`.trim(),

                  employerEmail:
                    updatedUser.email,

                  employerPhone:
                    updatedUser.phone,

                  showPhone:
                    updatedUser.showPhone,
                };
              }
            );

          localStorage.setItem(
            "careGeorgiaJobs",
            JSON.stringify(
              updatedJobs
            )
          );
        }
      } catch {
        // თუ Jobs მონაცემი დაზიანებულია,
        // პროფილის შენახვას არ ვაჩერებთ.
      }
    }

    alert(t.success);

    navigate("/");
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "careGeorgiaLoggedIn"
    );

    localStorage.removeItem(
      "careGeorgiaCurrentUserId"
    );

    /*
      careGeorgiaUser შეგვიძლია
      დავტოვოთ, მაგრამ უფრო სუფთაა
      Logout-ისას მისი წაშლა.
    */

    localStorage.removeItem(
      "careGeorgiaUser"
    );

    navigate("/");
  };

  /* =========================
     LOGIN REQUIRED
  ========================= */

  if (
    !isLoggedIn ||
    !savedUser ||
    !currentUserId
  ) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <Link
            to="/"
            className="auth-logo"
          >
            🇬🇪 Care Georgia
          </Link>

          <div className="auth-card">
            <div className="auth-heading">
              <h1>
                {t.title}
              </h1>

              <p>
                {
                  t.loginRequired
                }
              </p>
            </div>

            <Link
              to="/login"
              className="auth-submit"
              style={{
                display:
                  "block",
                textAlign:
                  "center",
                textDecoration:
                  "none",
              }}
            >
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">

        <Link
          to="/"
          className="auth-logo"
        >
          {t.back}
        </Link>

        <div className="auth-card">

          <div className="auth-heading">
            <h1>
              👤 {t.title}
            </h1>

            <p>
              {t.description}
            </p>
          </div>

          {/* QUICK LINKS */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom:
                "24px",
            }}
          >
            <Link
              to="/my-jobs"
              style={{
                flex: "1",
                minWidth:
                  "150px",
                padding:
                  "11px",
                border:
                  "1px solid #dbe2ea",
                borderRadius:
                  "9px",
                textAlign:
                  "center",
                textDecoration:
                  "none",
                fontWeight:
                  "600",
              }}
            >
              📋 {t.myJobs}
            </Link>

            <Link
              to="/post-job"
              style={{
                flex: "1",
                minWidth:
                  "150px",
                padding:
                  "11px",
                border:
                  "1px solid #dbe2ea",
                borderRadius:
                  "9px",
                textAlign:
                  "center",
                textDecoration:
                  "none",
                fontWeight:
                  "600",
              }}
            >
              ➕ {t.postJob}
            </Link>
          </div>

          {/* PROFILE FORM */}

          <form
            className="auth-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* FIRST NAME */}

            <div className="form-group">
              <label>
                {t.firstName}
              </label>

              <input
                type="text"
                value={
                  firstName
                }
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* LAST NAME */}

            <div className="form-group">
              <label>
                {t.lastName}
              </label>

              <input
                type="text"
                value={
                  lastName
                }
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label>
                {t.email}
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {/* PHONE */}

            <div className="form-group">
              <label>
                {t.phone}
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder={
                  t.phonePlaceholder
                }
              />
            </div>

            {/* PHONE PRIVACY */}

            <div
              style={{
                padding: "15px",
                border:
                  "1px solid #e2e8f0",
                borderRadius:
                  "10px",
                backgroundColor:
                  "#f8fafc",
              }}
            >
              <strong
                style={{
                  display:
                    "block",
                  marginBottom:
                    "10px",
                }}
              >
                🔒{" "}
                {
                  t.phonePrivacy
                }
              </strong>

              <label
                style={{
                  display:
                    "flex",
                  alignItems:
                    "flex-start",
                  gap: "10px",
                  cursor:
                    "pointer",
                  lineHeight:
                    "1.5",
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    showPhone
                  }
                  onChange={(e) =>
                    setShowPhone(
                      e.target
                        .checked
                    )
                  }
                  style={{
                    width:
                      "18px",
                    height:
                      "18px",
                    marginTop:
                      "2px",
                  }}
                />

                <span>
                  {t.showPhone}
                </span>
              </label>
            </div>

            {/* SAVE */}

            <button
              type="submit"
              className="auth-submit"
            >
              💾 {t.save}
            </button>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={
                handleLogout
              }
              style={{
                width: "100%",
                padding: "13px",
                border:
                  "1px solid #dc2626",
                borderRadius:
                  "10px",
                backgroundColor:
                  "#ffffff",
                color:
                  "#dc2626",
                fontSize:
                  "15px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
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