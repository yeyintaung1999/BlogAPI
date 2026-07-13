import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION as string
const client = new DynamoDBClient({
    region: region,
})

export const dynamoDb = DynamoDBDocumentClient.from(client)