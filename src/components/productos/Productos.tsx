import './Productos.css'
import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { Producto } from '../../models/Productos';
import { useEffect, useState } from 'react';
import { api } from '../../services';
import { services } from '../../models';

const Productos = () => {
    const [productos, setProducto] = useState<Producto[]>([]);

    useEffect(() => {
        hadleGet();
    }, []);

    const hadleGet = async () => {
        try {
            const response = await api.get<Producto[]>('Producto/Get_Productos', { accion: 2 });
            if (response.data.length > 0) {
                setProducto(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='Productos'>
            <h1>Productos más vendidos</h1>
            <p>Explora nuestros favoritos: los productos más populares de la temporada.</p>
            <div className='Productos_Content'>
                { productos && productos.map((producto, index) => (
                    <div className='Productos_Card' key={index}>
                        <Link to={`/Producto/${producto.id}/${encodeURIComponent(producto.nombre.toLowerCase().replace(/ /g, '-'))}`}>
                            <div className='Productos_Card--img'>
                                {producto.aplicaDescuento &&
                                    <h5>En oferta</h5>
                                }
                                {producto.nuevo &&
                                    <h6>Nuevo</h6>
                                }
                                {producto.imagenes.map((imagen, imgIndex) => (
                                    <>
                                        <img className='Productos_Card--img-Uno' src={`${services.url}/${imagen.imagenUno}`} alt={`Imagen ${imgIndex}`} />
                                        <img className='Productos_Card--img-Dos' src={`${services.url}/${imagen.imagenDos}`} alt={`Imagen ${imgIndex}`} />
                                    </>
                                ))}
                                {producto.aplicaDescuento &&
                                    <h3>{producto.descuento}% de descuento</h3>
                                }
                            </div>
                        </Link>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                            <h3>{producto.nombre}</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>{producto.categorias}</h5>
                                <IonIcon className='icono' icon={heartOutline} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Productos