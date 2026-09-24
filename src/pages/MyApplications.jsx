import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Drivers.css";

const getArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const serviceLabels = {
  ka: { nanny:"ძიძა", caregiver:"მომვლელი", driver:"მძღოლი", tutor:"ტუტორი / რეპეტიტორი", housekeeper:"სახლის დამხმარე", dogwalker:"ძაღლის გამსეირნებელი", "dog-walker":"ძაღლის გამსეირნებელი" },
  en: { nanny:"Nanny", caregiver:"Caregiver", driver:"Driver", tutor:"Tutor / Teacher", housekeeper:"Housekeeper", dogwalker:"Dog Walker", "dog-walker":"Dog Walker" },
  ru: { nanny:"Няня", caregiver:"Сиделка", driver:"Водитель", tutor:"Репетитор", housekeeper:"Помощник по дому", dogwalker:"Выгульщик собак", "dog-walker":"Выгульщик собак" },
};

const cityLabels = {
  ka:{tbilisi:"თბილისი",batumi:"ბათუმი",kutaisi:"ქუთაისი",rustavi:"რუსთავი",gori:"გორი",zugdidi:"ზუგდიდი",poti:"ფოთი",telavi:"თელავი",other:"სხვა"},
  en:{tbilisi:"Tbilisi",batumi:"Batumi",kutaisi:"Kutaisi",rustavi:"Rustavi",gori:"Gori",zugdidi:"Zugdidi",poti:"Poti",telavi:"Telavi",other:"Other"},
  ru:{tbilisi:"Тбилиси",batumi:"Батуми",kutaisi:"Кутаиси",rustavi:"Рустави",gori:"Гори",zugdidi:"Зугдиди",poti:"Поти",telavi:"Телави",other:"Другой"},
};

const icons = { nanny:"👶", caregiver:"👵", driver:"🚗", tutor:"📚", housekeeper:"🏠", dogwalker:"🐕", "dog-walker":"🐕" };

const getProfilePath = (profile) => {
  if (!profile) return "/";
  const p = profile.profession;
  if (p === "nanny") return `/nannies/${profile.id}`;
  if (p === "caregiver") return `/caregivers/${profile.id}`;
  if (p === "driver") return `/drivers/${profile.id}`;
  if (p === "tutor") return `/tutors/${profile.id}`;
  if (p === "housekeeper") return `/housekeepers/${profile.id}`;
  if (p === "dogwalker" || p === "dog-walker") return `/dogwalker/${profile.id}`;
  return "/";
};

const tr={
ka:{title:"ჩემი განაცხადები",desc:"აქ ჩანს სამუშაოებზე შენ მიერ გაგზავნილი ყველა განაცხადი.",empty:"ჯერ არც ერთ სამუშაოზე არ გაგიგზავნია განაცხადი.",sent:"განაცხადი გაგზავნილია",reviewed:"დამსაქმებელმა განიხილა თქვენი განაცხადი",next:"თქვენი განაცხადი გადავიდა შემდეგ ეტაპზე",no:"🌿 მადლობა დაინტერესებისა და განაცხადისთვის. ამ ეტაპზე დამსაქმებელი გასაუბრებებს სხვა კანდიდატებთან აგრძელებს. წარმატებებს გისურვებთ შემდეგ შესაძლებლობებში!",done:"განაცხადის განხილვა დასრულებულია",unavailable:"სამუშაოს განცხადება აღარ არის ხელმისაწვდომი.",back:"← Care Georgia",currency:"₾"},
en:{title:"My Applications",desc:"All job applications you have sent are shown here.",empty:"You haven't applied for any jobs yet.",sent:"Application sent",reviewed:"The employer reviewed your application",next:"Your application moved to the next stage",no:"🌿 Thank you for your interest and application. At this stage, the employer is continuing interviews with other candidates. We wish you success with future opportunities!",done:"Application review has been completed",unavailable:"This job post is no longer available.",back:"← Care Georgia",currency:"GEL"},
ru:{title:"Мои заявки",desc:"Здесь находятся все ваши заявки на работу.",empty:"Вы пока не отправляли заявки.",sent:"Заявка отправлена",reviewed:"Работодатель рассмотрел вашу заявку",next:"Ваша заявка перешла на следующий этап",no:"🌿 Спасибо за интерес и заявку. На этом этапе работодатель продолжает собеседования с другими кандидатами. Желаем успехов в следующих возможностях!",done:"Рассмотрение заявки завершено",unavailable:"Объявление больше недоступно.",back:"← Care Georgia",currency:"GEL"}
};
export default function MyApplications(){
 const {language}=useLanguage(); const t=tr[language]||tr.ka; const uid=localStorage.getItem("careGeorgiaCurrentUserId");
 const apps=getArray("careGeorgiaApplications").filter(a=>String(a.applicantUserId)===String(uid)).reverse(); const jobs=getArray("careGeorgiaJobs");
 const status=a=>a.status==="reviewed"?["👀",t.reviewed]:a.status==="next-stage"?["➡️",t.next]:a.status==="not-selected"?["🌿",t.no]:a.status==="completed"?["✅",t.done]:["📨",t.sent];
 return <div className="drivers-page"><div className="drivers-container"><Link to="/" className="back-link">{t.back}</Link><div className="drivers-heading"><div><h1>📨 {t.title}</h1><p>{t.desc}</p></div></div>
 {apps.length===0?<div className="driver-card" style={{padding:30}}><p>{t.empty}</p></div>:<div className="drivers-grid">{apps.map(a=>{const j=jobs.find(x=>String(x.id)===String(a.jobId));const s=status(a);return <div className="driver-card" key={a.id}>{j?<><h3>{icons[j.service]||"💼"} {serviceLabels[language]?.[j.service]||j.service}</h3><p>📍 {cityLabels[language]?.[j.city]||j.city}</p><p>💰 {j.budget} {t.currency}</p>{j.description&&<p>{j.description}</p>}</>:<p>{t.unavailable}</p>}<div style={{marginTop:15,padding:13,border:"1px solid #cbd5e1",borderRadius:10}}>{s[0]} {s[1]}</div></div>})}</div>}
 </div></div>
}
