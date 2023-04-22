import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from './chat-message.model';
import { Chat } from './chat.model';
import { ChatMember } from './chat-member.model';
import { Document } from './document.model';

@Index('pk_user', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'username',
    nullable: false,
    length: 50,
  })
  username: string | null;

  @Column('character varying', { name: 'password', nullable: true, length: 60 })
  password: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 254 })
  email: string | null;

  @Column('character varying', {
    name: 'reset_key',
    nullable: true,
    length: 20,
  })
  resetKey: string | null;

  @Column('timestamp with time zone', { name: 'reset_date', nullable: true })
  resetDate: Date | null;

  @Column('timestamp with time zone', { name: 'created_date', nullable: true })
  createdDate: Date | null;

  @Column('character varying', {
    name: 'avatar',
    nullable: true,
  })
  avatar: string | null;

  @OneToMany(() => Chat, (chat) => chat.chatMembers)
  chats: Chat[];

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[];

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
  chatMessages: ChatMessage[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.user)
  chatMembers: ChatMember[];

  passwordConfirmation?: string;
}
