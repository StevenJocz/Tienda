import './Productos.css';
import { IonIcon } from '@ionic/react';
import { heartOutline, heartSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { Producto } from '../../models/Productos';
import { useEffect, useState } from 'react';
import { api } from '../../services';
import { services } from '../../models';
import { useFavoritesContext } from '../../context/Favoritos';
import { Tooltip } from '@mui/material';

interface Filtros {
    categoria?: string;
    nuevo?: boolean;
    enOferta?: boolean;
}

interface Props {
    titulo: string;
    descripcion: string;
    filtros: Filtros;
}

const Productos: React.FC<Props> = (props) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavoritesContext();

    useEffect(() => {
        handleGet();
    }, []);

    const handleGet = async () => {
        try {
            const response = await api.get<Producto[]>('Producto/Get_Productos', { accion: 2 });
            if (response.data.length > 0) {
                setProductos(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filtrarProductos = (productos: Producto[]) => {
        const filtrados = productos.filter(producto => {
            const { categoria, nuevo, enOferta } = props.filtros;
            const cumpleCategoria = categoria ? producto.categorias.includes(categoria) : true;
            const cumpleNuevo = nuevo !== undefined && nuevo !== false ? producto.nuevo === nuevo : true;
            const cumpleEnOferta = enOferta !== undefined && enOferta !== false ? producto.aplicaDescuento === enOferta : true;
            return cumpleCategoria && cumpleNuevo && cumpleEnOferta;
        });

        // Ordenar productos (por ejemplo, de mayor a menor ID)
        return filtrados.sort((a, b) => b.id - a.id); 
    };

    const productosFiltrados = filtrarProductos(productos);


    const handleToggleFavorite = (idProducto: number) => {
        if (isFavorite(idProducto)) {
            removeFromFavorites(idProducto);
        } else {
            addToFavorites(idProducto);
        }
    };

    return (
        <div className='Productos'>
            <h1>{props.titulo}</h1>
            <p>{props.descripcion}</p>
            <div className='Productos_Content'>
                {productosFiltrados && productosFiltrados.map((producto, index) => (
                    <div className='Productos_Card' key={index}>
                        <Link to={`/Producto/${producto.id}/${encodeURIComponent(producto.nombre.toLowerCase().replace(/ /g, '-'))}`}>
                            <div className='Productos_Card--img'>
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
                        <a href=""></a>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                                <h3>{producto.nombre}</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>{producto.categorias}</h5>
                                <Tooltip title={isFavorite(producto.id) ? 'Eliminar de lista de deseos' : 'Añadir a la lista de deseos'} placement="top" disableInteractive >
                                    <IonIcon
                                        className={`icono ${isFavorite(producto.id) ? 'favorite' : ''}`}
                                        icon={isFavorite(producto.id) ? heartSharp : heartOutline}
                                        onClick={() => handleToggleFavorite(producto.id)}
                                    />
                                </Tooltip>
                                {/* <IonIcon className='icono' icon={heartOutline} onClick={() => handleAddFavoritos(producto.id)} /> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;
