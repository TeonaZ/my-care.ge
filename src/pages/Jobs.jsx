import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    back: "← Care Georgia",
    title: "იპოვე სამსახური",
    description:
      "ნახე დამსაქმებლების მიერ გამოქვეყნებული განცხადებები.",

    noJobs:
      "ჯერ განცხადებები არ არის გამოქვეყნებული.",

    nanny: "ძიძა",
    caregiver: "მომვლელი",
    driver: "მძღოლი",
    tutor: "ტუტორი / რეპეტიტორი",
    housekeeper: "სახლის დამხმარე",
    dogwalker: "ძაღლის გამსეირნებელი",

    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
    poti: "ფოთი",
    telavi: "თელავი",
    other: "სხვა",

    fullTime: "სრული განაკვეთი",
    partTime: "ნახევარი განაკვეთი",

    pay: "ანაზღაურება",

    monthly: "თვე",
    biweekly: "2 კვირა",
    daily: "დღე",
    hourly: "საათი",

    employer: "დამსაქმებელი",
    contact: "საკონტაქტო ინფორმაცია",
    phone: "ტელეფონი",
    email: "ელ. ფოსტა",

    phoneHidden:
      "ტელეფონის ნომერი დამსაქმებელმა დამალა.",

    loginToSeeContact:
      "საკონტაქტო ინფორმაციის სანახავად გაიარე ავტორიზაცია.",

    login: "შესვლა",

    currency: "₾",
  },

  en: {
    back: "← Care Georgia",
    title: "Find a Job",
    description:
      "Browse job posts published by employers.",

    noJobs:
      "No jobs have been posted yet.",

    nanny: "Nanny",
    caregiver: "Caregiver",
    driver: "Driver",
    tutor: "Tutor / Teacher",
    housekeeper: "Housekeeper",
    dogwalker: "Dog Walker",

    tbilisi: "Tbilisi",
    batumi: "Batumi",
    kutaisi: "Kutaisi",
    rustavi: "Rustavi",
    gori: "Gori",
    zugdidi: "Zugdidi",
    poti: "Poti",
    telavi: "Telavi",
    other: "Other",

    fullTime: "Full-time",
    partTime: "Part-time",

    pay: "Pay",

    monthly: "month",
    biweekly: "2 weeks",
    daily: "day",
    hourly: "hour",

    employer: "Employer",
    contact: "Contact information",
    phone: "Phone",
    email: "Email",

    phoneHidden:
      "The employer has hidden the phone number.",

    loginToSeeContact:
      "Log in to view contact information.",

    login: "Login",

    currency: "GEL",
  },

  ru: {
    back: "← Care Georgia",
    title: "Найти работу",
    description:
      "Просмотрите объявления, опубликованные работодателями.",

    noJobs:
      "Пока нет опубликованных вакансий.",

    nanny: "Няня",
    caregiver: "Сиделка",
    driver: "Водитель",
    tutor: "Репетитор",
    housekeeper: "Помощник по дому",
    dogwalker: "Выгульщик собак",

    tbilisi: "Тбилиси",
    batumi: "Батуми",
    kutaisi: "Кутаиси",
    rustavi: "Рустави",
    gori: "Гори",
    zugdidi: "Зугдиди",
    poti: "Поти",
    telavi: "Телави",
    other: "Другой",

    fullTime: "Полная занятость",
    partTime: "Частичная занятость",

    pay: "Оплата",

    monthly: "месяц",
    biweekly: "2 недели",
    daily: "день",
    hourly: "час",

    employer: "Работодатель",
    contact: "Контактная информация",
    phone: "Телефон",
    email: "Эл. почта",

    phoneHidden:
      "Работодатель скрыл номер телефона.",

    loginToSeeContact:
      "Войдите в аккаунт, чтобы увидеть контактную информацию.",

    login: "Войти",

    currency: "GEL",
  },
};

