import { useState, useRef } from "react";
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

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    bodyRef.current.focus();
  };

  return (
    <form
      className="bg-gradient-to-b from-indigo-50 to-white shadow-2xl rounded-2xl max-w-4xl mx-auto mt-10 p-8 space-y-6 border border-indigo-200"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow-sm">
        📧 Compose Email
      </h2>

      {/* From & To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-indigo-600 font-semibold">From:</label>
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 border border-indigo-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none hover:shadow-md transition placeholder-gray-400 text-gray-800 font-medium"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-indigo-600 font-semibold">To:</label>
          <input
            type="text"
            placeholder="Recipient Emails (comma separated)"
            className="p-3 border border-indigo-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none hover:shadow-md transition placeholder-gray-400 text-gray-800 font-medium"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col">
        <label className="mb-1 text-indigo-600 font-semibold">Subject:</label>
        <input
          type="text"
          placeholder="Subject"
          className="p-3 border border-indigo-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none hover:shadow-md transition placeholder-gray-400 text-gray-800 font-medium"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      {/* Toolbar */}
      <div className="flex space-x-2 bg-indigo-100 p-2 rounded-lg border border-indigo-200">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="hover:bg-indigo-200 p-2 rounded font-bold text-indigo-700 transition"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="hover:bg-indigo-200 p-2 rounded italic text-indigo-700 transition"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className="hover:bg-indigo-200 p-2 rounded underline text-indigo-700 transition"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) execCommand("createLink", url);
          }}
          className="hover:bg-indigo-200 p-2 rounded text-indigo-700 transition"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) execCommand("insertImage", url);
          }}
          className="hover:bg-indigo-200 p-2 rounded text-indigo-700 transition"
        >
          🖼️
        </button>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        contentEditable
        className="w-full min-h-[300px] p-4 border border-indigo-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none hover:shadow-md resize-none transition overflow-auto text-gray-900 font-sans"
        placeholder="Write your email here..."
      />

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition shadow font-medium"
          onClick={() => {
            setFromName("");
            setRecipients("");
            setSubject("");
            setMessage("");
            bodyRef.current.innerHTML = "";
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition shadow-lg font-medium"
        >
          Send
        </button>
      </div>

      {/* Status message */}
      {message && (
        <p
          className={`text-center mt-3 font-semibold ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default MailForm;