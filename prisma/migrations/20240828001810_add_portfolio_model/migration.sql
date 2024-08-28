/*
  Warnings:

  - You are about to alter the column `year` on the `competition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `competition` MODIFY `year` DATETIME NOT NULL;

-- DropTable
DROP TABLE `Portfolio`;

-- CreateTable
CREATE TABLE `portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(100) NOT NULL,
    `place_of_birth` VARCHAR(100) NOT NULL,
    `date_of_birth` DATETIME NOT NULL,
    `phone_number` INTEGER NOT NULL,
    `linkedin` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `website` VARCHAR(100) NULL,
    `domicile` VARCHAR(100) NOT NULL,
    `summary` VARCHAR(300) NULL,
    `username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `portfolio_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `portfolio` ADD CONSTRAINT `portfolio_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