function Jobs() {
  const { language } = useLanguage();

  const t =
    translations[language] ||
    translations.ka;

  const isLoggedIn =
    localStorage.getItem(
      "careGeorgiaLoggedIn"
    ) === "true";

  let jobs = [];

  const savedJobs =
    localStorage.getItem(
      "careGeorgiaJobs"
    );

  if (savedJobs) {
    try {
      jobs =
        JSON.parse(savedJobs);

      if (!Array.isArray(jobs)) {
        jobs = [];
      }
    } catch {
      jobs = [];
    }
  }

  /* =========================
     SERVICE NAME
  ========================= */

  const getServiceName = (
    service
  ) => {
    return t[service] || service;
  };

  /* =========================
     CITY NAME
  ========================= */

  const getCityName = (city) => {
    return t[city] || city;
  };

  /* =========================
     EMPLOYMENT
  ========================= */

  const getEmploymentName = (
    employmentType
  ) => {
    if (
      employmentType ===
      "full-time"
    ) {
      return t.fullTime;
    }

    if (
      employmentType ===
      "part-time"
    ) {
      return t.partTime;
    }

    return employmentType || "";
  };

  /* =========================
     PAYMENT TYPE
  ========================= */

  const getPaymentTypeName = (
    paymentType
  ) => {
    if (
      paymentType === "monthly"
    ) {
      return t.monthly;
    }

    if (
      paymentType === "biweekly"
    ) {
      return t.biweekly;
    }

    if (
      paymentType === "daily"
    ) {
      return t.daily;
    }

    if (
      paymentType === "hourly"
    ) {
      return t.hourly;
    }

    return t.hourly;
  };

  /* =========================
     SERVICE ICON
  ========================= */

  const getServiceIcon = (
    service
  ) => {
    const icons = {
      nanny: "👶",
      caregiver: "👵",
      driver: "🚗",
      tutor: "📚",
      housekeeper: "🏠",
      dogwalker: "🐕",
      "dog-walker": "🐕",
    };

    return (
      icons[service] || "💼"
    );
  };

  /* =========================
     SAFE EMPLOYER NAME

     "თეონა ზაალიშვილი"
     ->
     "თეონა ზ."
  ========================= */

  const getSafeEmployerName = (
    fullName
  ) => {
    if (
      !fullName ||
      typeof fullName !==
        "string"
    ) {
      return "";
    }

    const parts =
      fullName
        .trim()
        .split(/\s+/);

    if (parts.length === 0) {
      return "";
    }

    const firstName =
      parts[0];

    if (parts.length === 1) {
      return firstName;
    }

    const lastName =
      parts[
        parts.length - 1
      ];

    const lastInitial =
      lastName.charAt(0);

    return `${firstName} ${lastInitial}.`;
  };

  return (
    <div className="drivers-page">
      {/* HEADER */}

      <header className="drivers-header">
        <Link
          to="/"
          className="back-link"
        >
          {t.back}
        </Link>

        <h1>
          {t.title}
        </h1>

        <p>
          {t.description}
        </p>
      </header>

      {/* JOB LIST */}

      <section className="drivers-list">
        {jobs.length === 0 ? (
          <div
            className="driver-card"
            style={{
              justifyContent:
                "center",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <p>
              {t.noJobs}
            </p>
          </div>
        ) : (
          jobs
            .slice()
            .reverse()
            .map((job) => (
              <div
                className="driver-card"
                key={job.id}
              >
                {/* ICON */}

                <div className="driver-avatar">
                  {getServiceIcon(
                    job.service
                  )}
                </div>

                {/* INFORMATION */}

                <div className="driver-info">
                  <div className="driver-name">
                    <h2>
                      {getServiceName(
                        job.service
                      )}
                    </h2>
                  </div>

                  {/* CITY */}

                  <p>
                    📍{" "}
                    {getCityName(
                      job.city
                    )}
                  </p>

                  {/* EMPLOYMENT */}

                  <p>
                    🕒{" "}
                    {getEmploymentName(
                      job.employmentType
                    )}
                  </p>

                  {/* PAYMENT */}

                  <p>
                    💰 {t.pay}:{" "}
                    {job.budget}{" "}
                    {t.currency} /{" "}
                    {getPaymentTypeName(
                      job.paymentType
                    )}
                  </p>

                  {/* DESCRIPTION */}

                  {job.description && (
                    <p
                      style={{
                        marginTop:
                          "12px",
                        lineHeight:
                          "1.6",
                      }}
                    >
                      {
                        job.description
                      }
                    </p>
                  )}

                  {/* EMPLOYER */}

                  {job.employerName && (
                    <p>
                      👤{" "}
                      {t.employer}:{" "}
                      {getSafeEmployerName(
                        job.employerName
                      )}
                    </p>
                  )}

                  {/* =========================
                      CONTACT INFORMATION
                  ========================= */}

                  {(job.employerPhone ||
                    job.employerEmail) && (
                    <>
                      {isLoggedIn ? (
                        <div
                          style={{
                            marginTop:
                              "14px",
                            paddingTop:
                              "14px",
                            borderTop:
                              "1px solid #e5e7eb",
                          }}
                        >
                          <strong>
                            {t.contact}
                          </strong>

                          {/* PHONE */}

                          {job.employerPhone &&
                          job.showPhone ===
                            true ? (
                            <p>
                              📞{" "}
                              {t.phone}:{" "}
                              <a
                                href={`tel:${String(
                                  job.employerPhone
                                ).replace(
                                  /\s/g,
                                  ""
                                )}`}
                              >
                                {
                                  job.employerPhone
                                }
                              </a>
                            </p>
                          ) : job.employerPhone ? (
                            <p
                              style={{
                                color:
                                  "#64748b",
                              }}
                            >
                              🔒{" "}
                              {
                                t.phoneHidden
                              }
                            </p>
                          ) : null}

                          {/* EMAIL */}

                          {job.employerEmail && (
                            <p>
                              ✉️{" "}
                              {t.email}:{" "}
                              <a
                                href={`mailto:${job.employerEmail}`}
                              >
                                {
                                  job.employerEmail
                                }
                              </a>
                            </p>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop:
                              "14px",
                            padding:
                              "14px",
                            backgroundColor:
                              "#f8fafc",
                            border:
                              "1px solid #e2e8f0",
                            borderRadius:
                              "10px",
                          }}
                        >
                          <p
                            style={{
                              margin:
                                "0 0 8px",
                            }}
                          >
                            🔒{" "}
                            {
                              t.loginToSeeContact
                            }
                          </p>

                          <Link
                            to="/login"
                            style={{
                              color:
                                "#2563eb",
                              fontWeight:
                                "600",
                              textDecoration:
                                "none",
                            }}
                          >
                            {t.login} →
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
        )}
      </section>
    </div>
  );
}

export default Jobs;