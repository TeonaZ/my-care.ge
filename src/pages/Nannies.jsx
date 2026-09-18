import { Link } from "react-router-dom";
import "./Drivers.css";

function Nannies() {
  const nannies = [
    {
      id: 1,
      name: "თამარ მ.",
      city: "თბილისი",
      experience: "7 წელი",
      price: "20 ₾ / საათი",
      rating: "⭐ 4.9",
      verified: true,
    },
    {
      id: 2,
      name: "ნინო კ.",
      city: "თბილისი",
      experience: "5 წელი",
      price: "18 ₾ / საათი",
      rating: "⭐ 4.8",
      verified: true,
    },
    {
      id: 3,
      name: "მარიამ გ.",
      city: "ბათუმი",
      experience: "4 წელი",
      price: "15 ₾ / საათი",
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

        <h1>იპოვე ძიძა</h1>

        <p>
          იპოვე სანდო ძიძა ბავშვის ასაკის, ქალაქის, გამოცდილებისა და ფასის
          მიხედვით.
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
          <option>ბავშვის ასაკი</option>
          <option>0 - 1 წელი</option>
          <option>1 - 3 წელი</option>
          <option>3 - 6 წელი</option>
          <option>6+ წელი</option>
        </select>

        <select>
          <option>ფასი</option>
          <option>20 ₾-მდე</option>
          <option>20 - 30 ₾</option>
          <option>30 ₾+</option>
        </select>

        <button>ძიება</button>
      </div>

      {/* ძიძების სია */}
      <section className="drivers-list">
        {nannies.map((nanny) => (
          <div className="driver-card" key={nanny.id}>
            <div className="driver-avatar">👶</div>

            <div className="driver-info">
              <div className="driver-name">
                <h2>{nanny.name}</h2>

                {nanny.verified && (
                  <span className="verified">✓ ვერიფიცირებული</span>
                )}
              </div>

              <p>📍 {nanny.city}</p>

              <p>👶 გამოცდილება: {nanny.experience}</p>

              <p>{nanny.rating}</p>
            </div>

            <div className="driver-price">
              <strong>{nanny.price}</strong>

              <Link to={`/nannies/${nanny.id}`} className="profile-btn">
                პროფილის ნახვა
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Nannies;
