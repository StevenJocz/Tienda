import { useState } from 'react';
import './Header.css';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, expandOutline, mailOutline } from 'ionicons/icons';
import { Notification } from '../notification';
import { Mail } from '../mail';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../../redux/Store';
import img from '../../../../../assets/img/usuario.png'

const Header = () => {
  const [notification, setNotification] = useState(false);
  const [mail, setMail] = useState(false);
  const usuario = useSelector((store: AppStore) => store.user);


  const handleNotification = () => {
    setNotification(!notification);
    setMail(false);
  };

  const handleMail = () => {
    setNotification(false);
    setMail(!mail);
  };


  return (
    <div className='Header_Dashboard'>
      <div className="Header_Iconos">
        <div className='Header_Iconos_content' onClick={handleNotification} >
          <IonIcon className='icono' icon={notificationsOutline} />
          <div>
            <p>1</p>
          </div>
        </div>
        <div className='Header_Iconos_content' onClick={handleMail} >
          <IonIcon className='icono' icon={mailOutline} />
          <div>
            <p>10</p>
          </div>
        </div>

        <IonIcon className='icono' icon={expandOutline} />
      </div>
      <div className="Header_Perfil">
        <img src={img} alt="" />
        <h2>{usuario.nombre}</h2>
      </div>
      {notification && <Notification />}
      {mail && <Mail />}
    </div>
  );
};

export default Header;
