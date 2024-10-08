import { notFound } from 'next/navigation';

/* interface ProjectDetails {
  id: number;
  name: string;
  description: string;
} */

async function getProject(id: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/projects/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(Number(params.id));

  if (!project) {
    return notFound();
  }

  return (

    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>{project.startDate}</p>
      <p>{project.endDate}</p>
    </div>

  );
}
