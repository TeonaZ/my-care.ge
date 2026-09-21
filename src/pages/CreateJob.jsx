import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "განცხადების დამატება",
    description:
      "მიუთითე როგორი სპეციალისტი გჭირდება და გამოაქვეყნე განცხადება.",

    service: "ვის ეძებ?",
    chooseService: "აირჩიე სპეციალისტი",

    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი / რეპეტიტორი",
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

    employment: "განაკვეთი",
    chooseEmployment: "აირჩიე განაკვეთი",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    paymentType: "გადახდის ტიპი",
    choosePaymentType: "აირჩიე გადახდის ტიპი",

    monthly: "თვიური",
    biweekly: "2 კვირაში ერთხელ",
    daily: "დღიური",
    hourly: "საათობრივი",

    budget: "ანაზღაურება",
    budgetPlaceholder: "მაგ: 2500",

    descriptionLabel: "სამუშაოს აღწერა",
    descriptionPlaceholder:
      "დაწერე რა დახმარება გჭირდება, სამუშაოს პირობები და სხვა მნიშვნელოვანი ინფორმაცია.",

    publish: "განცხადების გამოქვეყნება",

    loginRequired:
      "განცხადების დასამატებლად ჯერ უნდა შეხვიდე ანგარიშში.",

    userNotFound:
      "მომხმარებლის მონაცემები ვერ მოიძებნა. გთხოვ თავიდან შეხვიდე ანგარიშში.",

    success:
      "განცხადება წარმატებით გამოქვეყნდა!",
  },

  en: {
    back: "← Care Georgia",
    title: "Post a Job",
    description:
      "Tell us what kind of specialist you need and publish your job post.",

    service: "Who are you looking for?",
    chooseService: "Choose a specialist",

    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor / Teacher",
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

    employment: "Employment type",
    chooseEmployment: "Choose employment type",

    fullTime: "Full-time",
    partTime: "Part-time",

    paymentType: "Payment type",
    choosePaymentType: "Choose payment type",

    monthly: "Monthly",
    biweekly: "Every 2 weeks",
    daily: "Daily",
    hourly: "Hourly",

    budget: "Pay",
    budgetPlaceholder: "Example: 2500",

    descriptionLabel: "Job description",
    descriptionPlaceholder:
      "Describe the help you need, working conditions and other important information.",

    publish: "Publish Job",

    loginRequired:
      "You need to log in before posting a job.",

    userNotFound:
      "Your account information could not be found. Please log in again.",

    success:
      "Job posted successfully!",
  },

  ru: {
    back: "← Care Georgia",
    title: "Разместить вакансию",
    description:
      "Укажите, какой специалист вам нужен, и опубликуйте объявление.",

    service: "Кого вы ищете?",
    chooseService: "Выберите специалиста",

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

    employment: "Тип занятости",
    chooseEmployment: "Выберите тип занятости",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    paymentType: "Тип оплаты",
    choosePaymentType: "Выберите тип оплаты",

    monthly: "Ежемесячно",
    biweekly: "Раз в 2 недели",
    daily: "Ежедневно",
    hourly: "Почасово",

    budget: "Оплата",
    budgetPlaceholder: "Например: 2500",

    descriptionLabel: "Описание работы",
    descriptionPlaceholder:
      "Опишите необходимую помощь, условия работы и другую важную информацию.",

    publish: "Опубликовать",

    loginRequired:
      "Чтобы разместить объявление, сначала войдите в аккаунт.",

    userNotFound:
      "Данные аккаунта не найдены. Пожалуйста, войдите снова.",

    success:
      "Объявление успешно опубликовано!",
  },
};

