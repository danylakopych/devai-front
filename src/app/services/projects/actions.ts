export interface Project {
  id: number;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export interface NewProject {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

// Отримати список проектів
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('http://localhost:4000/projects');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; // Перевикидання помилки для обробки в компоненті
  }
};

// Створити новий проект
export const createProject = async (newProject: NewProject): Promise<void> => {
  try {
    const formattedStartDate = new Date(newProject.startDate!).toISOString();
    const formattedEndDate = new Date(newProject.endDate!).toISOString();

    const response = await fetch('http://localhost:4000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newProject,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Видалити проект
export const deleteProject = async (projectId: number) => {
  try {
    const response = await fetch(`http://localhost:4000/projects/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    // Оновити список проектів після видалення
    fetchProjects();
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};
