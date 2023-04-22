import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pk_document', ['id'], { unique: true })
@Entity('document', { schema: 'public' })
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'name',
    nullable: true,
    length: 255,
  })
  name: string | null;

  @Column('character varying', {
    name: 'type',
    nullable: true,
    length: 100,
  })
  type: string | null;

  @Column('character varying', {
    name: 'extension',
    nullable: true,
    length: 50,
  })
  extension: string | null;

  @Column('character varying', {
    name: 'bucket',
    nullable: true,
    length: 255,
  })
  bucket: string | null;

  @Column('character varying', {
    name: 'storage_id',
    nullable: true,
    length: 255,
  })
  storageId: string | null;

  @Column('timestamp with time zone', { name: 'created_date', nullable: true })
  createdDate: Date | null;

  content: string;
}
