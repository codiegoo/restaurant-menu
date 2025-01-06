import Navbar from "@/components/navbar/Navbar";
import About from "@/pages/about/About";
import HomeSection from "@/pages/home/Home";
import Menu from "@/pages/menu/Menu";
import Contacto from "@/pages/contacto/Contacto";
import Footer from "@/pages/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HomeSection/>
      <About/>
      <Menu/>
      <Contacto/>
      <Footer/>
    </>
  );
}
