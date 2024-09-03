/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Activity`;

-- DropTable
DROP TABLE `Experience`;

-- CreateTable
CREATE TABLE `experiences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(100) NOT NULL,
    `position` VARCHAR(100) NOT NULL,
    `status` ENUM('INTERNSHIP', 'FULLTIME', 'PARTTIME', 'CONTRACT') NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `place` VARCHAR(100) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `experiences_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_name` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `place` VARCHAR(300) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `activities_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
