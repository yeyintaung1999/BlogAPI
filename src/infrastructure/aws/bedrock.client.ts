import { BedrockRuntimeClient, ConverseCommand, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { BedrockError } from "../../errors/BedrockError";

class BedrockClient{
    private client: BedrockRuntimeClient;

    constructor(){
        this.client = new BedrockRuntimeClient({
            region: 'ap-northeast-1'
        })
    }

    async generate(prompt:string): Promise<JSON>{
        
            const command = new ConverseCommand({
                modelId: 'global.anthropic.claude-haiku-4-5-20251001-v1:0',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                text:`
You are a professional blog writer.

Write a complete blog of approximately 200 words. based on the following command:

${prompt}

Return ONLY valid JSON.

Format:
{
  "title": "Blog title",
  "content": "Full blog content"
}

Do not include markdown.
Do not wrap the JSON in \`\`\`.
Do not add any explanation.
`
                            }
                        ]
                    }
                ],
                inferenceConfig: {
                    maxTokens: 400,
                    temperature: 0.7
                }
            });

            let response;

            try{
                response = await this.client.send(command);
            }catch(e){
                throw new BedrockError('Can not connect with Model', 502)
            }
            
            
            const text = response.output?.message?.content?.[0]?.text;
            
            if (!text) {
                throw new BedrockError("No response from Bedrock", 502);
            }

            let result;
            try{
                result = JSON.parse(text);
            }catch{
                throw new BedrockError('Model return invalid JSON', 502)
            }
            
            return result

    }
}

export const bedrockClient = new BedrockClient();