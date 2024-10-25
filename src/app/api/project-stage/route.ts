import { createStage } from '@/app/services/stage/actions';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = `${process.env.BACKEND_URL}/project-stage`;

export async function GET() {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
  });
  const projecеStage = await response.json();
  return NextResponse.json(projecеStage);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project_id, stage_name, start_date, end_date } = body;

    const projecеStage = await createStage({ project_id, stage_name, start_date, end_date });

    return NextResponse.json(projecеStage);
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
  const updatedProjecеStage = await response.json();
  return NextResponse.json(updatedProjecеStage);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return NextResponse.json({ message: 'ProjectStage deleted' });
}