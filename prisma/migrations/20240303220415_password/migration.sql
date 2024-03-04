/*
  Warnings:

  - Made the column `password` on table `tb_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_users" ALTER COLUMN "password" SET NOT NULL;
