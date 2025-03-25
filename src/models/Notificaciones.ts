 export interface Notificacion {
    idNotificacion: number;
    idTipoNotificacion: number;
    deIdUsuario: number;
    paraIdUsuario: number;
    leida: boolean;
    icono: string;
    notificacion: string;
    idRelacion: number;
    orden: number;
    fecha: string;
    categoriaFecha: string; 
  }

  export interface PagoPendiente {
    idReferencia: string;
    valor: number;
  }