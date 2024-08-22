/**
 * Componente IconoComponet
 * 
 * Este componente recibe el nombre de un ícono a través de `props.name` y selecciona 
 * el ícono correspondiente de la biblioteca Ionicons para renderizarlo. 
 * 
 * Si el nombre proporcionado no coincide con ninguno de los íconos especificados, 
 * se renderiza un ícono por defecto (`leafOutline`).
 * 
 * Para agregar un nuevo ícono, asegúrate de importarlo desde 'ionicons/icons' y 
 * añadir un caso en el switch basado en el nombre del ícono.
 * 
 * Si el ícono que necesitas no está disponible en la lista, puedes encontrar otros íconos en:
 * https://ionic.io/ionicons
 * 
 */

import { IonIcon } from '@ionic/react';
import {
    homeOutline,
    layersOutline,
    peopleOutline,
    constructOutline,
    readerOutline,
    podiumOutline,
    leafOutline,
    schoolOutline,
    giftOutline,
    personAddOutline,
    bagCheckOutline,
    checkmarkCircleOutline,
    closeCircleOutline
} from 'ionicons/icons';

interface Props {
    name: string;
}


const IconoComponet: React.FC<Props> = (props) => {
    let iconToRender;
    switch (props.name) {
        case 'homeOutline':
            iconToRender = homeOutline;
            break;
        case 'layersOutline':
            iconToRender = layersOutline;
            break;
        case 'peopleOutline':
            iconToRender = peopleOutline;
            break;
        case 'constructOutline':
            iconToRender = constructOutline;
            break;
        case 'readerOutline':
            iconToRender = readerOutline;
            break;
        case 'podiumOutline':
            iconToRender = podiumOutline;
            break;
        case 'schoolOutline':
            iconToRender = schoolOutline;
            break;
        case 'giftOutline':
            iconToRender = giftOutline;
            break;
        case 'personAddOutline':
            iconToRender = personAddOutline;
            break;
        case 'bagCheckOutline':
            iconToRender = bagCheckOutline;
            break;
        case 'checkmarkCircleOutline':
            iconToRender = checkmarkCircleOutline;
            break;
        case 'closeCircleOutline':
            iconToRender = closeCircleOutline;
            break;
        default:
            iconToRender = leafOutline;
            break;
    }

    return (
        <IonIcon className='icono' icon={iconToRender} />
    )
}

export default IconoComponet