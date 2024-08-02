import styled from '@emotion/styled';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../../../../services';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { Monto } from '../../../../../models/Monto';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../../redux/Store';
interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idMonto: number;
}

const AddMonto : React.FC<Props> = (props) =>  {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<Monto>();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const usuario = useSelector((store: AppStore) => store.user);


    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    useEffect(() => {
        if (props.idMonto > 0) {
            hadleGetId();
        }
    }, [props.idMonto]);

    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    const hadleGetId = async () => {
        try {
            const response = await api.get<Monto[]>('Generales/Get_Monto', { IdMonto: props.idMonto });
            if (response.data.length > 0) {
                setData({
                    idMonto: response.data[0].idMonto,
                    valorMonto: response.data[0].valorMonto,
                    fechaActualizacion: response.data[0].fechaActualizacion,
                    idUsuarioActualizador: response.data[0].idUsuarioActualizador,
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

            const registro: Monto = {
                idMonto: props.idMonto,
                valorMonto: values.ValorMonto,
                fechaActualizacion: new Date(),
                idUsuarioActualizador: usuario.idUsuario,
            };

            if (values.id > 0) {
                await api.put<any>('Generales/Put_Actualizar_Monto', registro);
            } else {
                await api.post<any>('Generales/Put_Actualizar_Monto', registro);
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
                        <h4>{props.idMonto == 0 ? ('Registrar cupón') : ('Actualizar cupón')}</h4>
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
                                {props.idMonto == 0 ? (
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
                                id: props.idMonto,
                                ValorMonto: data?.valorMonto || '',
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.ValorMonto) {
                                    errors.ValorMonto = 'Campo requerido';
                                }
                                return errors;
                            }}
                            onSubmit={handleRegistrar}
                        >
                            {({ errors, values, setFieldValue }) => (
                                <Form>
                                    <div className='Configuracion_Body'>
                                        
                                        <div className='Configuracion_Formuario-input'>
                                            <StyledTextField
                                                name='ValorMonto'
                                                label="Valor de monto"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el valor del monto'
                                                value={values.ValorMonto}
                                                onChange={(e) => setFieldValue('ValorMonto', e.target.value)}
                                            />
                                            <ErrorMessage name='ValorMonto' component={() => <p className='Error'>{errors.ValorMonto}</p>} />
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
                    {props.idMonto == 0 ? (
                        "Cupón guardada exitosamente!"
                    ) : (
                        "Cupón actualizada exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
  )
}

export default AddMonto