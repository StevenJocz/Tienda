import { useEffect, useState } from 'react'
import './Checkout.css'
import { useCartContext } from '../../../context/CartContext';
import { services, Ubicacion } from '../../../models';
import { MenuItem, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import {
    addOutline,
    removeOutline,
    trashOutline,
    rocketOutline,
    locationOutline,
    homeOutline,
    closeOutline,
    arrowForwardOutline,
    chevronDownOutline,
    cartOutline
} from "ionicons/icons";
import carro from '../../../assets/img/camion.png'
import { api } from '../../../services';
import { StyledTextField } from '../../../utilities/SelectProps';
import { AppStore } from '../../../redux/Store';
import { useSelector } from 'react-redux';
import { Form, Formik, FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import { Pedido } from '../../../models/Pedido';
import { BotonSubmit } from '../../../components/boton';
import CompraExitosa from './CompraExitosa';


const Checkout = () => {
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paso, setPaso] = useState(1);
    const [compraExitosa, setCompraExitosa] = useState(false);
    const [pasoEnvio, setPasoEnvio] = useState(1);
    const [cambiarDireccion, setCambiarDireccion] = useState(false);
    const [aplicaCupon, setAplicaCupon] = useState(false);
    const { cartItems, removeFromCart, getTotalCartValue, updateCartItemQuantity, clearCart } = useCartContext();
    const [departamento, setDepartamento] = useState<Ubicacion[]>();
    const [municipio, setMunicipio] = useState<Ubicacion[]>();
    const [tipoVia, setTipoVia] = useState<Ubicacion[]>();
    const usuario = useSelector((store: AppStore) => store.user);

    const [departamentoDireccion, setDepartamentoDireccion] = useState('');
    const [ciudadDireccion, setCiudadDireccion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [complementario, setComplementario] = useState('');
    const [barrio, setBarrio] = useState('');
    const [destinatario, setDestinatario] = useState('');
    const [responsable, setResponsable] = useState('');
    const [valorEnvio, setValorEnvio] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorCupon, setValorCupon] = useState(0);
    const [idCupon, setIdCupon] = useState(0);
    const [cupon, setCupon] = useState('');
    const [textCupon, setTextCupon] = useState('');
    const [monto, setMonto] = useState(0);

    useEffect(() => {
        hadleGetMonto();
    }, [monto]);

    const hadleGetMonto = async () => {
        // Solicitud GET
        const response = await api.get<[any]>('Generales/Get_Monto', { IdMonto: 1 });
        setMonto(response.data[0].valorMonto)
    };

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
        const valorMinimoEnvio = monto;
        const totalCarrito = getTotalCartValue();
        const porcentajeDecimal = (totalCarrito / valorMinimoEnvio) * 100;
        const porcentajeEntero = Math.floor(porcentajeDecimal);
        return porcentajeEntero > 100 ? 100 : porcentajeEntero;
    };

    const haddleMensaje = () => {
        const valorMinimoEnvio = monto;
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCupon(event.target.value);
    };

    const handleDescuento = async () => {
        const response = await api.get<[any]>('Generales/Get_Consultar_Cupones', { cupon: cupon, idUsuario: usuario.idUsuario });
        if (response.data.length > 0) {
            const subtotal = getTotalCartValue();
            if (subtotal < response.data[0].valorCupon) {
                setTextCupon('Lo sentimos, el cupón no se puede aplicar porque supera el total de la compra')
                setValorCupon(0);
            } else {
                setValorCupon(response.data[0].valorCupon);
                setIdCupon(response.data[0].idCupon);
                setTextCupon('¡Felicidades! Tu cupón es de $' + response.data[0].valorCupon.toLocaleString())
            }
        } else {
            setValorCupon(0);
            setTextCupon('Cupón no válido')
        }
    };

    useEffect(() => {

        const precioEnvio = 2000;

        const totalporcentaje = calcularPorcentaje();
        const subtotal = getTotalCartValue();

        if (totalporcentaje == 100 || pasoEnvio == 2) {
            setValorEnvio(0);
        } else {
            setValorEnvio(precioEnvio);
        }
        const valorTotal = subtotal + valorEnvio - valorCupon;
        setValorTotal(valorTotal);

    }, [pasoEnvio, paso, valorTotal, calcularPorcentaje, valorCupon]);


    useEffect(() => {
        hadleGetUbicacion(2, 36);
        hadleGetUbicacion(4, 0);

    }, []);

    const hadleGetUbicacion = async (accion: number, parametro: number) => {
        const response = await api.get<Ubicacion[]>('Generales/Get_Ubicacion', { Accion: accion, parametro: parametro });
        if (response.data) {

            if (accion == 2) {
                await setDepartamento(response.data);
            } else if (accion == 3) {
                await setMunicipio(response.data);
            } else {
                await setTipoVia(response.data);
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

    const handleDepartamento = async (accion: number, id: number) => {
        if (accion == 1) {
            if (departamento) {
                const selectedDepartamento = departamento.find(x => x.id == id);
                if (selectedDepartamento) {
                    await setDepartamentoDireccion(selectedDepartamento.nombre);
                }
            }
        } else if (accion == 2) {
            if (municipio) {
                const selectedMunicipio = municipio.find(x => x.id == id);
                if (selectedMunicipio) {
                    await setCiudadDireccion(selectedMunicipio.nombre);
                }
            }
        }

    }

    const handleDireccion = (values: FormikValues) => {
        if (departamentoDireccion != '' || ciudadDireccion != '') {
            setDireccion(departamentoDireccion + ' - ' + ciudadDireccion + ' - ' + values.tipoVia + ' ' + values.Numero1 + ' # ' + values.Numero2 + ' - ' + values.Numero3);
        } else {
            setDireccion(usuario.direccion);
        }

        setComplementario(values.complementario);
        setBarrio(values.barrio);
        setDestinatario(values.destinatario);
        setResponsable(values.documentoresponsable + ' - ' + values.responsable);
        setPaso(4);
    };

    const handdleEnviarPedido = async () => {
        setIsLoading(true);

        try {
            const Pedido: Pedido = {
                idUsuario: usuario.idUsuario,
                subTotal: parseFloat(getTotalCartValue().toFixed(2)),
                valorEnvio: valorEnvio,
                idCupon: idCupon,
                valorDescuento: valorCupon,
                valorTotal: parseFloat(valorTotal.toFixed(2)),
                tipoEntrega: pasoEnvio == 1 ? "	Envío" : "Recogida en el campus",
                direccion: direccion,
                complemento: complementario,
                barrio: barrio,
                destinatario: destinatario,
                responsable: responsable,
                registros: cartItems.map((producto, index) => ({
                    idPedido_Registro: index + 1,
                    idPedido: 0,
                    idProducto: producto.idProducto,
                    idInventario: producto.idInventario,
                    cantidad: producto.cantidad,
                    nombre: producto.nombre,
                    color: producto.color,
                    talla: producto.talla,
                    ValorUnidad: parseFloat(producto.valor.toFixed(2))
                }
                ))
            }

            console.log(Pedido);
            const response = await api.post('Pedido/Post_Registrar_Pedido', Pedido);
            const data = response.data as { resultado: boolean; mensaje: string };

            setMsg(data.mensaje);
            setIsLoading(false);

            setTimeout(() => {
                if (data.resultado == true) {
                    setCompraExitosa(true)
                    clearCart();
                }

            }, 3000);



        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }

    }


    return (
        <>
            {cartItems.length != 0 ? (

                <div className='Home'>
                    <div className='Checkout_Menu_p'>
                        <p>ENVÍO GRATIS DESDE ${monto.toLocaleString()} | Aplican TyC</p>
                    </div>
                    <div className='Home_main main' id='Home_main_Pruduct'>
                        <div className='Checkout'>
                            <div className='Checkout_Menu'>

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
                                    >
                                        Finalizar
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
                                                <div className='Boton_Continuar'>
                                                    <button onClick={() => setPaso(2)} >Continuar  <IonIcon className='icono' icon={arrowForwardOutline} /></button>
                                                </div>
                                            </div>
                                        }
                                        {paso == 2 &&
                                            <>
                                                <div className='Checkout_Info'>
                                                    <div>
                                                        <h2>DATOS PERSONALES</h2>
                                                        <p>Solicitamos únicamente la información esencial para la finalización de la compra.</p>
                                                        <p className='Checkout_Info_p'><span>Nombre:</span> {usuario.nombre}...</p>
                                                        <p className='Checkout_Info_p'><span>Correo:</span> {usuario.correo}</p>
                                                        <p className='Checkout_Info_p'><span>Teléfono / Móvil:</span> {usuario.telefono}</p>
                                                    </div>

                                                </div>
                                                <div className='Boton_Continuar'>
                                                    <button onClick={() => setPaso(3)} >Continuar  <IonIcon className='icono' icon={arrowForwardOutline} /></button>
                                                </div>
                                            </>

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
                                                        onClick={() => {
                                                            setPasoEnvio(2);
                                                            setCambiarDireccion(false);
                                                        }}
                                                    >
                                                        <IonIcon className='iconoRemove' icon={locationOutline} />
                                                        Recoger en el campus
                                                    </li>
                                                </ul>
                                                <Formik
                                                    enableReinitialize={true}
                                                    initialValues={{
                                                        departamento: '',
                                                        ciudad: '',
                                                        tipoVia: '',
                                                        Numero1: '',
                                                        Numero2: '',
                                                        Numero3: '',
                                                        complementario: '',
                                                        barrio: '',
                                                        destinatario: '' || usuario.nombre,
                                                        responsable: '',
                                                        documentoresponsable: '',
                                                    }}
                                                    validate={(valor) => {
                                                        let errors: any = {};
                                                        if (!valor.destinatario) {
                                                            errors.destinatario = 'Campo requerido';
                                                        }
                                                        return errors;
                                                    }}
                                                    onSubmit={handleDireccion}
                                                >
                                                    {({ values, setFieldValue, isSubmitting }) => (
                                                        <Form>
                                                            <>
                                                                {pasoEnvio == 1 &&
                                                                    <div className='Checkout_Envio_Direccion'>
                                                                        <div className='Checkout_Envio_Direccion_Usuario'>
                                                                            <div>
                                                                                <h2>Dirección de entrega</h2>
                                                                                {cambiarDireccion == true ? (
                                                                                    <h4>{departamentoDireccion} - {ciudadDireccion} - {values.tipoVia} {values.Numero1} # {values.Numero2} - {values.Numero3} </h4>
                                                                                ) : (
                                                                                    <h4>{usuario.direccion}</h4>
                                                                                )}
                                                                                <h3><b>Valor de envió:</b> ${valorEnvio.toLocaleString()}</h3>
                                                                            </div>

                                                                            {cambiarDireccion == true ? (
                                                                                <span
                                                                                    onClick={() => {

                                                                                        setCambiarDireccion(false)
                                                                                        setDepartamentoDireccion('');
                                                                                        setCiudadDireccion('');
                                                                                    }}
                                                                                >
                                                                                    <IonIcon className='icono' icon={closeOutline} /> Cancelar
                                                                                </span>
                                                                            ) : (
                                                                                <span onClick={() => setCambiarDireccion(true)}><IonIcon className='icono' icon={homeOutline} /> Cambiar opciones de entrega</span>
                                                                            )}

                                                                        </div>

                                                                        {cambiarDireccion &&
                                                                            <>
                                                                                <div className='Checkout_Envio_Direccion_Ubicacion'>
                                                                                    <StyledTextField
                                                                                        id="outlined-select-currency"
                                                                                        select
                                                                                        name='departamento'
                                                                                        label="Departamento"
                                                                                        size="small"
                                                                                        variant="outlined"
                                                                                        value={values.departamento}
                                                                                        onChange={(e) => {
                                                                                            setFieldValue('departamento', e.target.value)
                                                                                            handleDepartamento(1, parseInt(e.target.value));
                                                                                            hadleGetUbicacion(3, parseInt(e.target.value))
                                                                                        }}
                                                                                    >
                                                                                        <MenuItem value={0}>
                                                                                            Seleccione
                                                                                        </MenuItem>
                                                                                        {departamento && departamento.map((option) => (
                                                                                            <MenuItem key={option.id} value={option.id}>
                                                                                                {option.nombre}
                                                                                            </MenuItem>
                                                                                        ))}
                                                                                    </StyledTextField>
                                                                                    <StyledTextField
                                                                                        id="outlined-select-currency"
                                                                                        select
                                                                                        name='ciudad'
                                                                                        label="Ciudad"
                                                                                        size="small"
                                                                                        variant="outlined"
                                                                                        value={values.ciudad}
                                                                                        onChange={(e) => {
                                                                                            setFieldValue('ciudad', e.target.value)
                                                                                            handleDepartamento(2, parseInt(e.target.value));
                                                                                        }}
                                                                                    >
                                                                                        <MenuItem value={0}>
                                                                                            Seleccione
                                                                                        </MenuItem>
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
                                                                                        name='tipoVia'
                                                                                        label="Tipo de vía"
                                                                                        size="small"
                                                                                        variant="outlined"
                                                                                        value={values.tipoVia}
                                                                                        onChange={(e) => {
                                                                                            setFieldValue('tipoVia', e.target.value)

                                                                                        }}
                                                                                    >
                                                                                        <MenuItem value={0}>
                                                                                            Seleccione
                                                                                        </MenuItem>
                                                                                        {tipoVia && tipoVia.map((option) => (
                                                                                            <MenuItem key={option.id} value={option.nombre}>
                                                                                                {option.nombre}
                                                                                            </MenuItem>
                                                                                        ))}
                                                                                    </StyledTextField>
                                                                                    <StyledTextField
                                                                                        name='Numero1'
                                                                                        variant="outlined"
                                                                                        size="small"
                                                                                        placeholder='Ej: 32C'
                                                                                        value={values.Numero1}
                                                                                        onChange={(e) => setFieldValue('Numero1', e.target.value)}
                                                                                    />
                                                                                    <h5>#</h5>
                                                                                    <StyledTextField
                                                                                        name='Numero2'
                                                                                        variant="outlined"
                                                                                        size="small"
                                                                                        placeholder='45'
                                                                                        value={values.Numero2}
                                                                                        onChange={(e) => setFieldValue('Numero2', e.target.value)}
                                                                                    />
                                                                                    <h5>-</h5>
                                                                                    <StyledTextField
                                                                                        name='Numero3'
                                                                                        variant="outlined"
                                                                                        size="small"
                                                                                        placeholder='116'
                                                                                        value={values.Numero3}
                                                                                        onChange={(e) => setFieldValue('Numero3', e.target.value)}
                                                                                    />
                                                                                </div>
                                                                            </>
                                                                        }
                                                                        <div style={!cambiarDireccion ? { marginTop: "30px" } : { marginTop: "0" }}>
                                                                            <StyledTextField
                                                                                name='complementario'
                                                                                variant="outlined"
                                                                                label="Información adicional (ej.: apto. 201)"
                                                                                size="small"
                                                                                placeholder='Dirección Complementaria'
                                                                                value={values.complementario}
                                                                                onChange={(e) => setFieldValue('complementario', e.target.value)}
                                                                            />
                                                                            <StyledTextField
                                                                                name='barrio'
                                                                                variant="outlined"
                                                                                label="Barrio"
                                                                                size="small"
                                                                                placeholder='Opcional'
                                                                                value={values.barrio}
                                                                                onChange={(e) => setFieldValue('barrio', e.target.value)}
                                                                            />
                                                                            <StyledTextField
                                                                                name='destinatario'
                                                                                variant="outlined"
                                                                                label="Destinatario"
                                                                                size="small"
                                                                                placeholder='Nombre de la persona que recibe'
                                                                                value={values.destinatario}
                                                                                onChange={(e) => setFieldValue('destinatario', e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {pasoEnvio == 2 &&
                                                                    <div className='Checkout_Envio_Recoger'>
                                                                        <div className='Checkout_Envio_Recoger_Info'>
                                                                            <IonIcon className='icono' icon={locationOutline} />
                                                                            <div>
                                                                                <h2>Campus Universitario</h2>
                                                                                <h4>Carrera 84 # 33AA-01 B/ La Castellana (Medellín - Colombia)</h4>
                                                                                <p>Todos los productos disponibles</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='Checkout_Envio_Recoger_horarios'>
                                                                            <h3>Horarios de atención</h3>
                                                                            <table>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>Lunes</td>
                                                                                        <td>8:00 a. m. a 6:00 p. m.</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Martes</td>
                                                                                        <td>8:00 a. m. a 6:00 p. m.</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Miércoles</td>
                                                                                        <td>8:00 a. m. a 6:00 p. m.</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Jueves</td>
                                                                                        <td>8:00 a. m. a 6:00 p. m.</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Viernes</td>
                                                                                        <td>8:00 a. m. a 4:00 p. m.</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <div className='Checkout_Envio_Recoger_Responsable'>
                                                                            <StyledTextField
                                                                                name='responsable'
                                                                                variant="outlined"
                                                                                label="Responsable de recoger"
                                                                                size="small"
                                                                                placeholder='Nombre de la persona responsable de recoger'
                                                                                value={values.responsable}
                                                                                onChange={(e) => setFieldValue('responsable', e.target.value)}
                                                                            />
                                                                            <StyledTextField
                                                                                name='documentoresponsable'
                                                                                variant="outlined"
                                                                                label="Número de documento de responsable"
                                                                                size="small"
                                                                                placeholder='Número de documento de responsable de recoger'
                                                                                value={values.documentoresponsable}
                                                                                onChange={(e) => setFieldValue('documentoresponsable', e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </>
                                                            <div className='Boton_Continuar'>
                                                                <button type="submit" disabled={isSubmitting} >Continuar  <IonIcon className='icono' icon={arrowForwardOutline} /></button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                        }
                                        {paso == 4 &&
                                            <>
                                                <div className='Checkout_Content_Finalizar'>
                                                    <div>
                                                        <h2>Resumen de la compra</h2>
                                                        <div className='Checkout_Content_Finalizar_Info'>
                                                            <h2>DATOS PERSONALES</h2>
                                                            <p><span>Nombre:</span> {usuario.nombre}...</p>
                                                            <p><span>Correo:</span> {usuario.correo}</p>
                                                            <p><span>Teléfono / Móvil:</span> {usuario.telefono}</p>
                                                        </div>
                                                        <div className='Checkout_Content_Finalizar_Info'>
                                                            <h2>ENVÍO</h2>
                                                            {pasoEnvio == 1 ? (
                                                                <>
                                                                    <p><span>Dirección: </span>{direccion}</p>
                                                                    <p><span>Complemento: </span>{complementario}</p>
                                                                    <p><span>Barrio: </span>{barrio}</p>
                                                                    <p><span>Destinatario: </span>{destinatario}</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p>RECOGER EN LA TIENDA</p>
                                                                    <p><span>Responsable: </span>{responsable}</p>
                                                                </>
                                                            )}

                                                        </div>
                                                    </div>

                                                    <div className='Checkout_Content_Producto'>
                                                        {cartItems.map((producto, index) => (
                                                            <div className='Checkout_Content_Producto_items' key={index}>
                                                                <img src={`${services.url}/${producto.src}`} alt={producto.nombre} />
                                                                <div className='Checkout_Content_Producto_items-Info'>
                                                                    <h3>{producto.nombre}</h3>
                                                                    <h3><span>Cantidad:</span> {producto.cantidad}</h3>
                                                                    <h3><span>Precio:</span>${(producto.valor * producto.cantidad).toLocaleString()}</h3>
                                                                    {producto.talla != '' &&
                                                                        <h3><span>Talla:</span> {producto.talla}</h3>
                                                                    }
                                                                    <h3><span>Color:</span> {producto.nombreColor}</h3>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>

                                                <div className='Boton_finalizar '>
                                                    <Link to='/'>
                                                        <IonIcon className='icono' icon={closeOutline} /> Cancelar compra
                                                    </Link>
                                                </div>
                                            </>
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
                                    <div className='Checkout_Content_Resumen_Cupon'>
                                        {aplicaCupon == false ? (
                                            <div className='Checkout_Content_Resumen_Cupon_usar' onClick={() => setAplicaCupon(true)}>
                                                <h4>Usar un código promocional</h4>
                                                <IonIcon className="icono" icon={chevronDownOutline} />
                                            </div>
                                        ) : (
                                            <div className='Checkout_Content_Resumen_Cupon_input'>
                                                <StyledTextField
                                                    name='cupon'
                                                    variant="outlined"
                                                    label="Usar cupón de descuento"
                                                    size="small"
                                                    placeholder='Código'
                                                    onChange={handleInputChange}
                                                    value={cupon}
                                                />

                                                <div className='Checkout_Content_Resumen_Cupon_botones'>
                                                    <button onClick={() => { setAplicaCupon(false); setCupon(''); setTextCupon('') }}>Cancelar</button>
                                                    <button onClick={() => handleDescuento()}>Aplicar</button>
                                                </div>
                                                <p className={`textCupon ${valorCupon != 0 ? "textCuponExitoso" : ""}`}>{textCupon}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className='Checkout_Content_Resumen_valores'>
                                        <h3><span>Subtotal: </span></h3>
                                        <h3><span>${getTotalCartValue().toLocaleString()}</span></h3>
                                    </div>
                                    <div className='Checkout_Content_Resumen_valores '>
                                        <h3><span>Envío: </span></h3>
                                        <h3>${valorEnvio.toLocaleString()}</h3>
                                    </div>
                                    <div className='Checkout_Content_Resumen_valores '>
                                        <h3><span>Descuento: </span></h3>
                                        <h3>${valorCupon.toLocaleString()}</h3>
                                    </div>
                                    <div className='Checkout_Content_Resumen_Tvalores'>
                                        <h3><span>Total: </span></h3>
                                        <h3><span>${valorTotal.toLocaleString()}</span></h3>
                                    </div>
                                    <p className='Checkout_Content_Resumen_valores_P'>*IVA incluido</p>
                                    {paso > 2 &&
                                        <p className='volverCarrito' onClick={() => setPaso(1)}>Volver al resumen de la compra</p>
                                    }
                                    {paso == 4 &&
                                        <div className='Boton_FinalizarCompra'>
                                            <BotonSubmit texto={'Finalizar compra'} isLoading={isLoading} onClick={handdleEnviarPedido} color="Registrarme" />
                                            <p>{msg}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className=''>
                    {!compraExitosa ? (
                        <CompraExitosa/>
                    ) : (
                        <div className='Checkout_Content_Resumen-null'>
                            <IonIcon className='icono' icon={cartOutline} />
                            <h2>Su carrito está vacío.</h2>
                            <p>Parece que aún no has encontrado lo que buscas. ¡No te preocupes! Explora nuestros productos y descubre algo que te encantará.</p>
                            <Link to='/'>
                                Explorar productos
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Checkout