import Footer from "../components/layout/Footer";
import Shoplist from "../components/shop/Shoplist";
import DisplayCarousel from "../components/topDisplay/itemDisplayCarousel/displayCarousel";
import TopDisplay from "../components/topDisplay/TopDisplay";

const Home = () => {
  return (
    <main>
      <TopDisplay />
      <DisplayCarousel />
      <Shoplist />
      <Footer />
    </main>
  );
};

export default Home;
