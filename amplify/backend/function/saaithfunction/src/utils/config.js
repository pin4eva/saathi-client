const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const AWS_CONFIG = {
  aws_table_item: "item",
  aws_table_user: "user",
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
  },
};

const config = {
  SECRET: process.env.SECRET || "khdkdkdakdke",
  AWS_CONFIG,
};

AWS.config.update(AWS_CONFIG.aws_remote_config);

const dynamo = new AWS.DynamoDB.DocumentClient();
module.exports = {
  config,
  dynamo,
  AWS_CONFIG,
};
