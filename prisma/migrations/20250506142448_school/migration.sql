/*
  Warnings:

  - Added the required column `schooltype` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "contactperson" TEXT,
ADD COLUMN     "contactpersonemail" TEXT,
ADD COLUMN     "contactpersonphone" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "regnumberappend" TEXT,
ADD COLUMN     "regnumbercount" INTEGER,
ADD COLUMN     "regnumberprepend" TEXT,
ADD COLUMN     "schooltype" TEXT NOT NULL,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "youtube" TEXT;
