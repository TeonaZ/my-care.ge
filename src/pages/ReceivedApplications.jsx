import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const API = "http://localhost:5000/api";
const routes = {
  nanny: "/nannies", driver: "/drivers", caregiver: "/caregivers",
  tutor: "/tutors", housekeeper: "/housekeepers",
  dogwalker: "/dogwalker", "dog-walker": "/dogwalker",
};
const professionNames = {
  ka: { nanny: "ძიძა", driver: "მძღოლი", caregiver: "მომვლელი", tutor: "რეპეტიტორი", housekeeper: "სახლის დამხმარე", dogwalker: "ძაღლის გამსეირნებელი" },
  en: { nanny: "Nanny", driver: "Driver", caregiver: "Caregiver", tutor: "Tutor", housekeeper: "Housekeeper", dogwalker: "Dog Walker" },
  ru: { nanny: "Няня", driver: "Водитель", caregiver: "Сиделка", tutor: "Репетитор", housekeeper: "Помощник по дому", dogwalker: "Выгульщик собак" },
};
const cityNames = {
  ka: { tbilisi: "თბილისი", batumi: "ბათუმი", kutaisi: "ქუთაისი", rustavi: "რუსთავი", gori: "გორი", zugdidi: "ზუგდიდი", poti: "ფოთი", telavi: "თელავი", other: "სხვა" },
  en: { tbilisi: "Tbilisi", batumi: "Batumi", kutaisi: "Kutaisi", rustavi: "Rustavi", gori: "Gori", zugdidi: "Zugdidi", poti: "Poti", telavi: "Telavi", other: "Other" },
  ru: { tbilisi: "Тбилиси", batumi: "Батуми", kutaisi: "Кутаиси", rustavi: "Рустави", gori: "Гори", zugdidi: "Зугдиди", poti: "Поти", telavi: "Телави", other: "Другой" },
};
const texts = {
  ka: { title: "📥 მიღებული განაცხადები", loading: "განაცხადები იტვირთება...", empty: "ჯერ არცერთი განაცხადი არ მიგიღია.", error: "განაცხადების ჩატვირთვა ვერ მოხერხდა.", profession: "პროფესია", city: "ქალაქი", status: "სტატუსი", view: "👤 პროფილის ნახვა", unavailable: "პროფილი მიუწვდომელია", contact: "📞 დაკავშირება", info: "საკონტაქტო ინფორმაცია ჩანს პროფილზე, თუ სპეციალისტს მისი გამოჩენა ნებადართული აქვს.", pending: "ახალი", reviewed: "განხილულია", "next-stage": "შემდეგ ეტაპზე", completed: "დასრულებულია", "not-selected": "არ შეირჩა" },
  en: { title: "📥 Received Applications", loading: "Loading applications...", empty: "No applications received yet.", error: "Could not load applications.", profession: "Profession", city: "City", status: "Status", view: "👤 View Profile", unavailable: "Profile unavailable", contact: "📞 Contact", info: "Contact details are available on the profile if the specialist permits them.", pending: "New", reviewed: "Reviewed", "next-stage": "Next stage", completed: "Completed", "not-selected": "Not selected" },
  ru: { title: "📥 Полученные заявки", loading: "Загрузка заявок...", empty: "Пока нет полученных заявок.", error: "Не удалось загрузить заявки.", profession: "Профессия", city: "Город", status: "Статус", view: "👤 Посмотреть профиль", unavailable: "Профиль недоступен", contact: "📞 Связаться", info: "Контактные данные доступны в профиле, если специалист разрешил их показывать.", pending: "Новая", reviewed: "Рассмотрена", "next-stage": "Следующий этап", completed: "Завершена", "not-selected": "Не выбран" },
};

const normalizeProfession = (value) => {
  const v = String(value || "").trim().toLowerCase();
  return v === "dog-walker" ? "dogwalker" : v;
};
const sameId = (a, b) => a != null && b != null && String(a) === String(b);

