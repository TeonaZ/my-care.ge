import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    back: "← ჩემი განცხადებები",
    title: "განცხადების რედაქტირება",
    description:
      "შეცვალე განცხადების ინფორმაცია და შეინახე ცვლილებები.",

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
      "დაწერე სამუშაოს პირობები და სხვა მნიშვნელოვანი ინფორმაცია.",

    contactSharing: "საკონტაქტო ინფორმაციის გაზიარება",
    contactSharingHelp:
      "აირჩიე, რომელი საკონტაქტო ინფორმაცია გამოჩნდეს ამ განცხადებაზე.",

    shareEmail: "ელ. ფოსტის გაზიარება",
    sharePhone: "ტელეფონის გაზიარება",

    contactMissing:
      "ეს ინფორმაცია შენს პროფილში მითითებული არ არის.",

    save: "ცვლილებების შენახვა",
    saving: "ინახება...",

    loginRequired:
      "განცხადების რედაქტირებისთვის ჯერ უნდა შეხვიდე ანგარიშში.",

    notFound: "განცხადება ვერ მოიძებნა.",

    noPermission:
      "ამ განცხადების რედაქტირების უფლება არ გაქვს.",

    success: "ცვლილებები წარმატებით შეინახა!",

    goBack: "ჩემს განცხადებებზე დაბრუნება",

    loadError: "განცხადების ჩატვირთვა ვერ მოხერხდა.",
    saveError: "ცვლილებების შენახვა ვერ მოხერხდა.",
    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა.",
  },

  en: {
    back: "← My Jobs",
    title: "Edit Job",
    description:
      "Update your job information and save the changes.",

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
      "Describe the job conditions and other important information.",

    contactSharing: "Contact sharing",
    contactSharingHelp:
      "Choose which contact information should be visible on this job post.",

    shareEmail: "Share email",
    sharePhone: "Share phone",

    contactMissing:
      "This information is not available in your profile.",

    save: "Save Changes",
    saving: "Saving...",

    loginRequired:
      "You need to log in before editing a job.",

    notFound: "Job not found.",

    noPermission:
      "You do not have permission to edit this job.",

    success: "Changes saved successfully!",

    goBack: "Back to My Jobs",

    loadError: "Could not load the job.",
    saveError: "Could not save the changes.",
    serverError: "Could not connect to the server.",
  },

  ru: {
    back: "← Мои объявления",
    title: "Редактировать объявление",
    description:
      "Измените информацию объявления и сохраните изменения.",

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
      "Опишите условия работы и другую важную информацию.",

    contactSharing: "Контактная информация",
    contactSharingHelp:
      "Выберите, какие контактные данные будут видны в этом объявлении.",

    shareEmail: "Показывать эл. почту",
    sharePhone: "Показывать телефон",

    contactMissing:
      "Эта информация не указана в вашем профиле.",

    save: "Сохранить изменения",
    saving: "Сохранение...",

    loginRequired:
      "Чтобы редактировать объявление, войдите в аккаунт.",

    notFound: "Объявление не найдено.",

    noPermission:
      "У вас нет права редактировать это объявление.",

    success: "Изменения успешно сохранены!",

    goBack: "Вернуться к моим объявлениям",

    loadError: "Не удалось загрузить объявление.",
    saveError: "Не удалось сохранить изменения.",
    serverError: "Не удалось подключиться к серверу.",
  },
};

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const [shareEmail, setShareEmail] = useState(false);
  const [sharePhone, setSharePhone] = useState(false);

  const [jobFound, setJobFound] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========================================
  // CURRENT USER
  // ========================================

  let currentUser = null;

  try {
    const savedUser =
      localStorage.getItem("careGeorgiaUser");

    currentUser = savedUser
      ? JSON.parse(savedUser)
      : null;
  } catch {
    currentUser = null;
  }

  const hasEmail = Boolean(currentUser?.email);
  const hasPhone = Boolean(currentUser?.phone);

  // ========================================
  // SELECT STYLE
  // ========================================

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

  // ========================================
  // CLEAR LOGIN
  // ========================================

  const clearLogin = () => {
    localStorage.removeItem("careGeorgiaToken");
    localStorage.removeItem("careGeorgiaLoggedIn");
    localStorage.removeItem(
      "careGeorgiaCurrentUserId"
    );
    localStorage.removeItem("careGeorgiaUser");
  };

  // ========================================
  // LOAD JOB FROM POSTGRESQL
  // ========================================

  useEffect(() => {
    const loadJob = async () => {
      const token =
        localStorage.getItem("careGeorgiaToken");

      if (!token) {
        alert(t.loginRequired);

        navigate("/login", {
          replace: true,
        });

        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          clearLogin();

          navigate("/login", {
            replace: true,
          });

          return;
        }

        if (response.status === 403) {
          setHasPermission(false);
          return;
        }

        if (response.status === 404) {
          setJobFound(false);
          return;
        }

        if (!response.ok || !data.job) {
          console.error(
            "Load job error:",
            data
          );

          alert(
            data.message ||
              t.loadError
          );

          setJobFound(false);

          return;
        }

        const job = data.job;

        setService(job.service || "");
        setCity(job.city || "");

        setEmploymentType(
          job.employmentType || ""
        );

        setPaymentType(
          job.paymentType || "hourly"
        );

        setBudget(
          job.budget !== undefined &&
            job.budget !== null
            ? String(job.budget)
            : ""
        );

        setDescription(
          job.description || ""
        );

        setShareEmail(
          job.showEmployerEmail === true
        );

        setSharePhone(
          job.showEmployerPhone === true
        );
      } catch (error) {
        console.error(
          "Load job error:",
          error
        );

        alert(t.serverError);
        setJobFound(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id, navigate, t.loginRequired, t.loadError, t.serverError]);

  // ========================================
  // SAVE CHANGES TO POSTGRESQL
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const token =
      localStorage.getItem("careGeorgiaToken");

    if (!token) {
      clearLogin();

      navigate("/login", {
        replace: true,
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `http://localhost:5000/api/jobs/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            service,
            city,
            employmentType,
            paymentType,
            budget: Number(budget),
            description: description.trim(),

            showEmployerEmail:
              shareEmail && hasEmail,

            showEmployerPhone:
              sharePhone && hasPhone,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        clearLogin();

        navigate("/login", {
          replace: true,
        });

        return;
      }

      if (response.status === 403) {
        setHasPermission(false);
        return;
      }

      if (response.status === 404) {
        setJobFound(false);
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            t.saveError
        );

        return;
      }

      alert(t.success);

      navigate("/my-jobs");
    } catch (error) {
      console.error(
        "Update job error:",
        error
      );

      alert(t.serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-heading">
              <p>...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // NOT FOUND
  // ========================================

  if (!jobFound) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-heading">
              <h1>{t.notFound}</h1>

              <Link to="/my-jobs">
                {t.goBack}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // NO PERMISSION
  // ========================================

  if (!hasPermission) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-heading">
              <h1>
                {t.noPermission}
              </h1>

              <Link to="/my-jobs">
                {t.goBack}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link
          to="/my-jobs"
          className="auth-logo"
        >
          {t.back}
        </Link>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>{t.title}</h1>

            <p>{t.description}</p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {/* SERVICE */}

            <div className="form-group">
              <label>{t.service}</label>

              <select
                style={selectStyle}
                value={service}
                onChange={(e) =>
                  setService(e.target.value)
                }
                required
              >
                <option
                  value=""
                  disabled
                >
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
              <label>{t.city}</label>

              <select
                style={selectStyle}
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                required
              >
                <option
                  value=""
                  disabled
                >
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
                value={employmentType}
                onChange={(e) =>
                  setEmploymentType(
                    e.target.value
                  )
                }
                required
              >
                <option
                  value=""
                  disabled
                >
                  {t.chooseEmployment}
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
                <option
                  value=""
                  disabled
                >
                  {t.choosePaymentType}
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
              <label>{t.budget}</label>

              <input
                type="number"
                min="1"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
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
                {t.descriptionLabel}
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
                  padding: "14px 16px",
                  border:
                    "1px solid #dbe2ea",
                  borderRadius: "10px",
                  backgroundColor:
                    "#ffffff",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  resize: "vertical",
                  boxSizing:
                    "border-box",
                  outline: "none",
                }}
              />
            </div>

            {/* CONTACT SHARING */}

            <div
              className="form-group"
              style={{
                padding: "16px",
                border:
                  "1px solid #dbe2ea",
                borderRadius: "10px",
                backgroundColor:
                  "#f8fafc",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "700",
                }}
              >
                📇 {t.contactSharing}
              </label>

              <p
                style={{
                  margin: "0 0 14px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {t.contactSharingHelp}
              </p>

              {/* EMAIL */}

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",

                  cursor: hasEmail
                    ? "pointer"
                    : "not-allowed",
                }}
              >
                <input
                  type="checkbox"
                  checked={shareEmail}
                  disabled={!hasEmail}
                  onChange={(e) =>
                    setShareEmail(
                      e.target.checked
                    )
                  }
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />

                <span>
                  ✉️ {t.shareEmail}

                  {hasEmail
                    ? ` — ${currentUser.email}`
                    : ` — ${t.contactMissing}`}
                </span>
              </label>

              {/* PHONE */}

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  cursor: hasPhone
                    ? "pointer"
                    : "not-allowed",
                }}
              >
                <input
                  type="checkbox"
                  checked={sharePhone}
                  disabled={!hasPhone}
                  onChange={(e) =>
                    setSharePhone(
                      e.target.checked
                    )
                  }
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />

                <span>
                  📞 {t.sharePhone}

                  {hasPhone
                    ? ` — ${currentUser.phone}`
                    : ` — ${t.contactMissing}`}
                </span>
              </label>
            </div>

            {/* SAVE */}

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              💾{" "}
              {isSubmitting
                ? t.saving
                : t.save}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditJob;