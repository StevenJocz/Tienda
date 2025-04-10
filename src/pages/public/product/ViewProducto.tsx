import { useEffect, useState } from 'react';
import { Nav } from '../../../components/nav'
import './ViewProducto.css'
import Rating from '@mui/material/Rating';
import { Alert, Snackbar, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { alarmOutline, addOutline, removeOutline, heartOutline, logoFacebook, logoInstagram, logoWhatsapp, heartSharp } from 'ionicons/icons';
import { ConteoRegresivo } from '../../../utilities';
import { Guia } from '../../../components/giuaTallas';
import { Productos } from '../../../components/productos';
import { useCartContext } from '../../../context/CartContext';
import ShoppingCart from '../../../components/cart/shoppingCart/ShoppingCart';
import { ImagenData, Talla, viewProducto } from '../../../models/Productos';
import { api } from '../../../services';
import { useParams } from 'react-router-dom';
import { services } from '../../../models';
import { BorderLinearProgress } from '../../../utilities/SelectProps';
import { useFavoritesContext } from '../../../context/Favoritos';
import Comentarios from '../../../components/comentarios/Comentarios';
import { Footer } from '../../../components/footer';
import { calcularPrecioFinal } from '../../../utilities/CalcularPrecioFinal';


const ViewProducto = () => {
    const { addToCart, getLastSavedId, getCartItemQuantity } = useCartContext();
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavoritesContext();
    const [shoppingCart, setShoppingCart] = useState(false);
    const [menu, setMenu] = useState(1);
    const [guia, setGuia] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [calificacion, setCalificacion] = useState(0);
    const [cantidadComentarios, setCantidadComentarios] = useState<number | null>(null);

    const { idProducto: idProductoFromParams } = useParams<{ idProducto: string | undefined }>();
    const idProducto = idProductoFromParams ?? '';
    const [producto, setProducto] = useState<viewProducto[]>([]);

    const [imagenSeleccionada, setImagenSeleccionada] = useState<ImagenData>();
    const [tallaSeleccionada, setTallaSeleccionada] = useState<Talla>();
    const [precio, setPrecio] = useState(0);
    const [precioFinal, setPrecioFinal] = useState(0);
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
    const [mensajeAddProducto, setMensajeAddProducto] = useState<string | void>('');

    const handleToggleFavorite = (idProducto: number) => {
        if (isFavorite(idProducto)) {
            removeFromFavorites(idProducto);
        } else {
            addToFavorites(idProducto);
        }
    };

    useEffect(() => {
        const mainContainer = document.getElementById('Home_main_Pruduct');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
        if (!isNaN(parseInt(idProducto))) {
            hadleGetId(parseInt(idProducto));
            setCantidadSeleccionada(1);
        }
    }, [idProducto]);

    const hadleGetId = async (idProducto: number) => {
        const response = await api.get<viewProducto[]>('Producto/Get_Id_Producto', { idProducto: idProducto });
        if (response.data) {
            await setProducto(response.data); 
            
        }

        setProducto(prevProducto => {
            const cantidadEnCarrito = getCartItemQuantity(idProducto);
            const nuevoStock = prevProducto[0].stock - cantidadEnCarrito;

            return [
                {
                    ...prevProducto[0],
                    stock: nuevoStock < 0 ? 0 : nuevoStock
                }
            ];
        });

    }

    const handleSelectCantidad = (accion: number) => {
        let cantidad = cantidadSeleccionada;

        if (accion == 1) {
            if (producto[0].stock) {
                if (cantidad < producto[0].stock) {
                    cantidad = cantidad + 1
                }
            }
        } else {
            if (cantidad != 0) {
                cantidad = cantidad - 1
            }
        }
        setCantidadSeleccionada(cantidad);
    };

    const handleSelectImage = (index: number) => {
        const imagen = producto[0].imagenes[index];
        setImagenSeleccionada(imagen);
    }

    const handleSelectTalla = (index: number) => {
        const talla = producto[0].tallas[index];
        setTallaSeleccionada(talla);
    }

    useEffect(() => {
        if (producto.length > 0) {
            haddleAplicarPrecios();
            handleSelectImage(0);
            handleSelectTalla(0);
        }
    }, [producto]);

    useEffect(() => {
        if (imagenSeleccionada && tallaSeleccionada && producto.length > 0) {
            haddleAplicarPrecios();
        }
    }, [imagenSeleccionada, tallaSeleccionada, producto]);

    const haddleAplicarPrecios = () => {
        const { precioConDescuento, precioFinalSinDescuento } = calcularPrecioFinal(producto[0], imagenSeleccionada, tallaSeleccionada);

        setPrecioFinal(precioFinalSinDescuento);
        setPrecio(precioConDescuento);
    }


    const haddleAddCart = () => {
        const id = getLastSavedId();

        const nuevoStock = producto[0].stock - cantidadSeleccionada;
        setProducto(prevProducto => [
            {
                ...prevProducto[0],
                stock: nuevoStock < 0 ? 0 : nuevoStock
            }
        ]);


        const mensaje = addToCart({
            id: id + 1,
            idProducto: parseInt(idProducto),
            idInventario: producto[0].idInventario,
            cantidad: cantidadSeleccionada,
            valor: precio,
            nombre: producto[0].nombre,
            src: imagenSeleccionada?.imagen || '',
            color: imagenSeleccionada?.color || '',
            nombreColor: imagenSeleccionada?.nombreColor || '',
            talla: tallaSeleccionada?.nombre || '',
            iva: producto[0].iva
        });

        setMensajeAddProducto(mensaje);
        setShoppingCart(true);
        setOpenSnackbar(true);

    }

    useEffect(() => {
        if (producto.length > 0) {
            const cantidadEnCarrito = getCartItemQuantity(producto[0].id);
            const nuevoStock = producto[0].stock - cantidadEnCarrito;
    
            setProducto(prevProducto => [
                {
                    ...prevProducto[0],
                    stock: nuevoStock < 0 ? 0 : nuevoStock
                }
            ]);
        }
    }, [idProducto]);

    const handleMenu = (opcion: number) => {
        setMenu(opcion);
    };

    const handleGuia = () => {
        setGuia(!guia);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCalificacion = (promedio: number) => {
        setCalificacion(promedio);
    };

    const handleCantidadComentarios = (valor: number) => {
        setCantidadComentarios(valor);
    };

    return (
        producto.map((producto, index) => (
            <div className='Home' key={index}>
                <div className='Home_nav'>
                    <Nav />
                </div>

                <div className='Home_main' id='Home_main_Pruduct'>
                    <div className='Producto_main' id='Producto_main'>
                        <div className='Producto_main--imagenes'>
                            <div className='Imagenes_Menu'>
                                {producto.imagenes.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${services.url}/${img.imagen}`}
                                        alt={img.nombreImagen}
                                        onClick={() => handleSelectImage(index)}
                                        style={{ opacity: imagenSeleccionada?.id === img.id ? 1 : 0.4 }}
                                    />
                                ))}
                            </div>
                            <div className={`Imagen_Vista`}>
                                <img src={`${services.url}/${imagenSeleccionada?.imagen}`} alt="" />
                            </div>
                        </div>
                        <div className='Producto_main--info'>
                            <div className="Producto_main--info-Header">
                                <h2>{producto.nombre}</h2>
                                <div>
                                    <h4>
                                        ${precio.toLocaleString()}
                                        {producto.descuento > 0
                                            && new Date(producto.fechaFinDescuento).getTime() - new Date().getTime() > 0
                                            &&
                                            <>
                                                <span>${precioFinal.toLocaleString()} </span>
                                                <span className='DescuentoVista'>Descuento del {producto.descuento}%</span>
                                            </>

                                        }
                                    </h4>
                                    <p>{producto.stock == 0 ? "" : "En stock"}</p>
                                </div>
                                <p className='Producto_main--info-Header_iva'>*IVA incluido</p>
                            </div>
                            <div className='Producto_main--info-descripcion'>
                                <div className='Producto_main--info-descripcion-extrellas'>
                                    <Rating name="half-rating-read"
                                        max={5}
                                        readOnly
                                        precision={0.5}
                                        value={calificacion} />
                                    <p>({cantidadComentarios} Comentarios)</p>
                                </div>
                                <p>{producto.descripcion}</p>
                                <h4>¡APURARTE! SOLO QUEDAN <span>{producto.stock}</span> EN STOCK.</h4>
                                <BorderLinearProgress variant="determinate" value={producto.stock} />
                            </div>
                            {producto.descuento > 0 && new Date(producto.fechaFinDescuento).getTime() - new Date().getTime() > 0 &&
                                <div className='Producto_main--info-oferta'>
                                    <p><IonIcon className='icono' icon={alarmOutline} />¡Apúrate! La oferta del {producto.descuento}% de descuento termina en</p>
                                    <ConteoRegresivo targetDate={new Date(producto.fechaFinDescuento)} />
                                </div>
                            }
                            <div className='Producto_main--info-Colores'>
                                <h4>Color: <span>{imagenSeleccionada?.nombreColor}</span></h4>
                                <div className='Colores--Contenedor'>
                                    {producto.imagenes.filter((colorItem, index) => {
                                        // Filtra solo los elementos con colores diferentes a los ya seleccionados
                                        return producto.imagenes.findIndex((item) => item.color === colorItem.color) === index;
                                    }).map((colores, index) => (
                                        <Tooltip title={colores.nombreColor} placement="top" disableInteractive key={index}>
                                            <div
                                                className={`Colores--Contenedor-item ${colores.id == imagenSeleccionada?.id ? 'item-borde' : ''}`}
                                                onClick={() => handleSelectImage(index)}
                                            >
                                                <div
                                                    className='Colores--Contenedor-item-content'
                                                    style={{ backgroundColor: colores.color }}
                                                >
                                                </div>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>

                            </div>
                            {producto.tallas.length > 0 &&
                                <div className='Producto_main--info-Colores'>
                                    <h4>Talla: <span>{tallaSeleccionada?.nombre}</span></h4>
                                    <div className='Talla--Contenedor'>
                                        {producto.tallas.map((talla, index) => (
                                            <div
                                                className={`Talla--Contenedor-item ${talla.id === tallaSeleccionada?.id ? 'Talla--Seleccionada' : ''}`}
                                                key={index}
                                                onClick={() => handleSelectTalla(index)}
                                            >
                                                <p>{talla.nombre}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <div className='Producto_main--acciones'>
                                <div className='Producto_main--acciones-Cantidad'>
                                    <IonIcon className='icono' icon={removeOutline} onClick={() => handleSelectCantidad(0)} />
                                    <h4>{cantidadSeleccionada}</h4>
                                    <IonIcon className='icono' icon={addOutline} onClick={() => handleSelectCantidad(1)} />
                                </div>
                                <Tooltip title={isFavorite(producto.id) ? 'Eliminar de lista de deseos' : 'Añadir a la lista de deseos'} placement="top" disableInteractive >
                                    <div className='Producto_main--acciones-addDeseos'>
                                        <IonIcon
                                            className={`icono ${isFavorite(producto.id) ? 'favorite' : ''}`}
                                            icon={isFavorite(producto.id) ? heartSharp : heartOutline}
                                            onClick={() => handleToggleFavorite(producto.id)}
                                        />
                                    </div>
                                </Tooltip>
                            </div>

                            {producto.stock > 0 &&
                                <div className='Producto_main--Compra' onClick={haddleAddCart}>
                                    <span>Añadir al carrito </span>
                                </div>
                            }
                            <div className='Producto_main--menu'>
                                <ul>
                                    <li onClick={handleGuia}>Guía de tallas</li>
                                    <li>Hacer una pregunta</li>
                                </ul>
                            </div>
                            <div className='Producto_main--Compartir'>
                                <Tooltip title='Compartir en Facebook' placement="top" disableInteractive >
                                    <IonIcon className="icono" icon={logoFacebook} />
                                </Tooltip>
                                <Tooltip title='Compartir en Instagram' placement="top" disableInteractive >
                                    <IonIcon className="icono" icon={logoInstagram} />
                                </Tooltip>
                                <Tooltip title='Compartir en Whatsapp' placement="top" disableInteractive >
                                    <IonIcon className="icono" icon={logoWhatsapp} />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className='Producto_Descripcion'>
                        <div className='Producto_Descripcion--menu'>
                            <ul>
                                <li onClick={() => handleMenu(1)}>Calificaciones y reseñas</li>
                                <li onClick={() => handleMenu(2)}>Descripción</li>

                            </ul>
                        </div>
                        {menu == 1 ? (
                            <div className='Producto_Descripcion-info'>
                                <Comentarios
                                    idProducto={parseInt(idProducto)}
                                    calificacion={handleCalificacion}
                                    cantidad={handleCantidadComentarios}
                                />
                            </div>
                        ) : (

                            <div className='Producto_Descripcion-info'>
                                <div className='Producto_Descripcion-info_text' dangerouslySetInnerHTML={{ __html: producto.informacion }} />
                            </div>
                        )}
                    </div>
                    {guia && <Guia onClose={() => setGuia(false)} />}
                    <Productos
                        titulo="Productos más vendidos"
                        descripcion="Explora nuestros favoritos: los productos más populares de la temporada."
                        filtros={{ categoria: '' }}
                    />
                    <Footer />
                </div>
                {shoppingCart && <ShoppingCart onClose={() => setShoppingCart(false)} />}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1500}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        <p>{typeof mensajeAddProducto === 'string' && (<span>{mensajeAddProducto}</span>)}</p>

                    </Alert>
                </Snackbar>
            </div>
        ))

    )
}

export default ViewProducto
