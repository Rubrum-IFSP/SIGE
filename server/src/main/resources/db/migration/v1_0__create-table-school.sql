SELECT 'CREATE DATABASE sige'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sige')\gexec

CREATE TABLE "school" (
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "palette" text
);