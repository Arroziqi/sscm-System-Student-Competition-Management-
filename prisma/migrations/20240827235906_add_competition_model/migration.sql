-- CreateTable
CREATE TABLE `competition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `year` DATETIME NOT NULL,
    `region` ENUM('INTERNATIONAL', 'NATIONAL', 'REGIONAL', 'CAMPUS') NOT NULL,
    `category` ENUM('Programming', 'DataScience', 'Design', 'Sport', 'Research') NOT NULL,
    `predicate` ENUM('FirstPlace', 'SecondPlace', 'ThirdPlace', 'HonorableMention', 'Finalist', 'Participant') NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `competition` ADD CONSTRAINT `competition_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
