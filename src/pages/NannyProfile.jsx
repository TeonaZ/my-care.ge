import { Link, useParams } from "react-router-dom";
import "./DriverProfile.css";

function NannyProfile() {
  const { id } = useParams();

  const nannies = [
    {
      id: 1,
      name: "თამარ მ.",
      city: "თბილისი",
      experience: "7 წელი",
      price: "20 ₾ / საათი",
      rating: "4.9",
      reviews: 45,
      verified: true,
      ageGroups: "0-6 წელი",
      description:
        "ბავშვებთან მუშაობის 7 წლიანი გამოცდილება მაქვს. შემიძლია ბავშვის მოვლა, კვება, გასეირნება და ასაკის შესაბამისი აქტივობების დაგეგმვა.",
    },
    {
      id: 2,
      name: "ნინო კ.",
      city: "თბილისი",
      experience: "5 წელი",
      price: "18 ₾ / საათი",
      rating: "4.8",
      reviews: 32,
      verified: true,
      ageGroups: "1-8 წელი",
      description:
        "მაქვს ძიძად მუშაობის 5 წლიანი გამოცდილება. პასუხისმგებლიანი და პუნქტუალური ვარ და მიყვარს ბავშვებთან მუშაობა.",
    },
    {
      id: 3,
      name: "მარიამ გ.",
      city: "ბათუმი",
      experience: "4 წელი",
      price: "15 ₾ / საათი",
      rating: "4.7",
      reviews: 21,
      verified: false,
      ageGroups: "3-10 წელი",
      description:
        "ვმუშაობ ძიძად ბათუმში. შემიძლია როგორც ყოველდღიური, ასევე რამდენიმე საათით ბავშვის მოვლა.",
    },
  ];

  // URL-დან მიღებული ID-ით ვპოულობთ კონკრეტულ ძიძას
  const nanny = nannies.find((item) => item.id === Number(id));

  // თუ ასეთი ID არ არსებობს
  if (!nanny) {
    return (
      <div className="profile-not-found">
        <h1>ძიძა ვერ მოიძებნა</h1>

        <Link to="/nannies">← ძიძებზე დაბრუნება</Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Link to="/nannies" className="profile-back">
          ← ძიძებზე დაბრუნება
        </Link>

        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">👶</div>

            <div className="profile-details">
              <div className="profile-name">
                <h1>{nanny.name}</h1>

                {nanny.verified && (
                  <span className="profile-verified">✓ ვერიფიცირებული</span>
                )}
              </div>

              <p className="profile-location">📍 {nanny.city}</p>

              <div className="profile-rating">
                ⭐ {nanny.rating}
                <span>({nanny.reviews} შეფასება)</span>
              </div>
            </div>
          </div>

          <div className="profile-action">
            <span>მომსახურების ფასი</span>

            <strong>{nanny.price}</strong>

            <button className="contact-btn">დაკავშირება</button>

            <button className="message-btn">შეტყობინება</button>
          </div>
        </div>

        <div className="profile-about">
          <h2>ძიძის შესახებ</h2>

          <p>{nanny.description}</p>

          <div className="profile-stats">
            <div>
              <span>👶</span>
              <p>ბავშვის ასაკი</p>
              <strong>{nanny.ageGroups}</strong>
            </div>

            <div>
              <span>💼</span>
              <p>გამოცდილება</p>
              <strong>{nanny.experience}</strong>
            </div>

            <div>
              <span>⭐</span>
              <p>რეიტინგი</p>
              <strong>{nanny.rating} / 5</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NannyProfile;
