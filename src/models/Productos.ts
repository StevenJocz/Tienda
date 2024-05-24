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
    idInventario: string;
    idcategoria: string;
    nombre: string;
    descripcion: string;
    informacion: string;
    tags: string;
    descuento: string;
    fechaFinDescuento: string;
    activo: boolean;
    tallas: {};
    imagenes: {};
}

export interface InventarioSION {
    idInventario: number;
    codigo: string;
    nombre: string;
    precio: number;

}