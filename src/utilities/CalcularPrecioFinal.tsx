interface Producto {
    id: number;
    idInventario: number;
    nombre: string;
    descuento: number;
    fechaFinDescuento: string;
    precioBase?: number;
    imagenes: Imagen[];
    tallas: Talla[];
}

interface Talla {
    id: number;
    nombre: string;
    porcentaje: string;
    valor?: number;
}

interface Imagen {
    id: number;
    imagen: string;
    nombreImagen: string;
    nombreColor: string;
    color: string;
    porcentajeValor: string;
    actualizar: boolean;
}

const parsePercentage = (value: string): number => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
};

const calcularPrecioBase = (
    precioBase: number,
    porcentajeImagen: number,
    porcentajeTalla: number
): number => {
    return precioBase * (1 + (porcentajeImagen + porcentajeTalla) / 100);
};

const calcularPrecioConDescuento = (
    precio: number,
    descuento: number
): number => {
    return precio * (1 - descuento / 100);
};

export const calcularPrecioFinal = (
    producto: Producto,
    imagenSeleccionada?: Imagen,
    tallaSeleccionada?: Talla
): { precioFinalSinDescuento: number; precioConDescuento: number } => {
    if (producto.precioBase === undefined) {
        throw new Error("El precio base del producto no está definido.");
    }

    let descuento = 0;
    const fechaActual = new Date();
    const fechaLimite = new Date(producto.fechaFinDescuento);

    if (fechaActual <= fechaLimite) {
        descuento = producto.descuento;
    }

   
    const porcentajeImagen = imagenSeleccionada ? parsePercentage(imagenSeleccionada.porcentajeValor) : 0;
    const porcentajeTalla = tallaSeleccionada ? parsePercentage(tallaSeleccionada.porcentaje) : 0;

    const precioFinalSinDescuento = calcularPrecioBase(
        producto.precioBase,
        porcentajeImagen,
        porcentajeTalla
    );

    const precioConDescuento = calcularPrecioConDescuento(
        precioFinalSinDescuento,
        descuento
    );

    return {
        precioFinalSinDescuento,
        precioConDescuento,
    };
};
