import  './Mail.css'
import { IonIcon } from '@ionic/react';
import { timeOutline, mailUnreadOutline} from 'ionicons/icons';



const Mail = () => {
  return (
    <div className='Mail'>
        <div className="Notification_header">
        <h3>Correos</h3>
      </div>
      <div className="Notification_content">
        <div className="Notification_content-items  Notification_Nuevas">
          <div className='Notification_content-items-photo'>
            <img src="https://mantisdashboard.io/assets/avatar-1-51c6502a.png" alt="" />
          </div>
          <div className='Notification_content-items-content'>
            <div className='Notification_content-items-content-tipo Notification_correo'>
              <div>
                <IonIcon className='icono' icon={mailUnreadOutline} />
              </div>
              <p><span>Steven Jocz envio un correo con el asunto:</span> Acerca de los cursos que presentan</p>
            </div>
            <div className='Notification_content-items-time'>
              <IonIcon className='icono' icon={timeOutline} />
              <p>9:11 AM August 7,2021</p>
            </div>
          </div>
        </div>
        <div className="Notification_content-items">
          <div className='Notification_content-items-photo'>
            <img src="https://mantisdashboard.io/assets/avatar-1-51c6502a.png" alt="" />
          </div>
          <div className='Notification_content-items-content'>
            <div className='Notification_content-items-content-tipo Notification_correo'>
              <div>
                <IonIcon className='icono' icon={mailUnreadOutline} />
              </div>
              <p><span>Steven Jocz envio un correo con el asunto:</span> Consulta sobre inscripción grupal</p>
            </div>
            <div className='Notification_content-items-time'>
              <IonIcon className='icono' icon={timeOutline} />
              <p>9:11 AM August 7,2021</p>
            </div>
          </div>
        </div>
        <div className="Notification_content-items ">
          <div className='Notification_content-items-photo'>
            <img src="https://mantisdashboard.io/assets/avatar-1-51c6502a.png" alt="" />
          </div>
          <div className='Notification_content-items-content'>
            <div className='Notification_content-items-content-tipo Notification_correo'>
              <div>
                <IonIcon className='icono' icon={mailUnreadOutline} />
              </div>
              <p><span>Steven Jocz envio un correo con el asunto:</span> Consultas sobre el pago</p>
            </div>
            <div className='Notification_content-items-time'>
              <IonIcon className='icono' icon={timeOutline} />
              <p>9:11 AM August 7,2021</p>
            </div>
          </div>
        </div>
        <div className="Notification_content-items ">
          <div className='Notification_content-items-photo'>
            <img src="https://mantisdashboard.io/assets/avatar-1-51c6502a.png" alt="" />
          </div>
          <div className='Notification_content-items-content'>
            <div className='Notification_content-items-content-tipo Notification_correo'>
              <div>
                <IonIcon className='icono' icon={mailUnreadOutline} />
              </div>
              <p><span>Steven Jocz envio un correo con el asunto:</span> Consultas sobre el pago</p>
            </div>
            <div className='Notification_content-items-time'>
              <IonIcon className='icono' icon={timeOutline} />
              <p>9:11 AM August 7,2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mail