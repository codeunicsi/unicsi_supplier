import Hero from "../components/Hero";
import Logistics from "../components/Logistics";
import CTASection from "../components/CTASection";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Integrations from "../components/Integrations";
import Testimonials from "../components/Testimonials";
import LetsTalk from "../components/LetsTalk";
import InventorySection from "../components/InventorySection";
import Partners from "../components/Partners";
import FeaturesSection from "../components/FeaturesSection";
import PopularProducts from "../components/PopularProducts";

function Home() {
  return (
    <div className="">
       <Hero />
      <CTASection />
      <InventorySection />
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
};
export { Home };


