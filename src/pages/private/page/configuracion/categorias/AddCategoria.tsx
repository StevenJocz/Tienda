
import '../Configuracion.css'
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from "@mui/material";
import { api } from "../../../../../services";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { IonIcon } from "@ionic/react";
import { closeOutline, saveOutline, paperPlaneOutline, cloudUploadOutline } from 'ionicons/icons';
import { Categoria } from '../../../../../models/categoria';
import { services } from '../../../../../models';

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idCategoria: number;
}

const AddCategoria: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<Categoria>();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const Imagenes_URL = services.url; 
    
    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    useEffect(() => {
        if (props.idCategoria > 0) {
            hadleGetId();
        }
    }, [props.idCategoria]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<Categoria[]>('Categoria/Get_Id_Categoria', {idCategoria: props.idCategoria });
            if (response.data.length > 0) {
                setData({
                    idCategoria: response.data[0].idCategoria,
                    nombre: response.data[0].nombre,
                    titulo: response.data[0].titulo,
                    descripcion: response.data[0].descripcion,
                    imagen: response.data[0].imagen,
                    activo: response.data[0].activo, 
                    idTercero: response.data[0].idTercero,
                    fechaCreacion: response.data[0].fechaCreacion,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedImageBase64, setSelectedImageBase64] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTextareaDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            if (imageFiles.length > 0) {
                const imageUrl = URL.createObjectURL(imageFiles[0]);
                setSelectedImage(imageUrl);
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        const base64Image = e.target.result as string;
                        setSelectedImageBase64(base64Image);
                    }
                };
                reader.readAsDataURL(files[0]);
            }
        }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const imageUrl = URL.createObjectURL(files[0]);
            setSelectedImage(imageUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const base64Image = e.target.result as string;
                    setSelectedImageBase64(base64Image);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleClickImagen = () => {
        fileInputRef.current?.click();
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsSubmitting(true);
        try {
            // Solicitud POST

            const registroCategoria: Categoria = {
                idCategoria: values.id,
                nombre: values.nombre,
                titulo: values.titulo,
                descripcion: values.descripcion,
                imagen: selectedImageBase64,
                activo: values.activo,
                idTercero: 1,
                fechaCreacion: new Date(),
            };
            if (values.id > 0) {
                await api.put<any>('Categoria/Put_Actualizar_Categoria', registroCategoria);
            } else {
                await api.post<any>('Categoria/Post_Crear_Categoria', registroCategoria);
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
                    <h4>{props.idCategoria == 0 ? ('Registrar categoría') : ('Actualizar categoría')}</h4>
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
                                {props.idCategoria == 0 ? (
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
                                id: props.idCategoria,
                                nombre: data?.nombre || '',
                                titulo: data?.titulo || '',
                                descripcion: data?.descripcion || '',
                                activo: data?.activo || false,
                                imagen: data?.imagen || '',
                            }}
                            validate={(valor) => {

                                let errors: any = {};


                                if (!valor.nombre) {
                                    errors.nombre = 'Campo requerido';
                                }

                                if (!valor.titulo) {
                                    errors.titulo = 'Campo requerido';
                                }

                                if (!valor.descripcion) {
                                    errors.descripcion = 'Campo requerido';
                                }
                                
                                if (valor.id == 0 && selectedImageBase64 == '') {
                                    errors.imagen = 'Campo requerido';
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
                                                label="Título categoría"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el título de la categorias'
                                                value={values.titulo}
                                                onChange={(e) => setFieldValue('titulo', e.target.value)}
                                            />
                                            <ErrorMessage name='titulo' component={() => <p className='Error'>{errors.titulo}</p>} />
                                        </div>
                                        <div className='Configuracion_Formuario-input'>
                                            <StyledTextField
                                                name='descripcion'
                                                label="Descripción categoría"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce una descripción a categorias'
                                                value={values.descripcion}
                                                onChange={(e) => setFieldValue('descripcion', e.target.value)}
                                            />
                                            <ErrorMessage name='descripcion' component={() => <p className='Error'>{errors.descripcion}</p>} />
                                        </div>
                                        <div className='Configuracion_Formuario-input'>
                                            <StyledTextField
                                                name='titulo'
                                                label="Nombre categoría"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el nombre de la categorias'
                                                value={values.nombre}
                                                onChange={(e) => setFieldValue('nombre', e.target.value)}
                                            />
                                            <ErrorMessage name='nombre' component={() => <p className='Error'>{errors.nombre}</p>} />
                                        </div>
                                        <div className='Configuracion_Formuario-imagen'>
                                            <div
                                                className={`AddImagenes_Formulario--dropzone Configuracion_Formuario-imagen-Cargar ${isDragging ? 'dragging' : ''}`}
                                                onDrop={handleTextareaDrop}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                                onClick={handleClickImagen}
                                            >
                                                <IonIcon className='icono' icon={cloudUploadOutline} />
                                                <p>Arrastra una imagen aquí o</p>
                                                <span>Selecciona</span>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <div className='Configuracion_Formuario-imagen-view'>
                                                <img src={selectedImage || Imagenes_URL +'/'+ data?.imagen} alt="" />
                                            </div>
                                        </div>
                                        <ErrorMessage name='imagen' component={() => <p className='Error'>{errors.imagen}</p>} />
                                    </div>
                                    <button
                                        type="submit"
                                        style={{ display: 'none' }}
                                        ref={submitButtonRef}
                                    >
                                        enviar
                                    </button>
                                    <i className='mensaje'>{msg}</i>
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
                    {props.idCategoria == 0 ? (
                        "¡Categoría guardada exitosamente!"
                    ) : (
                        "¡Categoría actualizada exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddCategoria