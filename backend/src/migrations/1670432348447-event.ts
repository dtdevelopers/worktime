import { MigrationInterface, QueryRunner } from 'typeorm';

export class event1670432348447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE SEQUENCE IF NOT EXISTS public.sq_event
                    START WITH 1
                    INCREMENT BY 1
                    NO MINVALUE
                    NO MAXVALUE
                    CACHE 1;
            `,
    );

    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public.event (
                    id bigint DEFAULT nextval('public.sq_event'::regclass) NOT NULL,
                    type character varying(50),
                    user_id bigint,
                    created_date timestamp with time zone
                );
            `,
    );
    await queryRunner.query(
      `
            ALTER TABLE IF EXISTS ONLY public.event
                ADD CONSTRAINT pk_event PRIMARY KEY (id);
            `,
    );
    await queryRunner.query(
      `
            ALTER TABLE IF EXISTS ONLY public.event_user
                ADD CONSTRAINT fk_event_user FOREIGN KEY (user_id) REFERENCES public.user(id);
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                DROP TABLE IF EXISTS public.event
            `,
    );

    await queryRunner.query(
      `
                DROP SEQUENCE IF EXISTS public.sq_event
            `,
    );
  }
}
