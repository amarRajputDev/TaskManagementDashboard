import type React from "react"
import { useAppSelector } from "../hooks/useAppRedux"
import type { Task } from "../store/taskSlice"
import { Link } from "react-router-dom"
import animationData from "../assets/Animation - 1738930655465.json"
import Lottie from "lottie-react"

interface TaskListProps {
  filter: "all" | "pending" | "In Progress" | "completed"
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks)

  const filteredTasks = tasks.filter((task) => {

    if (filter === "all") return true;
    return task.status === filter; 
    return true
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {
        tasks.length ? (
          filteredTasks.map((task: Task) => (
            <Link to={`/task/${task.id}`} key={task.id} className="block">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-2">{task.description.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    task.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : task.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className=" w-[90vw] justify-center flex-col items-center flex   " >
                <div className=" w-[70vw] md:w-[50vw] lg:w-[30vw]">
                <Lottie animationData={animationData} loop={true} />
                </div>
                 <h1 className="montserrat text-3xl font-bold">No Tasks !</h1>
                </div>
        )
      }
      
    </div>
  )
}

export default TaskList

