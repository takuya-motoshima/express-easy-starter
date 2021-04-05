CREATE DATABASE IF NOT EXISTS `sample` DEFAULT CHARACTER SET utf8mb4;

USE `sample`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukAccount1` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`email`, `password`, `name`) VALUES
  ('robin@example.com', 'password', 'password'),
  ('taylor@example.com', 'password', 'password'),
  ('vivian@example.com', 'password', 'password'),
  ('harry@example.com', 'password', 'password'),
  ('eliza@example.com', 'password', 'password'),
  ('nancy@example.com', 'password', 'password'),
  ('melinda@example.com', 'password', 'password'),
  ('harley@example.com', 'password', 'password');