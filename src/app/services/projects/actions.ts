'use server';
export interface Project {
  project_id: number;
  project_name: string;
  description?: string;
  createdAt?: string;
  user_id: number;
}

export interface NewProject {
  project_name: string;
  description: string;
  createdAt?: string;
  user_id: number;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('http://localhost:4000/project');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return data.map((project: {
      project_id: string;
      project_name: string;
      description: string;
      created_at: string;
      user_id: string;
    }) => ({
      project_id: project.project_id,
      project_name: project.project_name,
      description: project.description,
      createdAt: project.created_at,
      user_id: project.user_id,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; 
  }
};

export const createProject = async (newProject: NewProject): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        newProject,
      ),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export async function getProject(id: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/project/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export const deleteProject = async (projectId: number) => {
  try {
    const response = await fetch(`http://localhost:4000/project/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    fetchProjects();
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

export const fetchProjectsByUserId = async (userId: number): Promise<Project[]> => {
  try {
    const response = await fetch(`http://localhost:4000/project/user/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data.map((project: {
      project_id: number;
      project_name: string;
      description: string;
      created_at: string;
      user_id: number;
    }) => ({
      project_id: project.project_id,
      project_name: project.project_name,
      description: project.description,
      createdAt: project.created_at,
      user_id: project.user_id,
    }));
  } catch (error) {
    console.error('Error fetching projects by user ID:', error);
    throw error;
  }
};