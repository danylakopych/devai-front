import { getProject, Project } from '@/app/services/projects/actions';
import { fetchProjectStageByProjectId } from '@/app/services/stage/actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(Number(params.id)) as Project;

  const stages = await fetchProjectStageByProjectId(project.project_id);

  if (!project) {
    return notFound();
  }

  return (
    <div>
      <ul>
        {stages.map(stage => ( 
        <li key={stage.stage_id}>
          <Link href={`/projects/project-stage/${stage.stage_id}`}>
            <div className=''>{stage.stage_name}</div>
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
}
