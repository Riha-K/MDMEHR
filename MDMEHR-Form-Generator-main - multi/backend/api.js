const express = require('express');
const db = require('./PostgreSQL'); // Assuming the PostgreSQL module is in the same directory
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Middleware to measure time taken for each request
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.method} ${req.originalUrl} took ${duration} milliseconds.`);
  });
  next();
});

app.post('/postgre/insert', async (req, res) => {
  try {
    const start = Date.now();
    const { data } = req.body;
    const query = 'INSERT INTO random (data) VALUES ($1)';
    await db.query(query, [data]);
    const duration = Date.now() - start;
    console.log(`PostgreSQL insert operation took ${duration} milliseconds.`);
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/postgre/insertaddress', async (req, res) => {
  try {
    const start = Date.now();
    const { patient_id, address_details, city, postal_code, country, additional_details } = req.body;
    const addressObject = {
      'address_details': address_details,
      'city': city,
      'postal_code': postal_code,
      'country': country,
      'additional_details': additional_details
    };
    const addressString = Object.entries(addressObject)
      .map(([key, value]) => `"${key}"=>"${value}"`)
      .join(',');
    const query = `
      INSERT INTO address_table (patient_id, address)
      VALUES ($1, $2)
    `;
    await db.query(query, [patient_id, addressString]);
    const duration = Date.now() - start;
    console.log(`PostgreSQL insertaddress operation took ${duration} milliseconds.`);
    res.status(200).send('Address data inserted successfully');
  } catch (error) {
    console.error('Error inserting address data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/postgre/birth_details', async (req, res) => {
  try {
    const start = Date.now();
    const { patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing } = req.body;
    const query = `
      INSERT INTO birth_details (patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await db.query(query, [patient_id, date, birth_order, gestation, method_of_delivery, gestational_age, delivery_timing]);
    const duration = Date.now() - start;
    console.log(`PostgreSQL birth_details operation took ${duration} milliseconds.`);
    res.status(200).json({ message: 'Birth details stored in PostgreSQL successfully' });
  } catch (error) {
    console.error('Error storing birth details in PostgreSQL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/postgre/patient', async (req, res) => {
  try {
    const start = Date.now();
    const { patient_id, patient_name } = req.body;
    const query = `
      INSERT INTO patient (patient_id, patient_name)
      VALUES ($1, $2)
      ON CONFLICT (patient_id) DO UPDATE SET patient_name = EXCLUDED.patient_name
    `;
    await db.query(query, [patient_id, patient_name]);
    const duration = Date.now() - start;
    console.log(`PostgreSQL patient operation took ${duration} milliseconds.`);
    res.status(200).json({ message: 'Patient data stored in PostgreSQL successfully' });
  } catch (error) {
    console.error('Error storing patient data in PostgreSQL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});