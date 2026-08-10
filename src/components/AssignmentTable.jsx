import React from 'react'

const AssignmentTable = () => {

  
    const assignments = [
    { id: 1, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 2, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 3, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 4, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 5, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 6, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 7, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 8, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' },
    { id: 9, course: 'Data Structures', assignment: "Linked List", dueDate: 'due in 3 hours', AIStatus: 'processed', driveLink: "dvekvhfivljkhkk438r8g", submissionStatus: 'turned in' }
  ];

  return (
    <div className='overflow-x-auto max-h-[70vh]'>
         <table className='w-full border-collapse overflow-hidden rounded-xl'>
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-6 py-4 text-left font-semibold">Course</th>
          <th className="px-6 py-4 text-left font-semibold">Assignment</th>
          <th className="px-6 py-4 text-left font-semibold">Due Date</th>
          <th className="px-6 py-4 text-left font-semibold">AI Status</th>
        </tr>
      </thead>

      <tbody>

          
        {assignments.map((assignment) => (
          <tr key={assignment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
            <td className="px-6 py-4 ">{assignment.course}</td>
            <td className="px-6 py-4 ">{assignment.assignment}</td>
            <td className="px-6 py-4 ">{assignment.dueDate}</td>
            <td className="px-6 py-4 text-green-500 font-bold">{assignment.AIStatus}</td>
        
          
          </tr>
        ))}

      
      </tbody>
    </table>
    </div>
  )
}

export default AssignmentTable
