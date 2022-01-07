-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2021 at 04:03 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medi`
--

-- --------------------------------------------------------

--
-- Table structure for table `advice`
--

CREATE TABLE `advice` (
  `advice_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `advice` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `advice`
--

INSERT INTO `advice` (`advice_id`, `appointment_id`, `advice`) VALUES
(1, 1, 'Eat well food');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `user_name` text NOT NULL,
  `id` int(10) NOT NULL,
  `time` datetime NOT NULL,
  `details` text NOT NULL,
  `contact` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`user_name`, `id`, `time`, `details`, `contact`, `appointment_id`) VALUES
('test', 3, '2021-11-07 21:18:08', 'I am suffering from fever', 0, 1),
('test', 3, '2021-11-17 21:18:08', 'I have pain in my hand', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` int(100) NOT NULL,
  `name` text NOT NULL,
  `user_name` text NOT NULL,
  `password` text NOT NULL,
  `work_place` text NOT NULL,
  `qualification` text NOT NULL,
  `exprience` text NOT NULL,
  `department` text NOT NULL,
  `wallet_address` text NOT NULL,
  `gender` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `name`, `user_name`, `password`, `work_place`, `qualification`, `exprience`, `department`, `wallet_address`, `gender`, `image`) VALUES
(3, 'tesing user', 'test', '$2b$10$fmFFtkzKy7Y9ZYOyVgH3l.xEzWK6OHoqd.frIlyuiKsFWZS.OzMEG', 'Dhaka', 'MBBS', 'A lot of exprience', 'heart', '1', 'male', 'http://localhost:3000/uploads\\1636081169123-IMG20210805103001.jpg'),
(4, 'nazmul81', 'test2', '$2b$10$gAS/BKssPO7aUbEWw2Y3AOs.q5b7a15w/AwSBo1xXnL0yPt.OUjg6', 'Dhaka', 'MBBS', 'A lot', 'heart', 'KUET', 'male', 'http://localhost:3000/uploads\\1636471501936-FB_IMG_1616808034331.jpg'),
(5, 'nazmul81', 'test3', '$2b$10$tfGwNOrPFR4MOzAZe1Ej0urzLLjNQl8lKjCR/REEckKCN5rmkXnbK', 'Dhaka', 'MBBS', 'A lot', 'heart', 'KUET', 'male', 'http://localhost:3000/uploads\\1636471603400-FB_IMG_1616808034331.jpg'),
(6, 'nazmul81', 'test4', '$2b$10$pnFqU8Bk6PdbboeDUXksQOGt8d4hiOqnHv6n9hWTkkFCH.tb9rQqa', 'Dhaka', 'MBBS', 'A lot', 'heart', 'KUET', 'male', 'http://localhost:3000/uploads\\1636471782422-FB_IMG_1616808034331.jpg'),
(7, 'Nazmul81', 'test7', '$2b$10$HA3WJpROvijA3ArYxsjq7ugUUd6DkMAGTJSfjKxs6LW8phHmjyQRy', 'Dhaka', 'MBBS', 'A lot', 'heart', 'KUET', 'male', 'http://localhost:3000/uploads\\1636472033813-FB_IMG_1616808034331.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(100) NOT NULL,
  `name` text NOT NULL,
  `user_name` text NOT NULL,
  `password` text NOT NULL,
  `gender` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `name`, `user_name`, `password`, `gender`) VALUES
(1, 'Testing Patient', 'test', '$2b$10$Q2YXkyX9Oy.c7/g3DK8Y0u7GNOXEXWXkTemiO2pJxmxWx/PgZIbzi', 'male'),
(2, 'tesing user', 'test', '$2b$10$fmFFtkzKy7Y9ZYOyVgH3l.xEzWK6OHoqd.frIlyuiKsFWZS.OzMEG', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `uid` int(5) NOT NULL,
  `name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`uid`, `name`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advice`
--
ALTER TABLE `advice`
  ADD PRIMARY KEY (`advice_id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advice`
--
ALTER TABLE `advice`
  MODIFY `advice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `uid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
