import { useEffect, useState } from 'react';
import './Header.css';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, expandOutline } from 'ionicons/icons';
import { Notification } from '../notification';
import { Mail } from '../mail';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../../redux/Store';
import img from '../../../../../assets/img/usuario.png'
import { api } from '../../../../../services';

const Header = () => {
  const [notification, setNotification] = useState(false);
  const [mail, setMail] = useState(false);
  const usuario = useSelector((store: AppStore) => store.user);
  const [tieneNotificacion, setTieneNotificacion] = useState(0);



  const handleNotification = () => {
    setNotification(!notification);
    setMail(false);
    setTieneNotificacion(0);
  };

  // const handleMail = () => {
  //   setNotification(false);
  //   setMail(!mail);
  // };

  useEffect(() => {
    hadleGetTieneNotificacion();
    const intervalId = setInterval(hadleGetTieneNotificacion, 40000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])

  const hadleGetTieneNotificacion = async () => {
    // Solicitud GET
    api.get<any>('Notificacion/Get_CantidadNotifiaciones', { idUsuario: usuario.idUsuario }).then((response) => {
      setTieneNotificacion(response.data);

    })
  };

  return (
    <div className='Header_Dashboard'>
      <div className="Header_Iconos">
        <div className='Header_Iconos_content' onClick={handleNotification} >
          <IonIcon className='icono' icon={notificationsOutline} />
          {tieneNotificacion > 0 &&  
          <div>
            <p>{tieneNotificacion}</p>
          </div>
          }
        </div>
        {/* <div className='Header_Iconos_content' onClick={handleMail} >
          <IonIcon className='icono' icon={mailOutline} />
          <div>
            <p>10</p>
          </div>
        </div> */}

        <IonIcon className='icono' icon={expandOutline} />
      </div>
      <div className="Header_Perfil">
        <img src={img} alt="" />
        <h2>{usuario.nombre}</h2>
      </div>
      {notification && <Notification esAdmin={true} />}
      {mail && <Mail />}
    </div>
  );
};

export default Header;
