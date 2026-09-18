import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [accountType, setAccountType] = useState("client");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEightCharacters = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    // პაროლის მოთხოვნების შემოწმება
    if (!hasEightCharacters || !hasUppercase || !hasNumber) {
      setPasswordError(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, 1 დიდ ასოს და 1 ციფრს."
      );
      return;
    }

    // პაროლების დამთხვევის შემოწმება
    if (password !== confirmPassword) {
      alert("პაროლები ერთმანეთს არ ემთხვევა.");
      return;
    }

    setPasswordError("");

    alert("ფორმა სწორად არის შევსებული!");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          Care Georgia
        </Link>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>შექმენი ანგარიში</h1>

            <p>
              შემოუერთდი Care Georgia-ს და იპოვე დახმარება ან შესთავაზე შენი
              მომსახურება.
            </p>
          </div>

          {/* ანგარიშის ტიპის არჩევა */}
          <div className="account-types">
            <button
              type="button"
              className={`account-type ${
                accountType === "client" ? "active" : ""
              }`}
              onClick={() => setAccountType("client")}
            >
              <span>🔎</span>

              <div>
                <strong>ვეძებ დახმარებას</strong>
                <p>მსურს სპეციალისტის პოვნა</p>
              </div>
            </button>

            <button
              type="button"
              className={`account-type ${
                accountType === "provider" ? "active" : ""
              }`}
              onClick={() => setAccountType("provider")}
            >
              <span>💼</span>

              <div>
                <strong>ვეძებ სამუშაოს</strong>
                <p>მსურს მომსახურების შეთავაზება</p>
              </div>
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* დახმარების ტიპი */}
            {accountType === "client" && (
              <div className="form-group service-select-group">
                <label>რა ტიპის დახმარებას ეძებ?</label>

                <select
                  defaultValue=""
                  required
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "9px",
                  }}
                >
                  <option value="" disabled>
                    აირჩიე დახმარების ტიპი
                  </option>

                  <option value="nanny">👶 ძიძა</option>
                  <option value="caregiver">👵 მომვლელი</option>
                  <option value="driver">🚗 მძღოლი</option>
                  <option value="tutor">📚 ტუტორი</option>
                  <option value="housekeeper">🏠 სახლის დამხმარე</option>
                  <option value="dog-walker">🐕 ძაღლის გამსეირნებელი</option>
                </select>
              </div>
            )}

            {/* მომსახურების ტიპი */}
            {accountType === "provider" && (
              <div className="form-group service-select-group">
                <label>რა მომსახურებას სთავაზობ?</label>

                <select
                  defaultValue=""
                  required
                  style={{
                    width: "100%",
                    height: "35px",
                    borderRadius: "9px",
                  }}
                >
                  <option value="" disabled>
                    აირჩიე მომსახურება
                  </option>

                  <option value="nanny">👶 ძიძა</option>
                  <option value="caregiver">👵 მომვლელი</option>
                  <option value="driver">🚗 მძღოლი</option>
                  <option value="tutor">📚 ტუტორი</option>
                  <option value="housekeeper">🏠 სახლის დამხმარე</option>
                <option value="dog-walker">🐕 ძაღლის გასეირნება</option>
                    
        
                </select>
              </div>
            )}

            {/* ქალაქი */}
            <div className="form-group">
              <label>ქალაქი</label>

              <select
                defaultValue=""
                required
                style={{
                  width: "100%",
                  height: "45px",
                  borderRadius: "9px",
                  border: "1px solid #dbe2ea",
                  padding: "0 12px",
                  backgroundColor: "white",
                  color: "#334155",
                }}
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
                <option value="poti">ფოთი</option>
                <option value="telavi">თელავი</option>
                <option value="other">სხვა</option>
              </select>
            </div>

            {/* სახელი და გვარი */}
            <div className="form-row">
              <div className="form-group">
                <label>სახელი</label>

                <input type="text" placeholder="შენი სახელი" required />
              </div>

              <div className="form-group">
                <label>გვარი</label>

                <input type="text" placeholder="შენი გვარი" required />
              </div>
            </div>

            {/* ელ. ფოსტა */}
            <div className="form-group">
              <label>ელ. ფოსტა</label>

              <input type="email" placeholder="example@email.com" required />
            </div>

            {/* ტელეფონის ნომერი */}
            <div className="form-group">
              <label>ტელეფონის ნომერი</label>

              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #dbe2ea",
                  borderRadius: "9px",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    width: "75px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    borderRight: "1px solid #dbe2ea",
                    backgroundColor: "#f8fafc",
                    fontWeight: "600",
                  }}
                >
                  +995
                </div>

                <input
                  type="tel"
                  placeholder="555 12 34 56"
                  pattern="5[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                  title="ნომერი ჩაწერე ფორმატით: 555 12 34 56"
                  required
                  style={{
                    flex: "1",
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "0",
                    padding: "0 14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* პაროლი */}
            <div className="form-group">
              <label>პაროლი</label>

              <input
                type="password"
                placeholder="მინ. 8 სიმბოლო, 1 დიდი ასო და 1 ციფრი"
                value={password}
                required
                onChange={(e) => {
                  const newPassword = e.target.value;

                  setPassword(newPassword);

                  const hasEightCharacters = newPassword.length >= 8;
                  const hasUppercase = /[A-Z]/.test(newPassword);
                  const hasNumber = /[0-9]/.test(newPassword);

                  if (
                    newPassword &&
                    (!hasEightCharacters || !hasUppercase || !hasNumber)
                  ) {
                    setPasswordError(
                      "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, 1 დიდ ასოს და 1 ციფრს."
                    );
                  } else {
                    setPasswordError("");
                  }
                }}
              />

              {passwordError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* პაროლის გამეორება */}
            <div className="form-group">
              <label>გაიმეორე პაროლი</label>

              <input
                type="password"
                placeholder="გაიმეორე პაროლი"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPassword && password !== confirmPassword && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  პაროლები ერთმანეთს არ ემთხვევა.
                </p>
              )}
            </div>
            <label className="terms-check">
              <input type="checkbox" required />

              <span>
                ვეთანხმები <Link to="/terms">წესებს</Link> და{" "}
                <Link to="/privacy">კონფიდენციალურობის პოლიტიკას</Link>
              </span>
            </label>
            <button type="submit" className="auth-submit">
              რეგისტრაცია
            </button>
          </form>

          <p className="auth-bottom">
            უკვე გაქვს ანგარიში?
            <Link to="/login">შესვლა</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
