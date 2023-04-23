import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Index('pk_exception', ['id'], { unique: true })
@Entity('exception', { schema: 'public' })
export class Exception {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 254,
  })
  description: string | null;

  @Column('character varying', {
    name: 'duration_type',
    nullable: true,
    length: 254,
  })
  durationType: string | null;

  @Column('decimal', { name: 'duration', nullable: true })
  duration: number | null;

  @Column('timestamp with time zone', {
    name: 'occurrence_date',
    nullable: false,
  })
  occurrenceDate: Date | null;

  @Column('boolean', { name: 'is_resolved', nullable: true })
  isResolved: boolean | null;

  @Column('character varying', { name: 'file_id', nullable: true, length: 254 })
  fileId: string | null;

  @ManyToOne(() => User, (user) => user.exceptions)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
