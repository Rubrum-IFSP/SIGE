SELECT 'CREATE DATABASE sige'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sige')\gexec

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
  "name" varchar(255) NOT NULL UNIQUE,
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
  "file" bytea
);

CREATE TABLE "school_member" (
  "id" varchar PRIMARY KEY NOT NULL,
  "user_id" varchar NOT NULL,
  "school_id" varchar NOT NULL,
  "role" text DEFAULT 'GUEST',
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
  "created_at" TIMESTAMP DEFAULT (now())
);

CREATE TABLE "lession" (
  "id" varchar PRIMARY KEY NOT NULL,
  "subject_id" varchar NOT NULL,
  "delivery_time" TIMESTAMP,
  "created_at" date DEFAULT (now())
);

CREATE TABLE "news" (
  "id" varchar PRIMARY KEY NOT NULL,
  "school_id" varchar NOT NULL,
  "news_type" news_type,
  "title" text NOT NULL,
  "content" text,
  "autors" text,
  "created_at" date DEFAULT (now())
);

CREATE TABLE "news_comment" (
  "id" varchar PRIMARY KEY NOT NULL,
  "news_id" varchar NOT NULL,
  "sender" varchar(255),
  "content" text,
  "created_at" TIMESTAMP DEFAULT (now())
);

COMMENT ON COLUMN "school_member"."data" IS 'Guardar os dados desta coluna em JSON.';

COMMENT ON COLUMN "news_comment"."sender" IS 'Apenas o nome de quem comentou.';

ALTER TABLE "calendary_event" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("id");

ALTER TABLE "menu" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("id");

ALTER TABLE "school_member" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "school_member" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("id");

ALTER TABLE "school_class" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("id");

ALTER TABLE "subject" ADD FOREIGN KEY ("school_class_id") REFERENCES "school_class" ("id");

ALTER TABLE "subject_message" ADD FOREIGN KEY ("sender_id") REFERENCES "user" ("id");

ALTER TABLE "subject_message" ADD FOREIGN KEY ("subject_id") REFERENCES "subject" ("id");

ALTER TABLE "lession" ADD FOREIGN KEY ("subject_id") REFERENCES "subject" ("id");

ALTER TABLE "news" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("id");

ALTER TABLE "news_comment" ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id");