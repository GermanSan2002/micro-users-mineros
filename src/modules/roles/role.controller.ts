import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { RoleService } from './roles.services';
import { RoleDTO } from './dto/roleDTO';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('roles') // Etiqueta general para el controlador
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('set-users/:roleId')
  @ApiOperation({ summary: 'Assign users to a role' })
  @ApiParam({ name: 'roleId', description: 'ID of the role to assign users to' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        usersId: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of user IDs to assign to the role',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Users assigned to role successfully' })
  @ApiResponse({ status: 404, description: 'Role or users not found' })
  async setUsers(
    @Param('roleId') roleId: string,
    @Body('usersId') usersId: string[],
  ) {
    return await this.roleService.setUsers(roleId, usersId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: RoleDTO })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async createRole(@Body() roleDTO: RoleDTO) {
    return await this.roleService.createRole(roleDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiParam({ name: 'id', description: 'ID of the role to delete' })
  @ApiResponse({ status: 204, description: 'Role deleted successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async deleteRole(@Param('id') id: string) {
    return await this.roleService.deleteRole(id);
  }
}
