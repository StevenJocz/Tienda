import { useState } from 'react';
import './Header.css';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, expandOutline, mailOutline} from 'ionicons/icons';
import { Notification } from '../notification';
import { Mail } from '../mail';
import { useSelector } from 'react-redux';
import { services } from '../../../../../models';
import { AppStore } from '../../../../../redux/Store';

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
    <div className='Header'>
      <div className="Header_Iconos">
        <IonIcon className='icono' icon={notificationsOutline} onClick={handleNotification} />
        <IonIcon className='icono' icon={mailOutline} onClick={handleMail} />
        <IonIcon className='icono' icon={expandOutline} />
      </div>
      <div className="Header_Perfil">
        <img src={`${services.url}/${usuario.foto}`} alt="" />
        <h2>{usuario.nombre}</h2>
      </div>
      {notification && <Notification />}
      {mail && <Mail />}
    </div>
  );
};

export default Header;
