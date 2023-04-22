import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exception } from './exception.model';
import { Vacation } from './vacation.model';
import { Event } from './event.model';

@Index('pk_user', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'name',
    nullable: false,
    length: 50,
  })
  name: string | null;

  @Column('character varying', {
    name: 'password',
    nullable: false,
    length: 60,
  })
  password: string | null;

  @Column('character varying', {
    name: 'email',
    nullable: false,
    length: 254,
    unique: true,
  })
  email: string | null;

  @Column('character varying', {
    name: 'document',
    nullable: false,
    length: 254,
  })
  document: string | null;

  @Column('character varying', { name: 'phone', nullable: true, length: 254 })
  phone: string | null;

  @Column('timestamp with time zone', { name: 'birthdate', nullable: true })
  birthdate: Date | null;

  @Column('timestamp with time zone', { name: 'hire_date', nullable: true })
  hire_date: Date | null;

  @Column('bigint', { name: 'monthly_workload', nullable: true })
  monthlyWorkload: number | null;

  @Column('boolean', { name: 'is_employee', nullable: true })
  isEmployee: number | null;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Vacation, (vacation) => vacation.user)
  vacations: Vacation[];

  @OneToMany(() => Exception, (exception) => exception.user)
  exceptions: Exception[];

  passwordConfirmation?: string;
}
