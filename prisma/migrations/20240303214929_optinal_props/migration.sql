-- DropForeignKey
ALTER TABLE "tb_orders" DROP CONSTRAINT "tb_orders_userId_fkey";

-- AlterTable
ALTER TABLE "tb_orders" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tb_users" ADD COLUMN     "cnpj" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "cpf" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_orders" ADD CONSTRAINT "tb_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
