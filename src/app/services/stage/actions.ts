'use server';
export interface Stage {
  stage_id: number;
  stage_name: string;
  start_date: string;
  end_date: string;
  project_id: number;
}

export interface NewStage {
  stage_name: string;
  start_date: string;
  end_date: string;
  project_id: number;
}

export const fetchStage = async (): Promise<Stage[]> => {
  try {
    const response = await fetch('http://localhost:4000/project-stage');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return data.map((stage: {
      stage_id: number;
      stage_name: string;
      start_date: string;
      end_date: string;
      project_id: number;
    }) => ({
      stage_id: stage.stage_id,
      stage_name: stage.stage_name,
      start_date: stage.start_date,
      end_date: stage.end_date,
      project_id: stage.project_id,
    }));
  } catch (error) {
    console.error('Error fetching projects-stage:', error);
    throw error; 
  }
};

export const createStage = async (newStage: NewStage): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/project-stage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        newStage,
      ),
    });

    if (!response.ok) {
      throw new Error('Failed to create project-stage');
    }
  } catch (error) {
    console.error('Error creating project-stage:', error);
    throw error;
  }
};

export async function getProjectStage(id: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/project-stage/id/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export const deleteProjectStage = async (stage_id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/project-stage/${stage_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project-stage');
    }

    fetchStage();
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

export const fetchProjectStageByProjectId = async (project_id: number): Promise<Stage[]> => {
  try {
    const response = await fetch(`http://localhost:4000/project-stage/project/${project_id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data.map((stage: {
      stage_id: number;
      stage_name: string;
      start_date: string;
      end_date: string;
      project_id: number;
    }) => ({
      stage_id: stage.stage_id,
      stage_name: stage.stage_name,
      start_date: stage.start_date,
      end_date: stage.end_date,
      project_id: stage.project_id,
    }));
  } catch (error) {
    console.error('Error fetching projects by user ID:', error);
    throw error;
  }
};