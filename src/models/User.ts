export interface InicioSesion {
  correo: string;
  password: string;
}

export interface UsuarioLogin {
  idUsuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
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
  idPais: number;
  idDepartamento: number;
  idMunicipio: number;
  direccion: string;
  correo: string;
  password: string;
  fechaRegistro: Date;
}

export interface UsuarioInformacion {
  idUsuario: number;
  tipoUsuario: string;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  documento: string;
  fechaNacimiento: string;  
  celular: string;
  ubicacion: string;
  direccion: string;
  correo: string;
  fechaRegistro: string; 
}