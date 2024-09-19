# MDMEHR - Multi model based Data Management for Semantic Interoperable Electronic Health Records (polyglot database Set-Up)

EHR Form Generator generates dynamic clinical forms which is easily customizable. Submitted data is stored inside polyglot persistence. It also provides SNOMED-CT terminology binding with the help of Snowstorm API provided by SNOMED-CT itself.


## Installation Manual
Pre-requisites: 
1.	Java 11 or above
2.	Maven 3
3.	MongoDB Community Server and MongoDB Compass (To manage MongoDB)
4.	Nodejs and npm
5.	Nginx
6. MySQL Shell (To manage Mysql)
7. DynamoDB (To manage DynamoDB)

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
** MYSQL
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

** DynamoDB
1. to start database
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

2: to check list of tables
aws dynamodb list-tables --endpoint-url http://localhost:8000

3: to create table
aws dynamodb create-table --table-name address_table --attribute-definitions AttributeName=patient_id,AttributeType=S --key-schema AttributeName=patient_id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:8000

** MongoDB
create database named EHRDB in MOngoDB Campass