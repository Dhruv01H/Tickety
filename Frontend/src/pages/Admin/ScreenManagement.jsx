import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeatingLayoutPreview from '../../components/SeatingLayoutPreview/SeatingLayoutPreview';

const ScreenManagement = () => {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingScreen, setEditingScreen] = useState(null);
  const [formData, setFormData] = useState({
    screenNumber: '',
    capacity: '',
    screenType: 'standard'
  });

  useEffect(() => {
    fetchScreens();
  }, []);

  const fetchScreens = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/screens');
      setScreens(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch screens');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'capacity') {
      const capacityValue = parseInt(value);
      if (capacityValue > 280) {
        toast.error('Maximum capacity cannot exceed 280 seats');
        return;
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const capacityValue = parseInt(formData.capacity);
    if (capacityValue > 280) {
      toast.error('Maximum capacity cannot exceed 280 seats');
      return;
    }
    try {
      if (editingScreen) {
        await axios.put('http://localhost:8080/api/screens/${editingScreen.id', formData);
        toast.success('Screen updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/screens', formData);
        toast.success('Screen added successfully');
      }
      fetchScreens();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save screen');
    }
  };

  const handleEdit = (screen) => {
    setEditingScreen(screen);
    setFormData({
      screenNumber: screen.screenNumber,
      capacity: screen.capacity,
      screenType: screen.screenType
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this screen?')) {
      try {
        await axios.delete('http://localhost:8080/api/screens/${id}');
        toast.success('Screen deleted successfully');
        fetchScreens();
      } catch (error) {
        toast.error('Failed to delete screen');
      }
    }
  };

  const resetForm = () => {
    setEditingScreen(null);
    setFormData({
      screenNumber: '',
      capacity: '',
      screenType: 'standard'
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Screen Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingScreen ? 'Edit Screen' : 'Add New Screen'}
            </h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Screen Number
              </label>
              <input
                type="text"
                name="screenNumber"
                value={formData.screenNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                max="280"
                placeholder="Enter capacity (max 280 seats)"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Screen Type
              </label>
              <select
                name="screenType"
                value={formData.screenType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="imax">IMAX</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              {editingScreen && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {editingScreen ? 'Update' : 'Add'} Screen
              </button>
            </div>
          </form>
        </div>

        <div>
          {formData.capacity ? (
            <SeatingLayoutPreview capacity={formData.capacity} />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm font-medium">Select a screen to show preview</p>
                <p className="mt-1 text-xs">Enter screen capacity to see the seating layout</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Screen List</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screen Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screen Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {screens.map((screen) => (
                <tr key={screen.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {screen.screenNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {screen.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {screen.screenType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(screen)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(screen.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScreenManagement;