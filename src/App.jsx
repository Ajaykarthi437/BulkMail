import MailForm from "./components/MailForm.jsx";
import MailHistory from "./components/MailHistory.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        MERN Bulk Mail App
      </h1>
      <MailForm />
      <MailHistory />
    </div>
  );
}

export default App;