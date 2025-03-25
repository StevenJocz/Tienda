import './Favoritos.css'
import { IonIcon } from '@ionic/react';
import { closeOutline, trashOutline, eyeOffOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';
import { Producto } from '../../models/Productos';
import { useEffect, useState } from 'react';
import { api } from '../../services';
import { services } from '../../models';
import { useFavoritesContext } from '../../context/Favoritos';

interface Filtros {
    categoria?: string;
    nuevo?: boolean;
    enOferta?: boolean;
}


interface Props {
    onClose: () => void;
    filtros: Filtros;
}

const Favoritos: React.FC<Props> = (props) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const { removeFromFavorites } = useFavoritesContext();

    useEffect(() => {
        handleGet();
    }, []);

    useEffect(() => {
        setProductos(filtrarProductos(productos));
    }, [props.filtros]);

    const handleGet = async () => {
        try {
            const ids = JSON.parse(localStorage.getItem('favoriteProductIds') || '[]');

            if (ids.length === 0) {
                console.error('No favorite product IDs found in local storage.');
                return;
            }

            const queryParams = new URLSearchParams();
            ids.forEach((id: number) => queryParams.append('IdProductos', id.toString()));

            // Realizar la solicitud a la API
            const response = await api.get<Producto[]>(`Producto/Get_Productos_Favoritos?${queryParams.toString()}`);
            if (response.data.length > 0) {
                setProductos(response.data);
            } else {
                console.error('No products found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRemoveFavorite = (idProducto: number) => {
        removeFromFavorites(idProducto);

        setProductos((prevProductos) => prevProductos.filter(producto => producto.id !== idProducto));
    };

    const filtrarProductos = (productos: Producto[]) => {
        return productos.filter(producto => {
            const { categoria, nuevo, enOferta } = props.filtros;
            const cumpleCategoria = categoria ? producto.categorias.includes(categoria) : true;
            const cumpleNuevo = nuevo !== undefined && nuevo !== false ? producto.nuevo === nuevo : true;
            const cumpleEnOferta = enOferta !== undefined && enOferta !== false ? producto.aplicaDescuento === enOferta : true;
            return cumpleCategoria && cumpleNuevo && cumpleEnOferta;
        });
    };

    const productosFiltrados = filtrarProductos(productos);

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
                {productosFiltrados.length > 0 ? (
                    <div className='Favoritos_Producto'>
                        {productosFiltrados && productosFiltrados.map((producto, index) => (
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
                                            <div key={imgIndex}>
                                                <img className='Productos_Card--img-Uno' src={`${services.url}/${imagen.imagenUno}`} alt={`Imagen ${imgIndex}`} />
                                                <img className='Productos_Card--img-Dos' src={`${services.url}/${imagen.imagenDos}`} alt={`Imagen ${imgIndex}`} />
                                            </div>
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
                                        <IonIcon className='iconoRemove' icon={trashOutline} onClick={() => handleRemoveFavorite(producto.id)} />
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                ) : (
                    <div className='Favoritos_Producto_null'>
                    <IonIcon className='icono' icon={eyeOffOutline} />
                    <p>Aun no tiene productos añadidos en tu lista de deseos.</p>
                    <button onClick={props.onClose}>Volver a la tienda</button>
                </div>
                )}

            </div>
        </div>
    )
}

export default Favoritos