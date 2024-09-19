# MDMEHR - Multi model based Data Management for Semantic Interoperable Electronic Health Records (multi-model database Set-Up)

EHR Form Generator generates dynamic clinical forms which is easily customizable. Submitted data is stored inside polyglot persistence. It also provides SNOMED-CT terminology binding with the help of Snowstorm API provided by SNOMED-CT itself.


## Installation Manual
Pre-requisites: 
1.	Java 11 or above
2.	Maven 3
3.	PG Admin (To manage PostgreSQL)
4.	Nodejs and npm
5.	Nginx

Components:
1.	PosgreSQL (as databases)
2.	React Frontend 
3.	Nodejs Backend
4.	Snowstorm
5.	Elasticsearch 7.1.0 (as a component of Snowstorm)
6.	Nginx (used as a proxy server for Snowstorm)

Installation Steps:
•	Snowstorm: 

1.	Follow the steps given in the Readme file of the GitHub repository given below.
https://github.com/IHTSDO/snowstorm/blob/master/docs/getting-started.md

2.	Download and start Elasticsearch 7.1.0 server.
3.	Download the snowstorm jar file mentioned in the Readme file and run it. Make sure to remove “--snowstorm.rest-api.readonly=true” option while running the snowstorm server.
4.	Download the International Snowstorm release files from this website -https://mlds.ihtsdotools.org/#/landing

5.	To download the release files, first you will have to login in the website and request for the access of release files by submitting an application.
6.	Application will get approved in 2-3 days, after which download the release files and load them in the snowstorm server following the steps mentioned in the readme file.
7.	Also Download Nginx and paste the configurations given in the Readme file in the “nginx.conf” file. To avoid CORS problem, add this to nginx - 
“ Access-Control-Allow-Origin: * ” 

•	Frontend: 
1.	Clone the folder MDMEHR-Form-Generator-main - poly to run polyglot persistence setup.
2.	Run “npm start” inside the “EHR_Form_Generator” Directory. Frontend will run at port 3000 by default.

•	Backend:
1.	To run the backend, go inside the backend folder of the same repository and run “npm start”. Backend will run at 5001 port by default.
	Data is saved inside MongoDB, MySQL and Dynamo DB which is visible in their respective spftwares.

** Create Database Using below commands

SELECT current_user;
CONNECT TO mmehr;
SELECT datname FROM pg_database;

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'mmehr';

//patient diagnosis
CREATE TABLE test (
    data JSONB
);

// patient table
CREATE TABLE patient (
  patient_id VARCHAR(255) PRIMARY KEY,
  patient_name VARCHAR(255)
);

// birth_detail tables
CREATE TABLE birth_details (
    patient_id VARCHAR(255) PRIMARY KEY,
    date DATE NOT NULL,
    birth_order INT NOT NULL,
    gestation VARCHAR(50) NOT NULL,
    method_of_delivery VARCHAR(100) NOT NULL,
    gestational_age VARCHAR(50) NOT NULL,
    delivery_timing VARCHAR(100) -- Remove NOT NULL constraint here
);

// address table
CREATE EXTENSION hstore;
CREATE TABLE address_table (
    patient_id VARCHAR(255) PRIMARY KEY,
    address HSTORE
);


