import { IonIcon } from "@ionic/react";
import { arrowBackOutline, personOutline, mailOutline, callOutline, homeOutline, documentTextOutline, alertCircleOutline } from 'ionicons/icons';
import { Button, MenuItem } from "@mui/material";
import './Pedidos.css'
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { StyledTextField } from "../../../../utilities/SelectProps";
import { useEffect, useState } from "react";
import { EstadoPedidos, PedidoVista } from "../../../../models/Pedido";
import { api } from "../../../../services";
import { services } from "../../../../models";
import { Estado } from "../../../../models/Estados";
import { Link } from "react-router-dom";
import useHandleNavigation from "../../../../utilities/HandleNavigation ";

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idPedido: number;
    esAdmin: boolean;
}

const ViewPedidos: React.FC<Props> = (props) => {
    const [msg, setMsg] = useState('');
    const [pedidos, setPedidos] = useState<PedidoVista>();
    const [estadosPedidos, setEstadosPedidos] = useState<Estado[]>([]);
    const [estadosEnvios, setEstadosEnvios] = useState<Estado[]>([]);
    const handleNavigation = useHandleNavigation(props.mostrarRegistro);

    useEffect(() => {
        const mainContainer = document.getElementById('main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, []);

    useEffect(() => {
        hadleGetPedidos();
        hadleGetEstados(1);
        hadleGetEstados(2);
    }, [props.idPedido])

    const hadleGetPedidos = async () => {
        // Solicitud GET
        const response = await api.get<[PedidoVista]>('Pedido/Get_Id_Pedidos', { idPedido: props.idPedido });
        setPedidos(response.data[0])
    };

    const hadleGetEstados = async (accion: number) => {
        // Solicitud GET
        const response = await api.get<[any]>('Generales/Get_Estados', { Accion: accion });
        if (accion == 1) {
            setEstadosPedidos(response.data);
        }
        else {
            setEstadosEnvios(response.data);
        }
    };


    const handleActualizar = async (values: FormikValues) => {
        
        try {
            if (values.EstadoPedido == pedidos?.idEstadoPedido && values.EstadoEnvio ==  pedidos?.idEstadoEnvio) {
                setMsg("Parece que no has cambiado el estado. Asegúrate de seleccionar una nueva opción antes de proceder");
            }else {
                const objeto: EstadoPedidos = {
                    idPedido: props.idPedido,
                    idEstadoPedido: values.EstadoPedido ==  pedidos?.idEstadoPedido ? 0 : values.EstadoPedido,
                    idEstadoEnvio: values.EstadoEnvio ==  pedidos?.idEstadoEnvio ? 0 : values.EstadoEnvio,
                };
                var response = await api.put<any>('Pedido/Put_Actualizar_Estado', objeto);
                const data = response.data as { resultado: boolean; mensaje: string; orden: number };
                
                setMsg(data.mensaje);
                if (props.actualizarDatos) {
                    props.actualizarDatos();
                    hadleGetPedidos();
                }
            }
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
        }
    };


    return (
        <div className="AddProductos">
            <div className='AddProductos_Encabezado'>
                <h3> Orden #{pedidos?.orden} </h3>
                <div>
                    <Button
                        onClick={handleNavigation}
                        variant="outlined"
                        size="small"
                        startIcon={<IonIcon className='' icon={arrowBackOutline} />}
                    >
                        Volver a la lista
                    </Button>
                </div>
            </div>
            <div className="ViewPedidos_Content">
                <div className="ViewPedidos_Content_right">
                    <div className="ViewPedidos_Content_right_texto">
                        {props.esAdmin && <p>ID de cliente: <span>{pedidos?.usuarios.idUsuario}</span></p>}
                        <p>Fecha de registro: <span>{pedidos?.fechaRegistro}</span></p>
                    </div>

                    <div className="ViewPedidos_Content_right_table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Color</th>
                                    <th>Talla</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos?.registros.map((registro, index) => (
                                    <tr key={index}>
                                        <td className="tdNombre">
                                            <div>
                                                <img src={`${services.url}/${registro.foto}`} alt="" />
                                                <Link
                                                    to={`/Producto/${registro.idProducto}/${encodeURIComponent(registro.nombre.toLowerCase().replace(/ /g, '-'))}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                >
                                                    {registro.nombre}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>{registro.color}</td>
                                        <td>{registro.talla == '' ? 'No Aplica' : registro.talla}</td>
                                        <td>{registro.cantidad}</td>
                                        <td>${registro.precio.toLocaleString()}</td>
                                        <td>${registro.total.toLocaleString()}</td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>
                    <div className="ViewPedidos_Content_right_subtotal">
                        <h4>Subtotal de artículos:</h4>
                        <h5>${pedidos?.subTotal.toLocaleString()}</h5>
                    </div>
                    <div className="ViewPedidos_Content_right_informacionUsuario">
                        <ul>
                            <h2>Datos de facturación</h2>
                            <li>
                                <IonIcon className='icono' icon={personOutline} />
                                <div>
                                    <h3>Cliente</h3>
                                    <p>{pedidos?.usuarios.nombre}</p>
                                    <p>{pedidos?.usuarios.documento}</p>
                                </div>
                            </li>
                            <li>
                                <IonIcon className='icono' icon={mailOutline} />
                                <div>
                                    <h3>Correo electrónico</h3>
                                    <p>{pedidos?.usuarios.correo}</p>
                                </div>
                            </li>
                            <li>
                                <IonIcon className='icono' icon={callOutline} />
                                <div>
                                    <h3>Teléfono</h3>
                                    <p>{pedidos?.usuarios.telefono}</p>
                                </div>
                            </li>
                            <li>
                                <IonIcon className='icono' icon={homeOutline} />
                                <div>
                                    <h3>DIRECCIÓN</h3>
                                    <p>{pedidos?.usuarios.direccion}</p>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <h2>Detalles de envío</h2>
                            <li>
                                <IonIcon className='icono' icon={alertCircleOutline} />
                                <div>
                                    <h3>Tipo de entrga</h3>
                                    <p>{pedidos?.envio.tipoEntrega}</p>
                                </div>
                            </li>
                            {pedidos?.envio.tipoEntrega == 'Recogida en el campus' ? (

                                <li>
                                    <IonIcon className='icono' icon={personOutline} />
                                    <div>
                                        <h3>Responsable</h3>
                                        <p>{pedidos?.envio.responsable}</p>
                                    </div>
                                </li>

                            ) : (
                                <>
                                    <li>
                                        <IonIcon className='icono' icon={homeOutline} />
                                        <div>
                                            <h3>DIRECCIÓN</h3>
                                            <p>{pedidos?.envio.direccion}</p>
                                            <p>{pedidos?.envio.complemento}</p>
                                            <p>{pedidos?.envio.barrio}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <IonIcon className='icono' icon={personOutline} />
                                        <div>
                                            <h3>Destinatario</h3>
                                            <p>{pedidos?.envio.destinatario}</p>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                </div>

                <div className="ViewPedidos_Content_let">
                    {pedidos?.idEstadoPedido == 3 &&
                        <div className="AddCursos_Formulario-content">
                            <Button
                                variant="contained"
                                size="small"
                                color="warning"
                                startIcon={<IonIcon className='' icon={documentTextOutline} />}
                            >
                                Descargar factura
                            </Button>
                        </div>
                    }
                    <div className="AddCursos_Formulario-content">
                        <h2>Estado del pedido</h2>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                id: '',
                                EstadoPedido: pedidos?.idEstadoPedido || '',
                                EstadoEnvio: pedidos?.idEstadoEnvio || '',
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.EstadoPedido) {
                                    errors.EstadoPedido = 'Campo requerido';
                                }
                                return errors;
                            }}
                            onSubmit={handleActualizar}
                        >
                            {({ errors, values, setFieldValue }) => (
                                <Form>
                                    <div className='Configuracion_Body'>

                                        <div className='Configuracion_Formuario-input'>
                                            <StyledTextField
                                                id="outlined-select-currency"
                                                select
                                                label="Estado Pago"
                                                size="small"
                                                variant="outlined"
                                                disabled={props.esAdmin ? false: true}
                                                value={values.EstadoPedido}
                                                onChange={(e) => setFieldValue('EstadoPedido', e.target.value)}
                                            >
                                                <MenuItem value={0}>
                                                    Seleccione
                                                </MenuItem>

                                                {estadosPedidos && estadosPedidos.map((option) => (
                                                    <MenuItem key={option.idEstado} value={option.idEstado}>
                                                        {option.nombre}
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                            <ErrorMessage name='EstadoPedido' component={() => <p className='Error'>{errors.EstadoPedido}</p>} />
                                            <StyledTextField
                                                id="outlined-select-currency"
                                                select
                                                label="Estado del envio"
                                                size="small"
                                                variant="outlined" 
                                                disabled={props.esAdmin ? false: true}
                                                value={values.EstadoEnvio}
                                                onChange={(e) => setFieldValue('EstadoEnvio', e.target.value)}
                                            >
                                                <MenuItem value={0}>
                                                    Seleccione
                                                </MenuItem>

                                                {estadosEnvios && estadosEnvios.map((option) => (
                                                    <MenuItem key={option.idEstado} value={option.idEstado}>
                                                        {option.nombre}
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                            <ErrorMessage name='EstadoEnvio' component={() => <p className='Error'>{errors.EstadoEnvio}</p>} />

                                            {props.esAdmin &&
                                                <>
                                                    <Button
                                                        onClick={() => handleActualizar}
                                                        variant="contained"
                                                        size="small"
                                                        color="info"
                                                        type="submit"
                                                    >
                                                        Cambiar estado
                                                    </Button>

                                                    <p className="P_ActuaizacionEstado">{msg}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="AddCursos_Formulario-content">
                        <h2>Resumen</h2>
                        <div className="Checkout_Content_Resumen_valores">
                            <h3><span>Subtotal:</span></h3>
                            <h3>${pedidos?.subTotal.toLocaleString()}</h3>
                        </div>
                        <div className="Checkout_Content_Resumen_valores">
                            <h3><span>Envío:</span></h3>
                            <h3>${pedidos?.valorEnvio.toLocaleString()}</h3>
                        </div>
                        <div className="Checkout_Content_Resumen_valores">
                            <h3><span>Descuento:</span></h3>
                            <h3>${pedidos?.descuento.toLocaleString()}</h3>
                        </div>
                        <div className="Checkout_Content_Resumen_Tvalores AddCursos_Formulario-content_Totales">
                            <h3><span>Total:</span></h3>
                            <h3><span>${pedidos?.total.toLocaleString()}</span></h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewPedidos