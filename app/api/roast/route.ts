import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt defining the analysis task for the AI (as provided by the user)
const systemPrompt = `You are a résumé-analysis tool. Given the following resume text, compute these metrics and return **only** a JSON object with these keys (no extra commentary): 

1. buzzwordBingo: count of unique buzzwords from [“synergy”, “passionate”, “hard-working”, “go-getter”, “dynamic”, “self-starter”]  
2. fluffFactor: percentage of words that are in [“very”, “really”, “extremely”, “actually”]  
3. passivePatty: number of sentences in passive voice (containing “was … by” or “were … by”)  
4. superlativeSlam: count of superlatives from [“best”, “greatest”, “ultimate”, “top”]  
5. jargonJolt: number of all-caps acronyms per 100 words (e.g. JSON, API, CI/CD)  
6. numberCruncher: total count of numeric mentions (digits, %, $, years)  
7. verbVibes: percentage of lines that start with an action verb (e.g. “Led”, “Built”, “Optimized”)  
8. sentenceSauna: percentage of sentences longer than 20 words  
9. hyperboleHunter: count of absolute terms [“always”, “never”, “everyone”, “nobody”]  
10. punctuationParty: average punctuation marks (.,;:—) per line  
11. roastCharacter: a quirky, funny character name that best describes the candidate based on the resume 
12. roastScore: a score between 0 and 100 based on the resume; denoting how much of a roast the resume is 
13. topBuzzword: the most overused buzzword in the resume 
14. name: the name of the candidate 
`;

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or another capable model
      response_format: { type: "json_object" }, // Request JSON output
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }, // Provide the resume text directly
      ],
    });

    const rawJsonResponse = response.choices[0].message.content;

    if (!rawJsonResponse) {
      return NextResponse.json(
        { error: "Failed to get analysis from AI" },
        { status: 500 }
      );
    }

    try {
      // Parse the JSON string returned by the AI
      const metrics = JSON.parse(rawJsonResponse);

      // Return the parsed metrics directly
      // The API response will now look like { metrics: { buzzwordBingo: 2, fluffFactor: 5.2, ... } }
      return NextResponse.json({ metrics });
    } catch (parseError) {
      console.error("Failed to parse AI JSON response:", parseError);
      console.error("Raw AI Response:", rawJsonResponse); // Log the raw response for debugging
      return NextResponse.json(
        { error: "Failed to parse analysis results" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
