
import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { closeOutline, homeOutline, checkmarkCircleOutline } from "ionicons/icons";
import { Ubicacion, Usuario } from "../../models";
import { api } from "../../services";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { StyledTextField } from "../../utilities/SelectProps";
import { MenuItem } from "@mui/material";
import { BotonSubmit } from "../boton";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/Store";

interface Props {
    data: Usuario;
}
const CambiarDireccion: React.FC<Props> = (props) => {
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((store: AppStore) => store.user);
    const [cambiarDireccion, setCambiarDireccion] = useState(false);
    const [departamento, setDepartamento] = useState<Ubicacion[]>();
    const [municipio, setMunicipio] = useState<Ubicacion[]>();
    const [tipoVia, setTipoVia] = useState<Ubicacion[]>();
    const [direccion, setDireccion] = useState('');

    useEffect(() => {
        hadleGetUbicacion(2, 36);
        hadleGetUbicacion(3, props.data.idDepartamento);
        hadleGetUbicacion(4, 0);
        setDireccion(props.data.direccion)
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

    useEffect(() => {

    }, [direccion]);

    const handleDireccion = (values: FormikValues) => {
        setDireccion(values.tipoVia + ' ' + values.Numero1 + ' # ' + values.Numero2 + ' - ' + values.Numero3);
        handdleCambiarDireccion();
    }

    const handdleCambiarDireccion = () => {
        setCambiarDireccion(!cambiarDireccion);
    }

    const handleActualizar = async (values: FormikValues) => {
        setIsLoading(true);
        const usuario: Usuario = {
            idUsuario: user.idUsuario,
            idTipoUsuario: 0,
            nombre: "0",
            apellido: "0",
            idTipoDocumento: 0,
            documento: "0",
            fechaNacimiento: props.data.fechaNacimiento,
            celular: props.data.celular,
            idPais: 0,
            idDepartamento: values.departamento,
            idMunicipio: values.ciudad,
            direccion: values.Direccion,
            correo: "",
            password: "",
            fechaRegistro: new Date(),
        }
        console.log(usuario);

        try {

            // Solicitud POST
            const response = await api.put<any>(`Usuario/Put_Actualizar_Usuario?Accion=2`, usuario);
            if (response.data.resultado === true) {
                setMsg(response.data.mensaje);
            } else {
                setMsg(response.data.mensaje);
            }
            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    departamento: props.data.idDepartamento || '',
                    ciudad: props.data.idMunicipio || '',
                    Direccion: direccion

                }}
                validate={(valor) => {
                    let errors: any = {};
                    if (!valor.Direccion || !valor.ciudad || !valor.departamento) {
                        errors.Direccion = 'Campo obligatorio';
                    }

                    return errors;
                }}
                onSubmit={handleActualizar}
            >
                {({ errors, values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <>
                            <div className='MiCuenta_Content_input'>
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
                                <StyledTextField
                                    name='Direccion'
                                    label="Direccion"
                                    variant="outlined"
                                    size="small"
                                    placeholder='Introduce tus direccion de domicilio'
                                    value={values.Direccion}
                                    onChange={(e) => setFieldValue('Direccion', e.target.value)}
                                    disabled={true}
                                />
                                <span
                                    className='MiCuenta_Content_CambiarDireccion'
                                    onClick={handdleCambiarDireccion}>
                                    <IonIcon className='icono' icon={cambiarDireccion ? closeOutline : homeOutline} />
                                    {cambiarDireccion ? 'Cancelar' : 'Cambiar de dirección'}
                                </span>
                            </div>
                        </>
                        {!cambiarDireccion &&
                            <>
                                <ErrorMessage name='Direccion' component={() => <p className='Error'>{errors.Direccion}</p>} />
                                <BotonSubmit texto={'Actualizar'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleActualizar} color="continuar" />
                                <p className='Login_Respuesta'>{msg}</p>
                            </>
                        }
                    </Form>
                )}
            </Formik>
            {cambiarDireccion &&
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        tipoVia: '',
                        Numero1: '',
                        Numero2: '',
                        Numero3: '',

                    }}
                    validate={(valor) => {
                        let errors: any = {};

                        if (!valor.tipoVia || !valor.Numero1 || !valor.Numero2 || !valor.Numero3) {
                            errors.tipoVia = 'Campo obligatorio';
                        }

                        return errors;
                    }}
                    onSubmit={handleDireccion}
                >
                    {({ errors, values, setFieldValue, isSubmitting }) => (
                        <Form>
                            <>
                                <div className='MiCuenta_Content_input'>
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
                            </>
                            <ErrorMessage name='tipoVia' component={() => <p className='Error'>{errors.tipoVia}</p>} />
                            <div className='MiCuenta_Content_Direccion_Cambio'>
                                <button
                                    onClick={() => isSubmitting}
                                >
                                    <IonIcon className='icono' icon={checkmarkCircleOutline} />
                                    Cambiar
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            }
        </>
    )
}

export default CambiarDireccion