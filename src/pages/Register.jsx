import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    title: "შექმენი ანგარიში",
    description:
      "შემოუერთდი Care Georgia-ს და იპოვე დახმარება ან შესთავაზე შენი მომსახურება.",

    clientTitle: "ვეძებ დახმარებას",
    clientDescription: "მსურს სპეციალისტის პოვნა",
    providerTitle: "ვეძებ სამუშაოს",
    providerDescription: "მსურს მომსახურების შეთავაზება",

    lookingFor: "რა ტიპის დახმარებას ეძებ?",
    chooseHelp: "აირჩიე დახმარების ტიპი",

    offering: "რა მომსახურებას სთავაზობ?",
    chooseService: "აირჩიე მომსახურება",

    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი",
    housekeeper: "სახლის დამხმარე",
    dogWalker: "ძაღლის გამსეირნებელი",

    city: "ქალაქი",
    chooseCity: "აირჩიე ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    firstName: "სახელი",
    firstNamePlaceholder: "შენი სახელი",

    lastName: "გვარი",
    lastNamePlaceholder: "შენი გვარი",

    email: "ელ. ფოსტა",

    phone: "ტელეფონის ნომერი (არასავალდებულო)",
    phoneTitle: "თუ ნომერს უთითებ, ჩაწერე ფორმატით: 555 12 34 56",

    password: "პაროლი",
    passwordPlaceholder: "მინ. 8 სიმბოლო, 1 დიდი ასო და 1 ციფრი",

    passwordError:
      "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, 1 დიდ ასოს და 1 ციფრს.",

    confirmPassword: "გაიმეორე პაროლი",
    confirmPasswordPlaceholder: "გაიმეორე პაროლი",

    passwordsDoNotMatch: "პაროლები ერთმანეთს არ ემთხვევა.",

    emailExists: "ამ ელ. ფოსტით ანგარიში უკვე არსებობს.",

    agree: "ვეთანხმები",
    terms: "წესებს",
    and: "და",
    privacy: "კონფიდენციალურობის პოლიტიკას",

    register: "რეგისტრაცია",
    registering: "რეგისტრაცია...",

    alreadyHaveAccount: "უკვე გაქვს ანგარიში?",
    login: "შესვლა",

    registrationSuccess: "რეგისტრაცია წარმატებულია!",
    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა. სცადე თავიდან.",
  },

  en: {
    title: "Create an Account",
    description: "Join Care Georgia to find help or offer your services.",

    clientTitle: "I'm looking for help",
    clientDescription: "I want to find a specialist",
    providerTitle: "I'm looking for work",
    providerDescription: "I want to offer my services",

    lookingFor: "What type of help are you looking for?",
    chooseHelp: "Choose a type of help",

    offering: "What service do you offer?",
    chooseService: "Choose a service",

    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor",
    housekeeper: "Housekeeper",
    dogWalker: "Dog Walker",

    city: "City",
    chooseCity: "Choose a city",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    firstName: "First Name",
    firstNamePlaceholder: "Your first name",

    lastName: "Last Name",
    lastNamePlaceholder: "Your last name",

    email: "Email",

    phone: "Phone number (optional)",
    phoneTitle: "If you enter a phone number, use this format: 555 12 34 56",

    password: "Password",
    passwordPlaceholder: "Min. 8 characters, 1 uppercase letter and 1 number",

    passwordError:
      "Password must contain at least 8 characters, 1 uppercase letter and 1 number.",

    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm your password",

    passwordsDoNotMatch: "Passwords do not match.",

    emailExists: "An account with this email already exists.",

    agree: "I agree to the",
    terms: "Terms",
    and: "and",
    privacy: "Privacy Policy",

    register: "Register",
    registering: "Registering...",

    alreadyHaveAccount: "Already have an account?",
    login: "Login",

    registrationSuccess: "Registration successful!",
    serverError: "Could not connect to the server. Please try again.",
  },

  ru: {
    title: "Создать аккаунт",
    description:
      "Присоединяйтесь к Care Georgia, чтобы найти помощь или предложить свои услуги.",

    clientTitle: "Ищу помощь",
    clientDescription: "Хочу найти специалиста",
    providerTitle: "Ищу работу",
    providerDescription: "Хочу предложить свои услуги",

    lookingFor: "Какой вид помощи вы ищете?",
    chooseHelp: "Выберите вид помощи",

    offering: "Какую услугу вы предлагаете?",
    chooseService: "Выберите услугу",

    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogWalker: "Выгульщик собак",

    city: "Город",
    chooseCity: "Выберите город",
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    firstName: "Имя",
    firstNamePlaceholder: "Ваше имя",

    lastName: "Фамилия",
    lastNamePlaceholder: "Ваша фамилия",

    email: "Эл. почта",

    phone: "Номер телефона (необязательно)",
    phoneTitle: "Если указываете номер, используйте формат: 555 12 34 56",

    password: "Пароль",
    passwordPlaceholder: "Мин. 8 символов, 1 заглавная буква и 1 цифра",

    passwordError:
      "Пароль должен содержать минимум 8 символов, 1 заглавную букву и 1 цифру.",

    confirmPassword: "Повторите пароль",
    confirmPasswordPlaceholder: "Повторите пароль",

    passwordsDoNotMatch: "Пароли не совпадают.",

    emailExists: "Аккаунт с этой электронной почтой уже существует.",

    agree: "Я принимаю",
    terms: "Условия",
    and: "и",
    privacy: "Политику конфиденциальности",

    register: "Регистрация",
    registering: "Регистрация...",

    alreadyHaveAccount: "Уже есть аккаунт?",
    login: "Войти",

    registrationSuccess: "Регистрация прошла успешно!",
    serverError: "Не удалось подключиться к серверу. Попробуйте снова.",
  },
};