function ReceivedApplications() {
  const { language } = useLanguage();
  const lang = texts[language] ? language : "ka";
  const t = texts[lang];
  const [applications, setApplications] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("careGeorgiaToken");
      if (!token) {
        setError(texts[lang].error);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API}/applications/received`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || texts[lang].error);
        const items = Array.isArray(data.applications) ? data.applications : [];
        if (cancelled) return;
        setApplications(items);

        // Load profiles for each profession present in received applications.
        // The application response may not include specialistProfileId.
        const professions = [...new Set(items.map((item) => normalizeProfession(item.job?.service || item.applicant?.profession)).filter(Boolean))];
        const queryProfessions = [...new Set(professions.flatMap((p) => p === "dogwalker" ? ["dogwalker", "dog-walker"] : [p]))];
        const results = await Promise.allSettled(
          queryProfessions.map(async (profession) => {
            const res = await fetch(`${API}/specialists?profession=${encodeURIComponent(profession)}`);
            if (!res.ok) throw new Error(`Specialists ${profession}: ${res.status}`);
            const body = await res.json();
            return Array.isArray(body.specialists) ? body.specialists : [];
          }),
        );
        if (!cancelled) {
          setProfiles(results.flatMap((result) => result.status === "fulfilled" ? result.value : []));
        }
        results.filter((result) => result.status === "rejected").forEach((result) => console.warn("Could not load specialist profiles:", result.reason));

        // Keep the existing unread notification behavior.
        try {
          const seen = await fetch(`${API}/applications/received/mark-seen`, {
            method: "PATCH", headers: { Authorization: `Bearer ${token}` },
          });
          if (seen.ok) window.dispatchEvent(new Event("careGeorgiaApplicationsUpdated"));
          else console.warn("Could not mark received applications as seen");
        } catch (seenError) {
          console.warn("Mark applications seen error:", seenError);
        }
      } catch (err) {
        console.error("Received applications error:", err);
        if (!cancelled) setError(err.message || texts[lang].error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [lang]);

  const findProfile = (application) => {
    const applicant = application.applicant || {};
    const profession = normalizeProfession(application.job?.service || applicant.profession);
    const userId = applicant.userId || applicant.user_id || applicant.id || application.applicantUserId || application.applicantId || application.applicant_id;
    const matchingProfile = profiles.find((profile) =>
      normalizeProfession(profile.profession) === profession &&
      sameId(profile.ownerId || profile.owner_id || profile.userId, userId) &&
      profile.status !== "inactive"
    );
    // Use the specialist's own profile ID, not the account ID.
    const profileId = matchingProfile?.id || applicant.specialistProfileId || applicant.specialist_profile_id;
    const base = routes[profession];
    return {
      path: base && profileId ? `${base}/${profileId}` : null,
      city: matchingProfile?.city || applicant.city || "",
      profession,
    };
  };

  return (
    <div className="drivers-page">
      <header className="drivers-header"><h1>{t.title}</h1></header>
      <section className="drivers-list">
        {loading ? <p>{t.loading}</p> : error ? <p style={{ color: "#dc2626" }}>{error}</p> : applications.length === 0 ? <p>{t.empty}</p> :
          applications.map((application) => {
            const applicant = application.applicant || {};
            const { path, city, profession } = findProfile(application);
            const firstName = applicant.firstName || "";
            const lastName = applicant.lastName || "";
            const candidateName = [firstName, lastName ? `${lastName.charAt(0)}.` : ""].filter(Boolean).join(" ") || "—";
            return (
              <div className="driver-card" key={application.id}>
                <div className="driver-avatar">📨</div>
                <div className="driver-info">
                  <h2>{candidateName}</h2>
                  <p><strong>{t.profession}:</strong> {professionNames[lang]?.[profession] || profession || "—"}</p>
                  <p><strong>{t.city}:</strong> {cityNames[lang]?.[String(city).toLowerCase()] || city || "—"}</p>
                  <p><strong>{t.status}:</strong> {t[application.status] || application.status || "—"}</p>
                  {path ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
                      <Link to={path} state={{ from: "received-applications" }} style={{ display: "inline-block", padding: "11px 16px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "9px", textDecoration: "none", fontWeight: "700" }}>{t.view}</Link>
                      <Link to={path} state={{ from: "received-applications" }} title={t.info} style={{ display: "inline-block", padding: "11px 16px", backgroundColor: "#16a34a", color: "#fff", borderRadius: "9px", textDecoration: "none", fontWeight: "700" }}>{t.contact}</Link>
                    </div>
                  ) : <p style={{ color: "#64748b", marginTop: "12px" }}>{t.unavailable}</p>}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
export default ReceivedApplications;
