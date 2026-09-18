import { Link, useParams } from "react-router-dom";
import "./DriverProfile.css";

function HousekeeperProfile() {
  const { id } = useParams();

  const housekeepers = [
    {
      id: 1,
      name: "ნათია მ.",
      city: "თბილისი",
      experience: "6 წელი",
      price: "20 ₾ / საათი",
      rating: "4.9",
      reviews: 41,
      verified: true,
      service: "სახლის დასუფთავება",
      description:
        "სახლის მოვლისა და დასუფთავების 6 წლიანი გამოცდილება მაქვს. ვმუშაობ პასუხისმგებლობით და ყურადღებით.",
    },
    {
      id: 2,
      name: "თამუნა კ.",
      city: "თბილისი",
      experience: "4 წელი",
      price: "18 ₾ / საათი",
      rating: "4.8",
      reviews: 28,
      verified: true,
      service: "ყოველდღიური დახმარება",
      description:
        "ვთავაზობ ოჯახებს ყოველდღიურ დახმარებას, სახლის მოწესრიგებასა და სხვადასხვა საოჯახო საქმეში დახმარებას.",
    },
    {
      id: 3,
      name: "ეკა ნ.",
      city: "ბათუმი",
      experience: "5 წელი",
      price: "17 ₾ / საათი",
      rating: "4.7",
      reviews: 20,
      verified: false,
      service: "დასუფთავება და საჭმლის მომზადება",
      description:
        "ვმუშაობ ბათუმში. შემიძლია სახლის დასუფთავება, მოწესრიგება და საჭმლის მომზადებაში დახმარება.",
    },
  ];

  const housekeeper = housekeepers.find(
    (item) => item.id === Number(id)
  );

  if (!housekeeper) {
    return (
      <div className="profile-not-found">
        <h1>სახლის დამხმარე ვერ მოიძებნა</h1>

        <Link to="/housekeepers">
          ← უკან დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <Link to="/housekeepers" className="profile-back">
          ← სახლის დამხმარეებზე დაბრუნება
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              🏠
            </div>

            <div className="profile-details">

              <div className="profile-name">
                <h1>{housekeeper.name}</h1>

                {housekeeper.verified && (
                  <span className="profile-verified">
                    ✓ ვერიფიცირებული
                  </span>
                )}
              </div>

              <p className="profile-location">
                📍 {housekeeper.city}
              </p>

              <div className="profile-rating">
                ⭐ {housekeeper.rating}

                <span>
                  ({housekeeper.reviews} შეფასება)
                </span>
              </div>

            </div>
          </div>

          <div className="profile-action">

            <span>მომსახურების ფასი</span>

            <strong>
              {housekeeper.price}
            </strong>

            <button className="contact-btn">
              დაკავშირება
            </button>

            <button className="message-btn">
              შეტყობინება
            </button>

          </div>
        </div>

        <div className="profile-about">

          <h2>ჩემ შესახებ</h2>

          <p>
            {housekeeper.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>🏠</span>
              <p>მომსახურება</p>
              <strong>{housekeeper.service}</strong>
            </div>

            <div>
              <span>💼</span>
              <p>გამოცდილება</p>
              <strong>{housekeeper.experience}</strong>
            </div>

            <div>
              <span>⭐</span>
              <p>რეიტინგი</p>
              <strong>{housekeeper.rating} / 5</strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default HousekeeperProfile;