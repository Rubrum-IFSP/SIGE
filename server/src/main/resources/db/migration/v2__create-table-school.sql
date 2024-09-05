SELECT 'CREATE DATABASE sige'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sige')\gexec

\c sige

CREATE TYPE "member_roles" AS ENUM (
  'PROVOST',
  'ADMIN',
  'STUDENT',
  'GUEST'
);

CREATE TYPE "message_types" AS ENUM (
  'SYSTEM',
  'TEXT_MESSAGE'
);

CREATE TYPE "news_type" AS ENUM (
  'DIRECTION',
  'COUNCIL'
);

CREATE TABLE "users" (
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL
);

CREATE TABLE "school" (
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "palette" text
);

CREATE TABLE "calendary_event" (
  "id" varchar PRIMARY KEY NOT NULL,
  "school_id" varchar NOT NULL,
  "name" varchar(255) NOT NULL,
  "date" date NOT NULL,
  "desc" text
);

CREATE TABLE "menu" (
  "id" varchar PRIMARY KEY NOT NULL,
  "school_id" varchar NOT NULL,
  "file" blob
);

CREATE TABLE "school_member" (
  "id" varchar PRIMARY KEY NOT NULL,
  "user_id" varchar NOT NULL,
  "school_id" varchar NOT NULL,
  "role" member_roles DEFAULT 'GUEST',
  "data" text
);

CREATE TABLE "school_class" (
  "id" varchar PRIMARY KEY NOT NULL,
  "school_id" varchar NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "subject" (
  "id" varchar PRIMARY KEY NOT NULL,
  "school_class_id" varchar NOT NULL,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "subject_message" (
  "id" varchar PRIMARY KEY NOT NULL,
  "sender_id" varchar NOT NULL,
  "subject_id" varchar NOT NULL,
  "content" text,
  "type" message_types,
  "created_at" datetime DEFAULT (now())
);

CREATE TABLE "lession" (
  "id" varchar PRIMARY KEY NOT NULL,
  "subject_id" varchar NOT NULL,
  "delivery_time" datetime,
  "created_at" date DEFAULT (now())
);

CREATE TABLE "news" (
  "id" varchar PRIMARY KEY NOT NULL,
  "school_id" varchar NOT NULL,
  "news_type" news_type,
  "title" text NOT NULL,
  "content" longtext,
  "autors" text,
  "created_at" date DEFAULT (now())
);

CREATE TABLE "news_comment" (
  "id" varchar PRIMARY KEY NOT NULL,
  "news_id" varchar NOT NULL,
  "sender" varchar(255),
  "content" text,
  "created_at" datetime DEFAULT (now())
);

COMMENT ON COLUMN "school_member"."data" IS 'Guardar os dados desta coluna em JSON.';

COMMENT ON COLUMN "news_comment"."sender" IS 'Apenas o nome de quem comentou.';

ALTER TABLE "school" ADD FOREIGN KEY ("id") REFERENCES "calendary_event" ("school_id");

ALTER TABLE "school" ADD FOREIGN KEY ("id") REFERENCES "menu" ("school_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "school_member" ("user_id");

ALTER TABLE "school" ADD FOREIGN KEY ("id") REFERENCES "school_member" ("school_id");

ALTER TABLE "school" ADD FOREIGN KEY ("id") REFERENCES "school_class" ("school_id");

ALTER TABLE "school_class" ADD FOREIGN KEY ("id") REFERENCES "subject" ("school_class_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "subject_message" ("sender_id");

ALTER TABLE "subject" ADD FOREIGN KEY ("id") REFERENCES "subject_message" ("subject_id");

ALTER TABLE "subject" ADD FOREIGN KEY ("id") REFERENCES "lession" ("subject_id");

ALTER TABLE "school" ADD FOREIGN KEY ("id") REFERENCES "news" ("school_id");

ALTER TABLE "news" ADD FOREIGN KEY ("id") REFERENCES "news_comment" ("news_id");
