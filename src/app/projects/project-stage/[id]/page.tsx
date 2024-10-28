import GptIntegration from '@/app/components/gpt-integration/gpt-integration';
import { getProjectStage } from '@/app/services/stage/actions';
import { notFound } from 'next/navigation';


export default async function ProjectStagePage({ params }: { params: { id: string } }) {
  const stage = await getProjectStage(Number(params.id));

  if (!stage) {
    return notFound();
  }

  return (
    <div>
      <h1>{stage.stage_name}</h1>

      <GptIntegration currentStage={stage} />
    </div>
  );
}
