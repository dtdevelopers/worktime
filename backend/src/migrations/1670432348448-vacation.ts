import { MigrationInterface, QueryRunner } from 'typeorm';

export class vacation1670432348448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE SEQUENCE IF NOT EXISTS public.sq_vacation
                    START WITH 1
                    INCREMENT BY 1
                    NO MINVALUE
                    NO MAXVALUE
                    CACHE 1;
            `,
    );

    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public.vacation (
                    id bigint DEFAULT nextval('public.sq_vacation'::regclass) NOT NULL,
                    user_id bigint,
                    start_date timestamp with time zone,
                    end_date timestamp with time zone
                );
            `,
    );
    await queryRunner.query(
      `
            ALTER TABLE IF EXISTS ONLY public.vacation
                ADD CONSTRAINT pk_vacation PRIMARY KEY (id);
            `,
    );
    await queryRunner.query(
      `
            ALTER TABLE IF EXISTS ONLY public.vacation
                ADD CONSTRAINT fk_vacation_user FOREIGN KEY (user_id) REFERENCES public.user(id);
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                DROP TABLE IF EXISTS public.vacation
            `,
    );

    await queryRunner.query(
      `
                DROP SEQUENCE IF EXISTS public.sq_vacation
            `,
    );
  }
}
