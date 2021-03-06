-- MySQL Script generated by MySQL Workbench
-- Út 12. dubna 2022, 16:20:09
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema maturitni_cetba
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema maturitni_cetba
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `maturitni_cetba` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci ;
USE `maturitni_cetba` ;

-- -----------------------------------------------------
-- Table `maturitni_cetba`.`teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`teacher` (
  `id_teacher` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(69) NULL,
  `lastName` VARCHAR(69) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_teacher`));


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`class` (
  `id_class` INT NOT NULL AUTO_INCREMENT,
  `firstYear` YEAR NOT NULL,
  `name` VARCHAR(10) NOT NULL,
  `teacher_id` INT NOT NULL,
  `lockTime` DATETIME NULL DEFAULT NULL,
  `lockCount` INT NULL,
  PRIMARY KEY (`id_class`),
  INDEX `fk_class_teacher1_idx` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `fk_class_teacher1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `maturitni_cetba`.`teacher` (`id_teacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`student` (
  `id_student` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(69) NULL,
  `lastName` VARCHAR(69) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `class_id` INT NULL,
  PRIMARY KEY (`id_student`),
  INDEX `fk_student_class_idx` (`class_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_student_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `maturitni_cetba`.`class` (`id_class`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`book` (
  `id_book` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `century` ENUM('18.', '19.', '20./21.') NOT NULL,
  `category` ENUM('cz', 'svet') NOT NULL,
  `active` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',
  `link` VARCHAR(255) NULL,
  PRIMARY KEY (`id_book`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`author` (
  `id_author` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(69) NULL,
  `lastName` VARCHAR(69) NOT NULL,
  PRIMARY KEY (`id_author`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`book_has_author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`book_has_author` (
  `book_id` INT NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`book_id`, `author_id`),
  INDEX `fk_bookList_has_author_author1_idx` (`author_id` ASC) VISIBLE,
  INDEX `fk_bookList_has_author_bookList1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_bookList_has_author_bookList1`
    FOREIGN KEY (`book_id`)
    REFERENCES `maturitni_cetba`.`book` (`id_book`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookList_has_author_author1`
    FOREIGN KEY (`author_id`)
    REFERENCES `maturitni_cetba`.`author` (`id_author`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`student_has_book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`student_has_book` (
  `student_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `dateAdded` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order` INT NOT NULL,
  `state` ENUM('unread', 'read', 'done') NOT NULL DEFAULT 'unread',
  `teachersNote` VARCHAR(255) NULL,
  PRIMARY KEY (`student_id`, `book_id`),
  INDEX `fk_student_has_bookList_bookList1_idx` (`book_id` ASC) VISIBLE,
  INDEX `fk_student_has_bookList_student1_idx` (`student_id` ASC) VISIBLE,
  CONSTRAINT `fk_student_has_bookList_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `maturitni_cetba`.`student` (`id_student`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_has_bookList_bookList1`
    FOREIGN KEY (`book_id`)
    REFERENCES `maturitni_cetba`.`book` (`id_book`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`remove_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`remove_request` (
  `id_student` INT NOT NULL,
  `id_book` INT NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `fk_student_student1_idx` (`id_student` ASC) VISIBLE,
  INDEX `fk_bookList_book1_idx` (`id_book` ASC) VISIBLE,
  PRIMARY KEY (`id_student`, `id_book`),
  CONSTRAINT `fk_student_student1`
    FOREIGN KEY (`id_student`)
    REFERENCES `maturitni_cetba`.`student` (`id_student`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookList_book1`
    FOREIGN KEY (`id_book`)
    REFERENCES `maturitni_cetba`.`book` (`id_book`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`registration`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`registration` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `expiration` DATETIME NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maturitni_cetba`.`class_confirm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maturitni_cetba`.`class_confirm` (
  `token` VARCHAR(255) NOT NULL,
  `id_student` INT NOT NULL,
  `id_class` INT NOT NULL,
  PRIMARY KEY (`id_student`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  INDEX `fk_class_confirm_student1_idx` (`id_student` ASC) VISIBLE,
  INDEX `fk_class_confirm_class1_idx` (`id_class` ASC) VISIBLE,
  CONSTRAINT `fk_class_confirm_student1`
    FOREIGN KEY (`id_student`)
    REFERENCES `maturitni_cetba`.`student` (`id_student`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_confirm_class1`
    FOREIGN KEY (`id_class`)
    REFERENCES `maturitni_cetba`.`class` (`id_class`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
