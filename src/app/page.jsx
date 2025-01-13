'use client'
import Navbar from "@/components/navbar/Navbar";
import About from "@/pages/about/About";
import HomeSection from "@/pages/home/Home";
import Menu from "@/pages/menu/Menu";
import Contacto from "@/pages/contacto/Contacto";
import Footer from "@/pages/footer/footer";
import { useRef } from "react";

export default function Home() {
  const inicioRef = useRef(null);
  const aboutRef = useRef(null);
  const menuRef = useRef(null);
  const contactoRef = useRef(null);
  return (
    <>
      <Navbar inicioRef={inicioRef} aboutRef={aboutRef} menuRef={menuRef} contactoRef={contactoRef}/>
      <div ref={inicioRef }>
        <HomeSection menuRef={menuRef}/>
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={menuRef}>
        <Menu/>
      </div>
      <div ref={contactoRef}>
        <Contacto />
      </div>
      <Footer/>
    </>
  );
}
