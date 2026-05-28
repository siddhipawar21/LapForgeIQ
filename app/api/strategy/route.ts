// app/api/strategy/route.ts

import { NextResponse } from "next/server";

type StrategyRequestBody = {
  track: string;
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
  customNotes: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StrategyRequestBody;

    // Basic validation
    if (!body.track || !body.weather || !body.tireCompound) {
      return NextResponse.json(
        {
          success: false,
          message: "track, weather, and tireCompound are required.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing");
      return NextResponse.json(
        {
          success: false,
          message: "OPENAI_API_KEY is not set.",
        },
        { status: 500 }
      );
    }

    const prompt = `
You are a race strategist. Based on the following inputs, generate a structured race strategy.

Track: ${body.track}
Weather: ${body.weather}
Tire Compound: ${body.tireCompound}
Humidity: ${body.humidity}%
Aggression: ${body.aggression}
Fuel Load: ${body.fuelLoad}
Pit Preference: ${body.pitPreference}
Safety Car Probability: ${body.safetyCarProbability}%
Rain Probability: ${body.rainProbability}%
Opponent Pace: ${body.opponentPace}
Tire Wear: ${body.tireWear}%
Track Temperature: ${body.trackTemperature}°C
Custom Notes: ${body.customNotes || "None"}
`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are an expert F1 race strategist." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      }),
    });

    const text = await resp.text();

    if (!resp.ok) {
      console.error("OpenAI error raw:", resp.status, text);
      return NextResponse.json(
        {
          success: false,
          message: `OpenAI error: ${resp.status}`,
          error: text,
        },
        { status: 500 }
      );
    }

    console.log("OpenAI success raw:", text);

    // TEMP: just return raw text so we can see it
    return NextResponse.json(
      {
        success: true,
        source: "openai:gpt-4.1-mini",
        raw: text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Uncaught error in /api/strategy:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate strategy.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}