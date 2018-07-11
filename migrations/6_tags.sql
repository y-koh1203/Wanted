-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `tags` (
  `tag_id`   INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'タグID',
  `question_id` INT(4) NOT NULL  COMMENT '質問ID',
  `tag_name`  VARCHAR(20) NOT NULL COMMENT 'タグ名',
  `delete_flg` INT(1) NOT NULL DEFAULT 0 COMMENT '削除フラグ',
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
  `update_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日'
);

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `tags`;