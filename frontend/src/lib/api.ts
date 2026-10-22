// API utility functions for the Todo Web Application frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Extracts a human-readable error message from a failed response.
 * FastAPI returns errors as JSON ({"detail": "..."}); fall back to the
 * HTTP status text if the body isn't JSON or has no detail.
 */
async function extractErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.detail === 'string') {
      return data.detail;
    }
    // FastAPI validation errors (422) return detail as an array of
    // {loc, msg, type} objects rather than a string.
    if (Array.isArray(data?.detail)) {
      const messages = (data.detail as unknown[])
        .map((item) => {
          if (item && typeof item === 'object' && 'msg' in item) {
            const { loc, msg } = item as { loc?: unknown; msg?: unknown };
            const locPath = Array.isArray(loc)
              ? loc.filter((p) => p !== 'body').join('.')
              : '';
            return locPath ? `${locPath}: ${String(msg)}` : String(msg);
          }
          return String(item);
        })
        .join('; ');
      if (messages) {
        return messages;
      }
    }
  } catch {
    // Response body wasn't JSON; fall through to the generic message.
  }
  return `${fallback}: ${response.statusText || response.status}`;
}

/**
 * Authentication API functions
 */
export const authAPI = {
  /**
   * Register a new user
   */
  register: async (username: string, email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Registration failed'));
    }

    return response.json();
  },

  /**
   * Login user and get JWT token
   */
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Login failed'));
    }

    return response.json();
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to get user info'));
    }

    return response.json();
  },
};

/**
 * Task API functions
 */
export const taskAPI = {
  /**
   * Get all tasks for the current user
   */
  getTasks: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to get tasks'));
    }

    return response.json();
  },

  /**
   * Create a new task
   */
  createTask: async (token: string, title: string, description?: string) => {
    const formData = new FormData();
    formData.append('title', title);
    if (description) {
      formData.append('description', description);
    }

    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to create task'));
    }

    return response.json();
  },

  /**
   * Get a specific task
   */
  getTask: async (token: string, taskId: number) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to get task'));
    }

    return response.json();
  },

  /**
   * Update a task
   */
  updateTask: async (
    token: string,
    taskId: number,
    title?: string,
    description?: string,
    completed?: boolean
  ) => {
    const formData = new FormData();
    if (title !== undefined) formData.append('title', title);
    if (description !== undefined) formData.append('description', description);
    if (completed !== undefined) formData.append('completed', completed.toString());

    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to update task'));
    }

    return response.json();
  },

  /**
   * Delete a task
   */
  deleteTask: async (token: string, taskId: number) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to delete task'));
    }

    return response.json();
  },

  /**
   * Toggle task completion status
   */
  toggleTaskCompletion: async (token: string, taskId: number) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await extractErrorMessage(response, 'Failed to toggle task completion'));
    }

    return response.json();
  },
};