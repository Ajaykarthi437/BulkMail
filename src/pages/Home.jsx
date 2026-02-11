import MailForm from "../components/MailForm";
import MailHistory from "../components/MailHistory";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "2.5rem 0" }}>
      <div style={{ width: "100%", maxWidth: "32rem" }}>
        <MailForm />
        <MailHistory />
      </div>
    </div>
  );
};

export default Home;