const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const filePath = process.env.FILE_PATH || process.argv[2];
const errorMessage = process.env.ERROR_MESSAGE || process.argv[3];
const errorStack = process.env.ERROR_STACK || process.argv[4] || '';
const apiKey = process.env.CLI_PROXY_KEY || 'khuong';
const apiBaseUrl = process.env.CLI_PROXY_URL || 'https://cli-proxy.khuong.theworkpc.com';
const model = process.env.CLI_PROXY_MODEL || 'gemini-3-flash-preview';

if (!filePath) {
  console.error('Error: FILE_PATH is required as env var or first argument.');
  process.exit(1);
}

if (!errorMessage) {
  console.error('Error: ERROR_MESSAGE is required as env var or second argument.');
  process.exit(1);
}

const absolutePath = path.isAbsolute(filePath) 
  ? filePath 
  : path.join(process.cwd(), filePath);

if (!fs.existsSync(absolutePath)) {
  console.error(`Error: File not found at ${absolutePath}`);
  process.exit(1);
}

async function run() {
  console.log(`Reading target file: ${filePath}`);
  const fileContent = fs.readFileSync(absolutePath, 'utf8');

  const prompt = `You are an expert software developer.
We detected the following error in the file: ${filePath}

Error Message:
${errorMessage}

Error Stack:
${errorStack || 'None'}

Here is the current content of the file:
---
${fileContent}
---

Please analyze the error and fix it.
Provide the COMPLETE modified source code of the file.
You MUST wrap the code inside a markdown code block (using triple backticks) specifying the correct language (e.g. \`\`\`tsx ... \`\`\`).
Prior to the code block, you can briefly write a one-line explanation of the fix.
Do not add any other explanations or conversations. Keep it concise.`;

  console.log(`Calling CLI Proxy API (${apiBaseUrl}/v1/chat/completions)...`);
  console.log(`Using model: ${model}`);

  try {
    const response = await fetch(`${apiBaseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Parse the response
    // Look for code block markdown
    const codeBlockRegex = /```[a-zA-Z]*\n([\s\S]*?)\n```/;
    const match = assistantMessage.match(codeBlockRegex);

    if (!match) {
      throw new Error("Could not find a valid markdown code block in the AI response.");
    }

    const fixedCode = match[1];
    
    // Extract explanation (text before code block)
    const explanation = assistantMessage.split('```')[0].trim();

    console.log('\n--- AI Explanation of the Fix ---');
    console.log(explanation || 'No explanation provided.');
    console.log('---------------------------------\n');

    console.log(`Writing fixed code back to: ${filePath}`);
    fs.writeFileSync(absolutePath, fixedCode, 'utf8');
    console.log('Successfully applied the fix!');

  } catch (error) {
    console.error('Error during auto-fix execution:', error.message);
    process.exit(1);
  }
}

run();
