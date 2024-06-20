
export interface UsuarioLogin {
  idUsuario: number;
  nombre: string;
  correo: string;
  foto: string;
  tipoUsuario: number;
  exp: string;
  iat: string;
  nbf: string;
}

export interface tipoDocumento {
  idDocumento: number;
  documento: string;
}

export interface Generos {
  idGenero: number;
  genero: string;
}

export interface Ubicacion{
  id: number;
  nombre: string;
}