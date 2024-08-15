import { useEffect, useState } from 'react';
import './Guia.css'
import { IonIcon } from '@ionic/react';
import { closeOutline } from "ionicons/icons";
import mujer from '../../assets/img/medidas_mujer.webp';
import hombre from '../../assets/img/medidas_hombre.webp';
import opcion from '../../assets/img/pana.png';

interface Props {
    onClose: () => void;
}


const Guia: React.FC<Props> = (props) => {
    const [tipoGuia, setTipoGuia] = useState(0);

    useEffect(() => {
        const mainContainer = document.getElementById('Home_main_Pruduct');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
            console.log(mainContainer)
        }
    }, []);


    const handleTipoGuia = (opcion: number) => {
        setTipoGuia(opcion);
    };


    const tallaMujeres = [
        {
            "Talla": "XS",
            "Busto": 84,
            "Cintura": 64,
            "Cadera": 92
        },
        {
            "Talla": "S",
            "Busto": 88,
            "Cintura": 68,
            "Cadera": 94
        },
        {
            "Talla": "M",
            "Busto": 92,
            "Cintura": 72,
            "Cadera": 98
        },
        {
            "Talla": "L",
            "Busto": 96,
            "Cintura": 76,
            "Cadera": 102
        },
        {
            "Talla": "XL",
            "Busto": 100,
            "Cintura": 78,
            "Cadera": 106
        }
    ]

    const tallaHombres = [
        {
            "Talla": "XS",
            "Pecho": 94,
            "Cintura": 77
        },
        {
            "Talla": "S",
            "Pecho": 99,
            "Cintura": 82
        },
        {
            "Talla": "M",
            "Pecho": 103,
            "Cintura": 87
        },
        {
            "Talla": "L",
            "Pecho": 109,
            "Cintura": 92
        },
        {
            "Talla": "XL",
            "Pecho": 115,
            "Cintura": 97
        },
        {
            "Talla": "XXL",
            "Pecho": 121,
            "Cintura": 102
        }
    ]


    return (
        <div className='Guia'>
            <div className='Guia_Content'>
                <div className='Guia_Content--encabezado'>
                    <h3>¿Cómo obtener tus medidas?</h3>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <div className='Guia_Content--acciones'>
                    <ul>
                        <li onClick={() => handleTipoGuia(1)}>Mujer</li>
                        <li onClick={() => handleTipoGuia(2)}>Hombre</li>
                    </ul>
                </div>
                {tipoGuia == 1 ? (
                    <div className='Guia_Content--tipo'>
                        <div className='Guia_Content--tipo--img'>
                            <img src={mujer} alt="" />
                        </div>
                        <div className='Guia_Content--tipo--text'>
                            <h5>Busto</h5>
                            <p>Con los brazos relajados a cada lado, envuelve la cinta métrica alrededor de la parte más sobresaliente de tu busto pasando por debajo de los brazos.</p>

                            <h5>Cintura</h5>
                            <p>Envuelve la cinta métrica alrededor de la línea natural de tu cintura. Para hallar esta línea, inclina tu brazo de forma lateral hasta tocar tu rodilla. El pliegue que se forma es el punto donde debes tomar la medida.</p>

                            <h5>Cintura Baja</h5>
                            <p>Envuelve la cinta métrica alrededor de tu cintura al nivel donde usas normalmente tus pantalones, a unos 8 centímetros del ombligo hacia abajo.</p>

                            <h5>Cadera</h5>
                            <p>Envuelve la cinta métrica alrededor de la parte más sobresaliente de tu cuerpo, entre la cintura y las rodillas. Esto es aproximadamente 20 centímetros por debajo de tu cintura.</p>

                            <h3>PRENDAS SUPERIORES</h3>
                            <table className='Guia_Content--tipo--tabla'>
                                <thead>
                                    <tr>
                                        <th>Talla</th>
                                        <th>Busto</th>
                                        <th>Cintura</th>
                                        <th>Cadera</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tallaMujeres.map((talla, index) => (
                                        <tr key={index}>
                                            <td>{talla.Talla}</td>
                                            <td>{talla.Busto}</td>
                                            <td>{talla.Cintura}</td>
                                            <td>{talla.Cadera}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : tipoGuia == 2 ? (

                    <div className='Guia_Content--tipo'>
                        <div className='Guia_Content--tipo--img'>
                            <img src={hombre} alt="" />
                        </div>
                        <div className='Guia_Content--tipo--text'>
                            <h5>Pecho</h5>
                            <p>Con los brazos relajados a cada lado, envuelve la cinta métrica alrededor de la parte más ancha de tu pecho pasando por debajo de los brazos.</p>

                            <h5>Cintura</h5>
                            <p>Envuelve la cinta métrica alrededor de tu cintura al nivel donde usas normalmente tus pantalones, a unos 8 centímetros del ombligo hacia abajo.</p>

                            <h5>Cadera</h5>
                            <p>Con los pies juntos, envuelve la cinta métrica alrededor de la parte más sobresaliente de tus caderas.</p>

                            <h3>PRENDAS SUPERIORES</h3>
                            <table className='Guia_Content--tipo--tabla'>
                                <thead>
                                    <tr>
                                        <th>Talla</th>
                                        <th>Pecho</th>
                                        <th>Cintura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tallaHombres.map((talla, index) => (
                                        <tr key={index}>
                                            <td>{talla.Talla}</td>
                                            <td>{talla.Pecho}</td>
                                            <td>{talla.Cintura}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                ) : (
                    <div className='Guia_Content--tipo--opcion'>
                        <p>Por favor, seleccione el tipo de guía de medidas que desea.</p>
                        <img src={opcion} alt="" />
                    </div>
                )}

            </div>

        </div>
    )
}

export default Guia