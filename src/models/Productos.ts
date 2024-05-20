export interface Producto {
    id: number;
    nombre: string;
    categorias: string;
    imagenes: Imagen[];
    Bitdescuento: boolean;
    descuento: string;
    nuevo: boolean;
}

export interface Imagen {
    imagenUno: string;
    imagenDos: string;
}

export interface Talla {
    id: number;
    nombre: string;
    porcentaje: string;
    valor?: number;
}

export interface ImagenData {
    id: number;
    imagen: string;
    nombreImagen: string;
    nombreColor: string;
    color: string;
    porcentajeValor: string;
}

export interface AddProducto {
    id: number;
    idProducto: string;
    activo: boolean;
    nombre: string;
    descripcionCorta: string;
    descripcion: string;
    preciobase: number;
    porcentajeDescuento: string;
    precioFinal: string;
    fechaDescuento: string;
    categoría: string;
    tag: {};
    tallas: {};
    imagenes: {};
}