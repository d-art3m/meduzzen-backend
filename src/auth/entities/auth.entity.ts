import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryColumn('uuid')
  userId: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;
}
