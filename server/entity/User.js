import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export default @Entity() class User {
  @PrimaryGeneratedColumn()
  id = null;

  // @Column()
  // firstName = '';

  // @Column()
  // lastName = '';

  // @Column()
  // passwordDigest = '';
}
