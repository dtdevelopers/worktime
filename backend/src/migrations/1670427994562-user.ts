import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1670427994562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE SEQUENCE IF NOT EXISTS public.sq_user
                    START WITH 1
                    INCREMENT BY 1
                    NO MINVALUE
                    NO MAXVALUE
                    CACHE 1;            
            `,
    );
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS public.user (
                    id bigint DEFAULT nextval('public.sq_user'::regclass) NOT NULL,
                    name character varying(150),
                    document character varying(150),
                    birthdate timestamp with time zone,
                    email character varying(150),
                    phone character varying(150),
                    password character varying(60),
                    monthly_workload character varying(60),
                    is_employee boolean,
                    hire_date timestamp with time zone
                );
            `,
    );
    await queryRunner.query(
      `
                ALTER TABLE IF EXISTS ONLY public.user
                ADD constraint pk_user PRIMARY KEY (id);
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                DROP TABLE IF EXISTS public.user
            `,
    );
    await queryRunner.query(
      `
                DROP SEQUENCE IF EXISTS public.sq_user CASCADE
            `,
    );
  }
}
