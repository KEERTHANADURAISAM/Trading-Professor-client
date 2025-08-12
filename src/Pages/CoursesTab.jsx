import React from 'react'
import Pagination from './Pagination';


// Courses Tab Component
const CoursesTab = ({ courses, handleEditCourse, getStatusColor, currentPage, setCurrentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Courses Management</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {paginatedCourses.map((course) => (
            <div key={course.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>
              
              <p className="text-white/70 text-sm mb-4">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Duration:</span>
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Price:</span>
                  <span className="text-white">{course.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Students:</span>
                  <span className="text-white">{course.students}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleEditCourse(course)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Edit Course
              </button>
            </div>
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalItems={courses.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};


export default CoursesTab