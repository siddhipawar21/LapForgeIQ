// app/api/teams/route.ts

import { NextResponse } from "next/server";

const OPENF1_BASE = "https://api.openf1.org/v1";

export async function GET() {
  try {
    // 1. Get race sessions for a year (you can change year)
    const sessionsRes = await fetch(
      `${OPENF1_BASE}/sessions?session_type=Race&year=2026`,
      {
        // Cache for a few seconds so Next.js doesn't hammer the API
        next: { revalidate: 10 },
      }
    );

    if (!sessionsRes.ok) {
      const text = await sessionsRes.text();
      console.error("OpenF1 sessions error:", text);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch F1 sessions",
          error: text,
        },
        { status: 500 }
      );
    }

    const sessions = (await sessionsRes.json()) as any[];

    if (!sessions.length) {
      return NextResponse.json(
        { success: false, message: "No race sessions found" },
        { status: 404 }
      );
    }

    // 2. Pick the latest race session
    const latest = sessions[sessions.length - 1];
    const sessionKey = latest.session_key;

    // 3. Get drivers for that session (includes team names)
    const driversRes = await fetch(
      `${OPENF1_BASE}/drivers?session_key=${sessionKey}`,
      {
        next: { revalidate: 2 },
      }
    );

    if (!driversRes.ok) {
      const text = await driversRes.text();
      console.error("OpenF1 drivers error:", text);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch F1 drivers",
          error: text,
        },
        { status: 500 }
      );
    }

    const drivers = (await driversRes.json()) as any[];

    // 4. Try to get (near) live positions for that session
    const positionsRes = await fetch(
      `${OPENF1_BASE}/position?session_key=${sessionKey}`,
      {
        next: { revalidate: 2 },
      }
    );

    let positions: any[] = [];
    if (positionsRes.ok) {
      positions = (await positionsRes.json()) as any[];
    }

    // Build a lookup for latest position per driver number
    const latestPositionByDriver: Record<string, any> = {};
    for (const p of positions) {
      latestPositionByDriver[p.driver_number] = p;
    }

    // 5. Merge driver + team + position into a clean structure
    const teams = drivers.map((d) => {
      const pos = latestPositionByDriver[d.driver_number] || {};
      return {
        driverNumber: d.driver_number,
        driverName: d.full_name,
        teamName: d.team_name,
        countryCode: d.country_code,
        position: pos.position,
        interval: pos.interval,
        gapToLeader: pos.gap_to_leader,
      };
    });

    return NextResponse.json(
      {
        success: true,
        session: {
          sessionKey,
          sessionName: latest.session_name,
          meetingName: latest.meeting_name,
          dateStart: latest.date_start,
          year: latest.year,
        },
        teams,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Uncaught error in /api/teams:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load F1 team data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}