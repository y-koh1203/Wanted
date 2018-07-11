-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `students` (
  `student_id` INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '生徒ID',
  `student_name` VARCHAR(20) NOT NULL COMMENT '生徒名',
  `student_grade` INT(1) NOT NULL COMMENT '学年',
  `student_class` VARCHAR(10) NOT NULL COMMENT '生徒クラス',
  `student_class_number` INT(4) NOT NULL COMMENT '生徒出席番号',
  `student_login_id` VARCHAR(6) NOT NULL COMMENT '生徒ログイン用ID',
  `student_login_password` CHAR(8) NOT NULL COMMENT '生徒パスワード',
  `student_nick_name` VARCHAR(10) NOT NULL COMMENT '生徒ニックネーム',
  `student_profile_image` text NOT NULL COMMENT '生徒プロフィール画像',
  `delete_flg` INT(1) NOT NULL DEFAULT 0 COMMENT '削除フラグ',
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日'
);

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `students`;