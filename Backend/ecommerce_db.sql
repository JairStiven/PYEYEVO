-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2025 a las 00:58:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL DEFAULT 'https://via.placeholder.com/150'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `imagen`) VALUES
(2, 'Camisetas', 'https://down-co.img.susercontent.com/file/sg-11134202-7rbmb-lnr03v2fnbns79'),
(3, 'Mamelucos', 'https://www.elmundodelaura.com/cdn/shop/files/17505_MAMELUCO.jpg?v=1716238057'),
(4, 'Buzos', 'https://estadosalterados.net/cdn/shop/products/ea_hoodie_front-trece_dagas_1200x1200.jpg?v=1614675557'),
(5, 'Gorras', 'https://cubitt.com.co/cdn/shop/files/CTCAP-6E-1Lifestyle.webp?v=1736968957&width=1000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuraciones`
--

CREATE TABLE `configuraciones` (
  `id` int(11) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `valor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuraciones`
--

INSERT INTO `configuraciones` (`id`, `clave`, `valor`) VALUES
(1, 'fondo_login', 'https://fondosmil.co/fondo/49979.jpg'),
(2, 'fondo_productos', 'https://wallpapers.com/images/hd/smoke-for-all-white-phone-background-ko2b7ihmzau2m2uv.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','pagado','enviado','entregado','cancelado') DEFAULT 'pendiente',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `factura_numero` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `usuario_id`, `total`, `estado`, `fecha`, `factura_numero`) VALUES
(15, 12, 9500.00, 'pendiente', '2025-04-11 05:57:18', '001'),
(17, 12, 7000.00, 'pendiente', '2025-04-11 06:14:04', '002'),
(18, 12, 8500.00, 'pendiente', '2025-04-11 06:15:51', '003'),
(19, 12, 31500.00, 'pendiente', '2025-04-11 06:16:15', '004'),
(20, 12, 13500.00, 'pendiente', '2025-04-11 19:40:05', '005'),
(21, 12, 10000.00, 'pendiente', '2025-04-11 21:55:31', '006'),
(22, 12, 15000.00, 'pendiente', '2025-04-11 22:11:08', '007'),
(23, 12, 24500.00, 'pendiente', '2025-04-11 22:33:57', '008');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `producto_id`, `cantidad`, `precio_unitario`) VALUES
(18, 21, 1, 1, 5000.00),
(19, 21, 2, 1, 5000.00),
(20, 22, 1, 1, 5000.00),
(21, 22, 2, 1, 5000.00),
(22, 22, 3, 1, 5000.00),
(23, 23, 9, 1, 5000.00),
(24, 23, 10, 1, 5000.00),
(25, 23, 3, 1, 5000.00),
(26, 23, 26, 1, 9500.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `metodo` varchar(50) DEFAULT NULL,
  `estado` enum('pendiente','completado','fallido') DEFAULT 'pendiente',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `metodo`, `estado`, `fecha`) VALUES
