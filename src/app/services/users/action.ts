export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('http://localhost:4000/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.map((user: {
      user_id: number;
      username: string;
      email: string;
      password: string;
      created_at: string;
    }) => ({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (newUser: NewUser): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newUser,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export async function getUser(id: number): Promise<User | undefined> {
  try {
    const res = await fetch(`http://localhost:4000/users/id/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    await fetchUsers(); // Optionally, refresh user list after deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, updatedUser: Partial<NewUser>): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const response = await fetch(`http://localhost:4000/users/email/${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user by email');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

