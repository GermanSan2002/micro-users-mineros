export class UserDTO {
  id: string;
  nombre: string;
  email: string;
  estado: string;
  fechaCreacion: Date;
  fechaModificacion: Date;

  constructor(
    id: string,
    nombre: string,
    email: string,
    estado: string,
    fechaCreacion: Date,
    fechaModificacion: Date,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaModificacion = fechaModificacion;
  }
}
