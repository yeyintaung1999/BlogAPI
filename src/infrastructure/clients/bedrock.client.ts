import { BedrockRuntimeClient, ConverseCommand, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { HttpError } from "../../utils/httpError";

class BedrockClient{
    private client: BedrockRuntimeClient;

    constructor(){
        this.client = new BedrockRuntimeClient({
            region: 'ap-northeast-1'
        })
    }

    async generate(prompt:string): Promise<JSON>{
        try{
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
            const response = await this.client.send(command);
            
            const text = response.output?.message?.content?.[0]?.text;
            console.log("bedrockresult=>",text);
            if (!text) {
                throw new HttpError("No response from Bedrock", 502);
            }

            const result = JSON.parse(text);
            
            return result
        } catch(error){
            throw new HttpError(`Bedrock Generation Error:${error}`,500);
        };
        
    }
}

export const bedrockClient = new BedrockClient();