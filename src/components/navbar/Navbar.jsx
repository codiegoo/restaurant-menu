import Image from "next/image";
import NavList from "./NavList";
import "./nav.sass"


export default function Navbar() {

  return(
    <nav>
      <Image src="/images/logo.png" width="80" height="80" alt="Logotipo de la cafeteria"/>
      <NavList/>
    </nav>
  )
}