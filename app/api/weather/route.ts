import { NextRequest, NextResponse } from "next/server";

const trackMap: Record<
  string,
  { label: string; latitude: number; longitude: number }
> = {
  monza: { label: "Monza", latitude: 45.6156, longitude: 9.2811 },
  silverstone: { label: "Silverstone", latitude: 52.0786, longitude: -1.0169 },
  suzuka: { label: "Suzuka", latitude: 34.8431, longitude: 136.541 },
  miami: { label: "Miami", latitude: 25.9581, longitude: -80.2389 },
  spa: { label: "Spa-Francorchamps", latitude: 50.4372, longitude: 5.9714 },
};

function weatherLabel(code: number) {
  if ([0].includes(code)) return "Clear";
  if ([1, 2, 3].includes(code)) return "Partly Cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "Rain";
  if ([71, 73, 75].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Storm Risk";
  return "Variable";
}

function buildImpactSummary(
  temperature: number,
  windspeed: number,
  weathercode: number
) {
  const label = weatherLabel(weathercode);

  return {
    tireRecommendation:
      label === "Rain" || label === "Storm Risk"
        ? "Prepare crossover logic and keep intermediate/wet compounds ready."
        : temperature > 30
        ? "Medium-to-Hard progression is favored by elevated surface temperature."
        : "Softer launch options remain viable if early grip is critical.",
    weatherImpact:
      windspeed > 20
        ? "Crosswind and aero instability may affect braking confidence and high-speed balance."
        : "Wind conditions remain stable enough for conventional aero confidence windows.",
    strategyOutlook:
      label === "Rain" || label === "Storm Risk"
        ? "High interruption potential; maintain flexible pit windows and wet transition readiness."
        : "Stable conditions support a conventional stint model with lower disruption risk.",
  };
}

export async function GET(request: NextRequest) {
  try {
    const track = request.nextUrl.searchParams.get("track") || "monza";
    const selected = trackMap[track];

    if (!selected) {
      return NextResponse.json(
        { success: false, message: "Invalid track selected." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${selected.latitude}&longitude=${selected.longitude}&current_weather=true`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch weather provider data." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const current = data.current_weather;
    const impact = buildImpactSummary(
      current.temperature,
      current.windspeed,
      current.weathercode
    );

    return NextResponse.json({
      success: true,
      weather: {
        location: selected.label,
        temperature: current.temperature,
        windspeed: current.windspeed,
        weathercode: current.weathercode,
        condition: weatherLabel(current.weathercode),
        time: current.time,
      },
      impact,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Weather route failed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}