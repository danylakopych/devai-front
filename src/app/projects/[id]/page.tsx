import { getProject } from '@/app/services/projects/actions';
import { notFound } from 'next/navigation';


export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(Number(params.id));

  if (!project) {
    return notFound();
  }

  return (
    <div>
      <h1>{project.project_name}</h1>
      <p>{project.description}</p>
      <p>{project.created_at}</p>
      <p>{project.user_id}</p>
    </div>
  );
}
