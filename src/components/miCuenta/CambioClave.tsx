import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { StyledTextField } from "../../utilities/SelectProps";
import { BotonSubmit } from "../boton";
import { useState } from "react";
import { api } from "../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/Store";


const CambioClave = () => {
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((store: AppStore) => store.user);

    const handleIniciar = async (values: FormikValues) => {
        setIsLoading(true);
        try {

            const objecto =
            {
                idUsuario: user.idUsuario,
                password: values.contraseña
            };
            // Solicitud POST
            const response = await api.put<any>('Usuario/Put_Actualizar_contrasena', objecto);

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
                    contraseña: '',
                    contraseñados: '',
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (!values.contraseña) {
                        errors.contraseña = '* Nueva contraseña requerida';
                    } else {
                        if (!/(?=.*[A-Z])/.test(values.contraseña)) {
                            errors.contraseña = '* Debe contener al menos una mayúscula';
                        }
                        if (!/(?=.*\d)/.test(values.contraseña)) {
                            errors.contraseña = '* Debe contener al menos un número';
                        }
                        if (values.contraseña.length < 8) {
                            errors.contraseña = '* Debe tener una longitud mayor a 7 caracteres';
                        }

                        if (
                            !/(?=.*[A-Z])(?=.*\d).{8,}/.test(values.contraseña) &&
                            !errors.contraseña // Verificar si no hay errores individuales ya establecidos
                        ) {
                            errors.contraseña = '* La contraseña debe contener al menos una mayúscula, un número y tener una longitud mayor a 7 caracteres';
                        }
                    }

                    if (values.contraseñados !== values.contraseña) {
                        errors.contraseñados = '* Las contraseñas no coinciden';
                    } else if (!values.contraseñados) {
                        errors.contraseñados = '  * Confirme la nueva contraseña';
                    }
                    return errors;
                }}
                onSubmit={handleIniciar}
            >
                {({ errors, values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <>
                            <div className={`Login_content_body-input ${errors.contraseña ? 'Input_Error' : ''}`}>
                                <StyledTextField
                                    type='password'
                                    name='contraseña'
                                    label="Contraseña"
                                    variant="outlined"
                                    size="small"
                                    placeholder='Introduce tu contraseña'
                                    value={values.contraseña}
                                    onChange={(e) => setFieldValue('contraseña', e.target.value)}
                                />
                                <ErrorMessage name='contraseña' component={() => <p className='Error'>{errors.contraseña}</p>} />
                            </div>
                            <div className={`Login_content_body-input ${errors.contraseña ? 'Input_Error' : ''}`}>
                                <StyledTextField
                                    type='password'
                                    name='contraseñados'
                                    label="Confirmar contraseña"
                                    variant="outlined"
                                    size="small"
                                    placeholder='Introduce tu contraseña'
                                    value={values.contraseñados}
                                    onChange={(e) => setFieldValue('contraseñados', e.target.value)}
                                />
                                <ErrorMessage name='contraseñados' component={() => <p className='Error'>{errors.contraseñados}</p>} />
                            </div>
                        </>

                        <BotonSubmit texto={'Cambiar contraseña'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleIniciar} color="continuar" />
                        <p className='Login_Respuesta'>{msg}</p>
                    </Form>
                )}
            </Formik></div>
    )
}

export default CambioClave