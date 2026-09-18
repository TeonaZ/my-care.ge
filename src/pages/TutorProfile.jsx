import { Link, useParams } from "react-router-dom";
import "./DriverProfile.css";

function TutorProfile() {
  const { id } = useParams();

  const tutors = [
    {
      id: 1,
      name: "ნინო ბ.",
      subject: "ინგლისური ენა",
      city: "თბილისი",
      experience: "6 წელი",
      price: "30 ₾ / საათი",
      rating: "4.9",
      reviews: 42,
      verified: true,
      description:
        "ინგლისური ენის ტუტორი 6 წლიანი გამოცდილებით. ვმუშაობ როგორც მოსწავლეებთან, ასევე ზრდასრულებთან.",
    },

    {
      id: 2,
      name: "ანა გ.",
      subject: "მათემატიკა",
      city: "თბილისი",
      experience: "4 წელი",
      price: "25 ₾ / საათი",
      rating: "4.8",
      reviews: 31,
      verified: true,
      description:
        "მათემატიკის რეპეტიტორი. ვეხმარები მოსწავლეებს სასკოლო პროგრამის ათვისებასა და გამოცდებისთვის მომზადებაში.",
    },

    {
      id: 3,
      name: "მარიამ ლ.",
      subject: "ქართული ენა",
      city: "ბათუმი",
      experience: "5 წელი",
      price: "25 ₾ / საათი",
      rating: "4.7",
      reviews: 19,
      verified: false,
      description:
        "ქართული ენის ტუტორი ბათუმში. ვთავაზობ ინდივიდუალურ გაკვეთილებს სხვადასხვა ასაკის მოსწავლეებს.",
    },
  ];

  const tutor = tutors.find(
    (item) => item.id === Number(id)
  );

  if (!tutor) {
    return (
      <div className="profile-not-found">
        <h1>ტუტორი ვერ მოიძებნა</h1>

        <Link to="/tutors">
          ← ტუტორებზე დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <Link to="/tutors" className="profile-back">
          ← ტუტორებზე დაბრუნება
        </Link>

        <div className="profile-card">

          <div className="profile-main">

            <div className="profile-avatar">
              📚
            </div>

            <div className="profile-details">

              <div className="profile-name">

                <h1>{tutor.name}</h1>

                {tutor.verified && (
                  <span className="profile-verified">
                    ✓ ვერიფიცირებული
                  </span>
                )}

              </div>

              <p className="profile-location">
                📍 {tutor.city}
              </p>

              <p>
                📖 {tutor.subject}
              </p>

              <div className="profile-rating">
                ⭐ {tutor.rating}

                <span>
                  ({tutor.reviews} შეფასება)
                </span>
              </div>

            </div>

          </div>


          <div className="profile-action">

            <span>
              გაკვეთილის ფასი
            </span>

            <strong>
              {tutor.price}
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

          <h2>ტუტორის შესახებ</h2>

          <p>
            {tutor.description}
          </p>

          <div className="profile-stats">

            <div>
              <span>📚</span>
              <p>საგანი</p>
              <strong>{tutor.subject}</strong>
            </div>

            <div>
              <span>🎓</span>
              <p>გამოცდილება</p>
              <strong>{tutor.experience}</strong>
            </div>

            <div>
              <span>⭐</span>
              <p>რეიტინგი</p>
              <strong>{tutor.rating} / 5</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TutorProfile;