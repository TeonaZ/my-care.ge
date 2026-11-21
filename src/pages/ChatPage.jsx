
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ChatPage() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("careGeorgiaToken");
  const currentUserId = localStorage.getItem("careGeorgiaCurrentUserId");

  const loadMessages = async () => {
    if (!token) {
      setError("ჩატის სანახავად გაიარეთ ავტორიზაცია.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ჩატი ვერ ჩაიტვირთა.");
      }

      setMessages(data.messages || []);
      
      // მიღებული შეტყობინებების წაკითხულად მონიშვნა
      try {
        const readResponse = await fetch(
          `http://localhost:5000/api/messages/${id}/read`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!readResponse.ok) {
          console.error("შეტყობინებების წაკითხულად მონიშვნა ვერ მოხერხდა.");
        }
      } catch (readError) {
        console.error("Mark messages read error:", readError);
      }

      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
useEffect(() => {
  loadMessages();

  const interval = setInterval(() => {
    loadMessages();
  }, 3000);

  return () => {
    clearInterval(interval);
  };
}, [id, token]);


  const sendMessage = async (event) => {
    event.preventDefault();

    if (!text.trim() || sending || !token) return;

    try {
      setSending(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/messages/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: text.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "შეტყობინება ვერ გაიგზავნა.");
      }

      setMessages((previous) => [...previous, data.message]);
      setText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
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

      <h1>💬 მიმოწერა</h1>

      {error && (
        <p style={{ color: "#dc2626" }}>{error}</p>
      )}

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "20px",
          minHeight: "350px",
          maxHeight: "500px",
          overflowY: "auto",
          marginBottom: "15px",
        }}
      >
        {loading ? (
          <p>იტვირთება...</p>
        ) : messages.length === 0 ? (
          <p>შეტყობინებები ჯერ არ არის. დაიწყეთ საუბარი!</p>
        ) : (
          messages.map((message) => {
            const mine =
              String(message.sender_id) === String(currentUserId);

            return (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent: mine ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    background: mine ? "#dbeafe" : "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "12px 15px",
                    maxWidth: "75%",
                    overflowWrap: "anywhere",
                  }}
                >
                  {message.message_text}
                </div>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="დაწერეთ შეტყობინება..."
          maxLength={5000}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
          }}
        />

        <button
          type="submit"
          disabled={!text.trim() || sending || !!error}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {sending ? "..." : "გაგზავნა"}
        </button>
      </form>
    </div>
  );
}

export default ChatPage;
