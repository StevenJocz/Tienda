import './Garantia.css'
import { IonIcon } from '@ionic/react';
import { ribbonOutline, headsetOutline, airplaneOutline, cardOutline} from 'ionicons/icons';

const Garantia = () => {
    return (
        <div className='Garantia'>
            <div className="Garantia_Content">
                <IonIcon className='icono' icon={ribbonOutline} />
                <div className="Garantia_Content--text">
                    <h3>Garantía de dinero</h3>
                    <p>Devolución de dinero en 30 días</p>
                </div>
            </div>
            <div className="Garantia_Content">
                <IonIcon className='icono' icon={airplaneOutline} />
                <div className="Garantia_Content--text">
                    <h3>Envío gratis</h3>
                    <p>A partir de compras superiores a 50.000 COP</p>
                </div>
            </div>
            <div className="Garantia_Content">
                <IonIcon className='icono' icon={headsetOutline} />
                <div className="Garantia_Content--text">
                    <h3>Soporte en línea</h3>
                    <p>Soporte en línea</p>
                </div>
            </div>
            <div className="Garantia_Content">
                <IonIcon className='icono' icon={cardOutline} />
                <div className="Garantia_Content--text">
                    <h3>Pago seguro</h3>
                    <p>Se aceptan todas las tarjetas</p>
                </div>
            </div>

        </div>
    )
}

export default Garantia