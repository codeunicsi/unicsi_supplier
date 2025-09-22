import { Home } from "./pages/Home";
import Logistics from "./components/Logistics";
import CTASection from "./components/CTASection";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import LetsTalk from "./components/LetsTalk";
import Inventory from "./components/Inventory";
import Partners from "./components/Partners";
import FeaturesSection from "./components/FeaturesSection";
import PopularProducts from "./components/PopularProducts";
import "./App.css";


function App() {
  return (
    <div className="">
      <Home />
      <CTASection />
      <Inventory />
      <PopularProducts />
      <FeaturesSection />
      <Integrations />
       <Services />
      <Partners />
      <Logistics />
      <Testimonials />
      <LetsTalk />
      <Footer />

    </div>
  );
}

export default App;
