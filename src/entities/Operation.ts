import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  tipo!: string;

  @Column()
  fecha!: Date;

  @Column()
  detalles!: string;

  @ManyToOne(() => User, user => user.operations)
  usuario!: User;
}

