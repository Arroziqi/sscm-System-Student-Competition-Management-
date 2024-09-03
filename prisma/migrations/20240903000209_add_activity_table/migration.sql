-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_name` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `place` VARCHAR(300) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
