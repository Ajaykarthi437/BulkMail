import MailForm from "../components/MailForm";
import MailHistory from "../components/MailHistory";

const Home = () => {
  return (
    <div className="flex justify-center items-start py-10">
      <div className="w-full max-w-2xl">
        <MailForm />
        <MailHistory />
      </div>
    </div>
  );
};

export default Home;;