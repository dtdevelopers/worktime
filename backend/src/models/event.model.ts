import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Index('pk_event', ['id'], { unique: true })
@Entity('event', { schema: 'public' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', { name: 'type', nullable: false, length: 254 })
  type: string | null;

  @Column('timestamp with time zone', { name: 'created_date', nullable: false })
  createdDate: Date | null;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
