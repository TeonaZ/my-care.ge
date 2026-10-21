
import { useEffect, useState } from "react";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const translations = {
  ka: {
    title: "📥 მიღებული განაცხადები",
    loading: "განაცხადები იტვირთება...",
    empty: "ჯერ არცერთი განაცხადი არ მიგიღია.",
    error: "განაცხადების ჩატვირთვა ვერ მოხერხდა.",
    candidate: "კანდიდატი",
    profession: "პროფესია",
    city: "ქალაქი",
    status: "სტატუსი",
    pending: "ახალი",
    reviewed: "განხილულია",
    "next-stage": "შემდეგ ეტაპზე",
    completed: "დასრულებულია",
    "not-selected": "არ შეირჩა",
    nanny: "ძიძა",
    driver: "მძღოლი",
    caregiver: "მომვლელი",
    tutor: "რეპეტიტორი",
    housekeeper: "სახლის დამხმარე",
    "dog-walker": "ძაღლის გამსეირნებელი",
  },
  en: {
    title: "📥 Received Applications",
    loading: "Loading applications...",
    empty: "No applications received yet.",
    error: "Could not load applications.",
    candidate: "Candidate",
    profession: "Profession",
    city: "City",
    status: "Status",
    pending: "New",
    reviewed: "Reviewed",
    "next-stage": "Next stage",
    completed: "Completed",
    "not-selected": "Not selected",
  },
  ru: {
    title: "📥 Полученные заявки",
    loading: "Загрузка заявок...",
    empty: "Пока нет полученных заявок.",
    error: "Не удалось загрузить заявки.",
    candidate: "Кандидат",
    profession: "Профессия",
    city: "Город",
    status: "Статус",
    pending: "Новая",
    reviewed: "Рассмотрена",
    "next-stage": "Следующий этап",
    completed: "Завершена",
    "not-selected": "Не выбран",
  },
};

function ReceivedApplications() {
  const { language } = useLanguage();
  const t = translations[language] || translations.ka;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      const token = localStorage.getItem("careGeorgiaToken");

      if (!token) {
        setError(t.error);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/applications/received",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t.error);
        }

        setApplications(
          Array.isArray(data.applications) ? data.applications : []
        );
      } catch (err) {
        console.error("Received applications error:", err);
        setError(err.message || t.error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const getProfessionName = (profession) =>
    t[profession] || profession || "—";

  return (
    <div className="drivers-page">
      <header className="drivers-header">
        <h1>{t.title}</h1>
      </header>

      <section className="drivers-list">
        {loading ? (
          <p>{t.loading}</p>
        ) : error ? (
          <p style={{ color: "#dc2626" }}>{error}</p>
        ) : applications.length === 0 ? (
          <p>{t.empty}</p>
        ) : (
          applications.map((application) => (
            <div className="driver-card" key={application.id}>
              <div className="driver-avatar">📨</div>

              <div className="driver-info">
                <h2>
                  {application.applicant?.firstName}{" "}
                  {application.applicant?.lastName}
                </h2>

                <p>
                  <strong>{t.profession}:</strong>{" "}
                  {getProfessionName(application.job?.service)}
                </p>

                <p>
                  <strong>{t.city}:</strong>{" "}
                  {application.applicant?.city || "—"}
                </p>

                <p>
                  <strong>{t.status}:</strong>{" "}
                  {t[application.status] || application.status}
                </p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default ReceivedApplications;
