import { Routes, Route, Link } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverProfile from "./pages/DriverProfile";
import Tutors from "./pages/Tutors";
import TutorProfile from "./pages/TutorProfile";
import "./App.css";

function Home() {
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          Care Georgia
        </div>

        <nav className="nav">
          <a href="#">მთავარი</a>
          <a href="#">იპოვე სპეციალისტი</a>
          <a href="#">იპოვე სამსახური</a>
          <a href="#">ჩვენ შესახებ</a>
        </nav>

        <div className="header-buttons">
          <button className="login-btn">
            შესვლა
          </button>

          <button className="register-btn">
            რეგისტრაცია
          </button>
        </div>

      </header>


      {/* HERO */}
      <main className="hero">

        <div className="hero-content">

          <p className="hero-small">
            ზრუნვა იწყება სწორი ადამიანის პოვნით
          </p>

          <h1>
            იპოვე სანდო ადამიანი
            <span> შენს ოჯახზე ზრუნვისთვის</span>
          </h1>

          <p className="hero-description">
            მოძებნე გამოცდილი სპეციალისტები შენს ქალაქში —
            მარტივად, სწრაფად და უსაფრთხოდ.
          </p>


          {/* SEARCH */}
          <div className="search-box">

            <select defaultValue="">
              <option value="" disabled>
                რას ეძებ?
              </option>

              <option value="nanny">
                👶 ძიძა
              </option>

              <option value="elderly">
                👵 ხანდაზმულის მომვლელი
              </option>

              <option value="driver">
                🚗 მძღოლი
              </option>

              <option value="tutor">
                📚 ტუტორი / რეპეტიტორი
              </option>

              <option value="home">
                🏠 სახლის დამხმარე
              </option>
            </select>


            <select defaultValue="">
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


            <button className="search-btn">
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
      <button>ნახვა →</button>
    </div>

    <div className="service-card">
      <div className="service-icon">👵</div>
      <h3>მომვლელი</h3>
      <p>იპოვე მზრუნველი ადამიანი ოჯახის წევრისთვის.</p>
      <button>ნახვა →</button>
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
      <button>ნახვა →</button>
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
        <Route
        path="/drivers/:id"
        element={<DriverProfile />}
      />

      <Route path="/tutors" element={<Tutors />} />
      <Route
  path="/tutors/:id"
  element={<TutorProfile />}
/>

    </Routes>
  );
}


export default App;