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