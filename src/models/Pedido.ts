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
    imagen: string;
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


export interface RegistrosPedido {
    idProducto: number;
    foto: string;
    nombre: string;
    color: string;
    talla: string;
    cantidad: number;
    precio: number;
    total: number;
}

export interface UsuarioPedido {
    idUsuario: number;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
}

export interface EnvioPedido {
    idEnvio: number;
    tipoEntrega: string;
    direccion: string;
    barrio: string;
    complemento: string;
    destinatario: string;
    responsable: string;
}

export interface PedidoVista {
    idPedido: number;
    orden: number;
    idEstadoPedido: number;
    idEstadoEnvio: number;
    fechaRegistro: string;
    subTotal: number;
    valorEnvio: number;
    descuento: number;
    total: number;
    registros: RegistrosPedido[];
    usuarios: UsuarioPedido;
    envio: EnvioPedido;
}

export interface EstadoPedidos {
    idPedido: number;
    idEstadoPedido: number;
    idEstadoEnvio: number;
}