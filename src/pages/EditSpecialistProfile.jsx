import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    title: "სპეციალისტის განცხადების რედაქტირება",
    subtitle: "შეცვალეთ თქვენი პროფესიული განცხადების ინფორმაცია.",

    profession: "პროფესია",
    selectProfession: "აირჩიეთ პროფესია",
    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი",
    housekeeper: "სახლის დამხმარე",
    dogWalker: "ძაღლის გამსეირნებელი",

    city: "ქალაქი",
    selectCity: "აირჩიეთ ქალაქი",
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    experience: "გამოცდილება",
    experiencePlaceholder: "მაგ: 5 წელი",

    employment: "განაკვეთი",
    selectEmployment: "აირჩიეთ განაკვეთი",
    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    paymentType: "გადახდის ტიპი",
    selectPaymentType: "აირჩიეთ გადახდის ტიპი",
    hourly: "საათობრივი",
    daily: "დღიური",
    biweekly: "2 კვირაში ერთხელ",
    monthly: "თვიური",

    price: "თანხა",
    pricePlaceholder: "მაგ: 25",

    description: "ჩემ შესახებ",
    descriptionPlaceholder:
      "მოკლედ აღწერეთ თქვენი გამოცდილება და მომსახურება...",

    contactSettings: "საკონტაქტო ინფორმაციის ხილვადობა",

    email: "ელფოსტა",
    phone: "ტელეფონი",

    showEmail:
      "დაინტერესების შემდეგ დამსაქმებელს ჩემი ელფოსტა გამოუჩნდეს",

    showPhone:
      "დაინტერესების შემდეგ დამსაქმებელს ჩემი ტელეფონი გამოუჩნდეს",

    contactHint:
      "ელფოსტის ან ტელეფონის შესაცვლელად გამოიყენეთ „ჩემი პროფილი“.",

    myProfile: "ჩემი პროფილი",

    save: "ცვლილებების შენახვა",
    saving: "ინახება...",

    back: "← ჩემს განცხადებებზე დაბრუნება",

    success: "ცვლილებები წარმატებით შეინახა.",

    required: "გთხოვთ შეავსოთ ყველა აუცილებელი ველი.",

    invalidPrice: "გთხოვთ მიუთითოთ სწორი თანხა.",

    notFound: "სპეციალისტის განცხადება ვერ მოიძებნა.",

    noAccess:
      "ამ სპეციალისტის განცხადების რედაქტირების უფლება არ გაქვთ.",

    loginRequired:
      "რედაქტირებისთვის ჯერ უნდა შეხვიდეთ ანგარიშზე.",

    providerOnly:
      "სპეციალისტის განცხადების რედაქტირება მხოლოდ სამუშაოს მაძიებელს შეუძლია.",

    loadError: "განცხადების ჩატვირთვა ვერ მოხერხდა.",

    saveError: "ცვლილებების შენახვა ვერ მოხერხდა.",

    serverError: "სერვერთან დაკავშირება ვერ მოხერხდა.",

    loading: "იტვირთება...",
  },

  en: {
    title: "Edit Specialist Listing",
    subtitle: "Update your professional listing information.",

    profession: "Profession",
    selectProfession: "Select profession",
    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor",
    housekeeper: "Housekeeper",
    dogWalker: "Dog Walker",

    city: "City",
    selectCity: "Select city",
    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    experience: "Experience",
    experiencePlaceholder: "Example: 5 years",

    employment: "Employment type",
    selectEmployment: "Select employment type",
    fullTime: "Full-time",
    partTime: "Part-time",

    paymentType: "Payment type",
    selectPaymentType: "Select payment type",
    hourly: "Hourly",
    daily: "Daily",
    biweekly: "Every 2 weeks",
    monthly: "Monthly",

    price: "Amount",
    pricePlaceholder: "Example: 25",

    description: "About Me",
    descriptionPlaceholder:
      "Briefly describe your experience and services...",

    contactSettings: "Contact visibility",

    email: "Email",
    phone: "Phone",

    showEmail:
      "Show my email to an employer after they send interest",

    showPhone:
      "Show my phone number to an employer after they send interest",

    contactHint:
      "To change your email or phone number, use My Profile.",

    myProfile: "My Profile",

    save: "Save Changes",
    saving: "Saving...",

    back: "← Back to My Listings",

    success: "Changes saved successfully.",

    required: "Please complete all required fields.",

    invalidPrice: "Please enter a valid amount.",

    notFound: "Specialist listing was not found.",

    noAccess:
      "You do not have permission to edit this specialist listing.",

    loginRequired:
      "You must log in before editing this listing.",

    providerOnly:
      "Only a job seeker can edit a specialist listing.",

    loadError: "Could not load the listing.",

    saveError: "Could not save the changes.",

    serverError: "Could not connect to the server.",

    loading: "Loading...",
  },

  ru: {
    title: "Редактировать объявление специалиста",
    subtitle: "Измените информацию вашего профессионального объявления.",

    profession: "Профессия",
    selectProfession: "Выберите профессию",
    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogWalker: "Выгульщик собак",

    city: "Город",
    selectCity: "Выберите город",
    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    experience: "Опыт",
    experiencePlaceholder: "Например: 5 лет",

    employment: "Тип занятости",
    selectEmployment: "Выберите тип занятости",
    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    paymentType: "Тип оплаты",
    selectPaymentType: "Выберите тип оплаты",
    hourly: "Почасово",
    daily: "Ежедневно",
    biweekly: "Раз в 2 недели",
    monthly: "Ежемесячно",

    price: "Сумма",
    pricePlaceholder: "Например: 25",

    description: "Обо мне",
    descriptionPlaceholder:
      "Кратко опишите ваш опыт и услуги...",

    contactSettings: "Видимость контактной информации",

    email: "Электронная почта",
    phone: "Телефон",

    showEmail:
      "Показывать мою электронную почту работодателю после проявления интереса",

    showPhone:
      "Показывать мой телефон работодателю после проявления интереса",

    contactHint:
      "Чтобы изменить электронную почту или телефон, используйте «Мой профиль».",

    myProfile: "Мой профиль",

    save: "Сохранить изменения",
    saving: "Сохранение...",

    back: "← Назад к моим объявлениям",

    success: "Изменения успешно сохранены.",

    required: "Пожалуйста, заполните все обязательные поля.",

    invalidPrice: "Укажите корректную сумму.",

    notFound: "Объявление специалиста не найдено.",

    noAccess:
      "У вас нет доступа к редактированию этого объявления.",

    loginRequired:
      "Для редактирования необходимо войти в аккаунт.",

    providerOnly:
      "Редактировать объявление специалиста может только соискатель.",

    loadError: "Не удалось загрузить объявление.",

    saveError: "Не удалось сохранить изменения.",

    serverError: "Не удалось подключиться к серверу.",

    loading: "Загрузка...",
  },
};

function EditSpecialistProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language } = useLanguage();

  const t = translations[language] || translations.ka;

  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [paymentType, setPaymentType] = useState("hourly");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const [profileFound, setProfileFound] = useState(true);
  const [hasAccess, setHasAccess] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isLoggedIn =
    localStorage.getItem("careGeorgiaLoggedIn") === "true";

  let currentUser = null;

  try {
    currentUser = JSON.parse(
      localStorage.getItem("careGeorgiaUser") || "null",
    );
  } catch {
    currentUser = null;
  }

  const accountType = currentUser?.accountType;

  const clearLogin = () => {
    localStorage.removeItem("careGeorgiaToken");
    localStorage.removeItem("careGeorgiaLoggedIn");
    localStorage.removeItem("careGeorgiaCurrentUserId");
    localStorage.removeItem("careGeorgiaUser");
  };

  // ==========================================
  // LOAD PROFILE FROM POSTGRESQL
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      if (!isLoggedIn) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      if (accountType !== "provider") {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("careGeorgiaToken");

      if (!token) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/specialists/me",
          {
            method: "GET",
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

        if (response.status === 404) {
          setProfileFound(false);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          console.error("Load specialist error:", data);
          alert(data.message || t.loadError);
          return;
        }

        const profile =
          data.profile || data.specialist || data;

        if (!profile || !profile.id) {
          setProfileFound(false);
          return;
        }

        // URL-ში არსებული ID უნდა ემთხვეოდეს
        // მომხმარებლის საკუთარ სპეციალისტის პროფილს.
        if (String(profile.id) !== String(id)) {
          setHasAccess(false);
          return;
        }

        setProfession(profile.profession || "");
        setCity(profile.city || "");
        setExperience(profile.experience || "");
        setEmploymentType(profile.employmentType || "");
        setPaymentType(profile.paymentType || "hourly");

        if (
          profile.priceValue !== undefined &&
          profile.priceValue !== null
        ) {
          setPrice(String(profile.priceValue));
        } else {
          setPrice("");
        }

        setDescription(profile.description || "");

        setEmail(profile.email || currentUser?.email || "");
        setPhone(profile.phone || currentUser?.phone || "");

        setShowEmail(profile.showEmail === true);
        setShowPhone(profile.showPhone === true);
      } catch (error) {
        console.error("Load specialist error:", error);
        alert(t.serverError);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [
    id,
    isLoggedIn,
    accountType,
    navigate,
    t.loadError,
    t.serverError,
  ]);

  // ==========================================
  // SAVE TO POSTGRESQL
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      alert(t.loginRequired);
      navigate("/login");
      return;
    }

    if (accountType !== "provider") {
      alert(t.providerOnly);
      navigate("/my-jobs");
      return;
    }

    if (
      !profession ||
      !city ||
      !experience.trim() ||
      !employmentType ||
      !paymentType ||
      !price ||
      !description.trim()
    ) {
      alert(t.required);
      return;
    }

    const numericPrice = Number(price);

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      alert(t.invalidPrice);
      return;
    }

    const token = localStorage.getItem("careGeorgiaToken");

    if (!token) {
      clearLogin();
      navigate("/login");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/specialists/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            profession,
            city,

            experience: experience.trim(),

            employmentType,

            paymentType,

            priceValue: numericPrice,

            description: description.trim(),

            showEmail,
            showPhone,
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
        alert(data.message || t.saveError);
        return;
      }

      alert(t.success);

      navigate("/my-jobs");
    } catch (error) {
      console.error("Save specialist error:", error);
      alert(t.serverError);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // STYLES
  // ==========================================

  const pageStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "50px 20px",
    boxSizing: "border-box",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "950px",
    margin: "0 auto",
  };

  const cardStyle = {
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "45px",
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.06)",
    boxSizing: "border-box",
  };

  const titleStyle = {
    margin: "0 0 10px",
    color: "#172033",
    fontSize: "32px",
    lineHeight: "1.25",
  };

  const subtitleStyle = {
    margin: "0 0 35px",
    color: "#64748b",
    fontSize: "16px",
    lineHeight: "1.6",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const labelStyle = {
    marginTop: "10px",
    color: "#172033",
    fontSize: "15px",
    fontWeight: "700",
  };

  const fieldStyle = {
    width: "100%",
    minHeight: "52px",
    padding: "0 15px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#172033",
    fontSize: "15px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
  };

  const readOnlyFieldStyle = {
    ...fieldStyle,
    backgroundColor: "#f8fafc",
    color: "#64748b",
    cursor: "not-allowed",
  };

  const textareaStyle = {
    ...fieldStyle,
    minHeight: "150px",
    padding: "15px",
    resize: "vertical",
    lineHeight: "1.6",
  };

  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginTop: "12px",
    color: "#334155",
    fontSize: "15px",
    lineHeight: "1.5",
    cursor: "pointer",
  };

  const contactBoxStyle = {
    marginTop: "20px",
    padding: "22px",
    border: "1px solid #dbeafe",
    borderRadius: "14px",
    backgroundColor: "#f8fbff",
  };

  const contactTitleStyle = {
    margin: "0 0 18px",
    color: "#172033",
    fontSize: "18px",
  };

  const hintStyle = {
    margin: "16px 0 0",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.6",
  };

  const buttonStyle = {
    width: "100%",
    minHeight: "54px",
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: saving ? "#94a3b8" : "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "inherit",
    cursor: saving ? "not-allowed" : "pointer",
  };

  // ==========================================
  // LOGIN / ACCESS
  // ==========================================

  if (!isLoggedIn) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>
              {t.loginRequired}
            </h1>

            <Link to="/login">
              {t.loginRequired}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>
              {t.loading}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (!profileFound) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>
              {t.notFound}
            </h1>

            <Link to="/my-jobs">
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>
              {accountType !== "provider"
                ? t.providerOnly
                : t.noAccess}
            </h1>

            <Link to="/my-jobs">
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FORM
  // ==========================================

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <Link
          to="/my-jobs"
          style={{
            display: "inline-block",
            marginBottom: "22px",
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          {t.back}
        </Link>

        <div style={cardStyle}>
          <h1 style={titleStyle}>
            {t.title}
          </h1>

          <p style={subtitleStyle}>
            {t.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            style={formStyle}
          >
            {/* PROFESSION */}

            <label style={labelStyle}>
              {t.profession}
            </label>

            <select
              value={profession}
              onChange={(event) =>
                setProfession(event.target.value)
              }
              style={fieldStyle}
              required
            >
              <option value="">
                {t.selectProfession}
              </option>

              <option value="nanny">
                {t.nanny}
              </option>

              <option value="caregiver">
                {t.caregiver}
              </option>

              <option value="driver">
                {t.driver}
              </option>

              <option value="tutor">
                {t.tutor}
              </option>

              <option value="housekeeper">
                {t.housekeeper}
              </option>

              <option value="dog-walker">
                {t.dogWalker}
              </option>
            </select>

            {/* CITY */}

            <label style={labelStyle}>
              {t.city}
            </label>

            <select
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              style={fieldStyle}
              required
            >
              <option value="">
                {t.selectCity}
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

            {/* EXPERIENCE */}

            <label style={labelStyle}>
              {t.experience}
            </label>

            <input
              type="text"
              value={experience}
              onChange={(event) =>
                setExperience(event.target.value)
              }
              placeholder={t.experiencePlaceholder}
              style={fieldStyle}
              required
            />

            {/* EMPLOYMENT */}

            <label style={labelStyle}>
              {t.employment}
            </label>

            <select
              value={employmentType}
              onChange={(event) =>
                setEmploymentType(event.target.value)
              }
              style={fieldStyle}
              required
            >
              <option value="">
                {t.selectEmployment}
              </option>

              <option value="full-time">
                {t.fullTime}
              </option>

              <option value="part-time">
                {t.partTime}
              </option>
            </select>

            {/* PAYMENT TYPE */}

            <label style={labelStyle}>
              {t.paymentType}
            </label>

            <select
              value={paymentType}
              onChange={(event) =>
                setPaymentType(event.target.value)
              }
              style={fieldStyle}
              required
            >
              <option value="">
                {t.selectPaymentType}
              </option>

              <option value="hourly">
                {t.hourly}
              </option>

              <option value="daily">
                {t.daily}
              </option>

              <option value="biweekly">
                {t.biweekly}
              </option>

              <option value="monthly">
                {t.monthly}
              </option>
            </select>

            {/* PRICE */}

            <label style={labelStyle}>
              {t.price}
            </label>

            <input
              type="number"
              min="1"
              step="0.01"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              placeholder={t.pricePlaceholder}
              style={fieldStyle}
              required
            />

            {/* DESCRIPTION */}

            <label style={labelStyle}>
              {t.description}
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder={t.descriptionPlaceholder}
              rows="6"
              style={textareaStyle}
              required
            />

            {/* CONTACT SETTINGS */}

            <div style={contactBoxStyle}>
              <h3 style={contactTitleStyle}>
                🔐 {t.contactSettings}
              </h3>

              <label style={labelStyle}>
                {t.email}
              </label>

              <input
                type="email"
                value={email}
                readOnly
                style={readOnlyFieldStyle}
              />

              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={showEmail}
                  disabled={!email}
                  onChange={(event) =>
                    setShowEmail(event.target.checked)
                  }
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "2px",
                    cursor: email
                      ? "pointer"
                      : "not-allowed",
                  }}
                />

                <span>{t.showEmail}</span>
              </label>

              <label
                style={{
                  ...labelStyle,
                  display: "block",
                  marginTop: "22px",
                }}
              >
                {t.phone}
              </label>

              <input
                type="tel"
                value={phone}
                readOnly
                style={readOnlyFieldStyle}
              />

              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={showPhone}
                  disabled={!phone}
                  onChange={(event) =>
                    setShowPhone(event.target.checked)
                  }
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "2px",
                    cursor: phone
                      ? "pointer"
                      : "not-allowed",
                  }}
                />

                <span>{t.showPhone}</span>
              </label>

              <p style={hintStyle}>
                {t.contactHint}{" "}
                <Link
                  to="/my-profile"
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                  }}
                >
                  {t.myProfile}
                </Link>
              </p>
            </div>

            {/* SAVE */}

            <button
              type="submit"
              style={buttonStyle}
              disabled={saving}
            >
              {saving
                ? `⏳ ${t.saving}`
                : `💾 ${t.save}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSpecialistProfile;