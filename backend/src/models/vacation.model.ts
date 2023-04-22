import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Index('pk_vacation', ['id'], { unique: true })
@Entity('vacation', { schema: 'public' })
export class Vacation {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'start_date', nullable: false })
  startDate: Date | null;

  @Column('timestamp with time zone', { name: 'end_date', nullable: false })
  endDate: Date | null;

  @ManyToOne(() => User, (user) => user.vacations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
