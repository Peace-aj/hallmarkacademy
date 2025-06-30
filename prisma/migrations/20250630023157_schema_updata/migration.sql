-- AlterTable
ALTER TABLE "Administration" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "password" DROP NOT NULL;
