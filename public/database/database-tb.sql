-- Active: 1736927428702@@127.0.0.1@3306@ems1
create database ems1;

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

-- Constraint here
-- user fk
ALTER TABLE `employees` 
ADD CONSTRAINT `employees_user_id_fk`
FOREIGN KEY(`user_id`) 
REFERENCES `users`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

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

-- end

CREATE TABLE `users`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `status` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 for old pass 2 for new pass',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

-- Constraint here

-- end

CREATE TABLE `positions`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

-- Constraint here

CREATE TABLE `departments`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `department_head` BIGINT UNSIGNED NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

-- Constraint here
-- emp fk 
ALTER TABLE `departments` 
ADD CONSTRAINT `departments_employee_id_fk`
FOREIGN KEY(`department_head`) 
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
-- end
CREATE TABLE `over_time`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL, -- FK
    `checkin_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `checkout_time` TIMESTAMP DEFAULT NULL,
    `hour` DECIMAL(10,2),
    `approval_status` TINYINT UNSIGNED NOT NULL COMMENT '1 for approve and 2 for reject',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);
-- No date

-- Constraint here

-- emp fk
ALTER TABLE `over_time`
ADD CONSTRAINT `overtime_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
-- end

CREATE TABLE `payrolls`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `ot_id` BIGINT UNSIGNED NULL,
    `bonus` DECIMAL(10,2),
    `total_salary` DECIMAL(10,2),
    `paydate` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);

-- Constraint here
-- ot Fk
ALTER TABLE `payrolls`
ADD CONSTRAINT `payrolls_ot_id_fk`
FOREIGN KEY(`ot_id`)
REFERENCES `over_time`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;


-- end


CREATE TABLE `leaves`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL,
    `leave_unit` TINYINT COMMENT '1 for single and 2 for multiple days leaves',
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `deduction` DECIMAL(10,2),
    `approval_status` TINYINT UNSIGNED NOT NULL COMMENT '1 for approve and 2 for reject',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);

-- Constraint here
--emp fk
ALTER TABLE `leaves`
ADD CONSTRAINT `leaves_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- end

CREATE TABLE `attendances`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL,
    `status` TINYINT UNSIGNED NOT NULL COMMENT '1 for late, 2 for pre, and 3 absent',
    `checkin_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `checkout_time` TIMESTAMP DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);
-- No date

-- Constraint here

ALTER TABLE `attendances`
ADD CONSTRAINT `attendance_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- end


CREATE TABLE`cards`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL,
    `issued_date` DATE NOT NULL,
    `expiration_date` DATE NOT NULL,
    `card_status` TINYINT UNSIGNED NOT NULL COMMENT '1 for active and 2 for expired',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)  
);

-- Constraint here

ALTER TABLE `cards`
ADD CONSTRAINT `cards_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- end 




-- 1/30 -2025 when pass to dob kh
create database ems1;

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
    `status` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 for old pass 2 for new pass',
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
CREATE TABLE `over_time`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL, -- FK
    `checkin_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `checkout_time` TIMESTAMP NULL DEFAULT NULL,
    `hour` DECIMAL(10,2),
    `approval_status` TINYINT UNSIGNED NOT NULL COMMENT '1 for approve and 2 for reject',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);

CREATE TABLE `payrolls`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `ot_id` BIGINT UNSIGNED NULL,
    `bonus` DECIMAL(10,2),
    `total_salary` DECIMAL(10,2),
    `paydate` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);
CREATE TABLE `leaves`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL,
    `leave_unit` TINYINT COMMENT '1 for single and 2 for multiple days leaves',
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `deduction` DECIMAL(10,2),
    `approval_status` TINYINT UNSIGNED NOT NULL COMMENT '1 for approve and 2 for reject',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);	
CREATE TABLE `attendances`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL,
    `status` TINYINT UNSIGNED NOT NULL COMMENT '1 for late, 2 for pre, and 3 absent',
    `checkin_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `checkout_time` TIMESTAMP null DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`) 
);
CREATE TABLE`cards`(
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `employee_id` BIGINT UNSIGNED NULL,
    `issued_date` DATE NOT NULL,
    `expiration_date` DATE NOT NULL,
    `card_status` TINYINT UNSIGNED NOT NULL COMMENT '1 for active and 2 for expired',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)  
);
-- Add contriant 
ALTER TABLE `employees` 
ADD CONSTRAINT `employees_user_id_fk`
FOREIGN KEY(`user_id`) 
REFERENCES `users`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

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

-- ALTER TABLE `departments` 
-- ADD CONSTRAINT `departments_employee_id_fk`
-- FOREIGN KEY(`department_id`) 
-- REFERENCES `employees`(`id`)
-- ON DELETE CASCADE
-- ON UPDATE CASCADE;

ALTER TABLE `over_time`
ADD CONSTRAINT `overtime_employee_i_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
ALTER TABLE `payrolls`
ADD CONSTRAINT `payrolls_ot_id_fk`
FOREIGN KEY(`ot_id`)
REFERENCES `over_time`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
ALTER TABLE `leaves`
ADD CONSTRAINT `leaves_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
ALTER TABLE `attendances`
ADD CONSTRAINT `attendance_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
ALTER TABLE `cards`
ADD CONSTRAINT `cards_employee_id_fk`
FOREIGN KEY(`employee_id`)
REFERENCES `employees`(`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;