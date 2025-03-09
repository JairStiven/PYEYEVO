CREATE DATABASE  IF NOT EXISTS `yeyevo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yeyevo`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: yeyevo
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `nombre` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'busos');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `doc` int NOT NULL,
  `nombres` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (79,'Heiver','Cuesta','hcd@hmail.com','85246','753159hcd'),(100,'Jair','Merchan','jair@gmail.com','1234','12345'),(123,'Kevin','Mendoza','Kevin@gmail.com','123456','123456gc'),(1043437522,'Hanner Javid','Causil Palacio','hannerpalacio@gmail.com','3002892960','Cra 50 #59a-27 sur');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id` int NOT NULL,
  `num_factura` int NOT NULL,
  `cantidad` int NOT NULL,
  `valor_venta` int NOT NULL,
  `cod_prod` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cod_prod` (`cod_prod`),
  KEY `num_factura` (`num_factura`),
  CONSTRAINT `detalle_factura_ibfk_1` FOREIGN KEY (`cod_prod`) REFERENCES `productos` (`id`),
  CONSTRAINT `detalle_factura_ibfk_2` FOREIGN KEY (`num_factura`) REFERENCES `factura` (`num_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `doc` int NOT NULL,
  `nombres` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `sueldo` int NOT NULL,
  `correo` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`doc`),
  KEY `fk_rol_usuario` (`id_rol`),
  CONSTRAINT `fk_rol_usuario` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Juan','Pardo','admin',1200000,'juanpardo@gmail.com','3005421369','Cra 70 #21-37 ',1),(2,'Jair','Merchan','Admin',120000,'j@gmail.com','1233456','xcvfrw4654',1);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `num_factura` int NOT NULL,
  `fecha` date NOT NULL,
  `cod_p` int NOT NULL,
  `doc_emp` int NOT NULL,
  `doc_cli` int NOT NULL,
  PRIMARY KEY (`num_factura`),
  KEY `cod_p` (`cod_p`),
  KEY `doc_emp` (`doc_emp`),
  KEY `doc_cli` (`doc_cli`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`cod_p`) REFERENCES `forma_pago` (`codi`),
  CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`doc_emp`) REFERENCES `empleado` (`doc`),
  CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`doc_cli`) REFERENCES `cliente` (`doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pago` (
  `codi` int NOT NULL,
  `desc_p` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`codi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pago`
--

LOCK TABLES `forma_pago` WRITE;
/*!40000 ALTER TABLE `forma_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `forma_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL,
  `nombre` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `precio` int NOT NULL,
  `stock` int NOT NULL,
  `id_cate` int NOT NULL,
  `descripcion` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `imagen_url` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cate` (`id_cate`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_cate`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Buso',30000,3,1,NULL,NULL),(2,'Camiseta',25000,50,1,'Camiseta de algodón, cómoda y ligera.','https://hmcolombia.vtexassets.com/arquivos/ids/4116969/Camiseta-Regular-Fit---Negro---H-M-CO.jpg?v=638679460238500000'),(3,'Buzo capotero',50000,30,1,'Buzo con capucha, ideal para invierno.','https://http2.mlstatic.com/D_NQ_NP_649753-MCO77031542308_062024-O.webp'),(4,'Buzo sin capota',45000,40,1,'Buzo sin capucha, perfecto para deportes.','https://coloursstreet.co/cdn/shop/products/Momentaneo9D128FE6-50C4-4E80-8FCC-78F6BA3FB62B.jpg?v=1658439423'),(5,'Buzo con cremallera',55000,20,1,'Buzo con cremallera en el frente, cómodo y práctico.','https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/132019062_01/w=800,h=800,fit=pad'),(6,'Gorras',15000,80,1,'Gorra ajustable, disponible en varios colores.','https://media.istockphoto.com/id/497040301/es/foto/sombrero-blanco-de-b%C3%A9isbol.jpg?s=612x612&w=0&k=20&c=-Jmi2btfmAQXPAfz7-uyvqBFoMXEv5HfD_Hv_9oZNUA='),(7,'Crop top largo',35000,60,1,'Crop top largo, cómodo y moderno.','https://media.istockphoto.com/id/1462062864/es/foto/maqueta-de-recorte-blanco-en-posando-chica-en-jeans-aislada-en-el-fondo-vista-frontal.jpg?s=612x612&w=0&k=20&c=_T7iNCGbxbXg0_5d4C-xdwwHalKxnKZ8EbLNQ54jumE='),(8,'Crop top corto',30000,75,1,'Crop top corto, ideal para verano.','https://www.gef.co/cdn/shop/files/lape-t-shirt-blanco-908-746399_000908-5.jpg?v=1721256065&width=1000'),(9,'Sudadera (completa)',80000,25,1,'Sudadera completa con buzo y pantalón, perfecta para el frío.','https://img.freepik.com/fotos-premium/sudadera-negra-pantalones-sudadera-sobre-fondo-blanco_1034470-12550.jpg'),(10,'Jogger',40000,50,1,'Pantalón jogger de algodón, cómodo y relajado.','https://png.pngtree.com/png-clipart/20240303/original/pngtree-white-jogger-pants-png-image_14482325.png'),(11,'Medias',12000,100,1,'Medias deportivas, paquete de 3 pares.','https://media.istockphoto.com/id/1324849113/es/foto/calcetines-de-algod%C3%B3n-blancos-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=lDLIiBSXFsRmUhkW1QCiyc2weMYZdQByEUIOK6ZnRPA=');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productoscli`
--

DROP TABLE IF EXISTS `productoscli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productoscli` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productoscli`
--

LOCK TABLES `productoscli` WRITE;
/*!40000 ALTER TABLE `productoscli` DISABLE KEYS */;
INSERT INTO `productoscli` VALUES (1,'Bluson Corto',40000.00,'https://res.cloudinary.com/dc9uu82aq/image/upload/v1733164083/Bluson_corto_jxocr8.jpg',50),(2,'Mameluco',20000.00,'https://res.cloudinary.com/dc9uu82aq/image/upload/v1733164102/Mamelucos_y3yftv.jpg',30),(3,'Camiseta Estampada',55000.00,'https://res.cloudinary.com/dc9uu82aq/image/upload/v1733164108/camiseta_oiplg2.jpg',20),(4,'Camiseta',25000.00,'https://hmcolombia.vtexassets.com/arquivos/ids/4116969/Camiseta-Regular-Fit---Negro---H-M-CO.jpg?v=638679460238500000',50),(5,'Buzo capotero',50000.00,'https://http2.mlstatic.com/D_NQ_NP_649753-MCO77031542308_062024-O.webp',30),(6,'Buzo sin capota',45000.00,'https://coloursstreet.co/cdn/shop/products/Momentaneo9D128FE6-50C4-4E80-8FCC-78F6BA3FB62B.jpg?v=1658439423',40),(7,'Buzo con cremallera',55000.00,'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/132019062_01/w=800,h=800,fit=pad',20),(8,'Gorras',15000.00,'https://media.istockphoto.com/id/497040301/es/foto/sombrero-blanco-de-b%C3%A9isbol.jpg?s=612x612&w=0&k=20&c=-Jmi2btfmAQXPAfz7-uyvqBFoMXEv5HfD_Hv_9oZNUA=',80),(9,'Crop top largo',35000.00,'https://media.istockphoto.com/id/1462062864/es/foto/maqueta-de-recorte-blanco-en-posando-chica-en-jeans-aislada-en-el-fondo-vista-frontal.jpg?s=612x612&w=0&k=20&c=_T7iNCGbxbXg0_5d4C-xdwwHalKxnKZ8EbLNQ54jumE=',60),(10,'Crop top corto',30000.00,'https://www.gef.co/cdn/shop/files/lape-t-shirt-blanco-908-746399_000908-5.jpg?v=1721256065&width=1000',75),(11,'Sudadera (completa)',80000.00,'https://img.freepik.com/fotos-premium/sudadera-negra-pantalones-sudadera-sobre-fondo-blanco_1034470-12550.jpg',25);
/*!40000 ALTER TABLE `productoscli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador'),(2,'Cliente');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `empleado_id` int DEFAULT NULL,
  `cliente_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `empleado_id` (`empleado_id`),
  UNIQUE KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`doc`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`doc`),
  CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`doc`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juan','f6ccb3e8d609012238c0b39e60b2c9632b3cdede91e035dad1de43469768f4cc',1,NULL),(13,'Jair','3cf27c4a016a53494e680b76af7d096a86e87174b864fb68fb3eda32d15d0e9b',2,100),(14,'Kevin','83353fc5a8fdb345a327b9cd55d88302fc7daec0026bc432025e0eef6944e7de',NULL,123),(15,'Heiver','6e714ba60582bfbc5ae97226855420489bcef096972adb2b8c466da262af4e63',NULL,79);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-27 20:01:56
