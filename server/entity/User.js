import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id = null;

  @Column('varchar')
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @IsNotEmpty()
  password = '';

  @Column('varchar')
  @IsNotEmpty()
  passwordDigest = '';
}
