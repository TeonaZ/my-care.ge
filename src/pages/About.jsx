import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Auth.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    small: "ჩვენ შესახებ",
    title: "Care Georgia",
    description:
      "Care Georgia არის პლატფორმა, რომელიც ადამიანებს ეხმარება იპოვონ სანდო სპეციალისტები ოჯახის, სახლისა და ყოველდღიური საჭიროებებისთვის.",

    missionTitle: "ჩვენი მიზანი",
    missionText:
      "ჩვენი მიზანია გავამარტივოთ ადამიანების ერთმანეთთან დაკავშირება და შევქმნათ სივრცე, სადაც მომხმარებლებს შეუძლიათ მარტივად მოძებნონ მათთვის საჭირო დახმარება.",

    safetyTitle: "უსაფრთხოება",
    safetyText:
      "ჩვენთვის მნიშვნელოვანია მომხმარებლების უსაფრთხოება და პირადი ინფორმაციის დაცვა. პირადი საკონტაქტო ინფორმაცია ხელმისაწვდომია მხოლოდ ავტორიზებული მომხმარებლებისთვის შესაბამისი პარამეტრების მიხედვით.",

    trustTitle: "ნდობა",
    trustText:
      "Care Georgia მომხმარებლებს აძლევს შესაძლებლობას გაეცნონ პროფილებსა და განცხადებებს და თავად გადაწყვიტონ, ვისთან სურთ დაკავშირება.",

    localTitle: "ადგილობრივი სპეციალისტები",
    localText:
      "მომხმარებლებს შეუძლიათ მოძებნონ სპეციალისტები ქალაქისა და მომსახურების ტიპის მიხედვით.",

    servicesTitle: "რას იპოვი Care Georgia-ზე?",

    services:
      "ძიძები, მომვლელები, მძღოლები, ტუტორები და რეპეტიტორები, სახლის დამხმარეები და ძაღლის გამსეირნებლები.",

    supportTitle: "დახმარება გჭირდება?",
    supportText:
      "თუ საიტთან დაკავშირებით პრობლემა შეგექმნა, შეგიძლია დაგვიკავშირდე Support გვერდიდან.",

    supportButton: "🛠️ Support",
  },

  en: {
    back: "← Care Georgia",
    small: "About Us",
    title: "Care Georgia",
    description:
      "Care Georgia is a platform that helps people find trusted specialists for family, home and everyday care needs.",

    missionTitle: "Our Mission",
    missionText:
      "Our goal is to make it easier for people to connect and to create a space where users can easily find the help they need.",

    safetyTitle: "Safety",
    safetyText:
      "User safety and privacy are important to us. Personal contact information is available only to authenticated users according to the relevant privacy settings.",

    trustTitle: "Trust",
    trustText:
      "Care Georgia allows users to view profiles and job posts and decide for themselves who they would like to contact.",

    localTitle: "Local Specialists",
    localText:
      "Users can search for specialists by city and service type.",

    servicesTitle: "What can you find on Care Georgia?",

    services:
      "Nannies, caregivers, drivers, tutors and teachers, housekeepers and dog walkers.",

    supportTitle: "Need Help?",
    supportText:
      "If you experience a problem with the website, you can contact us through the Support page.",

    supportButton: "🛠️ Support",
  },

  ru: {
    back: "← Care Georgia",
    small: "О нас",
    title: "Care Georgia",
    description:
      "Care Georgia — это платформа, которая помогает людям находить специалистов для семьи, дома и повседневных потребностей.",

    missionTitle: "Наша цель",
    missionText:
      "Наша цель — упростить связь между людьми и создать пространство, где пользователи смогут легко найти необходимую помощь.",

    safetyTitle: "Безопасность",
    safetyText:
      "Для нас важны безопасность пользователей и защита личной информации. Контактная информация доступна только авторизованным пользователям в соответствии с настройками конфиденциальности.",

    trustTitle: "Доверие",
    trustText:
      "Care Georgia позволяет пользователям просматривать профили и объявления и самостоятельно решать, с кем они хотят связаться.",

    localTitle: "Местные специалисты",
    localText:
      "Пользователи могут искать специалистов по городу и типу услуги.",

    servicesTitle: "Кого можно найти на Care Georgia?",

    services:
      "Нянь, сиделок, водителей, репетиторов и учителей, помощников по дому и выгульщиков собак.",

    supportTitle: "Нужна помощь?",
    supportText:
      "Если у вас возникла проблема с сайтом, вы можете связаться с нами через страницу поддержки.",

    supportButton: "🛠️ Поддержка",
  },
};

function About() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px 70px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: "30px",
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          {t.back}
        </Link>

        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <p
            style={{
              color: "#2563eb",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            {t.small}
          </p>

          <h1
            style={{
              color: "#172033",
              fontSize: "42px",
              marginBottom: "18px",
            }}
          >
            🇬🇪 {t.title}
          </h1>

          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "17px",
              lineHeight: "1.8",
            }}
          >
            {t.description}
          </p>
        </div>

        {/* MISSION */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e8edf5",
            borderRadius: "18px",
            padding: "32px",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              color: "#172033",
              marginBottom: "14px",
            }}
          >
            🎯 {t.missionTitle}
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            {t.missionText}
          </p>
        </div>

        {/* 3 CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e8edf5",
              borderRadius: "18px",
              padding: "28px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                marginBottom: "15px",
              }}
            >
              🛡️
            </div>

            <h3
              style={{
                color: "#172033",
                marginBottom: "12px",
              }}
            >
              {t.safetyTitle}
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              {t.safetyText}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e8edf5",
              borderRadius: "18px",
              padding: "28px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                marginBottom: "15px",
              }}
            >
              🤝
            </div>

            <h3
              style={{
                color: "#172033",
                marginBottom: "12px",
              }}
            >
              {t.trustTitle}
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              {t.trustText}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e8edf5",
              borderRadius: "18px",
              padding: "28px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                marginBottom: "15px",
              }}
            >
              📍
            </div>

            <h3
              style={{
                color: "#172033",
                marginBottom: "12px",
              }}
            >
              {t.localTitle}
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              {t.localText}
            </p>
          </div>
        </div>

        {/* SERVICES */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e8edf5",
            borderRadius: "18px",
            padding: "32px",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              color: "#172033",
              marginBottom: "14px",
            }}
          >
            👥 {t.servicesTitle}
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            {t.services}
          </p>
        </div>

        {/* SUPPORT */}

        <div
          style={{
            textAlign: "center",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "18px",
            padding: "35px 25px",
          }}
        >
          <h2
            style={{
              color: "#172033",
              marginBottom: "12px",
            }}
          >
            {t.supportTitle}
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "22px",
              lineHeight: "1.7",
            }}
          >
            {t.supportText}
          </p>

          <Link
            to="/support"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "46px",
              padding: "0 22px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "10px",
              fontWeight: "700",
            }}
          >
            {t.supportButton}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;