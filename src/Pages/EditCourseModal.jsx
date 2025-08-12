import React from 'react'

// Edit Course Modal
const EditCourseModal = ({ 
  showEditModal, setShowEditModal, editingCourse, setEditingCourse, handleSaveCourse 
}) => {
  if (!showEditModal || !editingCourse) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Edit Course</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-1">Title</label>
            <input
              type="text"
              value={editingCourse.title}
              onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Description</label>
            <textarea
              value={editingCourse.description}
              onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Price</label>
            <input
              type="text"
              value={editingCourse.price}
              onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Duration</label>
            <input
              type="text"
              value={editingCourse.duration}
              onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Status</label>
            <select
              value={editingCourse.status}
              onChange={(e) => setEditingCourse({...editingCourse, status: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSaveCourse(editingCourse)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal