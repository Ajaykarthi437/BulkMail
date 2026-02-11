import { useEffect, useState } from "react";
import { getHistory } from "../services/mailService";

const MailHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data);
      } catch (error) {
        console.error("Failed to fetch mail history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "1.5rem",
        maxWidth: "32rem",
        margin: "auto",
      }}
    >
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "1rem",
          color: "#4c51bf",
        }}
      >
        📜 Email History
      </h3>

      {loading && <p style={{ textAlign: "center", color: "#a0aec0" }}>Loading history...</p>}

      {!loading && history.length === 0 && (
        <p style={{ textAlign: "center", color: "#a0aec0" }}>No emails sent yet</p>
      )}

      {!loading && history.length > 0 && (
        <div style={{ maxHeight: "16rem", overflowY: "auto", gap: "1rem" }}>
          {history.map((mail) => (
            <div
              key={mail._id}
              style={{
                border: "1px solid #c3dafd",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <p style={{ fontWeight: "600", color: "#4c51bf" }}>Subject: {mail.subject}</p>
              <p style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                From: {mail.fromName} &lt;{mail.fromEmail}&gt;
              </p>
              <p style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                To: {mail.recipients.join(", ")}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#a0aec0",
                  }}
                >
                  {new Date(mail.createdAt).toLocaleString()}
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: mail.status === "SUCCESS" ? "#38a169" : "#e53e3e",
                    backgroundColor: mail.status === "SUCCESS" ? "#f0fff4" : "#fff5f5",
                  }}
                >
                  {mail.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailHistory;
