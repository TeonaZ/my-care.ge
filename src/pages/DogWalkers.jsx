import { Link } from "react-router-dom";

function DogWalkers() {
  return (
    <div style={{ padding: "40px" }}>
      <Link to="/">← მთავარზე დაბრუნება</Link>

      <h1>🐕 Dog Walker</h1>

      <p>
        იპოვე სანდო ადამიანი შენი ძაღლის გასეირნებისა და მოვლისთვის.
      </p>
    </div>
  );
}

export default DogWalkers;