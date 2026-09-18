import { Link } from "react-router-dom";
import "./Drivers.css";

function Housekeepers() {
  const housekeepers = [
    {
      id: 1,
      name: "ნათია მ.",
      city: "თბილისი",
      experience: "6 წელი",
      price: "20 ₾ / საათი",
      rating: "⭐ 4.9",
      verified: true,
    },
    {
      id: 2,
      name: "თამუნა კ.",
      city: "თბილისი",
      experience: "4 წელი",
      price: "18 ₾ / საათი",
      rating: "⭐ 4.8",
      verified: true,
    },
    {
      id: 3,
      name: "ეკა ნ.",
      city: "ბათუმი",
      experience: "5 წელი",
      price: "17 ₾ / საათი",
      rating: "⭐ 4.7",
      verified: false,
    },
  ];

  return (
    <div className="drivers-page">
      <header className="drivers-header">
        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>იპოვე სახლის დამხმარე</h1>

        <p>
          იპოვე სანდო ადამიანი სახლის ყოველდღიური საქმეებისა და
          დასუფთავებისთვის.
        </p>
      </header>

      {/* ფილტრები */}
      <div className="driver-filters">
        <select>
          <option>ყველა ქალაქი</option>
          <option>თბილისი</option>
          <option>ბათუმი</option>
          <option>ქუთაისი</option>
          <option>რუსთავი</option>
        </select>

        <select>
          <option>მომსახურება</option>
          <option>სახლის დასუფთავება</option>
          <option>ყოველდღიური დახმარება</option>
          <option>საჭმლის მომზადება</option>
        </select>

        <select>
          <option>ფასი</option>
          <option>20 ₾-მდე</option>
          <option>20 - 30 ₾</option>
          <option>30 ₾+</option>
        </select>

        <button>ძიება</button>
      </div>

      {/* დამხმარეების სია */}
      <section className="drivers-list">
        {housekeepers.map((housekeeper) => (
          <div className="driver-card" key={housekeeper.id}>
            <div className="driver-avatar">🏠</div>

            <div className="driver-info">
              <div className="driver-name">
                <h2>{housekeeper.name}</h2>

                {housekeeper.verified && (
                  <span className="verified">✓ ვერიფიცირებული</span>
                )}
              </div>

              <p>📍 {housekeeper.city}</p>

              <p>💼 გამოცდილება: {housekeeper.experience}</p>

              <p>{housekeeper.rating}</p>
            </div>

            <div className="driver-price">
              <strong>{housekeeper.price}</strong>

              <Link
                to={`/housekeepers/${housekeeper.id}`}
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

export default Housekeepers;
