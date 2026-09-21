import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

/*
  როცა Support Email-ს შექმნი,
  მხოლოდ ეს მნიშვნელობა შეცვალე.
*/
const SUPPORT_EMAIL = "teonazaalishvili2@gmail.com";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "დახმარება",
    description:
      "თუ საიტზე პრობლემა შეგექმნა ან შეცდომა აღმოაჩინე, მოგვწერე.",

    name: "სახელი",
    namePlaceholder: "შენი სახელი",

    email: "ელ. ფოსტა",
    emailPlaceholder: "შენი ელ. ფოსტა",

    subject: "პრობლემის თემა",
    subjectPlaceholder: "მაგ: განცხადება არ იხსნება",

    message: "პრობლემის აღწერა",
    messagePlaceholder:
      "დეტალურად აღწერე რა პრობლემა შეგექმნა...",

    send: "შეტყობინების გაგზავნა",

    emailNotReady:
      "Support Email ჯერ არ არის დამატებული.",

    note:
      "გთხოვ, პრობლემის აღწერისას არ მიუთითო პაროლი ან სხვა საიდუმლო ინფორმაცია.",
  },

  en: {
    back: "← Care Georgia",
    title: "Support",
    description:
      "If you experience a problem or find an error on the website, contact us.",

    name: "Name",
    namePlaceholder: "Your name",

    email: "Email",
    emailPlaceholder: "Your email",

    subject: "Problem subject",
    subjectPlaceholder: "Example: Job post does not open",

    message: "Describe the problem",
    messagePlaceholder:
      "Please describe the problem in detail...",

    send: "Send Message",

    emailNotReady:
      "The support email has not been added yet.",

    note:
      "Please do not include your password or other sensitive information in your message.",
  },

  ru: {
    back: "← Care Georgia",
    title: "Поддержка",
    description:
      "Если у вас возникла проблема или вы обнаружили ошибку на сайте, напишите нам.",

    name: "Имя",
    namePlaceholder: "Ваше имя",

    email: "Эл. почта",
    emailPlaceholder: "Ваша эл. почта",

    subject: "Тема проблемы",
    subjectPlaceholder:
      "Например: объявление не открывается",

    message: "Описание проблемы",
    messagePlaceholder:
      "Подробно опишите возникшую проблему...",

    send: "Отправить сообщение",

    emailNotReady:
      "Email службы поддержки пока не добавлен.",

    note:
      "Не указывайте пароль или другую конфиденциальную информацию в сообщении.",
  },
};

function Support() {
  const { language } = useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      სანამ ნამდვილ Email-ს არ ჩავწერთ,
      გაგზავნა არ მოხდება.
    */
    if (
      !SUPPORT_EMAIL ||
      SUPPORT_EMAIL === "YOUR_EMAIL_HERE" 
    ) {
      alert(t.emailNotReady);
      return;
    }

    const emailSubject =
      encodeURIComponent(
        `[Care Georgia Support] ${subject}`
      );

    const emailBody =
      encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Problem:\n${message}`
      );

    window.location.href =
      `mailto:${SUPPORT_EMAIL}` +
      `?subject=${emailSubject}` +
      `&body=${emailBody}`;
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
              🛠️ {t.title}
            </h1>

            <p>
              {t.description}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>
                {t.name}
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder={
                  t.namePlaceholder
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t.email}
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder={
                  t.emailPlaceholder
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t.subject}
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder={
                  t.subjectPlaceholder
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                {t.message}
              </label>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder={
                  t.messagePlaceholder
                }
                required
                rows="7"
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

            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              🔒 {t.note}
            </p>

            <button
              type="submit"
              className="auth-submit"
            >
              ✉️ {t.send}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Support;