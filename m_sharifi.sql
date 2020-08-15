-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2020 at 04:28 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m.sharifi`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `image_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `place_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `title`, `description`, `user_id`, `address`) VALUES
(1, 'mashhad', 'this is beutiful', '1', 'gdy j,gutjh'),
(2, 'mashhad', 'this is beutiful', '1', 'gdy j,gutjh'),
(3, 'mashhad', 'this is beutiful', '1', 'gdy j,gutjh'),
(4, 'mashhad', 'this is beutiful', '1', 'gdy j,gutjh'),
(5, 'mashhad', 'this is beutiful', '1', 'gdy j,gutjh'),
(6, 'mashhad', 'this is beutiful', '1', 'dfgd'),
(7, 'mashhad', 'this is beutiful', '1', 'dfgd'),
(8, 'mashhad', 'this is beutiful', '1', 'jhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'),
(9, 'mashhad', 'this is beutiful', '1', 'jhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'),
(10, 'mashhad', 'this is beutiful', '1', 'jhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` int(11) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `vote` int(11) NOT NULL,
  `average` int(11) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
