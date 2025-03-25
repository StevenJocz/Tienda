import './Checkout.css'
import { IonIcon } from '@ionic/react';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { cartOutline, chevronDownCircleOutline, closeCircleOutline, informationCircleOutline, locationOutline } from 'ionicons/icons';
import { StyledTextField } from '../../../../utilities/SelectProps';
import { MenuItem } from '@mui/material';
import { Generos, services, tipoDocumento, Ubicacion } from '../../../../models';
import { useEffect, useState } from 'react';
import { api } from '../../../../services';
import { capitalizeFirstLetter } from '../../../../utilities/Generales';
import carro from '../../../../assets/img/camion.png'
import { useCartContext } from '../../../../context/CartContext';
import { BotonSubmit } from '../../../../components/boton';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/Store';
import { Pedido } from '../../../../models/Pedido';
import { Login } from '../../../../components/loginDos';
import { PagoPendiente } from '../../../../models/Notificaciones';


declare global {
    interface Window {
        P?: {
            init: (processUrl: string) => void;
            on: (event: string, callback: (response?: any) => void) => void;
        };
    }
}
export { };

const Checkout = () => {
    const usuario = useSelector((store: AppStore) => store.user);
    const [verlogin, setVerLogin] = useState(false);
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tipoDocumentos, setTipoDocumentos] = useState<tipoDocumento[]>();
    const [genero, setGenero] = useState<Generos[]>();
    const [pais, setPais] = useState<Ubicacion[]>();
    const [departamento, setDepartamento] = useState<Ubicacion[]>();
    const [municipio, setMunicipio] = useState<Ubicacion[]>();
    const [tipoVia, setTipoVia] = useState<Ubicacion[]>();
    const [tipoEntrega, setTipoEntrega] = useState(0);
    const { cartItems, getTotalCartValue, getTotalIva } = useCartContext();
    const [valorCupon, setValorCupon] = useState(0);
    const [idCupon, setIdCupon] = useState(0);
    const [cupon, setCupon] = useState('');
    const [textCupon, setTextCupon] = useState('');
    const [valorEnvio, setValorEnvio] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [monto, setMonto] = useState(0);
    const [verItems, setVerItems] = useState(false);
    const [pagoPendiente, setPagoPendiente] = useState<PagoPendiente[]>();

    useEffect(() => {
        hadleGetMonto();
        hadleGetPagoPendiente(usuario.documento);
    }, [monto]);

    const hadleVerLogin = () => {
        setVerLogin(!verlogin)

    }

    const hadleGetMonto = async () => {
        // Solicitud GET
        const response = await api.get<[any]>('Generales/Get_Monto', { IdMonto: 1 });
        setMonto(response.data[0].valorMonto)
    };


    useEffect(() => {
        hadleGetTipoDocumentos();
        hadleGetGeneros();

        if (usuario.idUsuario > 0) {
            hadleGetUbicacion(2, usuario.pais);
            hadleGetUbicacion(3, usuario.departamento);
        }

        hadleGetUbicacion(4, 0);
        hadleGetUbicacion(1, 0);


    }, []);

    const hadleGetTipoDocumentos = async () => {
        const response = await api.get<tipoDocumento[]>('Generales/Get_TipoDocumento');
        if (response.data) {
            await setTipoDocumentos(response.data);
        };
    }

    const hadleGetGeneros = async () => {
        const response = await api.get<Generos[]>('Generales/Get_Generos');
        if (response.data) {
            await setGenero(response.data);
        };
    }


    const hadleGetPagoPendiente = async (documento: string) => {
        const response = await api.get<PagoPendiente[]>('Notificacion/Get_PagoPendiente', { documento: documento });
        if (response.data) {
            await setPagoPendiente(response.data);
        };
    }

    const hadleGetUbicacion = async (accion: number, parametro: number) => {
        const response = await api.get<Ubicacion[]>('Generales/Get_Ubicacion', { Accion: accion, parametro: parametro });
        if (response.data) {
            if (accion == 1) {
                await setPais(response.data);
            } else if (accion == 2) {
                await setDepartamento(response.data);
            } else if (accion == 4) {
                await setTipoVia(response.data);
            } else {
                await setMunicipio(response.data);
            }
        };
    }

    const handleTipoEntrega = (accion: number) => {
        setTipoEntrega(accion);
        setMsg('');
        if (accion == 1) {
            setValorEnvio(20000);
        } else {
            setValorEnvio(0);
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

    const calcularPorcentaje = () => {
        const valorMinimoEnvio = monto;
        const totalCarrito = getTotalCartValue();
        const porcentajeDecimal = (totalCarrito / valorMinimoEnvio) * 100;
        const porcentajeEntero = Math.floor(porcentajeDecimal);
        return porcentajeEntero > 100 ? 100 : porcentajeEntero;
    };

    useEffect(() => {

        const precioEnvio = valorEnvio;

        const totalporcentaje = calcularPorcentaje();
        const subtotal = getTotalCartValue();

        if (totalporcentaje == 100) {
            setValorEnvio(0);
        } else {
            setValorEnvio(precioEnvio);
        }
        const valorTotal = subtotal + valorEnvio - valorCupon;
        setValorTotal(valorTotal);

    }, [valorTotal, calcularPorcentaje, valorCupon, valorEnvio]);


    const handleFinalizarCompra = async (values: FormikValues) => {
        setIsLoading(true);
        if (tipoEntrega == 0) {
            setMsg('Por favor, seleccione el métodos de envío.');
            setIsLoading(false);
            return;
        } else {
            try {
                const Pedido: Pedido = {
                    cliente: {
                        correo: values.correo,
                        apellidos: values.apellidos,
                        nombres: values.nombres,
                        tipoDocumento: parseInt(values.tipoDocumento),
                        documento: values.documento,
                        celular: values.celular,
                        genero: parseInt(values.genero),
                        pais: parseInt(values.pais),
                        departamento: parseInt(values.departamento),
                        ciudad: parseInt(values.ciudad),
                        tipoVia: values.tipoVia,
                        numero1: values.Numero1,
                        numero2: values.Numero2,
                        numero3: values.Numero3,
                        complementario: values.complementario,
                        barrio: values.barrio,
                    },
                    subTotal: parseFloat(getTotalCartValue().toFixed(2)),
                    valorEnvio: valorEnvio,
                    idCupon: idCupon,
                    valorDescuento: valorCupon,
                    valorTotal: parseFloat(valorTotal.toFixed(2)),
                    tipoEntrega: tipoEntrega == 1 ? "	Envío" : "Recogida en el campus",

                    registros: cartItems.map((producto, index) => ({
                        idPedido_Registro: index + 1,
                        idPedido: 0,
                        idProducto: producto.idProducto,
                        idInventario: producto.idInventario,
                        cantidad: producto.cantidad,
                        nombre: producto.nombre,
                        color: producto.nombreColor,
                        talla: producto.talla,
                        ValorUnidad: parseFloat(producto.valor.toFixed(2)),
                        imagen: producto.src
                    }))
                }

                const response = await api.post('Pedido/Post_Registrar_Pedido', Pedido);
                const data = response.data as { resultado: boolean; mensaje: string; referencia: number, apiResponse: any };

                if (data.resultado === true) {
                    // if (window.P) {
                    //     window.P.init(data.apiResponse.data.processUrl);
                    //     window.P.on("close", function () {
                    //         setIsLoading(false);
                    //     });
                    //     window.P.on("response", function (response: any) {
                    //         console.log(response);
                    //         window.location.href = `https://tienda.unac.edu.co/PedidoExitoso/${data.referencia}`;
                    //     });
                    // }
                    window.location.href = data.apiResponse.data.processUrl;

                }

            } catch (error) {
                setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='Checkout'>
            <div className="Checkout_Encabezado">
                <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="" />
                <a href=""><IonIcon className='icono' icon={cartOutline} /></a>
            </div>
            <div className="Checkout_Body">
                <div className="Checkout_Body_Info">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            correo: usuario.correo || '',
                            apellidos: usuario.apellido || '',
                            nombres: usuario.nombre || '',
                            tipoDocumento: usuario.tipoDocumento || 0,
                            documento: usuario.documento || '',
                            celular: usuario.telefono || '',
                            genero: usuario.genero || 0,
                            pais: usuario.pais || 0,
                            departamento: usuario.departamento || 0,
                            ciudad: usuario.ciudad || 0,
                            tipoVia: usuario.tipoVia || '',
                            Numero1: usuario.numero1 || '',
                            Numero2: usuario.numero2 || '',
                            Numero3: usuario.numero3 || '',
                            complementario: '',
                            barrio: '',
                        }}
                        validate={(values) => {
                            let errors: any = {};
                            const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
                            const numericRegex = /^[0-9]+$/;
                            const alphanumericRegex = /^[A-Za-z0-9]+$/;

                            if (!values.correo) {
                                errors.correo = 'El campo correo es obligatorio.';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.correo)) {
                                errors.correo = 'Correo inválido.';
                            }

                            if (!values.apellidos) {
                                errors.apellidos = 'El campo apellidos es obligatorio.';
                            } else if (values.apellidos.length < 2) {
                                errors.apellidos = 'Debe contener al menos 2 caracteres.';
                            } else if (!nameRegex.test(values.apellidos)) {
                                errors.apellidos = 'Solo se permiten letras.';
                            }

                            if (!values.nombres) {
                                errors.nombres = 'El campo nombres es obligatorio.';
                            } else if (values.nombres.length < 2) {
                                errors.nombres = 'Debe contener al menos 2 caracteres.';
                            } else if (!nameRegex.test(values.nombres)) {
                                errors.nombres = 'Solo se permiten letras.';
                            }

                            if (!values.tipoDocumento) {
                                errors.tipoDocumento = 'El campo tipo de documento es obligatorio.';
                            }

                            if (values.documento) {
                                const numericDocuments = ['1', '2']; // Tipos de documentos que solo permiten números
                                const alphanumericDocuments = ['3', '5', '16']; // Tipos de documentos que permiten letras y números

                                if (numericDocuments.includes(values.tipoDocumento.toString())) {
                                    if (!numericRegex.test(values.documento)) {
                                        errors.documento = 'El documento solo puede contener números.';
                                    }
                                } else if (alphanumericDocuments.includes(values.tipoDocumento.toString())) {
                                    if (!alphanumericRegex.test(values.documento)) {
                                        errors.documento = 'El documento solo puede contener letras y números.';
                                    }
                                } else {
                                    errors.documento = 'Tipo de documento no válido.';
                                }
                            } else {
                                errors.documento = 'El campo documento es obligatorio.';
                            }

                            if (!values.celular) {
                                errors.celular = 'El campo celular es obligatorio.';
                            } else if (!/^\d{10}$/.test(values.celular)) {
                                errors.celular = 'El celular debe contener 10 dígitos númericos.';
                            }

                            if (!values.genero) {
                                errors.genero = 'El campo género es obligatorio.';
                            }

                            if (!values.pais) {
                                errors.pais = 'El campo país es obligatorio.';
                            }

                            if (!values.departamento) {
                                errors.departamento = 'El campo departamento es obligatorio.';
                            }

                            if (!values.ciudad) {
                                errors.ciudad = 'El campo ciudad es obligatorio.';
                            }

                            if (!values.tipoVia) {
                                errors.tipoVia = 'El campo tipo de vía es obligatorio.';
                            }

                            if (!values.Numero1) {
                                errors.Numero1 = 'Campo obligatorio.';
                            }

                            if (!values.Numero2) {
                                errors.Numero2 = 'Campo obligatorio.';
                            }

                            if (!values.Numero3) {
                                errors.Numero3 = 'Campo obligatorio.';
                            }

                            return errors;
                        }}
                        onSubmit={handleFinalizarCompra}
                    >
                        {({ errors, values, setFieldValue, isSubmitting }) => (
                            <Form>
                                <div className='Checkout_Formulario'>
                                    <div className='Checkout_Formulario_Resumen' onClick={() => setVerItems(true)}>
                                        <div className='Checkout_Formulario_Resumen_texto' >
                                            <div>
                                                <h3>Resumen del pedido</h3>
                                                <IonIcon className='icono' icon={chevronDownCircleOutline} />
                                            </div>
                                            <span>Ver resumen completo</span>
                                        </div>
                                        <div className='Checkout_Formulario_Resumen_Total'>
                                            <h4><span>Total: </span></h4>
                                            <h3><span>${valorTotal.toLocaleString()}</span></h3>
                                        </div>

                                    </div>
                                    <div className='Checkout_Formulario_Titulo'>
                                        <h3>Contacto</h3>
                                        {usuario.idUsuario == 0 && <span onClick={hadleVerLogin}>Iniciar sesión</span>}

                                    </div>
                                    <StyledTextField
                                        name='correo'
                                        variant="outlined"
                                        size="small"
                                        label="Correo electrónico"
                                        placeholder='Correo electrónico'
                                        value={values.correo}
                                        onChange={(e) => setFieldValue('correo', e.target.value)}
                                    />
                                    <ErrorMessage name='correo' component={() => <p className='Error'>{errors.correo}</p>} />
                                </div>
                                <div className='Checkout_Formulario'>
                                    <div className='Checkout_Formulario_Titulo'>
                                        <h3>Información personal</h3>
                                    </div>
                                </div>
                                <div className='Checkout_Formulario_Dos'>
                                    <div>
                                        <StyledTextField
                                            name='nombres'
                                            label="Nombres"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce nombres completos'
                                            value={values.nombres}
                                            onChange={(e) => setFieldValue('nombres', e.target.value)}
                                            disabled={usuario.idUsuario != 0}
                                        />
                                        <ErrorMessage name='nombres' component={() => <p className='Error'>{errors.nombres}</p>} />
                                    </div>
                                    <div>
                                        <StyledTextField
                                            name='apellidos'
                                            label="Apellidos"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce apellidos completos'
                                            value={values.apellidos}
                                            onChange={(e) => setFieldValue('apellidos', e.target.value)}
                                            disabled={usuario.idUsuario != 0}
                                        />
                                        <ErrorMessage name='apellidos' component={() => <p className='Error'>{errors.apellidos}</p>} />
                                    </div>

                                </div>
                                <div className='Checkout_Formulario_Dos'>
                                    <div>
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Tipo de documento"
                                            size="small"
                                            variant="outlined"
                                            value={values.tipoDocumento}
                                            onChange={(e) => setFieldValue('tipoDocumento', e.target.value)}
                                            disabled={usuario.idUsuario != 0}
                                        >
                                            <MenuItem value='0'>
                                                Seleccione
                                            </MenuItem>
                                            {tipoDocumentos && tipoDocumentos.map((option) => (
                                                <MenuItem key={option.idDocumento} value={option.idDocumento}>
                                                    {option.documento}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <ErrorMessage name='tipoDocumento' component={() => <p className='Error'>{errors.tipoDocumento}</p>} />
                                    </div>
                                    <div>
                                        <StyledTextField
                                            name='documento'
                                            label="Número de documento"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce número de documento'
                                            value={values.documento}
                                            onChange={(e) => setFieldValue('documento', e.target.value)}
                                            disabled={usuario.idUsuario != 0}
                                        />
                                        <ErrorMessage name='documento' component={() => <p className='Error'>{errors.documento}</p>} />
                                    </div>
                                </div>
                                <div className='Checkout_Formulario_Dos'>
                                    <div>
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Genero"
                                            size="small"
                                            variant="outlined"
                                            value={values.genero}
                                            onChange={(e) => setFieldValue('genero', e.target.value)}
                                            disabled={usuario.idUsuario != 0}
                                        >
                                            <MenuItem value='0'>
                                                Seleccione
                                            </MenuItem>
                                            {genero && genero.map((option) => (
                                                <MenuItem key={option.idGenero} value={option.idGenero}>
                                                    {capitalizeFirstLetter(option.genero)}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <ErrorMessage name='genero' component={() => <p className='Error'>{errors.genero}</p>} />
                                    </div>
                                    <div>
                                        <StyledTextField
                                            name='celular'
                                            label="Número de celular"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce número de celular'
                                            value={values.celular}
                                            onChange={(e) => setFieldValue('celular', e.target.value)}
                                        />
                                        <ErrorMessage name='celular' component={() => <p className='Error'>{errors.celular}</p>} />
                                    </div>
                                </div>
                                <div className='Checkout_Formulario_Titulo'>
                                    <h3>Residencia</h3>
                                </div>
                                <div>
                                    <StyledTextField
                                        id="outlined-select-currency"
                                        select
                                        label="Pais"
                                        size="small"
                                        variant="outlined"
                                        value={values.pais}
                                        onChange={(e) => {
                                            setFieldValue('pais', e.target.value)
                                            hadleGetUbicacion(2, parseInt(e.target.value))
                                        }}
                                    >
                                        <MenuItem value='0'>
                                            Seleccione
                                        </MenuItem>
                                        {pais && pais.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {capitalizeFirstLetter(option.nombre)}
                                            </MenuItem>
                                        ))}

                                    </StyledTextField>
                                    <ErrorMessage name='pais' component={() => <p className='Error'>{errors.pais}</p>} />
                                </div>
                                <div className='Checkout_Formulario_Dos'>
                                    <div>
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Departamento"
                                            size="small"
                                            variant="outlined"
                                            value={values.departamento}
                                            onChange={(e) => {
                                                setFieldValue('departamento', e.target.value)
                                                hadleGetUbicacion(3, parseInt(e.target.value))
                                            }}
                                        >
                                            <MenuItem value='0'>
                                                Seleccione
                                            </MenuItem>
                                            {departamento && departamento.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {capitalizeFirstLetter(option.nombre)}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <ErrorMessage name='departamento' component={() => <p className='Error'>{errors.departamento}</p>} />
                                    </div>
                                    <div>
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Ciudad"
                                            size="small"
                                            variant="outlined"
                                            value={values.ciudad}
                                            onChange={(e) => setFieldValue('ciudad', e.target.value)}
                                        >
                                            <MenuItem value='0'>
                                                Seleccione
                                            </MenuItem>
                                            {municipio && municipio.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {capitalizeFirstLetter(option.nombre)}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <ErrorMessage name='ciudad' component={() => <p className='Error'>{errors.ciudad}</p>} />
                                    </div>
                                </div>
                                <div>
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
                                        <MenuItem value={'0'}>
                                            Seleccione
                                        </MenuItem>
                                        {tipoVia && tipoVia.map((option) => (
                                            <MenuItem key={option.id} value={option.nombre}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                    <ErrorMessage name='tipoVia' component={() => <p className='Error'>{errors.tipoVia}</p>} />
                                </div>
                                <div className='Checkout_Formulario_Dos Checkout_Formulario_Dos_Responsive'>
                                    <div>
                                        <StyledTextField
                                            name='Numero1'
                                            variant="outlined"
                                            size="small"
                                            placeholder='Ej: 32C'
                                            value={values.Numero1}
                                            onChange={(e) => setFieldValue('Numero1', e.target.value)}
                                        />

                                        <ErrorMessage name='Numero1' component={() => <p className='Error'>{errors.Numero1}</p>} />
                                    </div>
                                    <h5>#</h5>
                                    <div>
                                        <StyledTextField
                                            name='Numero2'
                                            variant="outlined"
                                            size="small"
                                            placeholder='45'
                                            value={values.Numero2}
                                            onChange={(e) => setFieldValue('Numero2', e.target.value)}
                                        />
                                        <ErrorMessage name='Numero2' component={() => <p className='Error'>{errors.Numero2}</p>} />
                                    </div>
                                    <h5>-</h5>
                                    <div>
                                        <StyledTextField
                                            name='Numero3'
                                            variant="outlined"
                                            size="small"
                                            placeholder='116'
                                            value={values.Numero3}
                                            onChange={(e) => setFieldValue('Numero3', e.target.value)}
                                        />
                                        <ErrorMessage name='Numero3' component={() => <p className='Error'>{errors.Numero3}</p>} />
                                    </div>
                                </div>
                                <div>
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
                                </div>
                                <div className='Checkout_Formulario_Titulo'>
                                    <h3>Métodos de envío</h3>
                                </div>
                                <div className='Checkout_Formulario_Radio' onClick={() => handleTipoEntrega(1)}>
                                    <img src={carro} alt="" />
                                    Enviar a la dirección
                                </div>
                                {tipoEntrega === 1 &&
                                    <div className="Checkout_Formulario_Radio_Envio">
                                        {valorEnvio == 0 ? (
                                            <div> <span>¡Felicidades!</span> Tienes envío gratis.</div>
                                        ) : (
                                            <p>Costo de envío: <span>${valorEnvio.toLocaleString()}</span></p>
                                        )}
                                    </div>
                                }
                                <div className='Checkout_Formulario_Radio' onClick={() => handleTipoEntrega(2)}>
                                    <IonIcon className='icono' icon={locationOutline} />
                                    Recoger en el campus
                                </div>
                                {tipoEntrega === 2 &&
                                    <div className="Checkout_Formulario_Radio_Envio">
                                        <div className='Checkout_Envio_Recoger_Info'>
                                            <h4>Campus Universitario</h4>
                                            <h5>Carrera 84 # 33AA-01 B/ La Castellana (Medellín - Colombia)</h5>
                                            <h5>Oficina mercadeo</h5>
                                            <p>Todos los productos disponibles</p>
                                        </div>
                                        <h3>Horarios de atención</h3>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>De lunes a jueves</td>
                                                    <td>8:00 a. m. a 6:00 p. m.</td>
                                                </tr>
                                                <tr>
                                                    <td>Viernes</td>
                                                    <td>8:00 a. m. a 4:00 p. m.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <div className='Checkout_Formulario_MetodosPago'>
                                    <h3>Métodos de pago</h3>
                                    <div>
                                        <img src=" https://placetopay-static-test-bucket.s3.us-east-2.amazonaws.com/avalpaycenter-com/logos/Logo%20Avalpay.svg" alt="" />
                                        <img src="https://inmobiliarialamansion.com/wp-content/uploads/2019/01/logo-pse.png" alt="" />
                                        <img src="https://productos.tribuexcel.com/wp-content/uploads/2020/12/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos-705x210-1.png.webp" alt="" />

                                    </div>
                                </div>
                                <div className='Checkout_Formulario_DatosPersonales'>
                                    <p> Al dar clic en Pagar ahora, aceptas la  <a
                                        href="https://www.unac.edu.co/wp-content/uploads/2021/10/2.-Politica-de-Proteccion-de-Datos-Personales.pdf"
                                        target='_blanck'
                                    >
                                        protección de datos personales
                                    </a>, las condiciones y declaro que toda información proporcionada es verídica.</p>
                                </div>
                                <div className='Totales_Responsibe'>
                                    <div className='Items_Cupon'>
                                        <div className='Checkout_Formulario'>
                                            <StyledTextField
                                                name='cupon'
                                                variant="outlined"
                                                label="Código de descuento"
                                                size="small"
                                                placeholder='Código de descuento'
                                                onChange={handleInputChange}
                                                value={cupon}
                                            />
                                        </div>
                                        <button onClick={() => handleDescuento()}>Aplicar</button>
                                    </div>
                                    <p className={`textCupon ${valorCupon != 0 ? "textCuponExitoso" : ""}`}>{textCupon}</p>
                                    <div className='Checkout_Content_Resumen'>
                                        <div className='Checkout_Content_Resumen_valores'>
                                            <h3><span>Subtotal • </span> {cartItems.reduce((sum, item) => sum + item.cantidad, 0)} artículos </h3>
                                            <h3><span>${getTotalCartValue().toLocaleString()}</span></h3>
                                        </div>
                                        <div className='Checkout_Content_Resumen_valores '>
                                            <h3><span>Envío</span></h3>
                                            <h3>${valorEnvio.toLocaleString()}</h3>
                                        </div>
                                        <div className='Checkout_Content_Resumen_valores '>
                                            <h3><span>Descuento </span></h3>
                                            <h3 className={valorCupon > 0 ? 'valorDescuento' : ''}>{valorCupon > 0 ? '-' : ''}${valorCupon.toLocaleString()}</h3>
                                        </div>
                                        <div className='Checkout_Content_Resumen_Tvalores'>
                                            <h3><span>Total: </span></h3>
                                            <h3><span>${valorTotal.toLocaleString()}</span></h3>
                                        </div>
                                        <p>Incluye ${getTotalIva().toLocaleString()} de impuestos</p>
                                    </div>
                                </div>
                                <p className='Mensaje'>{msg}</p>
                                <BotonSubmit texto='Pagar ahora' isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleFinalizarCompra} color="Continuar" />
                                <div className='PreguntasFrecuentes_Div'>
                                    <a href="/PreguntasFrecuentes" target='_bank'><IonIcon className='icono' icon={informationCircleOutline} /> Preguntas Frecuentes sobre pagos electrónicos.</a>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
                <div className={`Checkout_Body_Items ${verItems ? "" : "mostrar-items"}`}>
                    <>
                        <div className='Checkout_Body_Items_header'>
                            <h3>Resumen del pedido</h3>
                            <IonIcon className='icono' icon={closeCircleOutline} onClick={() => setVerItems(false)} />
                        </div>
                        {cartItems.map((producto, index) => (
                            <div key={index} className='Items'>
                                <div className='Items_Imagen'>
                                    <img src={`${services.url}/${producto.src}`} alt={producto.nombre} />
                                    <span> {producto.cantidad}</span>
                                </div>
                                <div className='Items_Texto'>
                                    <h4>{producto.nombre}</h4>
                                    <p>Color: {producto.nombreColor}
                                        {producto.talla != '' &&
                                            <span> / Talla: {producto.talla}</span>
                                        }
                                    </p>
                                </div>
                                <h3> ${(producto.valor * producto.cantidad).toLocaleString()}</h3>
                            </div>
                        ))}
                    </>
                    <div className='Items_Cupon'>
                        <div className='Checkout_Formulario'>
                            <StyledTextField
                                name='cupon'
                                variant="outlined"
                                label="Código de descuento o tarjeta de regalo"
                                size="small"
                                placeholder='Código de descuento o tarjeta de regalo'
                                onChange={handleInputChange}
                                value={cupon}
                            />
                        </div>
                        <button onClick={() => handleDescuento()}>Aplicar</button>
                    </div>
                    <p className={`textCupon ${valorCupon != 0 ? "textCuponExitoso" : ""}`}>{textCupon}</p>
                    <div className='Checkout_Content_Resumen'>
                        <div className='Checkout_Content_Resumen_valores'>
                            <h3><span>Subtotal • </span> {cartItems.reduce((sum, item) => sum + item.cantidad, 0)} artículos </h3>
                            <h3><span>${getTotalCartValue().toLocaleString()}</span></h3>
                        </div>
                        <div className='Checkout_Content_Resumen_valores '>
                            <h3><span>Envío</span></h3>
                            <h3>${valorEnvio.toLocaleString()}</h3>
                        </div>
                        <div className='Checkout_Content_Resumen_valores '>
                            <h3><span>Descuento </span></h3>
                            <h3 className={valorCupon > 0 ? 'valorDescuento' : ''}>{valorCupon > 0 ? '-' : ''}${valorCupon.toLocaleString()}</h3>
                        </div>
                        <div className='Checkout_Content_Resumen_Tvalores'>
                            <h3><span>Total: </span></h3>
                            <h3><span>${valorTotal.toLocaleString()}</span></h3>
                        </div>
                        <p>Incluye ${getTotalIva().toLocaleString()} de impuestos</p>
                    </div>
                    <div>
                        {pagoPendiente && pagoPendiente?.length > 0 &&
                            <p className='Referencia_Pendiente'> Tienes una pago pendiente de la referencia {pagoPendiente[0].idReferencia} por un valor de  ${pagoPendiente[0].valor.toLocaleString()}</p>
                        }

                    </div>
                </div>
            </div>
            {verlogin && <Login
                onClose={() => setVerLogin(!verlogin)}
                mostrarInicio={() => setVerLogin(true)}
                IniciosSesion={() => setVerLogin(true)}
            />}
        </div>
    )
}

export default Checkout