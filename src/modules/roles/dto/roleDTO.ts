// src/role/dto/role.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the role',
  })
  id: string;

  @ApiProperty({
    example: 'admin',
    description: 'The name of the role',
  })
  role: string;

  constructor(
    id: string,
    role: string,
  ) {
    this.id = id;
    this.role = role;
  }
}
