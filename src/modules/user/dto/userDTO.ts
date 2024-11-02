// src/user/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { RoleDTO } from 'src/modules/roles/dto/roleDTO';

export class UserDTO {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  nombre: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'active',
    description: 'The current status of the user',
  })
  estado: string;

  @ApiProperty({
    example: '2023-07-01T10:00:00Z',
    description: 'The creation date of the user record',
  })
  fechaCreacion: Date;

  @ApiProperty({
    type: [RoleDTO],
    description: 'The roles assigned to the user',
    isArray: true,
  })
  roles: RoleDTO[];

  @ApiProperty({
    example: '2023-07-10T15:30:00Z',
    description: 'The last modification date of the user record',
  })
  fechaModificacion: Date;

  constructor(
    id: string,
    nombre: string,
    email: string,
    estado: string,
    fechaCreacion: Date,
    fechaModificacion: Date,
    roles: RoleDTO[],
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaModificacion = fechaModificacion;
    this.roles = roles;
  }
}
