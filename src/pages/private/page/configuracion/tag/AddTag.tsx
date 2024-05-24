import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import '../Configuracion.css'
import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../../../../services';
import { Tag } from '../../../../../models/tag';

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idTag: number;
}

const AddTag: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<Tag>();
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    useEffect(() => {
        if (props.idTag > 0) {
            hadleGetId();
        }
    }, [props.idTag]);

    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    const hadleGetId = async () => {
        try {
            const response = await api.get<Tag[]>('Tag/Get_Id_Tag', { idTag: props.idTag });
            if (response.data.length > 0) {
                setData({
                    idTag: response.data[0].idTag,
                    tag: response.data[0].tag,
                    activo: response.data[0].activo,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    };



    const handleRegistrar = async (values: FormikValues) => {
        setIsSubmitting(true);
        try {
            // Solicitud POST

            const registroCategoria: Tag = {
                idTag: props.idTag,
                tag: values.nombre,
                activo: values.activo,
            };

            console.log(registroCategoria)

            if (values.id > 0) {
                await api.put<any>('Tag/Put_Actualizar_Tag', registroCategoria);
            } else {
                await api.post<any>('Tag/Post_Crear_Tag', registroCategoria);
            }
            setOpenSnackbar(true);
        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);

        setIsSubmitting(false);
        if (props.actualizarDatos) {
            props.actualizarDatos();
        }
        props.mostrarRegistro();
    };

    return (
        <>
            <div className='Configuracion_Modal'>
                <div className='Configuracion_Modal-Content'>
                    <div className="Configuracion_Modal_Encabezado">
                        <h4>Registrar categoría</h4>
                        <div>
                            <Button
                                onClick={() => props.mostrarRegistro()}
                                variant="outlined"
                                size="small"
                                startIcon={<IonIcon className='' icon={closeOutline} />}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                startIcon={isSubmitting == true ? (<IonIcon className='' icon={paperPlaneOutline} />) : (<IonIcon className='' icon={saveOutline} />)}
                                disabled={isSubmitting}
                                onClick={handleClick}
                            >
                                {props.idTag == 0 ? (
                                    isSubmitting == true ? ('Registrando...') : ('Registrar')
                                ) : (
                                    isSubmitting == true ? ('Actualizando...') : ('Actualizar')
                                )}

                            </Button>
                        </div>

                    </div>
                    <div className="AddCursos_Formulario">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                id: props.idTag,
                                nombre: data?.tag || '',
                                activo: data?.activo || false,
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.nombre) {
                                    errors.nombre = 'Campo requerido';
                                }
                                return errors;
                            }}
                            onSubmit={handleRegistrar}
                        >
                            {({ errors, values, setFieldValue }) => (
                                <Form>
                                    <div className='Configuracion_Body'>
                                        <div className='Configuracion_Formuario-check '>
                                            <Tooltip title="Activo/No activo" placement="top" disableInteractive>
                                                <Checkbox
                                                    checked={values.activo}
                                                    onChange={() => setFieldValue('activo', !values.activo)}
                                                />
                                            </Tooltip>
                                            <p>{values.activo ? 'Activo' : 'No activo'}</p>
                                        </div>
                                        <div className='Configuracion_Formuario-input'>
                                            <StyledTextField
                                                name='titulo'
                                                label="Nombre Tag"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el nombre de la categorias'
                                                value={values.nombre}
                                                onChange={(e) => setFieldValue('nombre', e.target.value)}
                                            />
                                            <ErrorMessage name='nombre' component={() => <p className='Error'>{errors.nombre}</p>} />
                                        </div>

                                        <button
                                            type="submit"
                                            style={{ display: 'none' }}
                                            ref={submitButtonRef}
                                        >
                                            enviar
                                        </button>
                                        <i className='mensaje'>{msg}</i>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.idTag == 0 ? (
                        "¡Categoría guardada exitosamente!"
                    ) : (
                        "¡Categoría actualizada exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
    )
}


export default AddTag