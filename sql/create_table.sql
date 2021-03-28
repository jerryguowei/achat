
#DROP DATABASE achat;
 CREATE DATABASE achat;
 USE achat;
DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
	`user_id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(200) NOT NULL,
    `password` varchar(200) NOT NULL,
    `email` varchar(200) NOT NULL,
    `create_date` timestamp DEFAULT CURRENT_TIMESTAMP,
	`update_date` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`active` tinyint default 1,
	PRIMARY KEY(`user_id`),
	UNIQUE(`username`),
    UNIQUE(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_user_relation`;

CREATE TABLE `user_user_relation` (
	`from_user` int(11) NOT NULL,
    `to_user` int(11) NOT NULL,
    `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`from_user`, `to_user`),
    FOREIGN KEY(`from_user`) REFERENCES  `user_info`(`user_id`) ON DELETE CASCADE,
	FOREIGN KEY(`to_user`) REFERENCES  `user_info`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `private_message`;
CREATE TABLE `private_message`(
	`msg_id` int(11) NOT NULL AUTO_INCREMENT,
    `from_user` int(11) NOT NULL,
    `to_user` int(11) NOT NULL,
    `message` text,
	`attachments` varchar(250) DEFAULT '[]',
    `time` TIMESTAMP NOT NULL,
    PRIMARY KEY(`msg_id`),
    FOREIGN KEY(`from_user`) REFERENCES `user_info`(`user_id`) ON DELETE CASCADE,
	FOREIGN KEY(`to_user`) REFERENCES `user_info`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `add_user_request`(
 `id` INTEGER NOT NULL AUTO_INCREMENT,
 `from_user` INTEGER NOT NULL,
 `to_user` INTEGER NOT NULL,
 `status` enum('PENDING', 'ACCEPT', 'REJECT'),
 `request_message` varchar(256) NOT NULL, 
 `reject_message`  varchar(256),
 `request_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(`id`),
 FOREIGN KEY(`from_user`) REFERENCES `user_info`(`user_id`) ON DELETE CASCADE,
 FOREIGN KEY(`to_user`) REFERENCES `user_info`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `add_user_request` change COLUMN `request_message` `request_message` varchar(256);
ALTER TABLE `add_user_request` change COLUMN `status` `status`  enum('PENDING', 'ACCEPT',  'REJECT') NOT NULL;

#2021-03-16
ALTER TABLE `private_message` ADD COLUMN `viewed` TINYINT default 0 check (`viewed` in (0,1));
ALTER TABLE `add_user_request` ADD COLUMN `viewed` TINYINT default 0 check (`viewed` in (0,1));


ALTER DATABASE achat CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci; COMMIT;
ALTER TABLE `private_message` MODIFY `message` TEXT CHARSET utf8mb4;
