SELECT current_user;

CONNECT TO mmehr;

SELECT datname FROM pg_database;

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'mmehr';

CREATE TABLE test (
    data JSONB
);


CREATE TABLE patient (
  patient_id VARCHAR(255) PRIMARY KEY,
  patient_name VARCHAR(255)
);


CREATE TABLE birth_details (
    patient_id VARCHAR(255) PRIMARY KEY,
    date DATE NOT NULL,
    birth_order INT NOT NULL,
    gestation VARCHAR(50) NOT NULL,
    method_of_delivery VARCHAR(100) NOT NULL,
    gestational_age VARCHAR(50) NOT NULL,
    delivery_timing VARCHAR(100) -- Remove NOT NULL constraint here
);

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    address_details TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL,
    additional_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE EXTENSION hstore;

CREATE TABLE address_table (
    patient_id VARCHAR(255) PRIMARY KEY,
    address HSTORE
);



-- for address
DO $$
DECLARE
    entry HSTORE := '"city"=>"Near Bakoli, GT Karnal Road", "country"=>"India", "postal_code"=>"110036", "address_details"=>"National Institute Of Technology Delhi Plot No. FA7,Zone, P1, GT Karnal Rd, Delhi", "additional_details"=>"Department of Computer Science Engg. , Tel: 011-33861153"';
    entry_size_bytes INT := 0;
    total_size_bytes INT := 0;
BEGIN
    -- Calculate the size of the entry
    entry_size_bytes := length(entry::text);
    
    -- Insert the entry repeatedly until total size reaches 1GB
    WHILE total_size_bytes < 1024 * 1024 * 1024 LOOP
        INSERT INTO address_table (patient_id, address) VALUES ('1001', entry);
        total_size_bytes := total_size_bytes + entry_size_bytes;
    END LOOP;
END $$;

-- for patient diganosis
DO $$
DECLARE
    rows_inserted INT := 0;
BEGIN
    WHILE rows_inserted < 480000 LOOP -- 480000 for 341 mb -- Change 1000 to the desired number of rows
        INSERT INTO random (data)
        VALUES ('{
            "children": {
                "subject": {"inputs": ["2", "3", "1", "2"]},
                "encoding": {"value": "2"},
                "language": {"value": "Hinglish"},
                "any_event": {
                    "children": {
                        "spo": {"inputs": ["-11", "3"], "termBindings": {"LOINC": {"value": "[LOINC::59408-5]", "terminologyId": "LOINC"}, "SNOMED-CT": {"value": "[SNOMED-CT::431314004]", "terminologyId": "SNOMED-CT"}}},
                        "spco": {"inputs": ["4", "5"]},
                        "spoc": {"inputs": ["4", "ml/dl"]},
                        "time": {"inputs": ["2024-04-22T22:57"]},
                        "spmet": {"inputs": ["7", "3"]},
                        "comment": {"inputs": ["Healthy"]},
                        "interpretation": {"inputs": ["Normal"]},
                        "confounding_factors": {"inputs": ["3"]}
                    }
                }
            },
            "sensor_site": {"inputs": ["2"]},
            "pre_post-ductal": {"inputs": ["Post-ductal"]}
        }'::jsonb); -- Replace with your JSON data
        
        rows_inserted := rows_inserted + 1;
    END LOOP;
END $$;

-- for birth_details
DO $$
DECLARE
    current_patient_id INT := 5001;
    total_size_bytes INT := 0;
BEGIN
    -- Insert data repeatedly until the target table size is reached
    WHILE total_size_bytes < 352 * 1024 * 1024 LOOP -- 1GB in bytes
        INSERT INTO birth_details (patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing)
        VALUES (current_patient_id, '2024-04-22', 2, 'single', 'Vaginal Delivery', '35', 'full term');

        total_size_bytes := total_size_bytes + pg_column_size(ROW('2024-04-22', 2, 'single', 'Vaginal Delivery', '35', 'full term')) + pg_column_size(current_patient_id::text);
        current_patient_id := current_patient_id + 1;
    END LOOP;
END $$;

-- check size of table
SELECT pg_size_pretty(pg_total_relation_size('address_table')) AS total_table_size;



