import { Link, useParams } from "react-router-dom";
import "./DriverProfile.css";

function CaregiverProfile() {
  const { id } = useParams();

  const caregivers = [
    {
      id: 1,
      name: "მაია კ.",
      city: "თბილისი",
      experience: "8 წელი",
      price: "22 ₾ / საათი",
      rating: "4.9",
      reviews: 51,
      verified: true,
      description:
        "ხანდაზმულ ადამიანებზე ზრუნვის 8 წლიანი გამოცდილება მაქვს. შემიძლია ყოველდღიურ საქმიანობაში დახმარება, გასეირნება და თანმხლებად ყოფნა.",
    },
    {
      id: 2,
      name: "ეკა მ.",
      city: "ქუთაისი",
      experience: "6 წელი",
      price: "18 ₾ / საათი",
      rating: "4.8",
      reviews: 34,
      verified: true,
      description:
        "მაქვს ხანდაზმულ ადამიანებთან მუშაობის გამოცდილება. პასუხისმგებლიანი, ყურადღებიანი და პუნქტუალური ვარ.",
    },
    {
      id: 3,
      name: "ნანა გ.",
      city: "ბათუმი",
      experience: "5 წელი",
      price: "17 ₾ / საათი",
      rating: "4.7",
      reviews: 22,
      verified: false,
      description:
        "ვთავაზობ ოჯახებს ხანდაზმული ოჯახის წევრის ყოველდღიურ დახმარებასა და მოვლას ბათუმში.",
    },
  ];

  const caregiver = caregivers.find(
    (item) => item.id === Number(id)
  );

  if (!caregiver) {
    return (
      <div className="profile-not-found">
        <h1>მომვლელი ვერ მოიძებნა</h1>

        <Link to="/caregivers">
          ← მომვლელებზე დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        <Link to="/caregivers" className="profile-back">
          ← მომვლელებზე დაბრუნება
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              👵
            </div>

            <div className="profile-details">

              <div className="profile-name">
                <h1>{caregiver.name}</h1>

                {caregiver.verified && (
                  <span className="profile-verified">
                    ✓ ვერიფიცირებული
                  </span>
                )}
              </div>

              <p className="profile-location">
                📍 {caregiver.city}
              </p>

              <div className="profile-rating">
                ⭐ {caregiver.rating}

                <span>
                  ({caregiver.reviews} შეფასება)
                </span>
              </div>

            </div>
          </div>

          <div className="profile-action">

            <span>მომსახურების ფასი</span>

            <strong>
              {caregiver.price}
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

          <h2>მომვლელის შესახებ</h2>

          <p>
            {caregiver.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>💼</span>
              <p>გამოცდილება</p>
              <strong>{caregiver.experience}</strong>
            </div>

            <div>
              <span>📍</span>
              <p>ქალაქი</p>
              <strong>{caregiver.city}</strong>
            </div>

            <div>
              <span>⭐</span>
              <p>რეიტინგი</p>
              <strong>{caregiver.rating} / 5</strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CaregiverProfile;