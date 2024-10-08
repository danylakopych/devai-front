import { NextResponse } from 'next/server';

const API_BASE_URL = `${process.env.BACKEND_URL}/projects'`;

export async function GET() {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
  });
  const projects = await response.json();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const newProject = await response.json();
  return NextResponse.json(newProject);
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
  const updatedProject = await response.json();
  return NextResponse.json(updatedProject);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return NextResponse.json({ message: 'Project deleted' });
}