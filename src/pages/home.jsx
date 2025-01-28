import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Models from "../components/Models";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Call from "../components/Call";

const Home = () => (
  <div>
    <Header />
    <HeroSection />
    <Call />
    <Services />
    <Models />
    <Testimonials />
    <Contact />
  </div>
);

export default Home;
