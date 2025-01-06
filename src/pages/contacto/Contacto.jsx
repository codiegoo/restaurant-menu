import Image from 'next/image'
import './contacto.sass'


export default function Contacto() {


  return(
    <section className="contactContain">
      <h3>Contacto</h3>
      <div className="contactInner">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.48005992125!2d-108.99056942580035!3d25.78773195659287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ba2f5ae5b46723%3A0xfb816e0be2e5de93!2sLic.%20Benito%20Ju%C3%A1rez%20149%2C%20Centro%2C%2081200%20Los%20Mochis%2C%20Sin.!5e0!3m2!1ses!2smx!4v1735626687727!5m2!1ses!2smx" width="800" height="250" loading="lazy"></iframe>
        <div className="contactText">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda deserunt, quae temporibus similique iste ullam aspernatur alias itaque magni fuga.</p>
        </div>
      </div>
      <div className="reservationInner">
        <div className="imageLocate">
          <h4>Reservaciones</h4>
          <p className='textImage1'>Reserva nuestro local y celebra cualquier evento especial con el rico sabor de nuestro cafe para tus invitados.</p>
          <p className='textImage2'>El local se puede personalizar segun la tematica del evento.</p>
          <button>Reservar</button>
        </div>
      </div>
    </section>
  )
}