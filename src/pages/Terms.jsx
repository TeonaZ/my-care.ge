import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          Care Georgia
        </Link>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>გამოყენების წესები</h1>

            <p>
              Care Georgia-ს გამოყენებით თქვენ ეთანხმებით
              პლატფორმის გამოყენების წესებსა და პირობებს.
            </p>
          </div>

          <p>
            გამოყენების სრული წესები და პირობები განთავსდება ამ გვერდზე.
          </p>

          <p style={{ marginTop: "25px" }}>
            <Link to="/register">← რეგისტრაციაზე დაბრუნება</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;