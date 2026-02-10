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
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">
        📜 Email History
      </h3>

      {loading && <p className="text-center text-gray-500">Loading history...</p>}

      {!loading && history.length === 0 && (
        <p className="text-center text-gray-500">No emails sent yet</p>
      )}

      {!loading && history.length > 0 && (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((mail) => (
            <div key={mail._id} className="border p-4 rounded-lg">
              <p className="font-semibold text-indigo-700">Subject: {mail.subject}</p>
              <p className="text-sm text-gray-600">From: {mail.fromName} &lt;{mail.fromEmail}&gt;</p>
              <p className="text-sm text-gray-600">To: {mail.recipients.join(", ")}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(mail.createdAt).toLocaleString()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    mail.status === "SUCCESS"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
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