import { useEffect, useState } from 'react';
import { Nav } from '../../../components/nav'
import './ViewProducto.css'
import Rating from '@mui/material/Rating';
import { Alert, LinearProgress, Snackbar, Tooltip, linearProgressClasses, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { alarmOutline, addOutline, removeOutline, heartOutline, logoFacebook, logoInstagram, logoWhatsapp } from 'ionicons/icons';
import { ConteoRegresivo } from '../../../utilities';
import { Guia } from '../../../components/giuaTallas';
import { Productos } from '../../../components/productos';
import { useCartContext } from '../../../context/CartContext';
import ShoppingCart from '../../../components/cart/shoppingCart/ShoppingCart';


const ViewProducto = () => {
    const { addToCart, getLastSavedId } = useCartContext();
    const [aplicaDescuento, setAplicaDescuento] = useState(false);
    const [imagen, setImagen] = useState('');
    const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(null);
    const [color, setColor] = useState('');
    const [tallaSeleccionada, setTallaSeleccionada] = useState('');
    const [precio, setPrecio] = useState(0);
    const [precioFinal, setPrecioFinal] = useState(0);
    const [nombre] = useState('Cable del controlador de la consola de juegos');
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
    const [menu, setMenu] = useState(1);
    const [guia, setGuia] = useState(false);
    const idProducto = location.pathname.split("/")[2];
    const [mensajeTalla, setMensajeTalla] = useState('');
    const [mensajeCantidad, setMensajeCantidad] = useState('');
    const [mensajeAddProducto, setMensajeAddProducto] = useState<string | void>('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [shoppingCart, setShoppingCart] = useState(false);
    const [fechaDescuento] = useState('2024-06-11T19:21:59');

    const handleSelectImage = (url: string, index: number, color: string) => {
        setImagen(url);
        setImagenSeleccionada(index);
        setColor(color);
        handleCalcularPrecio();
    };

    const handleSelectTalla = (talla: string) => {
        setTallaSeleccionada(talla);
        handleCalcularPrecio();
    };

    const handleMenu = (opcion: number) => {
        setMenu(opcion);
    };

    const handleGuia = () => {
        setGuia(!guia);
    };

    const handleSelectCantidad = (accion: number) => {
        let cantidad = cantidadSeleccionada;

        if (accion == 1) {
            cantidad = cantidad + 1
        } else {
            if (cantidad != 0) {
                cantidad = cantidad - 1
            }
        }
        setCantidadSeleccionada(cantidad);
    };

    const targetDate = new Date(fechaDescuento);

    const BorderLinearProgress = styled(LinearProgress)(({ theme, value = 0 }) => ({
        height: 12,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: getColor(value, theme.palette.mode === 'light'),
        },
    }));

    const getColor = (value: number, isLightMode: boolean) => {
        if (value <= 10) {
            return isLightMode ? '#f76b6a' : '#ff9999';
        } else if (value <= 50) {
            return isLightMode ? '#ffcc00' : '#ffeb3b';
        } else {
            return isLightMode ? '#08ac80' : '#0be5ab';
        }
    };

    const data = [
        {
            "id": 1,
            "nombre": "Imagen 1",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true",
            "color": "#ff0000",
            "nombreColor": "Rojo",
            "valorPorcentaje": "10",
        },
        {
            "id": 2,
            "nombre": "Imagen 2",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2266246-800-auto?v=638279851734600000&width=800&height=auto&aspect=true",
            "color": "#00ff00",
            "nombreColor": "Verde",
            "valorPorcentaje": "20",
        },
        {
            "id": 3,
            "nombre": "Imagen 3",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414989-500-auto?v=638496788126130000&width=500&height=auto&aspect=true",
            "color": "#0000ff",
            "nombreColor": "Azul",
            "valorPorcentaje": "10",
        },
        {
            "id": 4,
            "nombre": "Imagen 4",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2416881-800-auto?v=638497717634200000&width=800&height=auto&aspect=true",
            "color": "#ffff00",
            "nombreColor": "Amarillo",
            "valorPorcentaje": "10",
        },
        {
            "id": 5,
            "nombre": "Imagen 1",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true",
            "color": "#ff0000",
            "nombreColor": "Rojo",
            "valorPorcentaje": "10",
        },
        {
            "id": 6,
            "nombre": "Imagen 2",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2266246-800-auto?v=638279851734600000&width=800&height=auto&aspect=true",
            "color": "#fff",
            "nombreColor": "Blanco",
            "valorPorcentaje": "10",
        },
        {
            "id": 7,
            "nombre": "Imagen 3",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414989-500-auto?v=638496788126130000&width=500&height=auto&aspect=true",
            "color": "#0000ff",
            "nombreColor": "Azul",
            "valorPorcentaje": "20",
        },
        {
            "id": 8,
            "nombre": "Imagen 4",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2416881-800-auto?v=638497717634200000&width=800&height=auto&aspect=true",
            "color": "#ffff00",
            "nombreColor": "Amarillo",
            "valorPorcentaje": "10",
        }
    ]

    const talla = [
        {
            "id": 1,
            "nombre": "XS",
            "valorPorcentaje": "10",
        },
        {
            "id": 2,
            "nombre": "S",
            "valorPorcentaje": "15",
        },
        {
            "id": 3,
            "nombre": "M",
            "valorPorcentaje": "20",
        },
        {
            "id": 4,
            "nombre": "L",
            "valorPorcentaje": "1",
        },
        {
            "id": 5,
            "nombre": "XL",
            "valorPorcentaje": "2",
        }

    ]

    useEffect(() => {
        if (data !== null && data.length >= 0) {
            setImagen(data[0].src);
            setImagenSeleccionada(data[0].id);
            setColor(data[0].nombreColor);
        }
    }, []);

    useEffect(() => {
        handleCalcularPrecio();
    }, [imagenSeleccionada, tallaSeleccionada]);

    const haddleAddCart = () => {

        if (tallaSeleccionada == '' || cantidadSeleccionada == 0) {
            if (tallaSeleccionada == '') {
                setMensajeTalla('Seleccione una opción');
            }
            if (cantidadSeleccionada == 0) {
                setMensajeCantidad('Agregue la cantidad');
            }

        } else {
            setMensajeTalla('');
            setMensajeCantidad('');
            const id = getLastSavedId();
            const mensaje = addToCart({
                id: id + 1,
                idProducto: parseInt(idProducto),
                cantidad: cantidadSeleccionada,
                valor: precio,
                nombre: nombre,
                src: imagen,
                color: color,
                nombreColor: color,
                talla: tallaSeleccionada
            });

            setMensajeAddProducto(mensaje);
            setShoppingCart(true)
            setOpenSnackbar(true);
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCalcularPrecio = () => {
        // Definir el precio base y el porcentaje de descuento
        let precioBase = 20000;
        let descuento = 20;

        // Obtener la fecha y hora actuales
        const fechaActual = new Date();

        // Definir la fecha y hora límite para el descuento (por ejemplo, el 31 de diciembre de 2024 a las 23:59:59)
        const fechaLimite = new Date(fechaDescuento);
        // Verificar si la fecha actual está antes de la fecha límite para aplicar el descuento
        if (fechaActual <= fechaLimite) {
            descuento = descuento;
            setAplicaDescuento(true);
        } else {
            descuento = 0
            setAplicaDescuento(false);
        }

        // Obtener el porcentaje de color y talla seleccionados
        const colorSeleccionado = data.find(item => item.id === imagenSeleccionada);
        const porcentajeColor = colorSeleccionado ? parseInt(colorSeleccionado.valorPorcentaje) : 0;
        const porcentajeTalla = talla.find(item => item.nombre === tallaSeleccionada);
        const porcentajeTallaValue = porcentajeTalla ? parseInt(porcentajeTalla.valorPorcentaje) : 0;

        // Calcular el precio final sin descuento
        const precioFinalSinDescuento = precioBase * (1 + (porcentajeColor + porcentajeTallaValue) / 100);

        // Calcular el precio final con descuento
        const precioConDescuento = precioFinalSinDescuento * (1 - descuento / 100);

        // Establecer los precios en el estado
        setPrecioFinal(precioFinalSinDescuento);
        setPrecio(precioConDescuento);
    };



    return (
        <div className='Home'>
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main' id='Home_main_Pruduct'>
                <div className='Producto_main' id='Producto_main'>
                    <div className='Producto_main--imagenes'>
                        <div className='Imagenes_Menu'>
                            {data.map((imagen, index) => (
                                <img
                                    key={index}
                                    src={imagen.src}
                                    alt={imagen.nombre}
                                    onClick={() => handleSelectImage(imagen.src, imagen.id, imagen.nombreColor)}
                                    style={{ opacity: imagenSeleccionada === imagen.id ? 1 : 0.4 }}
                                />
                            ))}
                        </div>
                        <div className={`Imagen_Vista`}>
                            <img src={imagen} alt="" />
                        </div>
                    </div>
                    <div className='Producto_main--info'>
                        <div className="Producto_main--info-Header">
                            <h2>Cable del controlador de la consola de juegos</h2>
                            <div>
                                <h4>${precio.toLocaleString()}{aplicaDescuento && <span>${precioFinal.toLocaleString()}</span>}</h4>
                                <p>En stock</p>
                            </div>
                        </div>
                        <div className='Producto_main--info-descripcion'>
                            <div className='Producto_main--info-descripcion-extrellas'>
                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                <p>(11 Comentarios)</p>
                            </div>
                            <p>Un par de pantalones cortos tejidos en sarga con bolsillos delanteros inclinados, bolsillos traseros abotonados, bolsillo con cremallera, cintura abotonada y trabilla para llavero.</p>
                            <h4>¡APURARTE! SOLO QUEDAN <span>16</span> EN STOCK.</h4>
                            <BorderLinearProgress variant="determinate" value={10} />
                        </div>
                        {aplicaDescuento &&
                            <div className='Producto_main--info-oferta'>
                                <p><IonIcon className='icono' icon={alarmOutline} />¡Apúrate! La oferta termina en</p>
                                <ConteoRegresivo targetDate={targetDate} />
                            </div>
                        }

                        <div className='Producto_main--info-Colores'>
                            <h4>Color: <span>{color}</span></h4>
                            <div className='Colores--Contenedor'>
                                {data.filter((colorItem, index) => {
                                    // Filtra solo los elementos con colores diferentes a los ya seleccionados
                                    return data.findIndex((item) => item.color === colorItem.color) === index;
                                }).map((colores, index) => (
                                    <Tooltip title={colores.nombreColor} placement="top" disableInteractive key={index}>
                                        <div
                                            className={`Colores--Contenedor-item ${colores.nombreColor == color ? 'item-borde' : ''}`}
                                            onClick={() => handleSelectImage(colores.src, colores.id, colores.nombreColor)}
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
                        <div className='Producto_main--info-Colores'>
                            <h4>Talla: <span className={mensajeTalla != '' && tallaSeleccionada == '' ? "Producto_main--info-Colores--spanRojo" : ""}>{tallaSeleccionada || mensajeTalla}</span></h4>
                            <div className='Talla--Contenedor'>
                                {talla.map((talla, index) => (
                                    <div
                                        className={`Talla--Contenedor-item ${talla.nombre === tallaSeleccionada ? 'Talla--Seleccionada' : ''}`}
                                        key={index}
                                        onClick={() => handleSelectTalla(talla.nombre)}
                                    >
                                        <p>{talla.nombre}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='Producto_main--acciones'>
                            <div className='Producto_main--acciones-Cantidad'>
                                <IonIcon className='icono' icon={removeOutline} onClick={() => handleSelectCantidad(0)} />
                                <h4>{cantidadSeleccionada}</h4>
                                <IonIcon className='icono' icon={addOutline} onClick={() => handleSelectCantidad(1)} />
                            </div>
                            {/* <div className='Producto_main--acciones-add' >
                                <span>Añadir al carrito </span>
                            </div> */}
                            <Tooltip title='Añadir a la lista de deseos' placement="top" disableInteractive >
                                <div className='Producto_main--acciones-addDeseos'>
                                    <IonIcon className='icono' icon={heartOutline} />
                                </div>
                            </Tooltip>
                        </div>
                        <p> <span className={mensajeCantidad != '' ? "Producto_main--info-Colores--spanRojo" : ""}>{mensajeCantidad}</span></p>
                        <div className='Producto_main--Compra' onClick={haddleAddCart} >
                            <span>Añadir al carrito </span>
                        </div>
                        <div className='Producto_main--menu'>
                            <ul>
                                <li onClick={handleGuia}>Guía de tallas</li>
                                <li>Entrega y devolución</li>
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
                            <li onClick={() => handleMenu(1)}>Descripción</li>
                            <li onClick={() => handleMenu(2)}>Comentarios</li>
                        </ul>
                    </div>
                    {menu == 1 ? (
                        <div className='Producto_Descripcion-info'>
                            <strong>AJUSTE DE COMBATE</strong>
                            <p> Apuesta por el deporte este verano con esta camiseta vintage con cuello en V a rayas azul marino y blanco de Abercrombie & Fitch. Perfecto para combinar con zapatillas vaqueras y blancas para un estilo deportivo. Se adapta a un UK 8-10, el modelo que se muestra es un UK 8 y 5'5. !!
                                La tipografía es el trabajo de tipógrafos, compositores, tipógrafos, diseñadores gráficos, directores de arte, artistas de manga, artistas de cómics, artistas de graffiti y, ahora, cualquiera que organice palabras, letras, números y símbolos para su publicación, exhibición o distribución, desde trabajadores administrativos y escritores de boletines informativos hasta cualquier persona que autopublique materiales.
                                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                            </p>
                        </div>
                    ) : (
                        <div className='Producto_Descripcion-info'>
                        </div>
                    )}
                </div>
                {guia && <Guia onClose={() => setGuia(false)} />}
                <Productos />
            </div>
            {shoppingCart && <ShoppingCart onClose={() => setShoppingCart(false)} />}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
    )
}

export default ViewProducto