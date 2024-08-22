import './Notification.css';
import { IonIcon } from '@ionic/react';
import {  timeOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { IconoComponet } from '../iconoComponet';

const Notification = () => {
  return (
    <div className='Notification'>
      <div className="Notification_header">
        <h3>Notificaciones</h3>
      </div>
      <div className="Notification_content">

        <Link to={`/Dashboard/Pedidos/${2}`}>
          <div className="Notification_content-items items_Tipo_1 Notification_Pedidos">
            <IconoComponet  name='giftOutline' />
            <div className='Notification_content-items-content'>
              <p><span>¡Nuevo Pedido!</span> Se ha realizado la <span>Orden #2</span></p>
              <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />22 de agosto de 2024, 8:20 AM</p>
            </div>
          </div>
        </Link>

        <Link to={`/Dashboard/Pedidos/${1}`}>
          <div className="Notification_content-items items_Tipo_2 Notification_Error Notification_Nueva">
          <IconoComponet  name='bagCheckOutline' />
            <div className='Notification_content-items-content'>
              <p><span>Error en el Pago</span> para la <span>Orden #7</span></p>
              <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />22 de agosto de 2024, 8:20 AM</p>
            </div>
          </div>
        </Link>

        <div className="Notification_content-items items_Tipo_3 Notification_Soporte Notification_Nueva">
          <IconoComponet  name='personAddOutline' />
          <div className='Notification_content-items-content'>
            <p><span>Solicitud de Soporte</span> de <span>María Camila</span></p>
            <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />22 de agosto de 2024, 8:20 AM</p>
          </div>
        </div>

        <div className="Notification_content-items items_Tipo_4 Notification_Comentario Notification_Nueva">
          <IconoComponet  name='personAddOutline' />
          <div className='Notification_content-items-content'>
            <p><span>Nuevo Comentario</span> de <span>María Camila</span></p>
            <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />22 de agosto de 2024, 8:20 AM</p>
          </div>
        </div>

        <div className="Notification_content-items items_Tipo_5 Notification_Envio">
        <IconoComponet  name='checkmarkCircleOutline' />
          <div className='Notification_content-items-content'>
            <p><span>Pedido Enviado:</span> La <span>Orden #6</span> ha sido despachada</p>
            <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />22 de agosto de 2024, 8:20 AM</p>
          </div>
        </div>

        <div className="Notification_content-items items_Tipo_6 Notification_Cancelacion">
        <IconoComponet  name='closeCircleOutline' />
          <div className='Notification_content-items-content'>
            <p><span>Pedido Cancelado:</span> La <span>Orden #7</span> ha sido cancelada</p>
            <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />22 de agosto de 2024, 8:20 AM</p>
          </div>
        </div>

      </div>
      <div className="Notification_footer">
        <button>Ver todas las notificaciones</button>
      </div>
    </div>
  );
}

export default Notification;
