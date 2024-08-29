import { useEffect, useState } from "react";
import { tipoDocumento, Usuario } from "../../models";
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

const InformacionPersonal: React.FC<Props> = (props) => {
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tipoDocumentos, setTipoDocumentos] = useState<tipoDocumento[]>();
    const user = useSelector((store: AppStore) => store.user);

    useEffect(() => {
        hadleGetTipoDocumentos();

    }, []);

    const hadleGetTipoDocumentos = async () => {
        const response = await api.get<tipoDocumento[]>('Generales/Get_TipoDocumento');
        if (response.data) {
            await setTipoDocumentos(response.data);
        };
    }

    const handleActualizar = async (values: FormikValues) => {
        setIsLoading(true);
        const usuario: Usuario = {
            idUsuario: user.idUsuario,
            idTipoUsuario: 2,
            nombre: values.Nombre,
            apellido: values.Apellido,
            idTipoDocumento: values.tipoDocumento,
            documento: values.Documento,
            fechaNacimiento: values.FechaNacimiento,
            celular: values.Celular,
            idPais: 0,
            idDepartamento: 0,
            idMunicipio: 0,
            direccion: "",
            correo: values.Correo,
            password: "",
            fechaRegistro: new Date(),
        }

        try {

            // Solicitud POST
            const response = await api.put<any>(`Usuario/Put_Actualizar_Usuario?Accion=1`, usuario);
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
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    Nombre: props.data.nombre,
                    Apellido: props.data.apellido,
                    tipoDocumento: props.data.idTipoDocumento,
                    Documento: props.data.documento,
                    Celular: props.data.celular,
                    Correo: props.data.correo,
                    FechaNacimiento: new Date(props.data.fechaNacimiento).toISOString().split('T')[0],

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
                onSubmit={handleActualizar}
            >
                {({ errors, values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <>
                            <div className='MiCuenta_Content_input'>

                                <StyledTextField
                                    name='Nombre'
                                    label="Nombre"
                                    variant="outlined"
                                    size="small"
                                    placeholder='Introduce tu nombre'
                                    value={values.Nombre}
                                    onChange={(e) => setFieldValue('Nombre', e.target.value)}
                                    disabled={true}
                                />
                                <StyledTextField
                                    name='Apellido'
                                    label="Apellido"
                                    variant="outlined"
                                    size="small"
                                    placeholder='Introduce tus apellidos'
                                    value={values.Apellido}
                                    onChange={(e) => setFieldValue('Apellido', e.target.value)}
                                    disabled={true}
                                />
                                <StyledTextField
                                    id="outlined-select-currency"
                                    select
                                    label="Tipo de documento"
                                    size="small"
                                    variant="outlined"
                                    value={values.tipoDocumento}
                                    onChange={(e) => setFieldValue('tipoDocumento', e.target.value)}
                                    disabled={true}
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
                                    onChange={(e) => setFieldValue('Documento', e.target.value)}
                                    disabled={true}
                                />
                                <StyledTextField
                                    name='FechaNacimiento'
                                    label="Fecha de Nacimiento"
                                    variant="outlined"
                                    size="small"
                                    placeholder='Introduce tu fecha de nacimiento'
                                    value={values.FechaNacimiento}
                                    onChange={(e) => setFieldValue('FechaNacimiento', e.target.value)}
                                    disabled={true}
                                />

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
                        </>
                        <ErrorMessage name='Correo' component={() => <p className='Error'>{errors.Correo}</p>} />
                        <BotonSubmit texto={'Actualizar'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleActualizar} color="continuar" />
                        <p className='Login_Respuesta'>{msg}</p>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default InformacionPersonal