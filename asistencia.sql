-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2020 a las 01:03:43
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id` int(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `cedula` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `entrada` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `salida` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id`, `user_id`, `cedula`, `entrada`, `salida`, `fecha`, `created_at`, `updated_at`) VALUES
(158, 1, '21470449', '11:44', '18:51', 'DOM 07/06/2020', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(255) NOT NULL,
  `cedula` int(255) DEFAULT NULL,
  `nro` int(255) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `cedula`, `nro`, `nombre`, `apellido`, `tipo`, `estado`, `created_at`, `updated_at`) VALUES
(1, 21470449, 777, 'JUAN CARLOS', 'CARMONA CARTAYA', 'ADMINISTRATIVO', 'ON', '2020-04-25 19:18:38', '2020-05-21 20:10:46'),
(2, 22785229, 2, 'JOSEPH DANIEL', 'GALLARDO GONZALEZ', 'ADMINISTRATIVO', 'ON', '2020-04-25 19:18:38', '2020-06-07 15:51:48'),
(3, 6123456, 3, 'PEDRO', 'PEREZ', 'OBRERO', 'ON', '2020-05-01 22:40:47', '2020-05-21 03:06:09'),
(4, 1234567, 4, 'SAUL', 'LOPEZ', 'OBRERO', 'ON', '2020-05-06 22:12:03', '2020-05-21 02:53:17'),
(5, 11564877, 5, 'ANDRES', 'NAVARRO', 'ADMINISTRATIVO', 'ON', '2020-05-06 22:21:33', '2020-05-30 03:27:56'),
(6, 87654331, 6, 'JHON', 'DOE', 'OBRERO', 'ON', '2020-05-06 22:21:33', '2020-05-06 22:21:33'),
(7, 76479336, 7, 'JEAN', 'RENO', 'ADMINISTRATIVO', 'ON', '2020-05-06 22:21:33', '2020-05-21 03:04:19'),
(8, 19684226, 8, 'MANUEL', 'CASTRO', 'OBRERO', 'ON', '2020-05-06 22:21:33', '2020-05-06 22:21:33'),
(9, 18975347, 9, 'JACK', 'PRICE', 'OBRERO', 'ON', '2020-05-16 00:41:39', '2020-05-16 00:41:39'),
(10, 17098361, 10, 'SIMON', 'KAVKA', 'ADMINISTRATIVO', 'ON', '2020-05-16 00:42:47', '2020-05-16 00:42:47'),
(32, 9961774, 33, 'ALEXIS', 'MOLA', 'ADMINISTRATIVO', 'ON', '2020-05-17 22:13:37', '2020-05-21 03:20:18'),
(86, 33232, 77665, 'dsds', 'asdasd', 'ADMINISTRATIVO', 'OFF', '2020-05-19 01:12:30', '2020-05-19 02:49:52'),
(87, 454545, 45454, 'nnn', 'bbbb', 'ADMINISTRATIVO', 'OFF', '2020-05-19 01:16:01', '2020-05-19 01:27:54'),
(89, 1123, 564562, 'nuevo', 'ape', 'ADMINISTRATIVO', 'OFF', '2020-05-19 02:07:28', '2020-05-19 02:44:37'),
(90, 45454, 2131, 'SSa', 'sdsd', 'ADMINISTRATIVO', 'OFF', '2020-05-19 02:45:16', '2020-05-19 22:15:28'),
(91, 21470343, 7771, 'szzz', 'yuee', 'ADMINISTRATIVO', 'OFF', '2020-05-19 16:52:59', '2020-05-19 22:11:23'),
(92, 2346, 7678, 'zzzzzzz', 'bbbbbb', 'OBRERO', 'OFF', '2020-05-19 17:43:16', '2020-05-19 23:08:04'),
(93, 505628, 42343, 'SEÑOR', 'CAMPOS', 'OBRERO', 'ON', '2020-05-20 04:24:12', '2020-05-20 04:24:12'),
(94, 12765981, 654, 'FULANO AURELIO', 'DE TAL', 'MEDICO', 'ON', '2020-05-22 23:23:22', '2020-05-22 23:25:47'),
(95, 9786767, 34234, 'perr', 'perreira', 'ADMINISTRATIVO', 'ON', '2020-05-23 16:52:05', '2020-05-23 16:52:05'),
(96, 754345, 556, 'carmon', 'algoea', 'ADMINISTRATIVO', 'ON', '2020-05-23 17:09:05', '2020-05-26 17:58:11'),
(97, 75565, 34334, 'asdadas', 'sad', 'SEGURIDAD', 'ON', '2020-05-26 02:10:32', '2020-05-26 02:19:46'),
(98, 7755, 4544, 'otroahi', 'avree', 'SEGURIDAD', 'ON', '2020-05-26 19:35:04', '2020-05-26 19:39:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id` int(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `cedula` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `entrada` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `salida` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `horas` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id`, `user_id`, `cedula`, `nombre`, `apellido`, `tipo`, `entrada`, `salida`, `horas`, `fecha`, `created_at`, `updated_at`) VALUES
(119, 1, '21470449', 'JUAN CARLOS', 'CARMONA CARTAYA', 'ADMINISTRATIVO', '22:31', '23:03', '0:32', 'LUN 01/06/2020', '2020-06-01 22:31:53', '2020-06-01 23:03:18'),
(120, 1, '22785229', 'JOSEPH DANIEL', 'GALLARDO GONZALEZ', 'ADMINISTRATIVO', '22:36', '22:42', '0:06', 'LUN 01/06/2020', '2020-06-01 22:36:21', '2020-06-01 22:42:42'),
(121, 1, '21470449', 'JUAN CARLOS', 'CARMONA CARTAYA', 'ADMINISTRATIVO', '0:02', '15:13', '15:11', 'MAR 02/06/2020', '2020-06-02 00:02:09', '2020-06-02 15:13:52'),
(122, 1, '6123456', 'PEDRO', 'PEREZ', 'OBRERO', '0:07', '15:19', '15:12', 'MAR 02/06/2020', '2020-06-02 00:07:12', '2020-06-02 15:19:48'),
(123, 1, '21470449', 'JUAN CARLOS', 'CARMONA CARTAYA', 'ADMINISTRATIVO', '11:44', '18:51', '7:07', 'DOM 07/06/2020', '2020-06-07 11:44:51', '2020-06-07 18:51:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `role` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `password`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'Administrador', 'Admin', '$2y$10$02/pA1Sd4P0dtDB4/LmiiO6fjvfY0JUxfivKNiLh7dN0csubLgQci', '2020-04-24 20:10:51', '2020-05-29 22:35:11', NULL),
(2, 'Usuario', 'usuario', '$2y$10$d5BvHjDGimxoThGvvGYPx.mFkhfSnklq.ITSVO5gXcuj0PX.qn6Ry', '2020-04-24 20:13:54', '2020-05-30 01:05:52', NULL),
(18, 'Usuario', 'otroUser', '$2y$10$00Q9Zvc5/EtDOofWENNAxeihQUXJ5tCdmOiGWjGW0W.sSaBMdBbXi', NULL, '2020-05-25 01:01:03', NULL),
(19, 'Administrador', 'root', '$2y$10$RJldhU9su5i9vCdLYmK7QeOBKOGQoLbdtLStoLl/iirh7cyw26h.6', NULL, '2020-05-26 02:44:03', NULL),
(20, 'Usuario', 'otromas', '$2y$10$OqCzposQV.mK49B.4oMpy.6CM0g3TW8ACmhfc0LO9pM/pLyF64jfK', NULL, '2020-05-25 04:59:44', NULL),
(21, 'Usuario', 'concreated', '$2y$10$rYNZJoH1ygLorUGVXkJH6OQa/RzCvVyfsIGmolbtt2L9xlI5xfYfe', '2020-05-22 02:42:06', '2020-05-26 02:45:24', NULL),
(22, 'Usuario', 'prueba', '$2y$10$kop.yL8VLcHOKRzh1wtmqOadHJeiRRUh9ObyUorDVVE9AJFdQYfW6', '2020-05-28 00:12:47', '2020-05-29 18:59:21', NULL),
(24, 'Usuario', 'sujeto1', '$2y$10$vuEucmeqeU1YhZJShPGPSe2QLLqiPs3zgGSNo6JR2yvVj5VaxW6Ky', '2020-05-29 19:06:35', '2020-05-29 19:06:35', NULL),
(25, 'Usuario', 'sujeto2', '$2y$10$OsxtddTt/0EZ1Vp6Chkjwua900fw54X1l1xQolfG4zZI0TBU4f6.2', '2020-05-29 19:06:59', '2020-05-29 19:06:59', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_asistencias_users` (`user_id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reportes_users` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `fk_asistencias_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `fk_reportes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
