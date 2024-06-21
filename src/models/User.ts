export interface InicioSesion {
  correo: string;
  password: string;
}

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


export interface Usuario {
  idUsuario: number;
  idTipoUsuario: number;
  nombre: string;
  apellido: string;
  idTipoDocumento: number;
  documento: string;
  fechaNacimiento: Date;
  celular: number;
  idMunicipio: number;
  direccion: string;
  correo: string;
  password: string;
  fechaRegistro: Date;
}