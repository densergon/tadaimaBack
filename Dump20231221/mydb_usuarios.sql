-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuarios` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidoPaterno` varchar(45) DEFAULT NULL,
  `apellidoMaterno` varchar(45) DEFAULT NULL,
  `correoElectronico` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `rol` int DEFAULT NULL,
  `boleta` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`),
  KEY `rol_idx` (`rol`),
  CONSTRAINT `rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRoles`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Daniel','Serna','Gonzalez','dan@ser.com','Limonada123',1,NULL),(3,'Pedro','Armendariz','Jimenez','pedro@mail.com','Limonada123',2,NULL),(4,'Diego','Hernandez','Lopez','diego@mail.com','Limonada123',3,'2014090687'),(5,'Juan','Guarnizo','Lopez','gu2a@mail.com','Limonada123',3,'2093098876'),(6,'Fanny','Adan','Sosa','fanny@mail.com','Limonada123',2,NULL),(7,'Luis','Jimenez','Lopez','limonada@mail.com','Limonada',2,NULL),(20,'Daniel','Serna','Gonzalez','deded@dwedwedededry.com','123456',2,NULL),(23,'Oscar','Lopez','Jimenez','oscar@mail.com','123456',2,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-21  5:19:42
