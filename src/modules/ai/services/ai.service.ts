import { bedrockClient } from "../../../infrastructure/aws/bedrock.client";

export async function generate(title:string) {
    const content = await bedrockClient.generate(title);
    return content
}