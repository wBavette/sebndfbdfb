import Navbar from "../components/streaming/Navbar";
import HeroLanding from "../components/streaming/HeroLanding";
import Footer from "../components/streaming/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <HeroLanding />
      <Footer />
    </div>
  );
};

export default Index;
