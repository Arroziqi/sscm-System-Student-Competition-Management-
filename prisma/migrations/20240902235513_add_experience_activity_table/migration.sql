-- CreateTable
CREATE TABLE `Experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(100) NOT NULL,
    `position` VARCHAR(100) NOT NULL,
    `status` ENUM('INTERNSHIP', 'FULLTIME', 'PARTTIME', 'CONTRACT') NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `place` VARCHAR(100) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
