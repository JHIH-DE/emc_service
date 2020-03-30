CREATE DATABASE IF NOT EXISTS emc_db;
USE emc_db;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` char(40) COLLATE utf8_unicode_ci NOT NULL,
  `role` enum('admin','user','guest') COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '角色權限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表索引 `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- 使用資料表 AUTO_INCREMENT `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE IF NOT EXISTS infected_main
(
  id SERIAL PRIMARY KEY,
  name varchar(32) NOT NULL,
  year varchar(4) NOT NULL,
  month varchar(4) NOT NULL,
  city varchar(32) NOT NULL,
  gender varchar(4) NOT NULL,
  imported varchar(4) NOT NULL,
  age varchar(16) NOT NULL,
  confirmed varchar(4) NOT NULL,
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS countries
(
  id SERIAL PRIMARY KEY,
  code varchar(8) NOT NULL,
  name varchar(64) NOT NULL,
  name_cn varchar(64) NOT NULL,
  latitude float NOT NULL,
  longitude float NOT NULL,
  keyword varchar(64)
);
