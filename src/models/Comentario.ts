export interface ComentarioImagen {
    idComentarioImagen: number;
    idComentario: number;
    imagen: string; // Base64 encoded string of the image
}

export interface Comentario {
    idComentario: number;
    idProducto: number;
    nombreUsuario?: string;
    idUsuario: number;
    comentario: string;
    fecha: Date; // ISO 8601 date string
    calificacion: number; // Rating value
    imagenes: ComentarioImagen[];
}