import Image from "next/image";
import "./nav.sass"



export default function Navbar({ inicioRef, aboutRef, menuRef, contactoRef }) {

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return(
    <nav >
      <Image onClick={() => handleScroll(inicioRef)} style={{ cursor: "pointer" }} src="/images/logo.png" width={60} height={60} alt="Logotipo de la cafetería" />
      <ul className="navList">
        <li onClick={() => handleScroll(aboutRef)}>Nosotros</li>
        <li onClick={() => handleScroll(menuRef)}>Menu</li>
        <li onClick={() => handleScroll(contactoRef)}>Contacto</li>
      </ul>
    </nav>
  )
}