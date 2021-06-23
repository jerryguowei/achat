-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: achat
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `add_user_request`
--
CREATE Database achat;
USE achat;

DROP TABLE IF EXISTS `add_user_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `add_user_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_user` int NOT NULL,
  `to_user` int NOT NULL,
  `status` enum('PENDING','ACCEPT','REJECT') NOT NULL,
  `request_message` varchar(256) DEFAULT NULL,
  `reject_message` varchar(256) DEFAULT NULL,
  `request_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `viewed` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `from_user` (`from_user`),
  KEY `to_user` (`to_user`),
  CONSTRAINT `add_user_request_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `add_user_request_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `add_user_request_chk_1` CHECK ((`viewed` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `add_user_request`
--

LOCK TABLES `add_user_request` WRITE;
/*!40000 ALTER TABLE `add_user_request` DISABLE KEYS */;
INSERT INTO `add_user_request` VALUES (1,2,1,'ACCEPT','add me',NULL,'2021-06-23 11:53:34',0);
/*!40000 ALTER TABLE `add_user_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_message`
--

DROP TABLE IF EXISTS `private_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_message` (
  `msg_id` int NOT NULL AUTO_INCREMENT,
  `from_user` int NOT NULL,
  `to_user` int NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `attachments` varchar(250) DEFAULT '[]',
  `time` timestamp NOT NULL,
  `viewed` tinyint DEFAULT '0',
  `state` varchar(256) NOT NULL,
  PRIMARY KEY (`msg_id`),
  UNIQUE KEY `state` (`state`),
  KEY `from_user` (`from_user`),
  KEY `to_user` (`to_user`),
  CONSTRAINT `private_message_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `private_message_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `private_message_chk_1` CHECK ((`viewed` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_message`
--

LOCK TABLES `private_message` WRITE;
/*!40000 ALTER TABLE `private_message` DISABLE KEYS */;
INSERT INTO `private_message` VALUES (1,1,2,'hi test',NULL,'2021-06-23 11:53:56',0,'20edd71f-8d1b-46a4-a78f-da7df910aea1'),(2,1,2,'?',NULL,'2021-06-23 11:54:03',0,'f02f883a-2c17-4d4c-bf52-86f83c003fb7');
/*!40000 ALTER TABLE `private_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'jerry','$2a$10$qUXuhG8MU5THfUUXGqbFA.wwoHNIE.GbqsGNKgO3qIK4.f8kv6Jc2','jerry@gmail.com','2021-06-23 11:52:49','2021-06-23 11:52:49',1),(2,'test','$2a$10$dYhHT4nZVRH0sCl1nNtZJeBs3Xatf/XIleI58C5ABCaHWzT1hcOGS','test@gmail.com','2021-06-23 11:53:21','2021-06-23 11:53:21',1);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_relation`
--

DROP TABLE IF EXISTS `user_user_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_relation` (
  `from_user` int NOT NULL,
  `to_user` int NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`from_user`,`to_user`),
  KEY `to_user` (`to_user`),
  CONSTRAINT `user_user_relation_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_user_relation_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_relation`
--

LOCK TABLES `user_user_relation` WRITE;
/*!40000 ALTER TABLE `user_user_relation` DISABLE KEYS */;
INSERT INTO `user_user_relation` VALUES (1,2,'2021-06-23 11:53:49'),(2,1,'2021-06-23 11:53:49');
/*!40000 ALTER TABLE `user_user_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'achat'
--

--
-- Dumping routines for database 'achat'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-23 21:59:15
