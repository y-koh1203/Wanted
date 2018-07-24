-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `genres` (
  `genre_id`   INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'ジャンルID',
  `genre_name`  VARCHAR(20) NOT NULL COMMENT 'ジャンル名',
  `delete_flg` INT(1) NOT NULL DEFAULT 0 COMMENT '削除フラグ',
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日'
);

INSERT INTO `genres`(`genre_name`) VALUES ("国語");
INSERT INTO `genres`(`genre_name`) VALUES ("数学");
INSERT INTO `genres`(`genre_name`) VALUES ("理科");
INSERT INTO `genres`(`genre_name`) VALUES ("社会");
INSERT INTO `genres`(`genre_name`) VALUES ("英語");
INSERT INTO `genres`(`genre_name`) VALUES ("体育");
INSERT INTO `genres`(`genre_name`) VALUES ("音楽");
INSERT INTO `genres`(`genre_name`) VALUES ("家庭");

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `genres`;