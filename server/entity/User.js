import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export default @Entity() class User {
  @PrimaryGeneratedColumn()
  id = null;

  @Column()
  @IsNotEmpty()
  firstName = '';

  @Column()
  @IsNotEmpty()
  lastName = '';

  // @Column()
  // passwordDigest = '';
}
