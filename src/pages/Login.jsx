import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    title: "შესვლა",
    description:
      "შედი შენს ანგარიშში და გააგრძელე Care Georgia-ს გამოყენება.",

    email: "ელ. ფოსტა",
    password: "პაროლი",
    passwordPlaceholder: "შენი პაროლი",

    login: "შესვლა",

    noAccount: "ჯერ არ გაქვს ანგარიში?",
    register: "რეგისტრაცია",

    accountNotFound:
      "ანგარიში ვერ მოიძებნა. გთხოვ ჯერ გაიარო რეგისტრაცია.",

    wrongCredentials:
      "ელ. ფოსტა ან პაროლი არასწორია.",

    loginSuccess:
      "შესვლა წარმატებულია!",
  },

  en: {
    title: "Login",
    description:
      "Log in to your account and continue using Care Georgia.",

    email: "Email",
    password: "Password",
    passwordPlaceholder: "Your password",

    login: "Login",

    noAccount:
      "Don't have an account yet?",
    register: "Register",

    accountNotFound:
      "Account not found. Please register first.",

    wrongCredentials:
      "Email or password is incorrect.",

    loginSuccess:
      "Login successful!",
  },

  ru: {
    title: "Войти",
    description:
      "Войдите в свой аккаунт и продолжайте пользоваться Care Georgia.",

    email: "Эл. почта",
    password: "Пароль",
    passwordPlaceholder: "Ваш пароль",

    login: "Войти",

    noAccount:
      "Еще нет аккаунта?",
    register: "Регистрация",

    accountNotFound:
      "Аккаунт не найден. Пожалуйста, сначала зарегистрируйтесь.",

    wrongCredentials:
      "Неверная эл. почта или пароль.",

    loginSuccess:
      "Вход выполнен успешно!",
  },
};

function Login() {
  const navigate =
    useNavigate();

  const { language } =
    useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loginError,
    setLoginError,
  ] = useState("");

  /* =========================
     GET USERS
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

      if (
        Array.isArray(
          parsedUsers
        )
      ) {
        return parsedUsers;
      }

      return [];
    } catch {
      return [];
    }
  };

  /* =========================
     MIGRATE OLD USER
  ========================= */

  const migrateOldUser = (
    users
  ) => {
    const oldUserString =
      localStorage.getItem(
        "careGeorgiaUser"
      );

    if (!oldUserString) {
      return users;
    }

    try {
      const oldUser =
        JSON.parse(
          oldUserString
        );

      if (
        !oldUser ||
        !oldUser.email
      ) {
        return users;
      }

      const oldEmail =
        String(oldUser.email)
          .trim()
          .toLowerCase();

      const alreadyExists =
        users.some(
          (user) =>
            String(
              user.email || ""
            )
              .trim()
              .toLowerCase() ===
            oldEmail
        );

      if (!alreadyExists) {
        users.push({
          ...oldUser,

          id:
            oldUser.id ||
            crypto.randomUUID(),

          email: oldEmail,

          showPhone:
            oldUser.showPhone ??
            false,
        });

        localStorage.setItem(
          "careGeorgiaUsers",
          JSON.stringify(users)
        );
      }

      return users;
    } catch {
      return users;
    }
  };

  /* =========================
     LOGIN
  ========================= */

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    setLoginError("");

    /* GET ALL USERS */

    let users = getUsers();

    /*
      ძველი სისტემიდან დარჩენილი
      account თუ არსებობს,
      გადავიტანოთ ახალ სიაში.
    */

    users =
      migrateOldUser(users);

    if (users.length === 0) {
      setLoginError(
        t.accountNotFound
      );

      return;
    }

    /* NORMALIZE EMAIL */

    const enteredEmail =
      email
        .trim()
        .toLowerCase();

    /* FIND USER BY EMAIL */

    const foundUser =
      users.find(
        (user) =>
          String(
            user.email || ""
          )
            .trim()
            .toLowerCase() ===
          enteredEmail
      );

    /* EMAIL NOT FOUND */

    if (!foundUser) {
      setLoginError(
        t.wrongCredentials
      );

      return;
    }

    /* PASSWORD CHECK */

    if (
      foundUser.password !==
      password
    ) {
      setLoginError(
        t.wrongCredentials
      );

      return;
    }

    /* =========================
       MAKE SURE USER HAS ID
    ========================= */

    let currentUser = {
      ...foundUser,
    };

    if (!currentUser.id) {
      currentUser.id =
        crypto.randomUUID();

      users =
        users.map((user) => {
          const userEmail =
            String(
              user.email || ""
            )
              .trim()
              .toLowerCase();

          if (
            userEmail ===
            enteredEmail
          ) {
            return currentUser;
          }

          return user;
        });

      localStorage.setItem(
        "careGeorgiaUsers",
        JSON.stringify(users)
      );
    }

    /* =========================
       ACTIVE USER

       careGeorgiaUser-ში
       ყოველთვის ის მომხმარებელი
       ჩაიწერება, რომელიც ახლა შევიდა.
    ========================= */

    localStorage.setItem(
      "careGeorgiaUser",
      JSON.stringify(
        currentUser
      )
    );

    /* LOGGED IN */

    localStorage.setItem(
      "careGeorgiaLoggedIn",
      "true"
    );

    /* CURRENT USER ID */

    localStorage.setItem(
      "careGeorgiaCurrentUserId",
      currentUser.id
    );

    alert(
      t.loginSuccess
    );

    navigate("/");
  };

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
              {t.description}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* EMAIL */}

            <div className="form-group">
              <label>
                {t.email}
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                autoComplete="email"
                onChange={(e) => {
                  setEmail(
                    e.target.value
                  );

                  setLoginError(
                    ""
                  );
                }}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label>
                {t.password}
              </label>

              <input
                type="password"
                placeholder={
                  t.passwordPlaceholder
                }
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );

                  setLoginError(
                    ""
                  );
                }}
                required
              />
            </div>

            {/* ERROR */}

            {loginError && (
              <p
                style={{
                  color:
                    "#dc2626",
                  fontSize:
                    "14px",
                  margin: "0",
                  padding:
                    "10px 12px",
                  backgroundColor:
                    "#fef2f2",
                  border:
                    "1px solid #fecaca",
                  borderRadius:
                    "8px",
                }}
              >
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              {t.login}
            </button>

          </form>

          <p className="auth-bottom">
            {t.noAccount}{" "}

            <Link to="/register">
              {t.register}
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;