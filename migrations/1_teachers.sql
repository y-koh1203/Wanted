-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `teachers` (
  `teacher_id` INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '教師ID',
  `teacher_name` VARCHAR(20) NOT NULL COMMENT '教師名',
  `teacher_grade_homeroom` INT(1) NOT NULL COMMENT '担当学年',
  `teacher_homeroom` VARCHAR(10) NOT NULL COMMENT '担当クラス',
  `teacher_password` CHAR(8) NOT NULL COMMENT 'パスワード',
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日'
);

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `teachers`;
