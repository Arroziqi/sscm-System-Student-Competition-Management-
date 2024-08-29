/*
  Warnings:

  - You are about to alter the column `year` on the `competition` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date_of_birth` on the `portfolio` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `predicate` on table `competition` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `competition` MODIFY `year` DATETIME NOT NULL,
    MODIFY `predicate` ENUM('FirstPlace', 'SecondPlace', 'ThirdPlace', 'HonorableMention', 'Finalist', 'Participant') NOT NULL DEFAULT 'Participant';

-- AlterTable
ALTER TABLE `portfolio` MODIFY `date_of_birth` DATETIME NOT NULL;
