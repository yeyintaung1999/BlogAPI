import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    QueryCommand,
    ScanCommand
} from "@aws-sdk/lib-dynamodb";
import { any } from "zod";

export class DynamoDBRepository<T extends Record<string,any>>{
    constructor(
        protected readonly client: DynamoDBDocumentClient,
        protected readonly tableName: string,
    ){}

    async put(item: T){
        await this.client.send(
            new PutCommand({
                TableName: this.tableName,
                Item: item
            })
        )
    }

    async get(key: Record<string,unknown>){
        console.log("Table:", this.tableName);
        console.log("Key:", key);
        const result = await this.client.send(
            new GetCommand({
                TableName: this.tableName,
                Key: key
            })
        )
        return result.Item
    }

    async getAll(limit: number = 10): Promise<T[]>{
        const items: T[] = [];
        let lastEvaluatedKey: Record<string, unknown> | undefined;

        do {
            const result = await this.client.send(
                new ScanCommand({
                    TableName: this.tableName,
                    ExclusiveStartKey: lastEvaluatedKey,
                    Limit: limit
                })
            );

            if (result.Items) {
                items.push(...(result.Items as T[]));
            }

            lastEvaluatedKey = result.LastEvaluatedKey;
        } while (lastEvaluatedKey);

        return items;
    }

    async getByIndex(
        indexName: string,
        keyName: string,
        value: unknown
    ): Promise<T | undefined> {
        const result = await this.client.send(
            new QueryCommand({
                TableName: this.tableName,
                IndexName: indexName,
                KeyConditionExpression: `${keyName} = :value`,
                ExpressionAttributeValues: {
                    ":value": value,
                },
            })
        );
        return result.Items?.[0] as T | undefined;
    }
}