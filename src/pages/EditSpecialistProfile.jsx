import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    title: "სპეციალისტის პროფილის რედაქტირება",
    subtitle: "შეცვალეთ თქვენი პროფესიული პროფილის ინფორმაცია.",

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

    phone: "ტელეფონი",
    phonePlaceholder: "მაგ: +995 555 12 34 56",

    showPhone: "ჩემი ტელეფონის ნომერი გამოჩნდეს პროფილზე",

    save: "ცვლილებების შენახვა",
    back: "← ჩემს განცხადებებზე დაბრუნება",

    success: "ცვლილებები წარმატებით შეინახა.",

    required: "გთხოვთ შეავსოთ ყველა აუცილებელი ველი.",

    notFound: "სპეციალისტის პროფილი ვერ მოიძებნა.",

    noAccess: "ამ პროფილის რედაქტირების უფლება არ გაქვთ.",

    loginRequired: "რედაქტირებისთვის ჯერ უნდა შეხვიდეთ ანგარიშზე.",
  },

  en: {
    title: "Edit Specialist Profile",
    subtitle: "Update your professional profile information.",

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

    phone: "Phone",
    phonePlaceholder: "Example: +995 555 12 34 56",

    showPhone: "Show my phone number on my profile",

    save: "Save Changes",
    back: "← Back to My Jobs",

    success: "Changes saved successfully.",

    required: "Please complete all required fields.",

    notFound: "Specialist profile was not found.",

    noAccess: "You do not have permission to edit this profile.",

    loginRequired: "You must log in before editing this profile.",
  },

  ru: {
    title: "Редактировать профиль специалиста",
    subtitle: "Измените информацию вашего профессионального профиля.",

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

    phone: "Телефон",
    phonePlaceholder: "Например: +995 555 12 34 56",

    showPhone: "Показывать мой номер телефона в профиле",

    save: "Сохранить изменения",
    back: "← Назад к моим объявлениям",

    success: "Изменения успешно сохранены.",

    required: "Пожалуйста, заполните все обязательные поля.",

    notFound: "Профиль специалиста не найден.",

    noAccess: "У вас нет доступа к редактированию этого профиля.",

    loginRequired:
      "Для редактирования профиля необходимо войти в аккаунт.",
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
  const [paymentType, setPaymentType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);

  const [profileFound, setProfileFound] = useState(true);
  const [hasAccess, setHasAccess] = useState(true);

  const currentUserId =
    localStorage.getItem("careGeorgiaCurrentUserId");

  const isLoggedIn =
    localStorage.getItem("careGeorgiaLoggedIn") === "true";

  const getProfiles = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("careGeorgiaSpecialists")
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !currentUserId) {
      setHasAccess(false);
      return;
    }

    const profiles = getProfiles();

    const profile = profiles.find(
      (item) => String(item.id) === String(id)
    );

    if (!profile) {
      setProfileFound(false);
      return;
    }

    if (
      String(profile.ownerId) !== String(currentUserId)
    ) {
      setHasAccess(false);
      return;
    }

    setProfession(profile.profession || "");
    setCity(profile.city || "");
    setExperience(profile.experience || "");
    setEmploymentType(profile.employmentType || "");
    setPaymentType(profile.paymentType || "hourly");
    setPrice(
      profile.priceValue !== undefined &&
        profile.priceValue !== null
        ? String(profile.priceValue)
        : ""
    );
    setDescription(profile.description || "");
    setPhone(profile.phone || "");
    setShowPhone(profile.showPhone === true);
  }, [id, isLoggedIn, currentUserId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoggedIn || !currentUserId) {
      alert(t.loginRequired);
      navigate("/login");
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
      alert(t.required);
      return;
    }

    const profiles = getProfiles();

    const profileIndex = profiles.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (profileIndex === -1) {
      alert(t.notFound);
      navigate("/my-jobs");
      return;
    }

    const oldProfile = profiles[profileIndex];

    if (
      String(oldProfile.ownerId) !==
      String(currentUserId)
    ) {
      alert(t.noAccess);
      navigate("/my-jobs");
      return;
    }

    const updatedProfile = {
      ...oldProfile,

      profession,
      city,

      experience: experience.trim(),

      employmentType,

      paymentType,
      priceValue: numericPrice,

      description: description.trim(),

      phone: phone.trim(),

      showPhone,

      updatedAt: new Date().toISOString(),
    };

    const updatedProfiles = [...profiles];

    updatedProfiles[profileIndex] = updatedProfile;

    localStorage.setItem(
      "careGeorgiaSpecialists",
      JSON.stringify(updatedProfiles)
    );

    alert(t.success);

    navigate("/my-jobs");
  };

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

  const textareaStyle = {
    ...fieldStyle,
    minHeight: "150px",
    padding: "15px",
    resize: "vertical",
    lineHeight: "1.6",
  };

  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
    color: "#334155",
    fontSize: "15px",
    cursor: "pointer",
  };

  const buttonStyle = {
    width: "100%",
    minHeight: "54px",
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "inherit",
    cursor: "pointer",
  };

  if (!isLoggedIn || !currentUserId) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>{t.loginRequired}</h1>

            <Link to="/login">
              {t.loginRequired}
            </Link>
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
            <h1 style={titleStyle}>{t.notFound}</h1>

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
            <h1 style={titleStyle}>{t.noAccess}</h1>

            <Link to="/my-jobs">
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

              <option value="other">
                {t.other}
              </option>
            </select>

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

            <label style={labelStyle}>
              {t.price}
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              placeholder={t.pricePlaceholder}
              style={fieldStyle}
              required
            />

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

            <label style={labelStyle}>
              {t.phone}
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder={t.phonePlaceholder}
              style={fieldStyle}
            />

            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={showPhone}
                onChange={(event) =>
                  setShowPhone(event.target.checked)
                }
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />

              <span>{t.showPhone}</span>
            </label>

            <button
              type="submit"
              style={buttonStyle}
            >
              💾 {t.save}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSpecialistProfile;