-- Not used DB autocreated (minus perms)


CREATE DATABASE IF NOT EXISTS mydatabase;
Use mydatabase;

-- -- 1. BRANCH
-- CREATE TABLE branch (
--     branch_id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(200) NOT NULL,
--     street VARCHAR(200),
--     city VARCHAR(100),
--     state VARCHAR(50),
--     phone VARCHAR(30),
--     manager_name VARCHAR(200)
-- );

-- -- 2. CUSTOMER
-- CREATE TABLE customer (
--     customer_id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
--     password VARCHAR(100) NOT NULL,
--     name VARCHAR(200) NOT NULL,
--     street VARCHAR(200),
--     city VARCHAR(100),
--     state VARCHAR(50),
--     phone VARCHAR(30),
--     email VARCHAR(200) UNIQUE,
--     date_of_birth DATE
--     -- Removed CHECK(date_of_birth <= CURRENT_DATE)
-- );

-- -- 3. EMPLOYEE
-- -- CREATE TABLE employee (
-- --     employee_id INT AUTO_INCREMENT PRIMARY KEY,
-- --     branch_id INT NOT NULL,
-- --     name VARCHAR(200) NOT NULL,
-- --     title VARCHAR(100),
-- --     position VARCHAR(100),
-- --     salary DECIMAL(12,2) NOT NULL CHECK (salary >= 0),
-- --     hire_date DATE NOT NULL,
-- --     FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
-- --         ON UPDATE CASCADE
-- --         ON DELETE RESTRICT
-- -- );

-- -- 4. ACCOUNT
-- CREATE TABLE account (
--     account_id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_id CHAR(36) NOT NULL,
--     branch_id INT NOT NULL,
--     account_type ENUM('checking','savings','money_market','cd') NOT NULL,
--     balance DECIMAL(18,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
--     opening_date DATE NOT NULL,
--     status ENUM('active','closed','frozen','dormant') NOT NULL,
--     FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
--         ON UPDATE CASCADE
--         ON DELETE RESTRICT,
--     FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
--         ON UPDATE CASCADE
--         ON DELETE RESTRICT
-- );

-- -- 5. LOAN
-- CREATE TABLE loan (
--     loan_id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_id CHAR(36) NOT NULL,
--     branch_id INT NOT NULL,
--     amount DECIMAL(18,2) NOT NULL CHECK (amount > 0),
--     interest_rate DECIMAL(6,3) NOT NULL CHECK (interest_rate >= 0),
--     start_date DATE NOT NULL,
--     end_date DATE,
--     status ENUM('active','closed','defaulted','pending') NOT NULL,
--     FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
--         ON UPDATE CASCADE
--         ON DELETE RESTRICT,
--     FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
--         ON UPDATE CASCADE
--         ON DELETE RESTRICT
-- );

-- -- 6. TRANSACTION LOG
-- CREATE TABLE transaction_log (
--     transaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     account_id INT NOT NULL,
--     transaction_type ENUM('deposit','withdrawal','transfer_in','transfer_out','fee','interest') NOT NULL,
--     amount DECIMAL(18,2) NOT NULL CHECK (amount > 0),
--     transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     description VARCHAR(500),
--     FOREIGN KEY (account_id) REFERENCES account(account_id)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE
-- );

-- -- ==========================================
-- -- INDEXES
-- -- ==========================================
-- CREATE INDEX idx_account_customer ON account(customer_id);
-- CREATE INDEX idx_account_branch ON account(branch_id);
-- CREATE INDEX idx_transaction_account_date ON transaction_log(account_id, transaction_date DESC);
-- CREATE INDEX idx_loan_customer ON loan(customer_id);
-- CREATE INDEX idx_loan_branch ON loan(branch_id);
-- CREATE INDEX idx_employee_branch ON employee(branch_id);

-- ==========================================
-- PAYEES
-- ==========================================
-- CREATE TABLE payee (
--     payee_id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_id CHAR(36),
--     name VARCHAR(255) NOT NULL,
--     payee_type VARCHAR(100),
--     account_number VARCHAR(255),
--     average_amount DECIMAL(18,2),
--     last_payment DATE,
--     FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
--         ON UPDATE CASCADE
--         ON DELETE SET NULL
-- );

-- -- ==========================================
-- -- PAYMENTS
-- -- ==========================================
-- CREATE TABLE payment (
--     payment_id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_id CHAR(36) NOT NULL,
--     payee_id INT NOT NULL,
--     from_account INT NOT NULL,
--     amount DECIMAL(18,2) NOT NULL,
--     payment_date DATE NOT NULL,
--     memo VARCHAR(255),
--     frequency VARCHAR(50),
--     status VARCHAR(50),
--     FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
--     FOREIGN KEY (payee_id) REFERENCES payee(payee_id),
--     FOREIGN KEY (from_account) REFERENCES account(account_id)
-- );

-- -- ==========================================
-- -- TRANSFERS
-- -- ==========================================
-- CREATE TABLE transfer (
--     transfer_id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_id CHAR(36) NOT NULL,
--     from_account INT NOT NULL,
--     to_account INT NULL,
--     external_account VARCHAR(255),
--     amount DECIMAL(18,2) NOT NULL,
--     transfer_date DATE NOT NULL,
--     memo VARCHAR(255),
--     frequency VARCHAR(50),
--     type VARCHAR(50),
--     status VARCHAR(50),
--     FOREIGN KEY (from_account) REFERENCES account(account_id),
--     FOREIGN KEY (to_account) REFERENCES account(account_id)
-- );

-- privileges (all for now (only ok since isolated in network))
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'%';
FLUSH PRIVILEGES;
