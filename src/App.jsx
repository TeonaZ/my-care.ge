import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";
import Tutors from "./pages/Tutors";
import TutorProfile from "./pages/TutorProfile";
import Nannies from "./pages/Nannies";
import NannyProfile from "./pages/NannyProfile";
import Caregivers from "./pages/Caregivers";
import CaregiverProfile from "./pages/CaregiverProfile";
import Housekeepers from "./pages/Housekeepers";
import HousekeeperProfile from "./pages/HousekeeperProfile";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import DogWalkers from "./pages/DogWalkers";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = () => {
    if (!selectedService || !selectedCity) {
      alert("გთხოვ, აირჩიე მომსახურება და ქალაქი.");
      return;
    }

    const serviceRoutes = {
      nanny: "/nannies",
      elderly: "/caregivers",
      driver: "/drivers",
      tutor: "/tutors",
      home: "/housekeepers",
      dogwalker: "/dogwalker",
    };

    const route = serviceRoutes[selectedService];

    if (route) {
      navigate(`${route}?city=${selectedCity}`);
    }
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">Care Georgia</div>

        <nav className="nav">
          <a href="#">მთავარი</a>
          <a href="#">იპოვე სპეციალისტი</a>
          <a href="#">იპოვე სამსახური</a>
          <a href="#">ჩვენ შესახებ</a>
        </nav>

        <div className="header-buttons">
          <button className="login-btn">შესვლა</button>

          <button className="register-btn">რეგისტრაცია</button>
        </div>
      </header>

      {/* HERO */}
      <main className="hero">
        <div className="hero-content">
          <p className="hero-small">ზრუნვა იწყება სწორი ადამიანის პოვნით</p>

          <h1>
            იპოვე სანდო ადამიანი
            <span> შენს ოჯახზე ზრუნვისთვის</span>
          </h1>

          <p className="hero-description">
            მოძებნე გამოცდილი სპეციალისტები შენს ქალაქში — მარტივად, სწრაფად და
            უსაფრთხოდ.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="" disabled>
                რას ეძებ?
              </option>

              <option value="nanny">👶 ძიძა</option>

              <option value="elderly">👵 ხანდაზმულის მომვლელი</option>

              <option value="driver">🚗 მძღოლი</option>

              <option value="tutor">📚 ტუტორი / რეპეტიტორი</option>

              <option value="home">🏠 სახლის დამხმარე</option>

              <option value="dogwalker">🐕 ძაღლის გამსეირნებელი</option>
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="" disabled>
                აირჩიე ქალაქი
              </option>

              <option value="tbilisi">თბილისი</option>
              <option value="batumi">ბათუმი</option>
              <option value="kutaisi">ქუთაისი</option>
              <option value="rustavi">რუსთავი</option>
              <option value="gori">გორი</option>
              <option value="zugdidi">ზუგდიდი</option>
            </select>

            <button className="search-btn" onClick={handleSearch}>
              ძიება
            </button>
          </div>
        </div>
      </main>

      {/* SERVICES */}
      <section className="services">
        <div className="services-title">
          <p>ჩვენი სერვისები</p>
          <h2>როგორი დახმარება გჭირდება?</h2>
          <span>
            აირჩიე სასურველი კატეგორია და იპოვე შესაბამისი სპეციალისტი.
          </span>
        </div>

        <div className="service-cards">
          <div className="service-card">
            <div className="service-icon">👶</div>
            <h3>ძიძა</h3>
            <p>იპოვე სანდო ძიძა ბავშვის მოვლისთვის.</p>
            <Link to="/nannies" className="service-link">
              ნახვა →
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">👵</div>
            <h3>მომვლელი</h3>
            <p>იპოვე მზრუნველი ადამიანი ოჯახის წევრისთვის.</p>
            <Link to="/caregivers" className="service-link">
              ნახვა →
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">🚗</div>
            <h3>მძღოლი</h3>
            <p>იპოვე გამოცდილი და სანდო მძღოლი.</p>
            <Link to="/drivers" className="service-link">
              ნახვა →
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">📚</div>
            <h3>ტუტორი</h3>
            <p>იპოვე მასწავლებელი და რეპეტიტორი.</p>
            <Link to="/tutors" className="service-link">
              ნახვა →
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h3>სახლის დამხმარე</h3>
            <p>იპოვე ადამიანი ყოველდღიური საქმეებისთვის.</p>
            <Link to="/housekeepers" className="service-link">
              ნახვა →
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">🐕</div>
            <h3>Dog Walker</h3>
            <p>ძაღლის გასეირნება და მოვლა</p>
            <Link to="/dogwalker" className="service-link">
              ნახვა →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/drivers/:id" element={<DriverProfile />} />

      <Route path="/tutors" element={<Tutors />} />
      <Route path="/tutors/:id" element={<TutorProfile />} />

      <Route path="/nannies" element={<Nannies />} />
      <Route path="/nannies/:id" element={<NannyProfile />} />

      <Route path="/caregivers" element={<Caregivers />} />
      <Route path="/caregivers/:id" element={<CaregiverProfile />} />
      <Route path="/housekeepers" element={<Housekeepers />} />
      <Route path="/housekeepers/:id" element={<HousekeeperProfile />} />
      <Route path="/dogwalker" element={<DogWalkers />} />
      <Route path="/register" element={<Register />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

export default App;
