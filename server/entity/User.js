import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export default @Entity() class User {
  @PrimaryGeneratedColumn()
  id = null;

  @Column('string')
  @IsNotEmpty()
  firstName = '';

  @Column('string')
  @IsNotEmpty()
  lastName = '';

  @Column('string')
  passwordDigest = '';
}
