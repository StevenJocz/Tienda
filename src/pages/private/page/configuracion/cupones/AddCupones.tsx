import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import '../Configuracion.css'
import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../../../../services';
import { Cupones } from '../../../../../models/Cupones';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idCupon: number;
}


const AddCupones: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<Cupones>();
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    useEffect(() => {
        if (props.idCupon > 0) {
            hadleGetId();
        }
    }, [props.idCupon]);

    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    const hadleGetId = async () => {
        try {
            const response = await api.get<Cupones[]>('Generales/Get_Id_Cupones', { IdCupon: props.idCupon });
            if (response.data.length > 0) {
                setData({
                    idCupon: response.data[0].idCupon,
                    textoCupon: response.data[0].textoCupon,
                    valorCupon: response.data[0].valorCupon,
                    fechaLimite: response.data[0].fechaLimite,
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

            const registro: Cupones = {
                idCupon: props.idCupon,
                textoCupon: values.TextoCupon,
                valorCupon: values.ValorCupon,
                fechaLimite: values.FechaLimite,
                activo: values.activo,
            };

            if (values.id > 0) {
                await api.put<any>('Generales/Put_Actualizar_Cupones', registro);
            } else {
                await api.post<any>('Generales/Post_Crear_Cupon', registro);
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
                        <h4>{props.idCupon == 0 ? ('Registrar cupón') : ('Actualizar cupón')}</h4>
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
                                {props.idCupon == 0 ? (
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
                                id: props.idCupon,
                                TextoCupon: data?.textoCupon || '',
                                ValorCupon: data?.valorCupon || '',
                                FechaLimite:data?.fechaLimite ? dayjs(data?.fechaLimite) : null, 
                                activo: data?.activo || false,
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.TextoCupon) {
                                    errors.TextoCupon = 'Campo requerido';
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
                                                name='TextoCupon'
                                                label="Cupón"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el cupón'
                                                value={values.TextoCupon}
                                                onChange={(e) => setFieldValue('TextoCupon', e.target.value)}
                                            />
                                            <ErrorMessage name='TextoCupon' component={() => <p className='Error'>{errors.TextoCupon}</p>} />
                                            <StyledTextField
                                                name='ValorCupon'
                                                label="Valor"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el valor de cupón'
                                                value={values.ValorCupon}
                                                onChange={(e) => setFieldValue('ValorCupon', e.target.value)}
                                            />
                                            <ErrorMessage name='ValorCupon' component={() => <p className='Error'>{errors.ValorCupon}</p>} />
                                        </div>
                                        <div className='Configuracion_Formuario-input  input_fecha_login'>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        className='Pickers'
                                                        label="Fecha limite"
                                                        value={values.FechaLimite}
                                                        onChange={(date) => setFieldValue('FechaLimite', date)}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <ErrorMessage name='FechaLimite' component={() => <p className='Error'>{errors.FechaLimite}</p>} />
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
                    {props.idCupon == 0 ? (
                        "Cupón guardada exitosamente!"
                    ) : (
                        "Cupón actualizada exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddCupones