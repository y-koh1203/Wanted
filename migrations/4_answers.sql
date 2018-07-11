-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `answers` (
  `answer_id`   INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '回答ID',
  `question_id` INT(4) NOT NULL COMMENT '質問ID',
  `student_id`  INT(4) NOT NULL COMMENT '生徒ID',
  `answer_body` VARCHAR (200) NOT NULL COMMENT '回答内容',
  `answer_like` INT (4) NOT NULL COMMENT '回答いいね数',
  `delete_flg` INT(1) NOT NULL DEFAULT 0 COMMENT '削除フラグ',
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日'
);

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `answers`;