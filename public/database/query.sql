CREATE TABLE `user`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`));


----------------- employee--------------------
---21/01/2025
CREATE TABLE `employee`(
    `id` BIGINT AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED ,
    `sex` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 for male 2 for femal',
    `dof` Date ,
    `phone` VARCHAR(100)  UNIQUE,
    `address` VARCHAR(200),
    `department` VARCHAR(200),
    `position` VARCHAR(100),
    `hire_date` DATE ,
    `salary` DECIMAL(10,2) ,  
    `avatar` VARCHAR(200) NOT NULL,  
PRIMARY KEY(`id`));

ALTER TABLE `employee`
ADD CONSTRAINT `employee_user_id_fk`
FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

SELECT 
    employee.id,
    CONCAT(user.first_name, user.last_name) AS fullname, 
    employee.sex,
    employee.dof,
    employee.phone,
    employee.address,
    employee.department,
    employee.position,
    employee.hire_date,
    employee.salary,
    employee.avatar
FROM employee  
INNER JOIN user ON user.id = employee.user_id;

INSERT INTO `user`(`first_name`,`last_name`,`email`) VALUES 
('kim ', 'jiso', 'jiso@gmail.com'),
('keo ', 'panha', 'jis@gmail.com');

INSERT INTO `employee`(`user_id`,`sex`,`phone`) VALUES 
(1,2,'0975696572'),
(2,1,'0975696570');

-- user.first_name AS user_fname, 
-- user.last_name AS user_lname, 
-- CONCAT(user.first_name, user.last_name) AS fullname

-- Jan-20-2025
CREATE TABlE `branch`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL,
    `latitude` DECIMAL(10, 7) NOT NULL,
    `longitude` DECIMAL(10, 7) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
