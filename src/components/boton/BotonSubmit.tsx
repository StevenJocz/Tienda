import './BotonSubmit.css'
import { IonIcon } from "@ionic/react";
import { enterOutline, arrowForwardOutline } from "ionicons/icons";

interface BotonSubmitProps {
    isLoading?: boolean;
    texto?: string;
    onClick?: () => void;
    isSubmitting?: boolean;
    color?: string;
}
type Colores = {
    [key: string]: string;
};

const BotonSubmit: React.FC<BotonSubmitProps> = ({ isLoading = false, texto = '', onClick, isSubmitting = false, color = 'guardar' }) => {
    const colores: Colores = {
        continuar: '#2A5783',
        registro: '#2A5783',
        editar: '#00ff00',
        eliminar: '#e7362f95;',
        modal: '#fd7e14',
        // Puedes agregar más colores si lo deseas
    };

    const hexadecimalColor = colores[color.toLowerCase()];
    return (
        <button type="submit" className={`${texto=='Pagar ahora' ? 'PagarAhora' : 'Iniciar_Boton'}`} onClick={onClick} disabled={isSubmitting} style={{ backgroundColor: hexadecimalColor }}>
            {isLoading ? (
                <div className="Iniciar_spinner">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            ) : (
                <span className={`${color=='Registrarme' ? 'registro' : ''}`}> {texto}{color=='Continuar' ? <IonIcon className="icono" icon={arrowForwardOutline} /> : <IonIcon className="icono" icon={enterOutline} />} </span>
            )}

        </button>
    )
}

export default BotonSubmit