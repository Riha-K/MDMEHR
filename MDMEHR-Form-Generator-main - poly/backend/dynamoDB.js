
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

// Create a DynamoDB client with proper AWS SDK v3 configuration
const dynamoDBClient = new DynamoDBClient({ region: 'fakeRegion' }); // Replace 'your-region' with your AWS region

console.log('DynamoDB client created successfully.');

// Export the DynamoDB client for use in other modules
module.exports = dynamoDBClient;

