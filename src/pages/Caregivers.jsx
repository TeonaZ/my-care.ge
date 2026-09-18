import { Link } from "react-router-dom";
import "./Drivers.css";

function Caregivers() {
  const caregivers = [
    {
      id: 1,
      name: "მაია კ.",
      city: "თბილისი",
      experience: "8 წელი",
      price: "22 ₾ / საათი",
      rating: "⭐ 4.9",
      verified: true,
    },
    {
      id: 2,
      name: "ეკა მ.",
      city: "ქუთაისი",
      experience: "6 წელი",
      price: "18 ₾ / საათი",
      rating: "⭐ 4.8",
      verified: true,
    },
    {
      id: 3,
      name: "ნანა გ.",
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

        <h1>იპოვე მომვლელი</h1>

        <p>
          იპოვე სანდო და გამოცდილი ადამიანი ხანდაზმული ოჯახის წევრის მოვლისა და
          დახმარებისთვის.
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
          <option>გამოცდილება</option>
          <option>1+ წელი</option>
          <option>3+ წელი</option>
          <option>5+ წელი</option>
        </select>

        <select>
          <option>ფასი</option>
          <option>20 ₾-მდე</option>
          <option>20 - 30 ₾</option>
          <option>30 ₾+</option>
        </select>

        <button>ძიება</button>
      </div>

      {/* მომვლელების სია */}
      <section className="drivers-list">
        {caregivers.map((caregiver) => (
          <div className="driver-card" key={caregiver.id}>
            <div className="driver-avatar">👵</div>

            <div className="driver-info">
              <div className="driver-name">
                <h2>{caregiver.name}</h2>

                {caregiver.verified && (
                  <span className="verified">✓ ვერიფიცირებული</span>
                )}
              </div>

              <p>📍 {caregiver.city}</p>

              <p>💼 გამოცდილება: {caregiver.experience}</p>

              <p>{caregiver.rating}</p>
            </div>

            <div className="driver-price">
              <strong>{caregiver.price}</strong>

              <Link to={`/caregivers/${caregiver.id}`} className="profile-btn">
                პროფილის ნახვა
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Caregivers;
