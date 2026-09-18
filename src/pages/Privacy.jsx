import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          Care Georgia
        </Link>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>კონფიდენციალურობის პოლიტიკა</h1>

            <p>
              Care Georgia პატივს სცემს მომხმარებლის კონფიდენციალურობას
              და პერსონალური მონაცემების დაცვას.
            </p>
          </div>

          <p>
            კონფიდენციალურობის სრული პოლიტიკა განთავსდება ამ გვერდზე.
          </p>

          <p style={{ marginTop: "25px" }}>
            <Link to="/register">← რეგისტრაციაზე დაბრუნება</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;