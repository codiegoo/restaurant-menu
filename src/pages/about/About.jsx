import './about.sass'


export default function About() {


  return(
    <section className="aboutContain">
      <video src="/videos/aboutVideo.mp4" className="aboutVideo" autoPlay muted loop></video>
      <div className='textAboutContain'>
        <h3>somos la autenticidad <br />en tu taza de cafe</h3>
        <p>
        Somos una cafetería local dedicada a ofrecer la mejor experiencia a nuestros clientes. Aquí, cada taza de café es un reflejo de nuestra pasión por la autenticidad, acompañada de espacios acogedores diseñados para inspirarte. Ya sea que busques un rincón tranquilo para trabajar, un lugar para conectar o simplemente disfrutar de un café inolvidable, estamos aquí para hacerlo posible. ☕</p>
        <div className="btnContain">
          <button><a href="">Instagram</a></button>
          <button><a href="">Whatsapp</a></button>
        </div>
      </div>
    </section>
  )
}