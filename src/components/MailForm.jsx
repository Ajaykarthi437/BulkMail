import React, { useState, useRef } from "react";
import { sendMail } from "../services/mailService";

const MailForm = () => {
  const [fromName, setFromName] = useState("");
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success or error
  const bodyRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = bodyRef.current.innerHTML;

    try {
      await sendMail({
        fromName,
        subject,
        body,
        recipients: recipients.split(","),
      });
      setMessageType("success");
      setMessage("Email(s) sent successfully!");
      setFromName("");
      setSubject("");
      setRecipients("");
      bodyRef.current.innerHTML = "";
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Failed to send email(s).");
    }
  };


  return (
    <form
      style={{
        background: "linear-gradient(to bottom, #e0e7ff, white)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "1rem",
        maxWidth: "40rem",
        margin: "2.5rem auto",
        padding: "2rem",
        display: "grid",
        gap: "1.5rem",
        border: "1px solid #b3b3cc",
      }}
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "2.25rem",
          fontWeight: "800",
          color: "#4c51bf",
          marginBottom: "1.5rem",
          textAlign: "center",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        📧 Compose Email
      </h2>

      {/* From & To */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", fontWeight: "600", color: "#4c51bf" }}>
            From:
          </label>
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: "0.75rem",
              border: "1px solid #c3dafd",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", fontWeight: "600", color: "#4c51bf" }}>
            To:
          </label>
          <input
            type="text"
            placeholder="Recipient Emails (comma separated)"
            style={{
              padding: "0.75rem",
              border: "1px solid #c3dafd",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Subject */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "0.25rem", fontWeight: "600", color: "#4c51bf" }}>
          Subject:
        </label>
        <input
          type="text"
          placeholder="Subject"
          style={{
            padding: "0.75rem",
            border: "1px solid #c3dafd",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            fontWeight: "500",
            transition: "all 0.2s",
          }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          backgroundColor: "#f3f4f6",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          border: "1px solid #b3b3cc",
        }}
      >
        <button
          type="button"
          onClick={() => execCommand("bold")}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            fontWeight: "bold",
            color: "#4c51bf",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            fontStyle: "italic",
            color: "#4c51bf",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            textDecoration: "underline",
            color: "#4c51bf",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) execCommand("createLink", url);
          }}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            color: "#4c51bf",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) execCommand("insertImage", url);
          }}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            color: "#4c51bf",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          🖼️
        </button>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        contentEditable
        style={{
          width: "100%",
          minHeight: "300px",
          padding: "1rem",
          border: "1px solid #c3dafd",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          fontFamily: "sans-serif",
          color: "#333",
          overflow: "auto",
          resize: "none",
          transition: "all 0.2s",
        }}
        placeholder="Write your email here..."
      />

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button
          type="button"
          onClick={() => {
            setFromName("");
            setRecipients("");
            setSubject("");
            setMessage("");
            bodyRef.current.innerHTML = "";
          }}
          style={{
            backgroundColor: "#e2e8f0",
            color: "#4c51bf",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          style={{
            background: "linear-gradient(to right, #667eea, #764ba2)",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Send
        </button>
      </div>

      {/* Status message */}
      {message && (
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontWeight: "600",
            color: messageType === "success" ? "#48bb78" : "#e53e3e",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default MailForm;
