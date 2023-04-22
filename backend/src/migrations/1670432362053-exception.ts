import { MigrationInterface, QueryRunner } from 'typeorm';

export class exception1670432362053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE SEQUENCE IF NOT EXISTS public.sq_exception
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            `,
    );

    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public.exception (
                    id bigint DEFAULT nextval('public.sq_exception'::regclass) NOT NULL,
                    occurrence_date timestamp with time zone,
                    duration decimal NOT NULL,
                    duration_type character varying(50),
                    description character varying(255),
                    user_id bigint NOT NULL,
                    is_resolved boolean,
                    file_id character varying(255)
                );
            `,
    );
    await queryRunner.query(
      `
            ALTER TABLE IF EXISTS ONLY public.exception
                ADD CONSTRAINT pk_exception PRIMARY KEY (id);
            `,
    );
    await queryRunner.query(
      `
            ALTER TABLE IF EXISTS ONLY public.exception
                ADD CONSTRAINT fk_exception_user FOREIGN KEY (user_id) REFERENCES public.user(id);
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                DROP TABLE IF EXISTS public.exception
            `,
    );

    await queryRunner.query(
      `
                DROP SEQUENCE IF EXISTS public.sq_exception CASCADE
            `,
    );
  }
}
