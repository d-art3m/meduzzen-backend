import { Quiz } from 'src/quiz/entities/quiz.entity';
import { CompanyVisibility } from 'src/types/company-visibility';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: CompanyVisibility,
    default: CompanyVisibility.PUBLIC,
  })
  visibility: CompanyVisibility;

  @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Quiz, (quiz) => quiz.company)
  quizzes: Quiz[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
