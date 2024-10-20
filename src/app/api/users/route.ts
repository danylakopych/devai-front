import { NextResponse } from 'next/server';

const API_BASE_URL = `${process.env.BACKEND_URL}/user`;

export async function GET() {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
  });
  const users = await response.json();
  return NextResponse.json(users);
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
  const newUser = await response.json();
  return NextResponse.json(newUser);
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
  const updatedUser = await response.json();
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return NextResponse.json({ message: 'User deleted' });
}