(4, 15, 'WhatsApp', 'pendiente', '2025-04-11 05:57:18'),
(5, 17, 'WhatsApp', 'pendiente', '2025-04-11 06:14:04'),
(6, 18, 'WhatsApp', 'pendiente', '2025-04-11 06:15:51'),
(7, 19, 'WhatsApp', 'pendiente', '2025-04-11 06:16:15'),
(8, 20, 'WhatsApp', 'pendiente', '2025-04-11 19:40:05'),
(9, 21, 'WhatsApp', 'pendiente', '2025-04-11 21:55:31'),
(10, 22, 'WhatsApp', 'pendiente', '2025-04-11 22:11:08'),
(11, 23, 'WhatsApp', 'pendiente', '2025-04-11 22:33:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `categoria_id`) VALUES
(1, 'Camiseta Negra', 'Camiseta cómoda de algodón color negro', 5000.00, 20, 'https://th.bing.com/th/id/OIP.GZLRpZ3wqWmK8hxSCV7H_gHaHa?rs=1&pid=ImgDetMain', 2),
(2, 'Camiseta Roja', 'Camiseta cómoda de algodón color rojo', 5000.00, 20, 'https://frutocuatro.com/wp-content/uploads/2018/05/5000-rojo-frente.jpg', 2),
(3, 'Camiseta Azul', 'Camiseta cómoda de algodón color azul', 5000.00, 20, 'https://frutocuatro.com/wp-content/uploads/2018/05/5000-royal-frente.jpg', 2),
(4, 'Camiseta Naranja', 'Camiseta cómoda de algodón color naranja', 5000.00, 20, 'https://frutocuatro.com/wp-content/uploads/2018/05/5000-naranja-frente-897x1101.jpg', 2),
(5, 'Camiseta Verde', 'Camiseta cómoda de algodón color verde', 5000.00, 20, 'https://th.bing.com/th/id/OIP.7ztciwRX6uwWX7dYA4cwlgHaJG?rs=1&pid=ImgDetMain', 2),
(6, 'Camiseta Morada', 'Camiseta cómoda de algodón color morado', 5000.00, 20, 'https://th.bing.com/th/id/OIP.7-nMciu_GAKjVeuyT_I7dgHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain', 2),
(7, 'Camiseta Amarilla', 'Camiseta cómoda de algodón color amarillo', 5000.00, 20, 'https://th.bing.com/th/id/OIP.5dG7NTTbrtqymRL1p_DjyAHaJG?rs=1&pid=ImgDetMain', 2),
(8, 'Camiseta Gris', 'Camiseta cómoda de algodón color gris', 5000.00, 20, 'https://th.bing.com/th/id/R.9b9dead98f44cee772a4fbd2063f8f49?rik=HpsHqCvv4ibmIg&pid=ImgRaw&r=0', 2),
(9, 'Camiseta Beige', 'Camiseta cómoda de algodón color beige', 5000.00, 20, 'https://f.fcdn.app/imgs/7042f5/www.indiewears.uy/iweauy/c3be/original/catalogo/C0300_200_1/1920-1200/camiseta-a-la-base-peso-completo-beige.jpg', 2),
(10, 'Camiseta Blanca', 'Camiseta cómoda de algodón', 5000.00, 20, 'https://udiscovermusic.co/cdn/shop/products/Camiseta-Logo-Blanca-Espalda.png?v=1660064884&width=1000', 2),
(11, 'Mameluco Azul', 'Mameluco suave para bebé', 8500.00, 15, 'https://th.bing.com/th/id/OIP.uMOE4QY880t6r2KTBBNbKAHaFj?rs=1&pid=ImgDetMain', 3),
(12, 'Mameluco Amarillo', 'Mameluco suave para bebé color amarillo', 8500.00, 15, 'https://th.bing.com/th/id/OIP.bAecuz64cnHEkOmu8yFNlAHaJ_?pid=ImgDet&w=204&h=275&c=7', 3),
(13, 'Mameluco Rosado', 'Mameluco suave para bebé color rosado', 8500.00, 15, 'https://th.bing.com/th/id/OIP.cXHDiuqHsJWVD-20BafTzAHaHa?pid=ImgDet&w=204&h=204&c=7', 3),
(14, 'Mameluco Fucsia', 'Mameluco suave para bebé color fucsia', 8500.00, 15, 'https://th.bing.com/th/id/OIP.fZwOxeo6e5adLayC-hJubAHaLG?pid=ImgDet&w=204&h=306&c=7', 3),
(15, 'Mameluco Celeste', 'Mameluco suave para bebé color celeste', 8500.00, 15, 'https://th.bing.com/th/id/OIP.5bWJK0FXwbCooO-WItKpMQAAAA?pid=ImgDet&w=204&h=204&c=7', 3),
(16, 'Mameluco Verde', 'Mameluco suave para bebé color verde', 8500.00, 15, 'https://th.bing.com/th/id/OIP.hxTLt5DIbBzWKDppHeYIQwHaJQ?pid=ImgDet&w=204&h=255&c=7', 3),
(17, 'Mameluco Rojo', 'Mameluco suave para bebé color rojo', 8500.00, 15, 'https://th.bing.com/th/id/OIP.vxnPkKRnPLKE-V0kbCt7RgHaIG?pid=ImgDet&w=204&h=222&c=7', 3),
(18, 'Mameluco Beige', 'Mameluco suave para bebé color beige', 8500.00, 15, 'https://images.tcdn.com.br/img/img_prod/897801/body_bebe_bibe_off_white_1703_1_c7195bf54d96068d56f730109da1bd97.jpg', 3),
(19, 'Buzo Negro', 'Buzo con capucha', 9500.00, 10, 'https://acdn.mitiendanube.com/stores/002/215/740/products/buzos_mesa-de-trabajo-1-copia-2-6c91f5528519887c0417151259608054-640-0.jpg', 4),
(20, 'Buzo Blanco', 'Buzo con capucha color blanco', 9500.00, 10, 'https://th.bing.com/th/id/OIP.tzmJr4bCK6sFxVi-x9xXEgHaKH?rs=1&pid=ImgDetMain', 4),
(21, 'Buzo Rojo', 'Buzo con capucha color rojo', 9500.00, 10, 'https://cdn.shopify.com/s/files/1/0508/6583/2091/files/2_e889b45b-1019-47eb-8df5-0f9812202577.jpg?v=1686178795', 4),
(22, 'Buzo Amarillo', 'Buzo con capucha color amarillo', 9500.00, 10, 'https://i.pinimg.com/originals/6d/05/1b/6d051b9ab6af01ff901d320fe99d574f.jpg', 4),
(23, 'Buzo Azul', 'Buzo con capucha color azul', 9500.00, 10, 'https://cdn.shopify.com/s/files/1/0508/6583/2091/products/2_4420e534-da2a-4b22-870a-1335640310f9.jpg?v=1660877527', 4),
(24, 'Buzo Verde Militar', 'Buzo con capucha color verde militar', 9500.00, 10, 'https://kappaco.vtexassets.com/arquivos/ids/172771/34175XWD5D-1.png?v=638461282366000000', 4),
(25, 'Buzo Gris', 'Buzo con capucha color gris', 9500.00, 10, 'https://th.bing.com/th/id/OIP.7Qc17O5ckInCHWhRw7pNyAHaI4?rs=1&pid=ImgDetMain', 4),
(26, 'Buzo Beige', 'Buzo con capucha color beige', 9500.00, 10, 'https://serrania.co/cdn/shop/files/5.1_b676f28d-4568-4f41-ba5d-74c310f25af5.jpg?v=1696876146', 4),
(27, 'Gorra Negra', 'Gorra ajustable con logo', 3500.00, 30, 'https://th.bing.com/th/id/R.6e5d7252dbab329cb7740725f616637e?rik=qgz2opswjPzGAA&riu=http%3a%2f%2fsublismart.com%2fcdn%2fshop%2ffiles%2fgorra-negra-negra.jpg%3fv%3d1692247013&ehk=Pd80z49KDCtq8vibFmepqWiC8P%2bw1CA6JKUzVLUEjtM%3d&risl=&pid=ImgRaw&r=0', 5),
(28, 'Gorra Blanca', 'Gorra ajustable color blanco', 3500.00, 30, 'https://sublismart.com/cdn/shop/files/gorra-blanca.jpg?v=1687989990', 5),
(29, 'Gorra Amarilla', 'Gorra ajustable color amarillo', 3500.00, 30, 'https://m.media-amazon.com/images/I/513wgltjBTL._AC_UL1000_.jpg', 5),
(30, 'Gorra Azul', 'Gorra ajustable color azul', 3500.00, 30, 'https://m.media-amazon.com/images/I/71ApVtzqGPL._AC_SL1181_.jpg', 5),
(31, 'Gorra Roja', 'Gorra ajustable color rojo', 3500.00, 30, 'https://http2.mlstatic.com/D_NQ_NP_696829-MLM73080297611_112023-O.webp', 5),
(32, 'Gorra Verde', 'Gorra ajustable color verde', 3500.00, 30, 'https://th.bing.com/th/id/OIP.ZUbx7HOH0hJEaS-CWSKcnwHaHa?rs=1&pid=ImgDetMain', 5),
(33, 'Gorra Café', 'Gorra ajustable color café', 3500.00, 30, 'https://th.bing.com/th/id/R.9a3538d8f0d24920f1ebf620ef404b7c?rik=%2bX8H2z1lfyhGYg&pid=ImgRaw&r=0', 5),
(34, 'Gorra Naranja', 'Gorra ajustable color naranja', 3500.00, 30, 'https://th.bing.com/th/id/OIP.tyP8p5nXGWnisuj_B96sdgHaFj?rs=1&pid=ImgDetMain', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `direccion` text DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `rol` enum('cliente','admin') DEFAULT 'cliente',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `direccion`, `telefono`, `rol`, `fecha_registro`) VALUES
(11, 'Kevin', 'kevin@example.com', '$2b$10$o5gZYDjldqSwHMHfTjL1R.tHARNcsLB.iXpIxvi1HAuPu9kLxvnri', 'cr17l#35asur', '3222456505', 'cliente', '2025-03-12 22:24:24'),
(12, 'Kevin Julian', 'KJMB@gmail.com', '$2b$10$SlS5ZbNERLUEo66yCmK89OWp24myA84S5LRMaJ961Y1/nNgGKZ.ES', 'cr21f#70a07sur', '321321321', 'cliente', '2025-03-13 18:51:03'),
(13, 'Emiliano', 'Emiliano@gmail.com', '$2b$10$oolwSQXW21Pw7CAfjc6X/.v6uxRJLkImUtFBVBa2w1QFUw8ctxQPq', NULL, NULL, 'admin', '2025-03-13 20:17:10'),
(14, 'Milena', 'Mile3005@gmail.com', '$2b$10$hkxLT9pAzsG52zUau0pbWeP0ThVjtg0aBnwHZft77VIY2L.sR2h7C', NULL, NULL, 'cliente', '2025-03-13 20:28:20'),
(15, 'Juan Pardo', 'Juan159@gmail.com', '$2b$10$QUgGU1t.i9uIsbTMDTC8neELhrgQjiHQQx81c6tMQJocVhWyHR6k2', NULL, NULL, 'cliente', '2025-03-19 00:45:49'),
(16, 'Admin', 'Admin2025@gmail.com', '$2b$10$eMu1lDF5LcI84PgQ38t.nO0.3VX.RheZFmxlU0JN/folmZSA/GYO6', NULL, NULL, 'admin', '2025-04-11 06:21:36');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `configuraciones`
--
ALTER TABLE `configuraciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `factura_numero` (`factura_numero`),
  ADD UNIQUE KEY `factura_numero_2` (`factura_numero`),
  ADD KEY `fk_usuario` (`usuario_id`);

--
-- Indices de la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order` (`order_id`),
  ADD KEY `fk_producto` (`producto_id`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categoria` (`categoria_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `configuraciones`
--
ALTER TABLE `configuraciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_producto` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
