show databases;

use ehr;
show tables;

-- birthdetails
CREATE TABLE birth_details (
    patient_id INT,
    date DATETIME,
    birth_order INT,
    gestation VARCHAR(50),
    method_of_delivery VARCHAR(255),
    gestational_age VARCHAR(50),
    delivery_timing VARCHAR(255),
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id)
);

describe birth_details;
select *from birth_details;


-- Call the stored procedure
CALL insert_until_target_size();


-- for size of table
SELECT table_name, ROUND((data_length + index_length) / (1024 * 1024), 2) AS "Size in MB"
FROM information_schema.TABLES
WHERE table_schema = DATABASE() AND table_name = 'birth_details';

SHOW TABLE STATUS LIKE 'birth_details';
-- size of table
SELECT table_name,
       round(((data_length + index_length) / 1024 / 1024), 2) AS `Size in MB`
FROM information_schema.tables
WHERE table_schema = 'ehr'
AND table_name = 'birth_details';


-- for row count
SELECT COUNT(*) FROM birth_details;

select *from birth_details;
CALL insert_details();
SELECT COUNT(*) FROM birth_details;  -- 


-- CALL insert_birth_details();
-- CALL insert_rows_to_reach_target_size();
-- '4147915' 
