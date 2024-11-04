import { Role } from '../../roles/entities/Role';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  estado: string;

  @ManyToMany(() => Role, { cascade: true }) // Definimos la relación ManyToMany con Role
  @JoinTable() // Necesario para la tabla de unión en relaciones ManyToMany
  roles: Role[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fechaModificacion: Date;
}
