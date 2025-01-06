import Image from "next/image";
import './home.sass'


export default function HomeSection() {

  return(
    <section className="homeContain">
      <div className="homeTextContain">
        <h2>EL MEJOR <br />CAFÉ PARA TI</h2>
        <p>Un cafe que despierta tus sentidos como nunca antes, <br />invitandote a descubrir una experiencia unica en la magia de cada sorbo.</p>
        <button>
          Ver mas
        </button>
      </div>
      <Image src="/images/cafeIMG.png" width="500" height="500" alt="cafe con galleta edl restaurante"/>
    </section>
  )
}