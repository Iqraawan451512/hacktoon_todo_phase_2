'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { taskAPI } from '../../lib/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  owner_id: number;
  created_at: string;
  updated_at?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  // Token is read from localStorage only after mount (in the effect below),
  // never during render, so the server and the client's first render agree:
  // both see `null` here and show the loading state until the effect runs.
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');

    if (!storedToken) {
      router.push('/auth/login');
      return;
    }

    setToken(storedToken);

    const fetchTasks = async () => {
      try {
        const tasksData = await taskAPI.getTasks(storedToken);
        setTasks(tasksData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!token) {
      setError('You are not signed in. Please log in again.');
      return;
    }

    try {
      const newTask = await taskAPI.createTask(token, title, description);
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleToggleCompletion = async (taskId: number) => {
    if (!token) {
      setError('You are not signed in. Please log in again.');
      return;
    }

    try {
      const updatedTask = await taskAPI.toggleTaskCompletion(token, taskId);
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: updatedTask.completed } : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!token) {
      setError('You are not signed in. Please log in again.');
      return;
    }

    try {
      await taskAPI.deleteTask(token, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    if (!token) {
      setError('You are not signed in. Please log in again.');
      return;
    }

    try {
      const updatedTask = await taskAPI.updateTask(
        token,
        editingTask.id,
        editTitle,
        editDescription,
        editingTask.completed
      );

      setTasks(tasks.map(task =>
        task.id === editingTask.id ? updatedTask : task
      ));

      handleCloseEditModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mb-4"></div>
          <p className="text-gray-700 text-lg">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
<h1 className="text-4xl md:text-6xl font-extrabold mb-6 
               text-indigo-900 tracking-tight">
  Task<span className="text-indigo-500">Hub</span>
</h1>            <p className="text-blue-900">Your personal productivity dashboard</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('access_token');
              router.push('/auth/login');
            }}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Task Creation Form */}
        <div className="mb-8 bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Create New Task</h2>

          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-blue-700 mb-1">
                Task Title *
              </label>
              <input
  type="text"
  id="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             hover:bg-blue-100 transition-colors duration-200"
  placeholder="What needs to be done?"
/>

            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-blue-700 mb-1">
                Description
              </label>
              <textarea
  id="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             resize-none hover:bg-blue-100 transition-colors duration-200"
  placeholder="Add details (optional)"
  rows={3}
/>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Create Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div>
          <div className="flex items-center justify-between mb-6  ">
            <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center border border-gray-200 ">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-600  ">Create your first task to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-xl shadow p-4 border border-gray-200   hover:bg-blue-50 transition-colors duration-300   ${
                    task.completed ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 ">
                    <h3 className={`font-medium text-gray-900 break-words ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>

                    <button
                      onClick={() => handleToggleCompletion(task.id)}
                      className={`p-1 rounded-full transition-colors duration-200 ${
                        task.completed
                          ? 'text-green-600 hover:bg-green-100'
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                      title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {task.description && (
                    <p className="text-gray-600 text-sm mb-3 break-words">{task.description}</p>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {new Date(task.created_at).toLocaleDateString()}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(task)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
                        title="Edit task"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm"
                        title="Delete task"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Task</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Task title"
                />
              </div>

              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Task description"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}