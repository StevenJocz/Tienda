import './Notification.css'
import { IonIcon } from '@ionic/react';
import { medalOutline, timeOutline, personAddOutline, peopleOutline } from 'ionicons/icons';


const Notification = () => {
  return (
    <div className='Notification'>
      <div className="Notification_header">
        <h3>Notificaciones</h3>
        <button>Marcar todas como leidos</button>
      </div>
      <div className="Notification_content">
        <div className="Notification_content-items  Notification_Nuevas">
          <div className='Notification_content-items-photo'>
            <img src="https://mantisdashboard.io/assets/avatar-1-51c6502a.png" alt="" />
          </div>
          <div className='Notification_content-items-content'>
            <h2>Steven Jocz</h2>
            <div className='Notification_content-items-content-tipo'>
              <div>
                <IonIcon className='icono' icon={medalOutline} />
              </div>
              <p>Se inscribio al curso UX/UI Diseño y desarrollo de productos digitales centrados en el usuario</p>
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
            <h2>Steven Jocz</h2>
            <div className='Notification_content-items-content-tipo Notification_registro'>
              <div>
                <IonIcon className='icono' icon={personAddOutline} />
              </div>
              <p>Se registro en SLIES</p>
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
            <h2>Steven Jocz</h2>
            <div className='Notification_content-items-content-tipo Notification_grupal'>
              <div>
                <IonIcon className='icono' icon={peopleOutline} />
              </div>
              <p>Realizo una inscripción grupal al evento Ministerio musical</p>
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
            <h2>Steven Jocz</h2>
            <div className='Notification_content-items-content-tipo'>
              <div>
                <IonIcon className='icono' icon={medalOutline} />
              </div>
              <p>Se inscribio al curso Ministerio musical</p>
            </div>
            <div className='Notification_content-items-time'>
              <IonIcon className='icono' icon={timeOutline} />
              <p>9:11 AM August 7,2021</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Notification_footer">
        <button>Ver todas las notificaciones</button>
      </div>
    </div>
  )
}

export default Notification