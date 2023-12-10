-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adota
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
-- Table structure for table `ong`
--

DROP TABLE IF EXISTS `ong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ong` (
  `idong` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `endereco` varchar(45) NOT NULL,
  `nomeOng` varchar(45) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `chave` varchar(45) NOT NULL,
  `liberado` tinyint NOT NULL,
  `img` varchar(245) DEFAULT NULL,
  `qr` varchar(10000) DEFAULT NULL,
  `senha` varchar(45) NOT NULL,
  PRIMARY KEY (`idong`),
  UNIQUE KEY `idong_UNIQUE` (`idong`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ong`
--

LOCK TABLES `ong` WRITE;
/*!40000 ALTER TABLE `ong` DISABLE KEYS */;
INSERT INTO `ong` VALUES (111,'Maria','123454534543','anna.silva9020@gmail.com','rua teste','aatan','A ONG \"Patas Protetoras\" é uma voz dedicada aos que não podem falar. Nosso compromisso é a proteção e o bem-estar dos animais','asilva35194@gmail.com',1,'Mariaimg_1701819241757.png','https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126430014BR.GOV.BCB.PIX0121asilva35194@gmail.com5204000053039865802BR5905MARIA6009RUA TESTE610818073101620705031236304BB70','123'),(112,'Peludos sem Fronteiras','423432','anna.silva9020@gmail.com','fgdfdf d','Peludos sem Fronteiras','A ONG \"Patas Protetoras\" é uma voz dedicada aos que não podem falar. Nosso compromisso é a proteção e o bem-estar dos animais','asilva35194@gmail.com',0,'Peludos sem Fronteirasimg_1701819289847.jpg','https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126430014BR.GOV.BCB.PIX0121asilva35194@gmail.com5204000053039865802BR5922PELUDOS SEM FRONTEIRAS6008FGDFDF D610818073101620705031236304FA01','123'),(113,'Peludos sem Fronteiras','423432','anna.silva9020@gmail.com','fgdfdf d','Peludos sem Fronteiras','A ONG \"Patas Protetoras\" é uma voz dedicada aos que não podem falar. Nosso compromisso é a proteção e o bem-estar dos animais','asilva35194@gmail.com',0,'Peludos sem Fronteirasimg_1701819308050.jpg','https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126430014BR.GOV.BCB.PIX0121asilva35194@gmail.com5204000053039865802BR5922PELUDOS SEM FRONTEIRAS6008FGDFDF D610818073101620705031236304FA01','123'),(114,'Peludos sem Fronteiras','21312312','anna.silva9020@gmail.com','sadsadasd','Peludos sem Fronteiras','A ONG \"Patas Protetoras\" é uma voz dedicada aos que não podem falar. Nosso compromisso é a proteção e o bem-estar dos animais','asilva35194@gmail.com',0,'Peludos sem Fronteirasimg_1701819358353.jpg','https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126430014BR.GOV.BCB.PIX0121asilva35194@gmail.com5204000053039865802BR5922PELUDOS SEM FRONTEIRAS6009SADSADASD6108180731016207050312363041A43','123'),(115,'Murilo','1233423432','murilo@gmail.com','Rua Porto Rico','Doações','fgdfdsfdsfdsfds','asilva35194@gmail.com',1,'Muriloimg_1702249449171.png','https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126430014BR.GOV.BCB.PIX0121asilva35194@gmail.com5204000053039865802BR5906MURILO6014RUA PORTO RICO6108180731016207050312363048865','123');
/*!40000 ALTER TABLE `ong` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 20:21:19
