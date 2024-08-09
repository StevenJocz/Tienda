export interface PedidoRegistro {
    idPedido_Registro: number;
    idPedido: number;
    idProducto: number;
    idInventario: number;
    cantidad: number;
    nombre: string;
    color: string;
    talla: string;
    ValorUnidad: number;
}

export interface Pedido {
    idUsuario: number;
    subTotal: number;
    valorEnvio: number;
    idCupon: number;
    valorDescuento: number;
    valorTotal: number;
    tipoEntrega: string;
    direccion: string;
    complemento: string;
    barrio: string;
    destinatario: string;
    responsable: string;
    registros: PedidoRegistro[];
}