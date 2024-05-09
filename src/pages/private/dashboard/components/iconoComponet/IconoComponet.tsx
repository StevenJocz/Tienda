import { IonIcon } from '@ionic/react';
import { homeOutline, layersOutline, peopleOutline, constructOutline, readerOutline, podiumOutline, leafOutline, schoolOutline } from 'ionicons/icons';

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
        default:
            iconToRender = leafOutline;
            break;
    }

    return (
        <IonIcon icon={iconToRender} />
    )
}

export default IconoComponet