export interface Producto {
    id: number;
    nombre: string;
    categorias: string;
    imagenes: Imagen[];
    aplicaDescuento: boolean;
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
    actualizar: boolean;
}

export interface AddProducto {
    id: number;
    idInventario: number;
    idCategoria: number;
    nombre: string;
    descripcion: string;
    informacion: string;
    tags: string;
    descuento: number;
    fechaFinDescuento: string;
    activo: boolean;
    idTercero: number;
    precioBase?: number;
    tallas: {};
    imagenes: {};
}

export interface viewProducto {
    id: number;
    idInventario: number;
    idCategoria: number;
    nombre: string;
    descripcion: string;
    informacion: string;
    tags: string;
    descuento: number;
    fechaFinDescuento: string;
    activo: boolean;
    idTercero: number;
    stock?: number;
    precioBase?: number;
    tallas: Talla[];
    imagenes: ImagenData[];
}

export interface InventarioSION {
    idInventario: number;
    codigo: string;
    nombre: string;
    precio: number;
}

export interface Favoritos {
    idDeseos: number;
    idProducto: number;
    idUsuario: number;
    fechaAgregado: string;
}