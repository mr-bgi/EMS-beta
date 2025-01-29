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
-- CREATE TABLE `employee`(
--     `id` BIGINT AUTO_INCREMENT,
--     `user_id` BIGINT UNSIGNED ,
--     `sex` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 for male 2 for femal',
--     `dof` Date ,
--     `phone` VARCHAR(100)  UNIQUE,
--     `address` VARCHAR(200),
--     `department` VARCHAR(200),
--     `position` VARCHAR(100),
--     `hire_date` DATE ,
--     `salary` DECIMAL(10,2) ,  
--     `avatar` VARCHAR(200) NOT NULL,  
-- PRIMARY KEY(`id`));

-- ALTER TABLE `employee`
-- ADD CONSTRAINT `employee_user_id_fk`
-- FOREIGN KEY(`user_id`)
-- REFERENCES `user` (`id`)
-- ON UPDATE CASCADE
-- ON DELETE CASCADE;

-- SELECT 
--     employee.id,
--     CONCAT(user.first_name, user.last_name) AS fullname, 
--     employee.sex,
--     employee.dof,
--     employee.phone,
--     employee.address,
--     employee.department,
--     employee.position,
--     employee.hire_date,
--     employee.salary,
--     employee.avatar
-- FROM employee  
-- INNER JOIN user ON user.id = employee.user_id;

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


---- Jan-23-2025

CREATE TABLE `employees`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NULL, 
    `gender` TINYINT UNSIGNED NOT NULL COMMENT '1 For Male and 2 For Female',
    `dob` DATE NOT NULL,
    `phone` VARCHAR(255) UNIQUE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `department_id` BIGINT UNSIGNED NULL, 
    `position_id` BIGINT UNSIGNED NULL, 
    `hire_date` DATE NOT NULL,
    `cv_filename` VARCHAR(255),
    `base_salary` DECIMAL(10,2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

CREATE TABLE `users`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

CREATE TABLE `positions`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

CREATE TABLE `departments`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `department_head` BIGINT UNSIGNED NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

ALTER TABLE `employee`
ADD CONSTRAINT `employee_user_id_fk`
FOREIGN KEY(`user_id`)
REFERENCES `users` (`id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- position fk
ALTER TABLE `employees` 
ADD CONSTRAINT `employees_position_id_fk`
FOREIGN KEY(`position_id`) 
REFERENCES `positions`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
-- dept fk
ALTER TABLE `employees` 
ADD CONSTRAINT `employees_dept_id_fk`
FOREIGN KEY(`department_id`) 
REFERENCES `departments`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;


-- Constraint here
-- emp fk 
ALTER TABLE `departments` 
ADD CONSTRAINT `departments_employee_id_fk`
FOREIGN KEY(`department_head`) 
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

--Jion Table
SELECT 
    employees.id,
    CONCAT(users.first_name, users.last_name) AS fullname, 
    employees.gender,
    employees.dob,
    employees.phone,
    employees.address,
    departments.name AS department_name,
    positions.name AS position_name,
    employees.hire_date,
    employees.base_salary,
FROM employees  
INNER JOIN users ON users.id = employees.user_id
INNER JOIN  departments ON departments.id = employees.department_id
INNER JOIN positions ON positions.id = employees.position_id;


--- 24/01/2025
INSERT INTO `users`(`first_name`,`last_name`,`email`) VALUES 
('kim ', 'jiso', 'jiso@gmail.com'),
('keo ', 'panha', 'jis@gmail.com');

INSERT INTO `employees`(`user_id`, `gender`, `dob`, `phone`, `address`, `department_id`, `position_id`, `hire_date`) VALUES 
(7,1,'10-02-2000','0987654','Pp',7,1,'12-02-2025'),
(8,2,'10-03-2000','0987754','Pp',8,2,'12-02-2015');

INSERT INTO `positions`( `name`, `description`) VALUES 
('Manager','thank you next'),
('HR','You are welcome');

INSERT INTO `departments`( `name`, `department_head`) VALUES 
('IT',1),
('Web',2);

-------Jan-27-2025------

---Create Table Position
CREATE TABLE `positions`(
    `id` TINYINT AUTO_INCREMENT,
`name` VARCHAR(255),
    `description` VARCHAR(255),
PRIMARY KEY(`id`));

---Create Table Departments
CREATE TABLE `departments`(
    `id` TINYINT AUTO_INCREMENT,
`name` VARCHAR(255),
    `department_head` BIGINT ,
PRIMARY KEY(`id`));
--* 27-01-2025 KH
CREATE TABLE `user`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role` TINYINT(1) UNSIGNED NOT NULL COMMENT `1 for user 2 for admin`,
    `avarta` VARCHAR(255) NULL,
    `status` TINYINT(1) UNSIGNED NOT NULL COMMENT `1 for old pass 2 for new pass`,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`));

CREATE TABLE `employees`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NULL, 
    `sex` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 For Male and 2 For Female',
    `dob` DATE NOT NULL,
    `phone` VARCHAR(255) UNIQUE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `department_id` BIGINT UNSIGNED NULL, 
    `position_id` BIGINT UNSIGNED NULL, 
    `hire_date` DATE NOT NULL,
    `cv_filename` VARCHAR(255),
    `base_salary` DECIMAL(10,2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

CREATE TABLE `card`(
     `id` BIGINT UNSIGNED AUTO_INCREMENT,
     `employee_id`  BIGINT UNSIGNED,
     `issued_date` DATE,
     `expired_date` DATE,
     `status` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 For active and 2 For Inactive',
     `pdf_name` VARCHAR(255) NULL
     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`));
