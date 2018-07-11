-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `questions` (
  `question_id` INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '質問ID',
  `student_id`  INT(4) NOT NULL COMMENT '生徒ID',
  `question_title` VARCHAR(50) NOT NULL COMMENT '質問タイトル',
  `question_body` VARCHAR (200) NOT NULL COMMENT '質問内容',
  `delete_flg` INT(1) NOT NULL DEFAULT 0 COMMENT '削除フラグ',
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日'
);

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `questions`;