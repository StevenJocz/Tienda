import './Favoritos.css'
import { IonIcon } from '@ionic/react';
import { closeOutline, trashOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';

interface Props {
    onClose: () => void;
}
const Favoritos: React.FC<Props> = (props) => {
    return (
        <div className='Favoritos'>
            <div className='Favoritos--cerrar' onClick={props.onClose}></div>
            <div className='Favoritos_Content'>
                <div className='Favoritos_Content--Encabezado'>
                    <h4>Lista de deseos</h4>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <div className='Favoritos_Producto'>
                    <div className='Productos_Card'>
                        <Link to={'/Producto/1'}>
                            <div className='Productos_Card--img'>
                                <h5>En oferta</h5>
                                <h6>Nuevo</h6>
                                <img className='Productos_Card--img-Uno' src="https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true" alt="" />
                                <img className='Productos_Card--img-Dos' src="https://tennis.vtexassets.com/arquivos/ids/2414709-500-auto?v=638496787586830000&width=500&height=auto&aspect=true" alt="" />
                                <h3>20% de descuento</h3>
                            </div>
                        </Link>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                                <h3>Cable del controlador de la consola de juegos</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>Ropa</h5>
                                <IonIcon className='iconoRemove' icon={trashOutline} />
                            </div>
                        </div>
                    </div>
                    <div className='Productos_Card'>
                        <Link to={'/Producto/1'}>
                            <div className='Productos_Card--img'>
                                <h5>En oferta</h5>
                                <h6>Nuevo</h6>
                                <img className='Productos_Card--img-Uno' src="https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true" alt="" />
                                <img className='Productos_Card--img-Dos' src="https://tennis.vtexassets.com/arquivos/ids/2414709-500-auto?v=638496787586830000&width=500&height=auto&aspect=true" alt="" />
                                <h3>20% de descuento</h3>
                            </div>
                        </Link>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                                <h3>Cable del controlador de la consola de juegos</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>Ropa</h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className='Productos_Card'>
                        <Link to={'/Producto/1'}>
                            <div className='Productos_Card--img'>
                                <h5>En oferta</h5>
                                <h6>Nuevo</h6>
                                <img className='Productos_Card--img-Uno' src="https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true" alt="" />
                                <img className='Productos_Card--img-Dos' src="https://tennis.vtexassets.com/arquivos/ids/2414709-500-auto?v=638496787586830000&width=500&height=auto&aspect=true" alt="" />
                                <h3>20% de descuento</h3>
                            </div>
                        </Link>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                                <h3>Cable del controlador de la consola de juegos</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>Ropa</h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className='Productos_Card'>
                        <Link to={'/Producto/1'}>
                            <div className='Productos_Card--img'>
                                <h5>En oferta</h5>
                                <h6>Nuevo</h6>
                                <img className='Productos_Card--img-Uno' src="https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true" alt="" />
                                <img className='Productos_Card--img-Dos' src="https://tennis.vtexassets.com/arquivos/ids/2414709-500-auto?v=638496787586830000&width=500&height=auto&aspect=true" alt="" />
                                <h3>20% de descuento</h3>
                            </div>
                        </Link>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                                <h3>Cable del controlador de la consola de juegos</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>Ropa</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favoritos