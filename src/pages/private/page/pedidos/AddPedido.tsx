import { Button, MenuItem, Tooltip } from "@mui/material"
import useHandleNavigation from "../../../../utilities/HandleNavigation ";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, personOutline, mailOutline, callOutline, homeOutline, searchOutline, bagAddOutline } from 'ionicons/icons';
import { ErrorMessage, Form, Formik } from "formik";
import { StyledTextField } from "../../../../utilities/SelectProps";
import { useEffect, useState } from "react";
import { services, tipoDocumento, Ubicacion, Usuario } from "../../../../models";
import { api } from "../../../../services";
import { capitalizeFirstLetter } from "../../../../utilities/Generales";
import img from '../../../../assets/img/SinComentarios.png';
import './Pedidos.css'
import { ProductoSelect, viewProducto } from "../../../../models/Productos";
import { RegistrosPedido } from "../../../../models/Pedido";
import { calcularPrecioFinal } from "../../../../utilities/CalcularPrecioFinal";

interface Props {
    mostrarRegistro: () => void;
}
const AddPedido: React.FC<Props> = (props) => {
    const [usuarioRegistrado, setUsuarioRegistrado] = useState(0);
    const handleNavigation = useHandleNavigation(props.mostrarRegistro);
    const [tipoDocumentos, setTipoDocumentos] = useState<tipoDocumento[]>();
    const [departamento, setDepartamento] = useState<Ubicacion[]>();
    const [municipio, setMunicipio] = useState<Ubicacion[]>();
    const [tipoVia, setTipoVia] = useState<Ubicacion[]>();
    const [documentoBuscar, setDocumentoBuscar] = useState('');
    const [usuario, setUsuario] = useState<Usuario[]>([]);
    const [dataProductos, setDataProductos] = useState<ProductoSelect[]>([]);
    const [producto, setProducto] = useState<viewProducto[]>([]);


    const [idProducto, setIdProducto] = useState(0);
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
    const [idTallaSeleccionada, setIdTallaSeleccionada] = useState(0);
    const [idColorSeleccionado, setIdColorSeleccionado] = useState(0);
    const [productosSeleccionado, setProductosSeleccionado] = useState<RegistrosPedido[]>([]);


    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        hadleGetTipoDocumentos();
        hadleGetUbicacion(2, 36);
        hadleGetUbicacion(4, 0);
        hadleGetCProdcutos();
    }, [usuarioRegistrado]);

    const hadleGetTipoDocumentos = async () => {
        const response = await api.get<tipoDocumento[]>('Generales/Get_TipoDocumento');
        if (response.data) {
            await setTipoDocumentos(response.data);
        };
    }

    const hadleGetUbicacion = async (accion: number, parametro: number) => {
        const response = await api.get<Ubicacion[]>('Generales/Get_Ubicacion', { Accion: accion, parametro: parametro });
        if (response.data) {
            if (accion == 2) {
                await setDepartamento(response.data);
            } else if (accion == 4) {
                await setTipoVia(response.data);
            } else {
                await setMunicipio(response.data);
            }
        };
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentoBuscar(event.target.value);
    };

    const hadleGetUsuario = async () => {
        if (documentoBuscar == '') {
            return;
        } else {
            try {
                const response = await api.get<Usuario[]>('Usuario/Get_UsuarioDocumento', { documento: documentoBuscar });
                if (response.data.length > 0) {
                    setUsuario(response.data);
                    setUsuarioRegistrado(1);

                } else {
                    setUsuario([]);
                    setUsuarioRegistrado(2);
                }

            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        }

    };


    const hadleGetCProdcutos = () => {
        api.get<any>('Producto/Get_Productos', { accion: 1 }).then((response) => {
            const productos = response.data.map((producto: any) => ({
                id: producto.id,
                foto: producto.imagenes[0].imagenUno,
                producto: producto.nombre,
                categoría: producto.categorias,
                descuento: producto.descuento > 0 ? producto.descuento + '%' : '0',
                Stock: producto.existencias,
                nuevo: producto.nuevo,
                activo: producto.activo
            }));
            setDataProductos(productos);
        })
    };

    const hadleGetId = async (idProducto: number) => {
        const response = await api.get<viewProducto[]>('Producto/Get_Id_Producto', { idProducto: idProducto });
        if (response.data) {
            await setProducto(response.data);
        };
    }

    const handleAddProducto = () => {

        const tallaSeleccionada = producto[0].tallas.find(talla => talla.id === idTallaSeleccionada);
        const imagenSeleccionada = producto[0].imagenes.find(imagen => imagen.id === idColorSeleccionado);

        if ((!imagenSeleccionada && !tallaSeleccionada && producto[0].id == 0) || !imagenSeleccionada || producto[0].id == 0 || cantidadSeleccionada == 0) {
            return;
        }

        const { precioConDescuento } = calcularPrecioFinal(producto[0], imagenSeleccionada, tallaSeleccionada);

        const nuevoProducto: RegistrosPedido = {
            idProducto: producto[0].id,
            foto: imagenSeleccionada?.imagen || '',
            nombre: producto[0].nombre,
            color: imagenSeleccionada?.nombreColor || '',
            talla: tallaSeleccionada?.nombre || '-',
            cantidad: cantidadSeleccionada,
            precio: precioConDescuento,
            total: precioConDescuento * cantidadSeleccionada,
        };

        setSubTotal(subTotal + nuevoProducto.total);
        setProductosSeleccionado(prevProductos => [...prevProductos, nuevoProducto]);
        setCantidadSeleccionada(0);
        setIdColorSeleccionado(0);
        setIdTallaSeleccionada(0);
        setIdProducto(0);

    };

    const handle = () => {

    }

    return (
        <div className="AddPedido">
            <div className='AddProductos_Encabezado'>
                <h3> Agregar pedido</h3>
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
            <div className="AddProductos_buscar">
                <p>Para comenzar, por favor ingrese el número de documento del cliente al que se le va a realizar el pedido.</p>
                <StyledTextField
                    name='Documento'
                    label="Número de documento del cliente"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce tu número de documento del cliente'
                    value={documentoBuscar}
                    onChange={handleChange}
                />
                <Button
                    onClick={hadleGetUsuario}
                    variant="outlined"
                    size="small"
                    color="success"
                    startIcon={<IonIcon className='' icon={searchOutline} />}
                >
                    Buscar
                </Button>
            </div>
            {usuarioRegistrado == 1 ? (
                <div className="ViewPedidos_Content_right_informacionUsuario">
                    <ul>
                        <h2>Datos de facturación</h2>
                        <li>
                            <IonIcon className='icono' icon={personOutline} />
                            <div>
                                <h3>Cliente</h3>
                                <p>{usuario[0].nombre + ' ' + usuario[0].apellido}</p>
                                <p>{usuario[0].documento}</p>
                            </div>
                        </li>
                        <li>
                            <IonIcon className='icono' icon={mailOutline} />
                            <div>
                                <h3>Correo electrónico</h3>
                                <p>{usuario[0].correo}</p>
                            </div>
                        </li>
                        <li>
                            <IonIcon className='icono' icon={callOutline} />
                            <div>
                                <h3>Teléfono</h3>
                                <p>{usuario[0].celular}</p>
                            </div>
                        </li>
                        <li>
                            <IonIcon className='icono' icon={homeOutline} />
                            <div>
                                <h3>DIRECCIÓN</h3>
                                <p>{usuario[0].direccion}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            ) : usuarioRegistrado == 2 ? (
                <div className="AddPedido_Usuario">
                    <h4>Información del cliente </h4>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            Nombre: '',
                            Apellido: '',
                            tipoDocumento: '',
                            Documento: documentoBuscar,
                            Celular: '',
                            Correo: '',
                            FechaNacimiento: '',
                            departamento: '',
                            ciudad: '',
                            Direccion: '',
                            tipoVia: '',
                            Numero1: '',
                            Numero2: '',
                            Numero3: '',
                        }}
                        validate={(valor) => {
                            let errors: any = {};
                            if (!valor.Celular) {
                                errors.Celular = 'Campo obligatorio';
                            }

                            if (!valor.Correo) {
                                errors.Correo = 'Campo obligatorio';
                            }
                            return errors;
                        }}
                        onSubmit={handle}
                    >
                        {({ errors, values, setFieldValue, isSubmitting }) => (
                            <Form>
                                <div className="AddPedido_Usuario_Formulario">
                                    <p>Cliente no encontrado. Por favor, complete el formulario a continuación para continuar con el proceso.</p>
                                    <div className="AddPedido_Usuario_Input">
                                        <StyledTextField
                                            name='Nombre'
                                            label="Nombre"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce tu nombre'
                                            value={values.Nombre}
                                            onChange={(e) => setFieldValue('Nombre', e.target.value)}
                                        />
                                        <StyledTextField
                                            name='Apellido'
                                            label="Apellido"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce tus apellidos'
                                            value={values.Apellido}
                                            onChange={(e) => setFieldValue('Apellido', e.target.value)}
                                        />
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Tipo de documento"
                                            size="small"
                                            variant="outlined"
                                            value={values.tipoDocumento}
                                            onChange={(e) => setFieldValue('tipoDocumento', e.target.value)}
                                        >
                                            <MenuItem value=''>
                                                Seleccione
                                            </MenuItem>
                                            {tipoDocumentos && tipoDocumentos.map((option) => (
                                                <MenuItem key={option.idDocumento} value={option.idDocumento}>
                                                    {option.documento}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <StyledTextField
                                            name='Documento'
                                            label="Documento"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce tu número de documento'
                                            value={values.Documento}
                                            disabled={true}
                                            onChange={(e) => setFieldValue('Documento', e.target.value)}
                                        />
                                    </div>
                                    <div className="AddPedido_Usuario_Input">
                                        <StyledTextField
                                            name='Celular'
                                            label="Celular"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce tu número celular/Teléfoo'
                                            value={values.Celular}
                                            onChange={(e) => setFieldValue('Celular', e.target.value)}
                                        />
                                        <StyledTextField
                                            name='Correo'
                                            label="Correo"
                                            variant="outlined"
                                            size="small"
                                            placeholder='Introduce tu dirección de correo'
                                            value={values.Correo}
                                            onChange={(e) => setFieldValue('Correo', e.target.value)}
                                        />
                                    </div>
                                    <div className="AddPedido_Usuario_Input">
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
                                    <p>Dirección</p>
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
                                </div>
                                <ErrorMessage name='Correo' component={() => <p className='Error'>{errors.Correo}</p>} />
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : (
                <div className="AddPedido_img">
                    <img src={img} alt="" />
                </div>
            )}
            {usuarioRegistrado != 0 &&
                <div className="AddPedido_Productos">
                    <div className="AddPedido_Productos_Content">
                        <h2>Productos</h2>
                        <p>Por favor, seleccione los productos para agregar al pedido.</p>
                        <div>
                            <StyledTextField
                                id="outlined-select-currency"
                                select
                                name='producto'
                                label="Seleccione un producto"
                                size="small"
                                variant="outlined"
                                value={idProducto}
                                onChange={(e) => {
                                    setIdProducto(parseInt(e.target.value))
                                    hadleGetId(parseInt(e.target.value))
                                }}
                            >
                                <MenuItem value={0}>
                                    Seleccione
                                </MenuItem>
                                {dataProductos && dataProductos.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <div className="SelectImagen">
                                            <img src={`${services.url}/${option.foto}`} alt="" />
                                            {option.producto}
                                            <span className={
                                                option.Stock > 20 ? '' :
                                                    option.Stock > 0 ? 'pocoStock' :
                                                        'sinStock'
                                            }>
                                                {option.Stock} En stock
                                            </span>
                                        </div>
                                    </MenuItem>
                                ))}
                            </StyledTextField>
                            {producto.map((producto) => (
                                <div key={producto.id}>
                                    <div className='Checkout_Envio_Direccion_Ubicacion' >
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            name='cantidad'
                                            label="Cantidad"
                                            size="small"
                                            variant="outlined"
                                            value={cantidadSeleccionada}
                                            onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value))}
                                        >
                                            <MenuItem value={0}>
                                                Seleccione
                                            </MenuItem>
                                            {[...Array(producto.stock)].map((_, index) => (
                                                <MenuItem key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>

                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            name='talla'
                                            label="Talla"
                                            size="small"
                                            variant="outlined"
                                            disabled={producto.tallas.length > 0 ? false : true}
                                            value={idTallaSeleccionada}
                                            onChange={(e) => setIdTallaSeleccionada(parseInt(e.target.value))}
                                        >
                                            <MenuItem value={0}>
                                                Seleccione
                                            </MenuItem>
                                            {producto.tallas.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            name='color'
                                            label="Color"
                                            size="small"
                                            variant="outlined"
                                            value={idColorSeleccionado}
                                            onChange={(e) => setIdColorSeleccionado(parseInt(e.target.value))}
                                        >
                                            <MenuItem value={0}>
                                                Seleccione
                                            </MenuItem>
                                            {producto.imagenes.filter((colorItem, index) => {
                                                return producto.imagenes.findIndex((item) => item.color === colorItem.color) === index;
                                            }).map((colores, index) => (
                                                <MenuItem key={index} value={colores.id}>
                                                    <div className="SelectImagenColor">
                                                        <img src={`${services.url}/${colores.imagen}`} alt="" />
                                                        {colores.nombreColor}
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    </div>
                                    <div className="AddPedido_Productos_Content_boton">
                                        <Button
                                            onClick={handleAddProducto}
                                            variant="outlined"
                                            size="small"
                                            color="success"
                                            startIcon={<IonIcon className='' icon={bagAddOutline} />}
                                        >
                                            Agregar producto
                                        </Button>
                                    </div>
                                </div>

                            ))}
                            <h2>Productos agregados al pedido</h2>
                            <div className="AddPedido_Productos_Content_table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th> Color</th>
                                            <th> Talla</th>
                                            <th> Cantidad</th>
                                            <th> Precio</th>
                                            <th> Total</th>
                                            <th> Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productosSeleccionado.map((producto, index) => (
                                            <tr key={index} >
                                                <td className='tdImagenes'><img src={`${services.url}/${producto.foto}`} alt="" /><p>{producto.nombre}</p></td>
                                                <td>{producto.color}</td>
                                                <td>{producto.talla}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>${producto.precio.toLocaleString()}</td>
                                                <td>${producto.total.toLocaleString()}</td>
                                                <td>-</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="ViewPedidos_Content_right_subtotal">
                                <h4>Subtotal de artículos:</h4>
                                <h5>${subTotal.toLocaleString()}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="AddPedido_Productos_Total">
                        <h2>Resumen</h2>
                        <div className="Checkout_Content_Resumen_valores">
                            <h3><span>Subtotal:</span></h3>
                            <h3>${subTotal.toLocaleString()}</h3>
                        </div>
                        <div className="Checkout_Content_Resumen_valores">
                            <h3><span>Envío:</span></h3>
                            <h3>$0</h3>
                        </div>
                        <div className="Checkout_Content_Resumen_valores">
                            <h3><span>Descuento:</span></h3>
                            <h3>$33,000</h3>
                        </div>
                        <div className="Checkout_Content_Resumen_Tvalores AddCursos_Formulario-content_Totales">
                            <h3><span>Total:</span></h3>
                            <h3><span>$33,000</span></h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddPedido