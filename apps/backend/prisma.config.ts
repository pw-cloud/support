import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgres://postgres:postgres@127.0.0.1:51214/mydb?sslmode=disable",
  },
});
