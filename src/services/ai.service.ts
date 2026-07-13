import { bedrockClient } from "../infrastructure/clients/bedrock.client";

export async function generate(title:string) {
    const content = await bedrockClient.generate(title);
    return content
}