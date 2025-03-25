import { IonIcon } from '@ionic/react'
import { locationOutline, mailOutline, logoFacebook, logoWhatsapp, logoYoutube, logoInstagram } from "ionicons/icons";
import './Footer.css'

const Footer = () => {
  return (
    <div className='Footer'>
      <div className="Footer_Content">
        <div className="Footer_Content_Img">
          <h2>Tienda unac</h2>
          <img src="https://www.unac.edu.co/wp-content/uploads/2022/07/LOGO_UNAC_BLANCO.webp" alt="" />

        </div>
        <div className="Footer_Content_Text">
          <h2>Medellín, Colombia</h2>
          <p><IonIcon className="icono" icon={locationOutline} />Carrera 84 #33AA-01</p>
          <h2>Contáctenos</h2>
          <p><IonIcon className="icono" icon={mailOutline} />tienda@unac.edu.co</p>
        </div>
        <div className="Footer_Content_Iconos">
          <IonIcon className="icono" icon={logoFacebook} />
          <IonIcon className="icono" icon={logoInstagram} />
          <IonIcon className="icono" icon={logoYoutube} />
          <IonIcon className="icono" icon={logoWhatsapp} />

        </div>

      </div>
    </div>
  )
}

export default Footer