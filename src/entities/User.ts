import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Operation } from './Operation';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nombre!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  estado!: string;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @UpdateDateColumn()
  fechaModificacion!: Date;

  @OneToMany(() => Operation, operation => operation.usuario)
  operations!: Operation[];
}
