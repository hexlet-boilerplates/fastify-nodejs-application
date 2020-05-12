import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
class User extends BaseEntity {
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

export default User;
