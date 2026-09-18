import { Link, useParams } from "react-router-dom";
import "./DriverProfile.css";

function DriverProfile() {
  const { id } = useParams();

  // დროებითი მონაცემები
  // მოგვიანებით მონაცემთა ბაზიდან წამოვა
  const drivers = [
    {
      id: 1,
      name: "გიორგი მ.",
      city: "თბილისი",
      experience: "8 წელი",
      price: "25 ₾ / საათი",
      rating: "4.9",
      reviews: 37,
      verified: true,
      description:
        "გამოცდილი მძღოლი 8 წლიანი გამოცდილებით. პასუხისმგებლიანი, პუნქტუალური და ორიენტირებული უსაფრთხო მგზავრობაზე.",
    },
    {
      id: 2,
      name: "ლევან კ.",
      city: "თბილისი",
      experience: "5 წელი",
      price: "20 ₾ / საათი",
      rating: "4.8",
      reviews: 24,
      verified: true,
      description:
        "მაქვს როგორც ქალაქში, ასევე საქალაქთაშორისო მარშრუტებზე მუშაობის გამოცდილება.",
    },
    {
      id: 3,
      name: "დავით ნ.",
      city: "ბათუმი",
      experience: "6 წელი",
      price: "22 ₾ / საათი",
      rating: "4.7",
      reviews: 18,
      verified: false,
      description:
        "მძღოლი ბათუმში. ხელმისაწვდომი ვარ როგორც ყოველდღიური, ასევე ერთჯერადი მომსახურებისთვის.",
    },
  ];

  // URL-დან მიღებული ID-ით ვპოულობთ შესაბამის მძღოლს
  const driver = drivers.find(
    (item) => item.id === Number(id)
  );

  // თუ ასეთი მძღოლი არ არსებობს
  if (!driver) {
    return (
      <div className="profile-not-found">
        <h1>მძღოლი ვერ მოიძებნა</h1>

        <Link to="/drivers">
          ← დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <Link to="/drivers" className="profile-back">
          ← მძღოლებზე დაბრუნება
        </Link>

        <div className="profile-card">

          {/* პროფილის მარცხენა ნაწილი */}
          <div className="profile-main">

            <div className="profile-avatar">
              👤
            </div>

            <div className="profile-details">

              <div className="profile-name">
                <h1>{driver.name}</h1>

                {driver.verified && (
                  <span className="profile-verified">
                    ✓ ვერიფიცირებული
                  </span>
                )}
              </div>

              <p className="profile-location">
                📍 {driver.city}
              </p>

              <div className="profile-rating">
                ⭐ {driver.rating}
                <span>
                  ({driver.reviews} შეფასება)
                </span>
              </div>

            </div>

          </div>


          {/* პროფილის მარჯვენა ნაწილი */}
          <div className="profile-action">

            <span>მომსახურების ფასი</span>

            <strong>
              {driver.price}
            </strong>

            <button className="contact-btn">
              დაკავშირება
            </button>

            <button className="message-btn">
              შეტყობინება
            </button>

          </div>

        </div>


        {/* ინფორმაცია */}

        <div className="profile-about">

          <h2>ჩემ შესახებ</h2>

          <p>
            {driver.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>🚗</span>
              <p>გამოცდილება</p>
              <strong>{driver.experience}</strong>
            </div>

            <div>
              <span>📍</span>
              <p>ქალაქი</p>
              <strong>{driver.city}</strong>
            </div>

            <div>
              <span>⭐</span>
              <p>რეიტინგი</p>
              <strong>{driver.rating} / 5</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DriverProfile;