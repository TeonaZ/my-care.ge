import { Link } from "react-router-dom";
import "./Drivers.css";

function Tutors() {
  const tutors = [
    {
      id: 1,
      name: "ნინო ბ.",
      subject: "ინგლისური ენა",
      city: "თბილისი",
      experience: "6 წელი",
      price: "30 ₾ / საათი",
      rating: "⭐ 4.9",
    },
    {
      id: 2,
      name: "ანა გ.",
      subject: "მათემატიკა",
      city: "თბილისი",
      experience: "4 წელი",
      price: "25 ₾ / საათი",
      rating: "⭐ 4.8",
    },
    {
      id: 3,
      name: "მარიამ ლ.",
      subject: "ქართული ენა",
      city: "ბათუმი",
      experience: "5 წელი",
      price: "25 ₾ / საათი",
      rating: "⭐ 4.7",
    },
  ];

  return (
    <div className="drivers-page">

      <header className="drivers-header">

        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>იპოვე ტუტორი</h1>

        <p>
          იპოვე შენთვის სასურველი მასწავლებელი ან
          რეპეტიტორი საგნის, ქალაქისა და ფასის მიხედვით.
        </p>

      </header>

      <div className="driver-filters">

        <select>
          <option>ყველა საგანი</option>
          <option>ინგლისური</option>
          <option>მათემატიკა</option>
          <option>ქართული</option>
          <option>ისტორია</option>
        </select>

        <select>
          <option>ყველა ქალაქი</option>
          <option>თბილისი</option>
          <option>ბათუმი</option>
          <option>ქუთაისი</option>
        </select>

        <button>ძიება</button>

      </div>

      <section className="drivers-list">

        {tutors.map((tutor) => (
          <div className="driver-card" key={tutor.id}>

            <div className="driver-avatar">
              📚
            </div>

            <div className="driver-info">

              <div className="driver-name">
                <h2>{tutor.name}</h2>
              </div>

              <p>📖 {tutor.subject}</p>
              <p>📍 {tutor.city}</p>
              <p>🎓 გამოცდილება: {tutor.experience}</p>
              <p>{tutor.rating}</p>

            </div>

            <div className="driver-price">

              <strong>{tutor.price}</strong>

              <Link
  to={`/tutors/${tutor.id}`}
  className="profile-btn"
>
  პროფილის ნახვა
</Link>

            </div>

          </div>
        ))}

      </section>

    </div>
  );
}

export default Tutors;