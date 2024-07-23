import { useEffect, useState } from 'react'
import { Nav } from '../../../components/nav'
import './Checkout.css'
import { useCartContext } from '../../../context/CartContext';
import { services, Ubicacion } from '../../../models';
import { MenuItem, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { addOutline, removeOutline, trashOutline, rocketOutline, locationOutline, homeOutline } from "ionicons/icons";
import carro from '../../../assets/img/camion.png'
import { api } from '../../../services';
import { StyledTextField } from '../../../utilities/SelectProps';


const Checkout = () => {
    const [paso, setPaso] = useState(1);
    const [pasoEnvio, setPasoEnvio] = useState(1);
    const [cambiarDireccion, setCambiarDireccion] = useState(false);
    const { cartItems, removeFromCart, getTotalCartValue, updateCartItemQuantity } = useCartContext();
    const [departamento, setDepartamento] = useState<Ubicacion[]>();
    const [municipio, setMunicipio] = useState<Ubicacion[]>();


    const handleSelectCantidad = (accion: number, id: number, Cantidad: number) => {
        if (accion == 1) {
            Cantidad = Cantidad + 1;
        } else {
            if (Cantidad > 1) {
                Cantidad = Cantidad - 1;
            }
        }
        updateCartItemQuantity(id, Cantidad);
    };

    const calcularPorcentaje = () => {
        const valorMinimoEnvio = 100000;
        const totalCarrito = getTotalCartValue();
        const porcentajeDecimal = (totalCarrito / valorMinimoEnvio) * 100;
        const porcentajeEntero = Math.floor(porcentajeDecimal);
        return porcentajeEntero > 100 ? 100 : porcentajeEntero;
    };

    const haddleMensaje = () => {
        const valorMinimoEnvio = 100000;
        const diferencia = valorMinimoEnvio - getTotalCartValue();
        if (calcularPorcentaje() === 100) {
            return (<p><span>¡Felicidades!</span> ¡Tienes envío gratis!</p>);
        } else {
            return (
                <p>
                    ¡Ya casi está, agregue
                    <span style={{ color: calcularColor() }}>
                        ${diferencia.toLocaleString()}
                    </span>
                    más para obtener <strong>ENVÍO GRATIS</strong>!
                </p>
            );
        }
    }

    useEffect(() => {
        hadleGetUbicacion(2, 0);

    }, []);

    const hadleGetUbicacion = async (accion: number, parametro: number) => {
        const response = await api.get<Ubicacion[]>('Generales/Get_Ubicacion', { Accion: accion, parametro: parametro });
        if (response.data) {
            if (accion == 2) {
                await setDepartamento(response.data);
            } else {
                await setMunicipio(response.data);
            }
        };
    }

    const calcularColor = () => {
        const porcentaje = calcularPorcentaje();
        if (porcentaje < 30) {
            return '#b59677';
        } else if (porcentaje >= 30 && porcentaje < 100) {
            return '#23b2c7';
        } else {
            return 'green';
        }
    };

    return (
        <div className='Home'>
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main main' id='Home_main_Pruduct'>
                <div className='Checkout'>
                    <div className='Checkout_Menu'>
                        <p className='Checkout_Menu_p'>ENVÍO GRATIS DESDE $100.000 | Aplican TyC</p>
                        <ul>
                            <li
                                className={paso == 1 ? 'Activo' : ''}
                                onClick={() => setPaso(1)}
                            >
                                Resumen de Compra
                            </li>
                            <li
                                className={paso == 2 ? 'Activo' : ''}
                                onClick={() => setPaso(2)}
                            >
                                Tu información
                            </li>
                            <li
                                className={paso == 3 ? 'Activo' : ''}
                                onClick={() => setPaso(3)}
                            >
                                Método de entrega
                            </li>
                            <li
                                className={paso == 4 ? 'Activo' : ''}
                                onClick={() => setPaso(4)}
                            >
                                Método de pago
                            </li>
                        </ul>
                        <div className='Checkout_Content'>
                            <div className="Checkout_Content_Informacion">
                                {paso == 1 &&
                                    <div className='Checkout_Carrito'>
                                        <h2> TU CARRITO</h2>
                                        <div className='Checkout_Carrito_Content'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th> Producto</th>
                                                        <th> Precio unidad</th>
                                                        <th> Cantidad</th>
                                                        <th> Total</th>
                                                        <th> Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((producto, index) => (
                                                        <tr key={index} >
                                                            <td className='tdImagenes'><img src={`${services.url}/${producto.src}`} alt="" /><p>{producto.nombre}</p></td>
                                                            <td>${producto.valor.toLocaleString()}</td>
                                                            <td><div className='ShoppingCart_Producto--Content--Info-Cantidad'>
                                                                {producto.cantidad == 1 ? (
                                                                    <Tooltip title='Remover producto' placement="top" disableInteractive >
                                                                        <IonIcon className='iconoRemove' icon={trashOutline} onClick={() => removeFromCart(producto.id)} />
                                                                    </Tooltip>
                                                                ) : (
                                                                    <IonIcon className='icono' icon={removeOutline} onClick={() => handleSelectCantidad(0, producto.id, producto.cantidad)} />
                                                                )}
                                                                <p>{producto.cantidad}</p>
                                                                <IonIcon className='icono' icon={addOutline} onClick={() => handleSelectCantidad(1, producto.id, producto.cantidad)} />
                                                            </div></td>
                                                            <td>${(producto.valor * producto.cantidad).toLocaleString()}</td>
                                                            <td>
                                                                <Tooltip title='Remover producto' placement="top" disableInteractive >
                                                                    <IonIcon className='iconoRemove' icon={trashOutline} onClick={() => removeFromCart(producto.id)} />
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                                {paso == 2 &&
                                    <div className='Checkout_Info'>
                                        <div>
                                            <h2>DATOS PERSONALES</h2>
                                            <p>Solicitamos únicamente la información esencial para la finalización de la compra.</p>
                                            <p className='Checkout_Info_p'><span>Correo:</span> desarrollador7.sion@unac.edu.co </p>
                                            <p className='Checkout_Info_p'><span>Nombre:</span> hamilton Espinal</p>
                                            <p className='Checkout_Info_p'><span>Teléfono / Móvil:</span> 304 346 1586</p>
                                        </div>
                                        <button>No soy yo, cerrar sesión</button>
                                    </div>
                                }
                                {paso == 3 &&
                                    <div className='Checkout_Envio'>
                                        <h2> ENVÍO</h2>
                                        <p>Por favor, selecciona la opción que consideres más adecuada.</p>
                                        <ul>
                                            <li className={pasoEnvio == 1 ? 'Activo' : ''}
                                                onClick={() => setPasoEnvio(1)}
                                            >
                                                <img src={carro} alt="" />
                                                Enviar a la dirección
                                            </li>
                                            <li className={pasoEnvio == 2 ? 'Activo' : ''}
                                                onClick={() => setPasoEnvio(2)}
                                            >
                                                <IonIcon className='iconoRemove' icon={locationOutline} />
                                                Recoger en el campus
                                            </li>
                                        </ul>
                                        {pasoEnvio == 1 &&
                                            <div className='Checkout_Envio_Direccion'>
                                                <div className='Checkout_Envio_Direccion_Usuario'>
                                                    <p><span>Dirección de entrega: </span>Medellín - Antioquia - Cra 52a # 99 - 52</p>
                                                    <button onClick={() => setCambiarDireccion(true)}><IonIcon className='icono' icon={homeOutline} /> Cambiar dirección</button>
                                                </div>
                                                {cambiarDireccion &&
                                                    <>
                                                        <div className='Checkout_Envio_Direccion_Ubicacion'>
                                                            <StyledTextField
                                                                id="outlined-select-currency"
                                                                select
                                                                label="Departamento"
                                                                size="small"
                                                                variant="outlined"
                                                                onChange={(e) => {

                                                                    hadleGetUbicacion(3, parseInt(e.target.value))
                                                                }}
                                                            >
                                                                {departamento && departamento.map((option) => (
                                                                    <MenuItem key={option.id} value={option.id}>
                                                                        {option.nombre}
                                                                    </MenuItem>
                                                                ))}
                                                            </StyledTextField>
                                                            <StyledTextField
                                                                id="outlined-select-currency"
                                                                select
                                                                label="Ciudad"
                                                                size="small"
                                                                variant="outlined"
                                                                onChange={(e) => {

                                                                    hadleGetUbicacion(3, parseInt(e.target.value))
                                                                }}
                                                            >
                                                                {municipio && municipio.map((option) => (
                                                                    <MenuItem key={option.id} value={option.id}>
                                                                        {option.nombre}
                                                                    </MenuItem>
                                                                ))}
                                                            </StyledTextField>
                                                        </div>
                                                        <div className='Checkout_Envio_Direccion_Ubicacion'>
                                                            <StyledTextField
                                                                id="outlined-select-currency"
                                                                select
                                                                label="Tipo de vía"
                                                                size="small"
                                                                variant="outlined"
                                                                onChange={(e) => {

                                                                    hadleGetUbicacion(3, parseInt(e.target.value))
                                                                }}
                                                            >
                                                                {municipio && municipio.map((option) => (
                                                                    <MenuItem key={option.id} value={option.id}>
                                                                        {option.nombre}
                                                                    </MenuItem>
                                                                ))}
                                                            </StyledTextField>
                                                            <StyledTextField
                                                                name='Numero1'
                                                                variant="outlined"
                                                                size="small"
                                                                placeholder='Ej: 32C'
                                                                onChange={(e) => e.target.value}
                                                            />
                                                            <h5>#</h5>
                                                            <StyledTextField
                                                                name='Numero2'
                                                                variant="outlined"
                                                                size="small"
                                                                placeholder='45'
                                                                onChange={(e) => e.target.value}
                                                            />
                                                            <h5>-</h5>
                                                            <StyledTextField
                                                                name='Numero2'
                                                                variant="outlined"
                                                                size="small"
                                                                placeholder='116'
                                                                onChange={(e) => e.target.value}
                                                            />
                                                        </div>
                                                    </>
                                                }

                                                <div>

                                                </div>
                                            </div>
                                        }
                                        {pasoEnvio == 2 &&
                                            <div className='Checkout_Envio_Recoger'>

                                            </div>
                                        }
                                    </div>
                                }
                                {paso == 4 &&
                                    <div>
                                        <h2>Pago</h2>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="Checkout_Content_Resumen">
                        <div>
                            <div className='ShoppingCart_Content--body--indicador'>
                                {haddleMensaje()}
                                <div className='indicador'>
                                    <div style={{ width: `${calcularPorcentaje()}%`, backgroundColor: calcularColor() }}></div>
                                    <IonIcon className="icono" icon={rocketOutline}
                                        style={{ color: calcularColor() }}
                                    />
                                </div>
                            </div>
                            <h2>Resumen de la compra</h2>
                            <h3>subtotal: ${getTotalCartValue().toLocaleString()}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout