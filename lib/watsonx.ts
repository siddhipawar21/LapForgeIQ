type StrategyInput = {
  trackName: string;
  weather: string;
  tireCompound: string;
  humidity: string;
  aggression: string;
  fuelLoad: string;
  pitPreference: string;
  safetyCarProbability: string;
  rainProbability: string;
  opponentPace: string;
  tireWear: string;
  trackTemperature: string;
  lapCount?: string;
  qualifyingPosition?: string;
  customNotes?: string;
};

async function getIamToken() {
  const apiKey = process.env.WATSONX_APIKEY;

  if (!apiKey) {
    throw new Error("Missing WATSONX_APIKEY");
  }

  const response = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: apiKey,
    }).toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get IBM IAM token: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

function buildPrompt(input: StrategyInput) {
  return `
You are an elite Formula 1 race strategist working inside LapForgeIQ, a premium motorsport intelligence platform.

Analyze the race conditions below and generate a professional race strategy report.

Track: ${input.trackName}
Weather: ${input.weather}
Tire Compound: ${input.tireCompound}
Humidity: ${input.humidity}
Driver Aggression: ${input.aggression}
Fuel Load: ${input.fuelLoad}
Pit Stop Preference: ${input.pitPreference}
Safety Car Probability: ${input.safetyCarProbability}
Rain Probability: ${input.rainProbability}
Opponent Pace: ${input.opponentPace}
Tire Wear: ${input.tireWear}
Track Temperature: ${input.trackTemperature}
Lap Count: ${input.lapCount || "Unknown"}
Qualifying Position: ${input.qualifyingPosition || "Unknown"}
Custom Notes: ${input.customNotes || "None"}

Return the response in JSON with these exact keys:
pitStopStrategy
tireRecommendation
predictedFinish
overtakeWindows
fuelStrategy
safetyCarPlan
bestLapPrediction
riskAnalysis
engineerSummary

Keep the tone realistic, tactical, and race-engineer-like.
Do not include markdown fences.
`;
}

export async function generateStrategyWithWatsonX(input: StrategyInput) {
  const token = await getIamToken();

  const projectId = process.env.WATSONX_PROJECT_ID;
  const modelId = process.env.WATSONX_MODEL_ID;
  const baseUrl = process.env.WATSONX_URL;

  if (!projectId) throw new Error("Missing WATSONX_PROJECT_ID");
  if (!modelId) throw new Error("Missing WATSONX_MODEL_ID");
  if (!baseUrl) throw new Error("Missing WATSONX_URL");

  const response = await fetch(
    `${baseUrl}/ml/v1/text/generation?version=2025-02-11`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        input: buildPrompt(input),
        parameters: {
          decoding_method: "greedy",
          max_new_tokens: 500,
          min_new_tokens: 50,
          repetition_penalty: 1.05,
        },
        model_id: modelId,
        project_id: projectId,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`watsonx generation failed: ${errorText}`);
  }

  const data = await response.json();
  const generatedText =
    data?.results?.[0]?.generated_text || "No strategy output returned.";

  return generatedText;
}