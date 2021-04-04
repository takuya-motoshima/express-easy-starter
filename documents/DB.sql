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
  ('robin@example.com', 'password', 'Robin'),
  ('taylor@example.com', 'password', 'Taylor'),
  ('vivian@example.com', 'password', 'Vivian'),
  ('harry@example.com', 'password', 'Harry'),
  ('eliza@example.com', 'password', 'Eliza'),
  ('nancy@example.com', 'password', 'Nancy'),
  ('melinda@example.com', 'password', 'Melinda'),
  ('harley@example.com', 'password', 'Harley');