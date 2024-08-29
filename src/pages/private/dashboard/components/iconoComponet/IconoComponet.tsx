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
import * as Ionicons from 'ionicons/icons';

interface Props {
    name: string;
}

const IconoComponet: React.FC<Props> = ({ name }) => {
    // Busca el ícono en los íconos importados usando el nombre proporcionado.
    // Asegúrate de que el nombre es exactamente el mismo que el de las propiedades del objeto Ionicons.
    const iconToRender = Ionicons[name as keyof typeof Ionicons] || Ionicons.leafOutline;

    return (
        <IonIcon className='icono' icon={iconToRender} />
    );
}

export default IconoComponet;