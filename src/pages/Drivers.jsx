import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Drivers.css";

function Drivers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCity = searchParams.get("city") || "";
  const [selectedPrice, setSelectedPrice] = useState("");
  const [appliedCity, setAppliedCity] = useState(selectedCity);
  const [appliedPrice, setAppliedPrice] = useState("");

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

  const cityMap = {
    tbilisi: "თბილისი",
    batumi: "ბათუმი",
    kutaisi: "ქუთაისი",
    rustavi: "რუსთავი",
    gori: "გორი",
    zugdidi: "ზუგდიდი",
  };

  const cityName = cityMap[appliedCity];

  const filteredDrivers = drivers.filter((driver) => {
    // ქალაქის შემოწმება
    const matchesCity = cityName ? driver.city === cityName : true;

    // ფასიდან მხოლოდ რიცხვის ამოღება
    const price = parseInt(driver.price);

    let matchesPrice = true;

    if (appliedPrice === "under20") {
      matchesPrice = price <= 20;
    }

    if (appliedPrice === "20to30") {
      matchesPrice = price >= 20 && price <= 30;
    }

    if (appliedPrice === "over30") {
      matchesPrice = price >= 30;
    }

    return matchesCity && matchesPrice;
  });
  return (
    <div className="drivers-page">
      {/* ზედა ნაწილი */}
      <header className="drivers-header">
        <Link to="/" className="back-link">
          ← Care Georgia
        </Link>

        <h1>იპოვე მძღოლი</h1>

        <p>
          შეარჩიე შენთვის სასურველი მძღოლი ქალაქის, გამოცდილებისა და ფასის
          მიხედვით.
        </p>
      </header>

      {/* ფილტრები */}
      <div className="driver-filters">
        <select
          value={selectedCity}
          onChange={(e) => {
            const city = e.target.value;

            if (city) {
              setSearchParams({ city });
            } else {
              setSearchParams({});
            }
          }}
        >
          <option value="">ყველა ქალაქი</option>
          <option value="tbilisi">თბილისი</option>
          <option value="batumi">ბათუმი</option>
          <option value="kutaisi">ქუთაისი</option>
          <option value="rustavi">რუსთავი</option>
          <option value="gori">გორი</option>
          <option value="zugdidi">ზუგდიდი</option>
          <option value="telavi">თელავი</option>
          <option value="akhaltsikhe">ახალციხე</option>
          <option value="ozurgeti">ოზურგეთი</option>
          <option value="poti">ფოთი</option>
          <option value="mtskheta">მცხეთა</option>
          <option value="khashuri">ხაშური</option>
          <option value="kobuleti">ქობულეთი</option>
          <option value="borjomi">ბორჯომი</option>
          <option value="samtredia">სამტრედია</option>
          <option value="senaki">სენაკი</option>
          <option value="marneuli">მარნეული</option>
          <option value="kvareli">ყვარელი</option>
          <option value="lagodekhi">ლაგოდეხი</option>
          <option value="akhmeta">ახმეტა</option>
          <option value="dusheti">დუშეთი</option>
          <option value="kaspi">კასპი</option>
          <option value="chiatura">ჭიათურა</option>
          <option value="zestafoni">ზესტაფონი</option>
          <option value="tkibuli">ტყიბული</option>
          <option value="tsqaltubo">წყალტუბო</option>
          <option value="ambrolauri">ამბროლაური</option>
          <option value="oni">ონი</option>
        </select>

        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">ყველა ფასი</option>
          <option value="under20">20 ₾-მდე</option>
          <option value="20to30">20 - 30 ₾</option>
          <option value="over30">30 ₾+</option>
        </select>

        <button
          onClick={() => {
            setAppliedCity(selectedCity);
            setAppliedPrice(selectedPrice);
          }}
        >
          ძიება
        </button>
      </div>

      {/* მძღოლების სია */}
      <section className="drivers-list">
        {filteredDrivers.map((driver) => (
          <div className="driver-card" key={driver.id}>
            <div className="driver-avatar">👤</div>

            <div className="driver-info">
              <div className="driver-name">
                <h2>{driver.name}</h2>

                {driver.verified && (
                  <span className="verified">✓ ვერიფიცირებული</span>
                )}
              </div>

              <p>📍 {driver.city}</p>

              <p>🚗 {driver.experience}</p>

              <p>{driver.rating}</p>
            </div>

            <div className="driver-price">
              <strong>{driver.price}</strong>

              <Link to={`/drivers/${driver.id}`} className="profile-btn">
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
