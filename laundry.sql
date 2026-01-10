-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2026 at 07:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laundry`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('progress','completed','cancelled') NOT NULL DEFAULT 'progress',
  `total_amount` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `service_id`, `name`, `phone`, `address`, `quantity`, `status`, `total_amount`, `notes`, `created_at`, `updated_at`) VALUES
(18, 10, 1, 'Andika Firansyah', '082169806800', 'Batang Anai Street No. 9, Rimbo Kaluang Subdistrict, West Padang District', 2, 'completed', 10000, 'Asiaapp', '2026-01-10 05:07:11', '2026-01-10 05:07:44'),
(19, 14, 2, 'Aleng mempesona', '082169806800', 'Gunuang Sarik', 1, 'completed', 12000, '', '2026-01-10 05:59:02', '2026-01-10 06:00:06'),
(20, 15, 3, 'Farel Mempesona', '082169806800', 'Gunuang Sarik di kadai e', 14, 'completed', 280000, '', '2026-01-10 06:05:00', '2026-01-10 06:05:49');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(24) NOT NULL,
  `estimation` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `price`, `estimation`, `created_at`, `updated_at`) VALUES
(1, 'Cuci Biasa', 'Pencucian standart dengan deterjen', 5000, '3-5 hari', '2026-01-07 15:04:20', '2026-01-07 15:04:20'),
(2, 'Cuci Express', 'Layanan kilat untuk kebutuhan mendesak', 12000, '3 jam', '2026-01-07 15:05:21', '2026-01-07 15:05:21'),
(3, 'Cuci Dry Clean', 'Untuk pakaian yang memerlukan perawatan khusus', 20000, '2-3 hari', '2026-01-07 15:07:18', '2026-01-07 15:07:18'),
(4, 'Cuci Setrika', 'Cuci dan setrika lengkap', 8000, '2-3 hari', '2026-01-07 15:07:51', '2026-01-07 15:07:51');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL,
  `status` enum('progress','completed','cancelled') NOT NULL DEFAULT 'progress',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `order_id`, `amount`, `transaction_date`, `notes`, `status`, `created_at`) VALUES
(7, 18, 10000.00, '2026-01-10 05:07:11', 'Asiaapp', 'completed', '2026-01-10 05:07:44'),
(8, 19, 12000.00, '2026-01-10 05:59:02', '', 'completed', '2026-01-10 06:00:06'),
(9, 20, 280000.00, '2026-01-10 06:05:00', '', 'completed', '2026-01-10 06:05:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `role`, `created_at`) VALUES
(9, 'Andika Firansyah', '$2b$10$IyOHRcWQe/n9Omu6ft4tCeuYTBComddKHNkMTnJgK3WhrX8mqVXw.', 'andikafiransyah1905@gmail.com', 'user', '2026-01-05 16:51:01'),
(10, 'Farel Wira', '$2b$10$MjZ4HveRzp6ZkKw7rJvsfupy6O0F38WOrH8b5h8nAbnxeqWGrPG0C', 'farelwira09@gmail.com', 'admin', '2026-01-07 11:02:37'),
(11, 'Pelanggan Laundry', '$2b$10$hlTZ0iP51qU1vWAeHPZdeezTZr3qdU4JIfFEeQiVwPyqvi8UHPg1a', 'pelangganlaundry@gmail.com', 'user', '2026-01-08 10:28:06'),
(12, 'Farel Customer', '$2b$10$BQPHLge6w.L4.DX9MncTA.BIHzJUAIqJD8tMdVRFWaptfe0wf/9uC', 'farelcustomer@gmail.com', 'user', '2026-01-10 05:35:55'),
(13, 'Aleng Ganteng', '$2b$10$o8uFtTS8uC5CI88UXFSe1uxGMdIzMR.5aVWWDDL4//YrmC3ZsBp.W', 'alengganteng@gmail.com', 'user', '2026-01-10 05:44:17'),
(14, 'aleng mempesona', '$2b$10$0ciD0d/5fuokOnD6wQW.UeENnumm3zW.9Xqr3Avd/cbERLmjl7Q16', 'alengmempesona@gmail.com', 'user', '2026-01-10 05:58:12'),
(15, 'Farel Pelanggan', '$2b$10$YSUkokvWudEGmrPivAv.9usADbpX9l9dQsHEX7DouCcVppCny6FJG', 'farelpelanggan@gmail.com', 'user', '2026-01-10 06:03:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_customer_id` (`user_id`),
  ADD KEY `orders_ibfk_2` (`service_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_id` (`order_id`),
  ADD KEY `idx_transaction_date` (`transaction_date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
