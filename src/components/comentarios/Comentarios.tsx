import { Rating } from "@mui/material";
import './Comentarios.css';
import { useEffect, useState } from "react";
import AddComentario from "./AddComentario";
import { Comentario } from "../../models/Comentario";
import { api } from "../../services";
import { services } from "../../models";
import img from '../../assets/img/SinComentarios.png'

interface Props {
    idProducto: number;
    cantidad?: (cantidad: number) => void;
    calificacion?: (promedio: number) => void;
}

const Comentarios: React.FC<Props> = (props) => {
    const [promedioCalificacion, setPromedioCalificacion] = useState<number | null>(null);
    const [verAddComentario, setVerAddComentario] = useState(false);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [comentariosVisibles, setComentariosVisibles] = useState<number>(3);

    useEffect(() => {
        setComentarios([]);
        haddleGet();
    }, [props.idProducto]);

    const handleVerAddComentario = () => {
        setVerAddComentario(!verAddComentario);
    };

    const haddleGet = async () => {
        try {
            const response = await api.get<Comentario[]>('Comentario/Get_Comentario', { idProducto: props.idProducto });
            if (response.data.length > 0) {
                const comentariosOrdenados = response.data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
                setComentarios(comentariosOrdenados);

                // Calcular el promedio de calificaciones
                const sumaCalificaciones = comentariosOrdenados.reduce((suma, comentario) => suma + comentario.calificacion, 0);
                const promedio = sumaCalificaciones / comentariosOrdenados.length;
                setPromedioCalificacion(promedio);
                props.calificacion?.(promedio);
                props.cantidad?.(comentariosOrdenados.length);
            }
        } catch (error) {
            setComentarios([]);
            setPromedioCalificacion(0);
            props.calificacion?.(0);
            props.cantidad?.(0);
        }
    };

    const cargarMasComentarios = () => {
        setComentariosVisibles(prev => prev + 3);
    };

    return (
        <div className='Comentarios'>
            <div className="Comentarios_Ranting">
                <h3>{promedioCalificacion?.toFixed(1)} <span> /5</span></h3>
                <Rating
                    name="half-rating-read"
                    max={5}
                    size="large"
                    readOnly
                    precision={0.5}
                    value={promedioCalificacion}
                />
                <h4>{comentarios.length} valoraciones</h4>
            </div>
            <div className="Comentarios_buton">
                <button onClick={handleVerAddComentario}>Califica este producto</button>
            </div>
            <div className="Comentarios_Content">
                {comentarios.length > 0 ? (
                    comentarios.slice(0, comentariosVisibles).map((comenta, index) => (
                        <div className="Comentarios_Content_Card" key={index}>
                            <div className="Comentarios_Content_Card_Head">
                                <Rating name="half-rating-read" defaultValue={comenta.calificacion} readOnly />
                                <h4>Por {comenta.nombreUsuario}</h4>
                            </div>
                            <h3>{new Date(comenta.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}, {new Date(comenta.fecha).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: false })} horas
                            </h3>
                            <p>{comenta.comentario}</p>
                            <div className="Comentarios_Content_Card_Imagenes">
                                {comenta.imagenes.length > 0 && comenta.imagenes.map((imagen, imgIndex) => (
                                    <img key={imgIndex} src={`${services.url}/${imagen.imagen}`} alt={comenta.comentario} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="Comentarios_SinComentarios">
                        <p>Este producto aún no tiene comentarios. ¡Sé el primero en hacer tu valoración y compartir tu experiencia!</p>
                        <img src={img} alt="" />
                    </div>
                )}

            </div>

            {comentariosVisibles < comentarios.length && (
                <div className="Comentarios_boton">
                    <button onClick={cargarMasComentarios}>Cargar más</button>
                </div>
            )}

            {verAddComentario && <AddComentario onClose={handleVerAddComentario} idProducto={props.idProducto} actualizarDatos={haddleGet} />}
        </div>
    );
}

export default Comentarios;
