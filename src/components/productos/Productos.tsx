import './Productos.css'
import { IonIcon } from '@ionic/react';
import { bookmarkOutline } from 'ionicons/icons';


const Productos = () => {
    return (
        <div className='Productos'>
            <h1>Productos más vendidos</h1>
            <p>Explora nuestros favoritos: los productos más populares de la temporada.</p>
            <div className='Productos_Content'>
                <div className='Productos_Card'>
                    <div className='Productos_Card--img'>
                        <h5>En oferta</h5>
                        <h6>Nuevo</h6>
                        <img className='Productos_Card--img-Uno' src="https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true" alt="" />
                        <img className='Productos_Card--img-Dos' src="https://tennis.vtexassets.com/arquivos/ids/2414709-500-auto?v=638496787586830000&width=500&height=auto&aspect=true" alt="" />
                    </div>
                    <div className='Productos_Card--info'>
                        <h3>Cable del controlador de la consola de juegos</h3>
                        <h5>Ropa</h5>
                        <div className='Productos_Card--info-valor'>
                            <h3>20%</h3>
                            <h4>$8,250</h4>
                            <h5>$9,900</h5>
                        </div>
                        <div className='Productos_Card--info-add'>
                            <button>Agregar al carrito</button>
                            <IonIcon className='icono' icon={bookmarkOutline} />
                        </div>

                    </div>
                </div>
                <div className='Productos_Card'>
                    <div className='Productos_Card--img'>
                        <h6>Nuevo</h6>
                        <img src="https://tennis.vtexassets.com/arquivos/ids/2266246-800-auto?v=638279851734600000&width=800&height=auto&aspect=true" alt="" />
                    </div>
                    <div className='Productos_Card--info'>
                        <h3>Cable del controlador de la consola de juegos</h3>
                        <h5>Ropa</h5>
                        <div className='Productos_Card--info-valor'>
                            <h3>2%</h3>
                            <h4>$8,250</h4>
                            <h5>$9,900</h5>
                        </div>
                        <div className='Productos_Card--info-add'>
                            <button>Agregar al carrito</button>
                            <IonIcon className='icono' icon={bookmarkOutline} />
                        </div>

                    </div>
                </div>
                <div className='Productos_Card'>
                    <div className='Productos_Card--img'>
                        <img src="https://tennis.vtexassets.com/arquivos/ids/2414989-500-auto?v=638496788126130000&width=500&height=auto&aspect=true" alt="" />
                    </div>
                    <div className='Productos_Card--info'>
                        <h3>Cable del controlador de la consola de juegos</h3>
                        <h5>Ropa</h5>
                        <div className='Productos_Card--info-valor'>
                            <h4>$8,250</h4>
                            <h5>$9,900</h5>
                        </div>
                        <div className='Productos_Card--info-add'>
                            <button>Agregar al carrito</button>
                            <IonIcon className='icono' icon={bookmarkOutline} />
                        </div>

                    </div>
                </div>
                <div className='Productos_Card'>
                    <div className='Productos_Card--img'>
                        <h5>En oferta</h5>
                        <img src="https://tennis.vtexassets.com/arquivos/ids/2416881-800-auto?v=638497717634200000&width=800&height=auto&aspect=true" alt="" />
                    </div>
                    <div className='Productos_Card--info'>
                        <h3>Cable del controlador de la consola de juegos</h3>
                        <h5>Ropa</h5>
                        <div className='Productos_Card--info-valor'>
                            <h3>20%</h3>
                            <h4>$8,250</h4>
                            <h5>$9,900</h5>
                        </div>
                        <div className='Productos_Card--info-add'>
                            <button>Agregar al carrito</button>
                            <IonIcon className='icono' icon={bookmarkOutline} />
                        </div>

                    </div>
                </div>
                <div className='Productos_Card'>
                    <div className='Productos_Card--img'>
                        <img src="https://tennis.vtexassets.com/arquivos/ids/2417146-800-auto?v=638498420221300000&width=800&height=auto&aspect=true" alt="" />
                    </div>
                    <div className='Productos_Card--info'>
                        <h3>Cable del controlador de la consola de juegos</h3>
                        <h5>Ropa</h5>
                        <div className='Productos_Card--info-valor'>
                            <h3>20%</h3>
                            <h4>$8,250</h4>
                            <h5>$9,900</h5>
                        </div>
                        <div className='Productos_Card--info-add'>
                            <button>Agregar al carrito</button>
                            <IonIcon className='icono' icon={bookmarkOutline} />
                        </div>

                    </div>
                </div>
                <div className='Productos_Card'>
                    <div className='Productos_Card--img'>
                        <img src="https://tennis.vtexassets.com/arquivos/ids/2308252-800-auto?v=638386811258370000&width=800&height=auto&aspect=true" alt="" />
                    </div>
                    <div className='Productos_Card--info'>
                        <h3>Cable del controlador de la consola de juegos</h3>
                        <h5>Ropa</h5>
                        <div className='Productos_Card--info-valor'>
                            <h3>20%</h3>
                            <h4>$8,250</h4>
                            <h5>$9,900</h5>
                        </div>
                        <div className='Productos_Card--info-add'>
                            <button>Agregar al carrito</button>
                            <IonIcon className='icono' icon={bookmarkOutline} />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Productos