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
    cliente: Cliente
    subTotal: number;
    valorEnvio: number;
    idCupon: number;
    valorDescuento: number;
    valorTotal: number;
    tipoEntrega: string;
    registros: PedidoRegistro[];
}

export interface Cliente {
    correo: string;
    apellidos: string;
    nombres: string;
    tipoDocumento: number;
    documento: string;
    celular: string;
    genero: number;
    pais: number;
    departamento: number;
    ciudad: number;
    tipoVia: number;
    numero1: string;
    numero2: string;
    numero3: string;
    complementario: string;
    barrio: string;
  }
  

export interface RegistrosPedido {
    idProducto: number;
    idInventario: number;
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
    documento: string;
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
    estadoPago: string;
    formaPago: string;
    registros: RegistrosPedido[];
    usuarios: UsuarioPedido;
    envio: EnvioPedido;
}

export interface EstadoPedidos {
    idPedido: number;
    idEstadoPedido: number;
    idEstadoEnvio: number;
}

export interface EstadoPago {
    idEstado: number;
    estado: string;
    requestId: number;
    idReferencia: number;
    fecha: string;
    valor: number;
    moneda: string;
    formaPago: string;
    razon: string;
    mensaje: string;
    correo: string;
}
