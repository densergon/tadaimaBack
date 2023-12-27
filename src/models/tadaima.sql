-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tadaima
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tadaima
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tadaima` DEFAULT CHARACTER SET utf8 ;
USE `tadaima` ;

-- -----------------------------------------------------
-- Table `tadaima`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tadaima`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoPaterno` VARCHAR(45) NOT NULL,
  `apellidoMaterno` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `rol` INT NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `rol_idx` (`rol` ASC) VISIBLE,
  CONSTRAINT `rol`
    FOREIGN KEY (`rol`)
    REFERENCES `tadaima`.`Roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tadaima`.`Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `profesor` INT NOT NULL,
  PRIMARY KEY (`idCurso`),
  INDEX `teacher_idx` (`profesor` ASC) VISIBLE,
  CONSTRAINT `teacher`
    FOREIGN KEY (`profesor`)
    REFERENCES `tadaima`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tadaima`.`Materiales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Materiales` (
  `idMateriales` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `uri` VARCHAR(85) NULL,
  `curso` INT NOT NULL,
  PRIMARY KEY (`idMateriales`),
  INDEX `clase_idx` (`curso` ASC) VISIBLE,
  CONSTRAINT `clase`
    FOREIGN KEY (`curso`)
    REFERENCES `tadaima`.`Curso` (`idCurso`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `tadaima`.`Tareas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Tareas` (
  `idTareas` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `created` DATETIME NOT NULL,
  `dateDelivery` DATETIME NOT NULL,
  `curso` INT NOT NULL,
  `prioridad` INT NOT NULL,
  PRIMARY KEY (`idTareas`),
  INDEX `de_idx` (`curso` ASC) VISIBLE,
  CONSTRAINT `de`
    FOREIGN KEY (`curso`)
    REFERENCES `tadaima`.`Curso` (`idCurso`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tadaima`.`Alumnos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Alumnos` (
  `idAlumno` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `boleta` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idAlumno`),
  UNIQUE INDEX `boleta_UNIQUE` (`boleta` ASC) VISIBLE,
  INDEX `usuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `tadaima`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tadaima`.`Pertenece`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Pertenece` (
  `idPertenece` INT NOT NULL,
  `idCurso` INT NOT NULL,
  `idAlumno` INT NOT NULL,
  PRIMARY KEY (`idPertenece`),
  INDEX `curso_idx` (`idCurso` ASC) VISIBLE,
  INDEX `alumno_idx` (`idAlumno` ASC) VISIBLE,
  CONSTRAINT `curso`
    FOREIGN KEY (`idCurso`)
    REFERENCES `tadaima`.`Curso` (`idCurso`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tadaima`.`Entregadas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tadaima`.`Entregadas` (
  `idEntregadas` INT NOT NULL AUTO_INCREMENT,
  `idAlumno` INT NOT NULL,
  `idTarea` INT NOT NULL,
  `calificacion` DOUBLE NULL DEFAULT NULL,
  `delivered` DATETIME NULL,
  `uri` VARCHAR(85) NOT NULL,
  PRIMARY KEY (`idEntregadas`),
  INDEX `estudiante_idx` (`idAlumno` ASC) VISIBLE,
  INDEX `tarea_idx` (`idTarea` ASC) VISIBLE,
  CONSTRAINT `estudiante`
    FOREIGN KEY (`idAlumno`)
    REFERENCES `tadaima`.`Alumnos` (`idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tarea`
    FOREIGN KEY (`idTarea`)
    REFERENCES `tadaima`.`Tareas` (`idTareas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;