function PostJob() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const [service, setService] =
    useState("");

  const [city, setCity] =
    useState("");

  const [
    employmentType,
    setEmploymentType,
  ] = useState("");

  const [
    paymentType,
    setPaymentType,
  ] = useState("");

  const [budget, setBudget] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const selectStyle = {
    display: "block",
    width: "100%",
    height: "56px",
    minHeight: "56px",
    padding: "0 16px",
    border: "1px solid #dbe2ea",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#334155",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: "400",
    boxSizing: "border-box",
    cursor: "pointer",
    outline: "none",
  };

  /* =========================
     LOG USER OUT IF INVALID
  ========================= */

  const clearLogin = () => {
    localStorage.removeItem(
      "careGeorgiaLoggedIn"
    );

    localStorage.removeItem(
      "careGeorgiaCurrentUserId"
    );

    localStorage.removeItem(
      "careGeorgiaUser"
    );
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* CHECK LOGIN */

    const isLoggedIn =
      localStorage.getItem(
        "careGeorgiaLoggedIn"
      ) === "true";

    if (!isLoggedIn) {
      alert(t.loginRequired);

      navigate("/login");

      return;
    }

    /* CURRENT USER ID */

    const currentUserId =
      localStorage.getItem(
        "careGeorgiaCurrentUserId"
      );

    /* ACTIVE USER */

    const savedUser =
      localStorage.getItem(
        "careGeorgiaUser"
      );

    if (
      !savedUser ||
      !currentUserId
    ) {
      alert(t.userNotFound);

      clearLogin();

      navigate("/login");

      return;
    }

    let user = null;

    try {
      user =
        JSON.parse(savedUser);
    } catch {
      user = null;
    }

    if (!user) {
      alert(t.userNotFound);

      clearLogin();

      navigate("/login");

      return;
    }

    /*
      უსაფრთხოებისთვის ვამოწმებთ,
      რომ აქტიური user-ის ID და
      currentUserId ერთმანეთს ემთხვევა.
    */

    if (
      !user.id ||
      String(user.id) !==
        String(currentUserId)
    ) {
      alert(t.userNotFound);

      clearLogin();

      navigate("/login");

      return;
    }

    /* =========================
       NEW JOB
    ========================= */

    const newJob = {
      id: crypto.randomUUID(),

      /*
        განცხადება ეკუთვნის ზუსტად
        ამჟამად შესულ account-ს.
      */

      ownerId: user.id,

      service,
      city,
      employmentType,
      paymentType,

      budget: Number(budget),

      description:
        description.trim(),

      /* EMPLOYER */

      employerName:
        `${user.firstName || ""} ${
          user.lastName || ""
        }`.trim(),

      employerEmail:
        user.email || "",

      employerPhone:
        user.phone || "",

      /*
        ტელეფონის გამოჩენა დამოკიდებულია
        პროფილში არჩეულ პარამეტრზე.

        თუ ძველ account-ს ეს პარამეტრი
        საერთოდ არ აქვს, ნომერი დამალულია.
      */

      showPhone:
        user.showPhone ?? false,

      status: "active",

      createdAt:
        new Date().toISOString(),
    };

    /* =========================
       GET EXISTING JOBS
    ========================= */

    const savedJobs =
      localStorage.getItem(
        "careGeorgiaJobs"
      );

    let jobs = [];

    if (savedJobs) {
      try {
        const parsedJobs =
          JSON.parse(savedJobs);

        if (
          Array.isArray(
            parsedJobs
          )
        ) {
          jobs = parsedJobs;
        }
      } catch {
        jobs = [];
      }
    }

    /* =========================
       SAVE JOB
    ========================= */

    jobs.push(newJob);

    localStorage.setItem(
      "careGeorgiaJobs",
      JSON.stringify(jobs)
    );

    alert(t.success);

    /* CLEAR FORM */

    setService("");
    setCity("");
    setEmploymentType("");
    setPaymentType("");
    setBudget("");
    setDescription("");

    /* JOBS PAGE */

    navigate("/jobs");
  };

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
              {t.title}
            </h1>

            <p>
              {t.description}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* SERVICE */}

            <div className="form-group">
              <label>
                {t.service}
              </label>

              <select
                style={selectStyle}
                value={service}
                onChange={(e) =>
                  setService(
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  {t.chooseService}
                </option>

                <option value="nanny">
                  👶 {t.nanny}
                </option>

                <option value="caregiver">
                  👵 {t.caregiver}
                </option>

                <option value="driver">
                  🚗 {t.driver}
                </option>

                <option value="tutor">
                  📚 {t.tutor}
                </option>

                <option value="housekeeper">
                  🏠 {t.housekeeper}
                </option>

                <option value="dogwalker">
                  🐕 {t.dogWalker}
                </option>
              </select>
            </div>

            {/* CITY */}

            <div className="form-group">
              <label>
                {t.city}
              </label>

              <select
                style={selectStyle}
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  {t.chooseCity}
                </option>

                <option value="tbilisi">
                  {t.tbilisi}
                </option>

                <option value="batumi">
                  {t.batumi}
                </option>

                <option value="kutaisi">
                  {t.kutaisi}
                </option>

                <option value="rustavi">
                  {t.rustavi}
                </option>

                <option value="gori">
                  {t.gori}
                </option>

                <option value="zugdidi">
                  {t.zugdidi}
                </option>

                <option value="poti">
                  {t.poti}
                </option>

                <option value="telavi">
                  {t.telavi}
                </option>

                <option value="other">
                  {t.other}
                </option>
              </select>
            </div>

            {/* EMPLOYMENT */}

            <div className="form-group">
              <label>
                {t.employment}
              </label>

              <select
                style={selectStyle}
                value={
                  employmentType
                }
                onChange={(e) =>
                  setEmploymentType(
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  {
                    t.chooseEmployment
                  }
                </option>

                <option value="full-time">
                  {t.fullTime}
                </option>

                <option value="part-time">
                  {t.partTime}
                </option>
              </select>
            </div>

            {/* PAYMENT TYPE */}

            <div className="form-group">
              <label>
                {t.paymentType}
              </label>

              <select
                style={selectStyle}
                value={paymentType}
                onChange={(e) =>
                  setPaymentType(
                    e.target.value
                  )
                }
                required
              >
                <option value="">
                  {
                    t.choosePaymentType
                  }
                </option>

                <option value="monthly">
                  {t.monthly}
                </option>

                <option value="biweekly">
                  {t.biweekly}
                </option>

                <option value="daily">
                  {t.daily}
                </option>

                <option value="hourly">
                  {t.hourly}
                </option>
              </select>
            </div>

            {/* BUDGET */}

            <div className="form-group">
              <label>
                {t.budget}
              </label>

              <input
                type="number"
                min="1"
                value={budget}
                onChange={(e) =>
                  setBudget(
                    e.target.value
                  )
                }
                placeholder={
                  t.budgetPlaceholder
                }
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div className="form-group">
              <label>
                {
                  t.descriptionLabel
                }
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder={
                  t.descriptionPlaceholder
                }
                required
                rows="6"
                style={{
                  width: "100%",
                  padding:
                    "14px 16px",
                  border:
                    "1px solid #dbe2ea",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#ffffff",
                  fontFamily:
                    "inherit",
                  fontSize:
                    "15px",
                  resize:
                    "vertical",
                  boxSizing:
                    "border-box",
                  outline: "none",
                }}
              />
            </div>

            {/* PUBLISH */}

            <button
              type="submit"
              className="auth-submit"
            >
              {t.publish}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;