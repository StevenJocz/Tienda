export interface Estado {
    idEstado: number;
    nombre: string;
    descripcion: string;
    esPedido: boolean;
    esEnvio: boolean;
}

export  interface items {
    titulo: string;
    porcentaje: number;
    tipo: number;
    numeroTotal: number;
    numeroNuevos: number;
    clase: number;
}