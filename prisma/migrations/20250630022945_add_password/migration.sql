/*
  Warnings:

  - Added the required column `password` to the `Administration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Subject_name_key";

-- AlterTable
ALTER TABLE "Administration" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "password" TEXT NOT NULL;
