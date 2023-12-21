-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `apellidoPaterno` VARCHAR(45) NULL,
  `apellidoMaterno` VARCHAR(45) NULL,
  `correoElectronico` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `rol` INT NULL,
  `boleta` VARCHAR(45) NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `rol_idx` (`rol` ASC) VISIBLE,
  CONSTRAINT `rol`
    FOREIGN KEY (`rol`)
    REFERENCES `mydb`.`Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Clases`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Clases` (
  `idClases` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `profesor` INT NULL,
  PRIMARY KEY (`idClases`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Inscripciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Inscripciones` (
  `idInscripciones` INT NOT NULL AUTO_INCREMENT,
  `idAlumno` INT NOT NULL,
  `idClase` INT NOT NULL,
  PRIMARY KEY (`idInscripciones`),
  INDEX `clase_idx` (`idClase` ASC) VISIBLE,
  INDEX `alumno_idx` (`idAlumno` ASC) VISIBLE,
  CONSTRAINT `class`
    FOREIGN KEY (`idClase`)
    REFERENCES `mydb`.`Clases` (`idClases`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `alumno`
    FOREIGN KEY (`idAlumno`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Tareas` (
  `idTareas` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `fechaInicio` DATETIME NULL,
  `fechaEntrega` DATETIME NULL,
  `idClase` INT NOT NULL,
  PRIMARY KEY (`idTareas`),
  INDEX `clase_idx` (`idClase` ASC) VISIBLE,
  CONSTRAINT `clase`
    FOREIGN KEY (`idClase`)
    REFERENCES `mydb`.`Clases` (`idClases`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