function Register() {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [accountType, setAccountType] = useState("client");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectStyle = {
    width: "100%",
    height: "50px",
    borderRadius: "9px",
    border: "1px solid #dbe2ea",
    padding: "0 12px",
    backgroundColor: "white",
    color: "#334155",
    fontFamily: "inherit",
    fontSize: "14px",
    boxSizing: "border-box",
    cursor: "pointer",
    outline: "none",
  };

  // =========================
  // REGISTER THROUGH BACKEND
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEightCharacters = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasEightCharacters || !hasUppercase || !hasNumber) {
      setPasswordError(t.passwordError);
      return;
    }

    if (password !== confirmPassword) {
      alert(t.passwordsDoNotMatch);
      return;
    }

    setPasswordError("");

    const formData = new FormData(e.target);

    const firstName = String(formData.get("firstName") || "").trim();

    const lastName = String(formData.get("lastName") || "").trim();

    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const service = String(formData.get("service") || "");

    const city = String(formData.get("city") || "");

    const phoneValue = String(formData.get("phone") || "").trim();

    const phone = phoneValue ? `+995 ${phoneValue}` : "";

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          accountType,
          service,
          city,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          alert(t.emailExists);
          return;
        }

        alert(data.message || t.serverError);
        return;
      }

      alert(t.registrationSuccess);

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      alert(t.serverError);
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

          {/* ACCOUNT TYPE */}

          <div className="account-types">
            <button
              type="button"
              className={`account-type ${
                accountType === "client" ? "active" : ""
              }`}
              onClick={() => setAccountType("client")}
            >
              <span>🔎</span>

              <div>
                <strong>{t.clientTitle}</strong>
                <p>{t.clientDescription}</p>
              </div>
            </button>

            <button
              type="button"
              className={`account-type ${
                accountType === "provider" ? "active" : ""
              }`}
              onClick={() => setAccountType("provider")}
            >
              <span>💼</span>

              <div>
                <strong>{t.providerTitle}</strong>
                <p>{t.providerDescription}</p>
              </div>
            </button>
          </div>

          {/* FORM */}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* CLIENT SERVICE */}

            {accountType === "client" && (
              <div className="form-group service-select-group">
                <label>{t.lookingFor}</label>

                <select
                  name="service"
                  defaultValue=""
                  required
                  style={selectStyle}
                >
                  <option value="" disabled>
                    {t.chooseHelp}
                  </option>

                  <option value="nanny">👶 {t.nanny}</option>

                  <option value="caregiver">👵 {t.caregiver}</option>

                  <option value="driver">🚗 {t.driver}</option>

                  <option value="tutor">📚 {t.tutor}</option>

                  <option value="housekeeper">🏠 {t.housekeeper}</option>

                  <option value="dogwalker">🐕 {t.dogWalker}</option>
                </select>
              </div>
            )}

            {/* PROVIDER SERVICE */}

            {accountType === "provider" && (
              <div className="form-group service-select-group">
                <label>{t.offering}</label>

                <select
                  name="service"
                  defaultValue=""
                  required
                  style={selectStyle}
                >
                  <option value="" disabled>
                    {t.chooseService}
                  </option>

                  <option value="nanny">👶 {t.nanny}</option>

                  <option value="caregiver">👵 {t.caregiver}</option>

                  <option value="driver">🚗 {t.driver}</option>

                  <option value="tutor">📚 {t.tutor}</option>

                  <option value="housekeeper">🏠 {t.housekeeper}</option>

                  <option value="dogwalker">🐕 {t.dogWalker}</option>
                </select>
              </div>
            )}

            {/* CITY */}

            <div className="form-group">
              <label>{t.city}</label>

              <select name="city" defaultValue="" required style={selectStyle}>
                <option value="" disabled>
                  {t.chooseCity}
                </option>

                <option value="tbilisi">{t.tbilisi}</option>

                <option value="batumi">{t.batumi}</option>

                <option value="kutaisi">{t.kutaisi}</option>

                <option value="rustavi">{t.rustavi}</option>

                <option value="gori">{t.gori}</option>

                <option value="zugdidi">{t.zugdidi}</option>

                <option value="poti">{t.poti}</option>

                <option value="telavi">{t.telavi}</option>

                <option value="other">{t.other}</option>
              </select>
            </div>

            {/* NAME */}

            <div className="form-row">
              <div className="form-group">
                <label>{t.firstName}</label>

                <input
                  type="text"
                  name="firstName"
                  placeholder={t.firstNamePlaceholder}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.lastName}</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder={t.lastNamePlaceholder}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label>{t.email}</label>

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* PHONE */}

            <div className="form-group">
              <label>{t.phone}</label>

              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #dbe2ea",
                  borderRadius: "9px",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    width: "75px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    borderRight: "1px solid #dbe2ea",
                    backgroundColor: "#f8fafc",
                    fontWeight: "600",
                  }}
                >
                  +995
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="555 12 34 56"
                  pattern="5[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                  title={t.phoneTitle}
                  style={{
                    flex: "1",
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "0",
                    padding: "0 14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label>{t.password}</label>

              <input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                required
                onChange={(e) => {
                  const newPassword = e.target.value;

                  setPassword(newPassword);

                  const hasEightCharacters = newPassword.length >= 8;

                  const hasUppercase = /[A-Z]/.test(newPassword);

                  const hasNumber = /[0-9]/.test(newPassword);

                  if (
                    newPassword &&
                    (!hasEightCharacters || !hasUppercase || !hasNumber)
                  ) {
                    setPasswordError(t.passwordError);
                  } else {
                    setPasswordError("");
                  }
                }}
              />

              {passwordError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form-group">
              <label>{t.confirmPassword}</label>

              <input
                type="password"
                placeholder={t.confirmPasswordPlaceholder}
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPassword && password !== confirmPassword && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {t.passwordsDoNotMatch}
                </p>
              )}
            </div>

            {/* TERMS */}

            <label className="terms-check">
              <input type="checkbox" required />

              <span>
                {t.agree} <Link to="/terms">{t.terms}</Link> {t.and}{" "}
                <Link to="/privacy">{t.privacy}</Link>
              </span>
            </label>

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.registering : t.register}
            </button>
          </form>

          <p className="auth-bottom">
            {t.alreadyHaveAccount} <Link to="/login">{t.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
