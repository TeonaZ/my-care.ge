import { Link } from "react-router-dom";
import "./Drivers.css";

function Drivers() {

  // დროებითი მონაცემები.
  // მოგვიანებით ეს ინფორმაცია მონაცემთა ბაზიდან წამოვა.
  const drivers = [
    {
      id: 1,
      name: "გიორგი მ.",
      city: "თბილისი",
      experience: "8 წლიანი გამოცდილება",
      price: "25 ₾ / საათი",
      rating: "⭐ 4.9",
      verified: true,
    },
    {
      id: 2,
      name: "ლევან კ.",
      city: "თბილისი",
      experience: "5 წლიანი გამოცდილება",
      price: "20 ₾ / საათი",
      rating: "⭐ 4.8",
      verified: true,
    },
    {
      id: 3,
      name: "დავით ნ.",
      city: "ბათუმი",
      experience: "6 წლიანი გამოცდილება",
      price: "22 ₾ / საათი",
      rating: "⭐ 4.7",
      verified: false,
    },
  ];

  return (
    <div className="drivers-page">

      {/* ზედა ნაწილი */}
      <header className="drivers-header">

        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>იპოვე მძღოლი</h1>

        <p>
          შეარჩიე შენთვის სასურველი მძღოლი ქალაქის,
          გამოცდილებისა და ფასის მიხედვით.
        </p>

      </header>


      {/* ფილტრები */}
      <div className="driver-filters">

        <select>
          <option>ყველა ქალაქი</option>
          <option>თბილისი</option>
          <option>ბათუმი</option>
          <option>ქუთაისი</option>
        </select>

        <select>
          <option>ფასი</option>
          <option>20 ₾-მდე</option>
          <option>20 - 30 ₾</option>
          <option>30 ₾+</option>
        </select>

        <button>ძიება</button>

      </div>


      {/* მძღოლების სია */}
      <section className="drivers-list">

        {drivers.map((driver) => (

          <div className="driver-card" key={driver.id}>

            <div className="driver-avatar">
              👤
            </div>

            <div className="driver-info">

              <div className="driver-name">
                <h2>{driver.name}</h2>

                {driver.verified && (
                  <span className="verified">
                    ✓ ვერიფიცირებული
                  </span>
                )}
              </div>

              <p>📍 {driver.city}</p>

              <p>🚗 {driver.experience}</p>

              <p>{driver.rating}</p>

            </div>

            <div className="driver-price">

              <strong>{driver.price}</strong>

              <Link
  to={`/drivers/${driver.id}`}
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

export default Drivers;