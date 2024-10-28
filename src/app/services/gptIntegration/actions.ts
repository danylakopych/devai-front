'use server'
export interface GptIntegration {
  gpt_session_id: number,
  gpt_name: string,
  stage_id: number,
};

export interface NewGptIntegration {
  gpt_name: string,
  stage_id: number,
};

export const fetchGptIntegration = async (): Promise<GptIntegration[]> => {
  try {
    const response = await fetch('http://localhost:4000/gpt-integration');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return data.map((gptIntegration: {
      gpt_session_id: number;
      gpt_name: string;
      stage_id: number;
    }) => ({
      gpt_session_id: gptIntegration.gpt_session_id,
      gpt_name: gptIntegration.gpt_name,
      stage_id: gptIntegration.stage_id,
    }));
  } catch (error) {
    console.error("Error fetching gptInt", error);
    throw error;
  }
};

export const createGptIntegration = async (newGptIntegration: NewGptIntegration): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/gpt-integration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        newGptIntegration,
      ),
    });

    if (!response.ok) {
      throw new Error('Failed to create newGptIntegration');
    }
  } catch (error) {
    console.error('Error creating newGptIntegration:', error);
    throw error;
  }
};

export async function getGptIntegrationById(id: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/gpt-integration/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export const deleteGptIntegrationById = async (gpt_session_id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/gpt-integration/${gpt_session_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete gpt-integration');
    }

    //fetchStage();
  } catch (error) {
    console.error('Error deleting gpt-integration:', error);
  }
};

export const fetchGptIntegrationByStageId = async (stage_id: number): Promise<GptIntegration[]> => {
  try {
    const response = await fetch(`http://localhost:4000/gpt-integration/project-stage/${stage_id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map((gptIntegration: {
      gpt_session_id: number;
      gpt_name: string;
      stage_id: number;
    }) => ({
      gpt_session_id: gptIntegration.gpt_session_id,
      gpt_name: gptIntegration.gpt_name,
      stage_id: gptIntegration.stage_id,
    }));
  } catch (error) {
    console.error('Error fetching gpt-integration/project-stage', error);
    throw error;
  }
};
