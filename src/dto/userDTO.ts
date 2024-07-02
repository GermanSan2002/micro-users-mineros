export class UserDTO {
  constructor(
    public id: string,
    public nombre: string,
    public email: string,
    public estado: string,
    public fechaCreacion: Date,
    public fechaModificacion: Date
  ) {}
}

  