import type React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import Dashboard from "./pages/Dashboard"
import TaskDetails from "./pages/TaskDetails"
import AddEditTask from "./pages/AddEditTask"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/add" element={<AddEditTask />} />
            <Route path="/edit/:id" element={<AddEditTask />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App

