const express = require('express');
const cors = require('cors');
const mysqlConnection = require('./mysql'); // Import MySQL connection
const dbConnect = require('./mongodb'); // Import MongoDB connection
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const app = express();
app.use(cors());
app.use(express.json());
const port = 5001;

// Function to execute MySQL queries and log the time taken
async function executeMySQLQuery(query, values, message, res) {
  try {
    console.time(message);
    const result = await mysqlConnection.query(query, values);
    console.timeEnd(message);
    res.status(200).json({ message: `${message} - Patient data stored in MySQL successfully`, time: `${message} - Time taken: ${message}` });
  } catch (error) {
    console.error(`Error storing data in MySQL for ${message}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// MySQL route for storing patient data
app.post('/mysql/patient', async (req, res) => {
  const { patient_id, patient_name } = req.body;
  const query = 'INSERT INTO patient (patient_id, patient_name) VALUES (?, ?) ON DUPLICATE KEY UPDATE patient_name = VALUES(patient_name)';
  await executeMySQLQuery(query, [patient_id, patient_name], 'mysql_patient', res);
});

// MySQL route for storing birth details
app.post('/mysql/birth_details', async (req, res) => {
  const { patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing } = req.body;
  const query = 'INSERT INTO birth_details (patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing) VALUES (?, ?, ?, ?, ?, ?, ?)';
  await executeMySQLQuery(query, [patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing], 'mysql_birth_details', res);
});

// MongoDB route for general data insertion
app.post('/mongo/insert', async (req, res) => {
  try {
    console.time('mongo_insert');
    const data = await dbConnect();
    const result = await data.insertOne(req.body);
    console.timeEnd('mongo_insert');
    res.status(200).json({ message: 'Data inserted into MongoDB successfully', time: 'mongo_insert - Time taken: mongo_insert' });
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DynamoDB route for inserting address data
const dynamoDBClient = new DynamoDBClient({
  region: 'fakeRegion', // Replace 'fakeRegion' with your AWS region
  endpoint: 'http://localhost:8000' // Add endpoint URL for DynamoDB Local
});

app.post('/dynamodb/insert', async (req, res) => {
  try {
    const { patient_id, address_details, city, postal_code, country, additional_details } = req.body;
    console.time('dynamodb_insert');
    const params = {
      TableName: 'address_table',
      Item: {
        patient_id: { S: patient_id },
        address_details: { S: address_details },
        city: { S: city },
        postal_code: { S: postal_code },
        country: { S: country },
        additional_details: { S: additional_details },
      },
    };
    await dynamoDBClient.send(new PutItemCommand(params));
    console.timeEnd('dynamodb_insert');
    res.status(200).json({ message: 'Address data stored in DynamoDB successfully', time: 'dynamodb_insert - Time taken: dynamodb_insert' });
  } catch (error) {
    console.error('Error inserting address data into DynamoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
