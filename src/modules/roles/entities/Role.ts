import { User } from '../../user/entities/User';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @ManyToMany(() => User, user => user.roles) // Relación inversa de ManyToMany con User
  users: User[];
}
