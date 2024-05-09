import './Card.css'
import { IonIcon } from '@ionic/react';
import { trendingUpOutline } from 'ionicons/icons';

interface Props {
    titulo: string;
    tipo: number;
    numeroTotal: number;
    porcentaje: number;
    numeroNuevos: number;
    clase: number;
}

const Card: React.FC<Props> = (props) => {
    return (
        <div className='Card'>
            <h3>{props.clase == 1 ? "Total" : ""} {props.titulo}</h3>
            <div>
                <p> {props.tipo === 4 ? "$" : ""} {props.numeroTotal.toLocaleString()}</p>
                <button className={`${props.tipo != 3 ? "" : "Tipo"}
                ${props.tipo === 4 && props.porcentaje < 0 ? "TipoNegativo" : props.tipo === 4 && props.porcentaje >= 0 ? "TipoPositivo" : ""}`}>
                    <IonIcon className={`icono ${props.porcentaje < 0 ? "iconoDos" : ""}`} icon={trendingUpOutline} /> {props.porcentaje}%
                </button>
            </div>
            {props.clase === 1 ?
                <p>{props.tipo == 1 ? 'Has registrado' : props.tipo == 2 ? 'Se han inscripto' : props.tipo == 3 ? 'Se han pagado' : 'Has recibido'}
                    <span>{props.tipo === 4 ? "$" : ""} {props.numeroNuevos.toLocaleString()}</span>
                    este mes
                </p>
                : null
            }
            {props.clase === 2 ?
                <p>
                    <span>{props.numeroNuevos}</span>
                    Inscripciones
                </p>
                : null
            }
        </div>
    )
}

export default Card