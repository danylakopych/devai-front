import { createGptIntegration } from "@/app/services/gptIntegration/actions";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = `${process.env.BACKEND_URL}/gpt-integration`;

export async function GET() {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
  });
  const gptIntegration = await response.json();
  return NextResponse.json(gptIntegration);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stage_id, gpt_name  } = body;

    const gptIntegration = await createGptIntegration({ stage_id, gpt_name });

    return NextResponse.json(gptIntegration);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const { id, ...body } = await request.json();
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const updatedGptIntegration = await response.json();
  return NextResponse.json(updatedGptIntegration);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return NextResponse.json({ message: 'ProjectStage deleted' });
}