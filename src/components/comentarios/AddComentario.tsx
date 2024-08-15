import './AddComentario.css';
import { IonIcon } from '@ionic/react';
import { Button, Checkbox, Rating } from '@mui/material';
import { closeOutline, cloudUploadOutline } from "ionicons/icons";
import { useRef, useState } from 'react';
import { StyledTextField } from '../../utilities/SelectProps';
import { Comentario } from '../../models/Comentario';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/Store';
import { api } from '../../services';

interface Props {
    onClose: () => void;
    idProducto: number;
    actualizarDatos?: () => void;
}

interface ImageData {
    url: string;
    base64: string;
}

const AddComentario: React.FC<Props> = (props) => {
    const usuario = useSelector((store: AppStore) => store.user);
    const [mensaje, setMensaje] = useState('');
    const [comentario, setComentario] = useState('');
    const [value, setValue] = useState<number | null>(1);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [esAnonimo, setEsAnonimo] = useState<boolean>(false);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleClickImagen = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMensaje('');
        const files = event.target.files;
        if (files && files.length > 0) {
            const newImages: ImageData[] = [];
            const existingImageCount = selectedImages.length;

            if (existingImageCount + files.length > 3) {
                setMensaje('Solo puedes agregar un máximo de 3 imágenes.');
                return;
            }

            Array.from(files).forEach(file => {
                const imageUrl = URL.createObjectURL(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        const base64Image = e.target.result as string;
                        newImages.push({ url: imageUrl, base64: base64Image });

                        if (newImages.length === files.length) {
                            setSelectedImages(prevImages => [...prevImages, ...newImages]);
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleTextareaDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        setMensaje('');
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const newImages: ImageData[] = [];
            const existingImageCount = selectedImages.length;

            if (existingImageCount + files.length > 3) {
                setMensaje('Solo puedes agregar un máximo de 3 imágenes.');
                return;
            }

            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const imageUrl = URL.createObjectURL(file);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target) {
                            const base64Image = e.target.result as string;
                            newImages.push({ url: imageUrl, base64: base64Image });

                            if (newImages.length === files.length) {
                                setSelectedImages(prevImages => [...prevImages, ...newImages]);
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };


    const handleRegistrar = async () => {
        const Objcomentario: Comentario = {
            idComentario: 0,
            idProducto: props.idProducto,
            idUsuario: esAnonimo ? 0 : (usuario.idUsuario == null ? 0 : usuario.idUsuario),
            comentario: comentario,
            fecha: new Date(),
            calificacion: value || 0,
            imagenes: selectedImages.map((image, index) => ({
                idComentarioImagen: index + 1,
                idComentario: 0,
                imagen: image.base64,
            })),
        };

        try {

            // Solicitud POST
            const response = await api.post<any>('Comentario/Post_Agregar_Comentario', Objcomentario);
            if (response.data.resultado === true) {
                props.onClose();
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setMensaje('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
        }
    };


    return (
        <div className="AddComentario">
            <div className="AddComentario_Content">
                <div className='AddComentario_Content--encabezado'>
                    <h3>Tu calificación</h3>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <div className='AddComentario_Content--Calificacion'>
                    <Rating
                        name="half-rating-read"
                        max={5}
                        size="large"
                        value={value}
                        onChange={(_, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
                <div className='AddComentario_Content--Calificacion'>
                    <h3>Tu opinión</h3>
                    <StyledTextField
                        name='opinion'
                        label="Escribe tu opinión aquí"
                        variant="outlined"
                        size="small"
                        placeholder='Escribe tu opinión aquí'
                        multiline
                        rows={4}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </div>
                {selectedImages.length > 0 && (
                    <div className='AddComentario_Content--Calificacion_imagenes'>
                        {selectedImages.map((image, index) => (
                            <div key={index} className="AddComentario_Content--Calificacion_imagen">
                                <img src={image.url} alt={`selected-${index}`} />
                                <IonIcon
                                    className="icono eliminar-imagen"
                                    icon={closeOutline}
                                    onClick={() => handleRemoveImage(index)}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <p className='AddComentario_Content--Calificacion_Mensaje'>{mensaje}</p>
                <div className={`AddComentario_Content--Calificacion--dropzone ${isDragging ? 'dragging' : ''}`}
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
                        multiple  // Permite seleccionar múltiples archivos
                    />
                </div>
                <div className='AddComentario_Content_footer'>
                    <div className='AddComentario_Content_footer_left'>
                        <Checkbox
                            {...label}
                            color="success"
                            checked={esAnonimo}
                            onChange={(event) => setEsAnonimo(event.target.checked)}
                        />
                        <p>Anónimamente</p>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleRegistrar}
                        >
                            Agregar comentario

                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddComentario;
