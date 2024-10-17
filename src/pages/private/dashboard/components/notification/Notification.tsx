import './Notification.css';
import { IonIcon } from '@ionic/react';
import { timeOutline, closeOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { IconoComponet } from '../iconoComponet';
import { useEffect, useState } from 'react';
import { Notificacion } from '../../../../../models/Notificaciones';
import { api } from '../../../../../services';
import { AppStore } from '../../../../../redux/Store';
import { useSelector } from 'react-redux';

interface Props {
  mostrarRegistro: () => void;
  esAdmin: boolean;
}


const Notification: React.FC<Props> = (props) => {
  const usuario = useSelector((store: AppStore) => store.user);
  const [date, setDate] = useState<Notificacion[]>([]);

  useEffect(() => {
    hadleGetNotifiaciones();
  }, [])

  const hadleGetNotifiaciones = async () => {
    // Solicitud GET

    try {
      const response = await api.get<Notificacion[]>('Notificacion/Get_Notifiaciones', { accion: 2, idUsuario: usuario.idUsuario });
      if (response.data.length > 0) {
        setDate(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const hadlePutNotifiaciones = async (idNotificacion: number) => {
    try {

      const objeto: Notificacion = {
        idNotificacion: idNotificacion,
        idTipoNotificacion: 0,
        deIdUsuario: 0,
        paraIdUsuario: 0,
        leida: false,
        icono: '0',
        notificacion: '0',
        idRelacion: 0,
        orden: 0,
        fecha: "2024-08-26T19:29:02.117Z",
        categoriaFecha: '0',
      };
      var response = await api.put<any>('Notificacion/Put_Actualizar_Estado', objeto);
      const data = response.data as { resultado: boolean; mensaje: string };

      if (data.resultado) {
        hadleGetNotifiaciones();
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const linkTo = props.esAdmin
    ? `/Dashboard/Pedidos/`
    : `/MisPedidos/`;

  return (
    <div className='Notification'>
      <div className="Notification_header">
        <h3>Notificaciones</h3>
        <IonIcon className='icono' icon={closeOutline} onClick={props.mostrarRegistro} />
      </div>
      <div className="Notification_content">

        {date && date.map((notificacion, index) => (
          <Link
            to={notificacion.idTipoNotificacion != 14 ? (
              linkTo + notificacion.idRelacion
            ) : (
              "/Dashboard/Comentarios"
            )}
            key={index}
            onClick={() => { hadlePutNotifiaciones(notificacion.idNotificacion); props.mostrarRegistro(); }}
          >
            <div className={`Notification_content-items Notification_${notificacion.idTipoNotificacion} ${notificacion.leida == false ? ' Notification_Nueva' : ''}`}>
              <IconoComponet name={notificacion.icono} />
              <div className='Notification_content-items-content'>
                <p>{notificacion.notificacion}<span> {notificacion.idTipoNotificacion != 14 ? "Orden #" + notificacion.orden : ""}</span></p>
                <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />{notificacion.fecha}</p>
              </div>
            </div>
          </Link>

        ))}

      </div>
      {props.esAdmin &&
        <div className="Notification_footer">
          <Link to={'/Dashboard/Notificaciones'} onClick={props.mostrarRegistro}>Ver todas las notificaciones</Link>
        </div>
      }

    </div>
  );
}

export default Notification;
