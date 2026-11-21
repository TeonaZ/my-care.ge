
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MessagesList() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadConversations = async () => {
      const token = localStorage.getItem("careGeorgiaToken");

      if (!token) {
        setError("შეტყობინებების სანახავად გაიარეთ ავტორიზაცია.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "შეტყობინებების ჩატვირთვა ვერ მოხერხდა."
          );
        }

        setConversations(data.conversations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
     <Link
  to="/received-applications"
  style={{
    display: "inline-block",
    marginBottom: "15px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  }}
>
  ← მიღებულ განცხადებებში დაბრუნება
</Link>

      <h1 style={{ marginTop: "25px" }}>💬 ჩემი შეტყობინებები</h1>

      {loading && <p>იტვირთება...</p>}

      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      {!loading && !error && conversations.length === 0 && (
        <p>თქვენ ჯერ არ გაქვთ მიმოწერები.</p>
      )}

      {!loading &&
        !error &&
        conversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/messages/${conversation.id}`}
            style={{
              display: "block",
              padding: "18px",
              marginBottom: "12px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#1e293b",
            }}
          >
           
<strong>
  👤 {conversation.first_name}{" "}
  {conversation.last_name
    ? `${conversation.last_name.charAt(0)}.`
    : ""}
</strong>


            <p
              style={{
                marginBottom: 0,
                color: "#64748b",
              }}
            >
              {conversation.last_message || "დაიწყეთ მიმოწერა"}
            </p>
          </Link>
        ))}
    </div>
  );
}

export default MessagesList;
