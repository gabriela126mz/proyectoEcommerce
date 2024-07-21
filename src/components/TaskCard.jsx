import React from "react";
import "./TaskCard.css";
import {
  getTasksError,
  getTasksLoading,
  removeTaskThunk,
  toggleStatusTaskThunk,
} from "../redux/reducers/taskReducer";
import { useDispatch, useSelector } from "react-redux";

const TaskCard = ({ task }) => {
  const loading = useSelector(getTasksLoading);
  const error = useSelector(getTasksError);
  const dispatch = useDispatch();

  const handleToggleComplete = async () => {
    if (!loading) {
      dispatch(toggleStatusTaskThunk(task));
    }
  };

  const handleRemoveTask = async () => {
    if (!loading) {
      dispatch(removeTaskThunk(task.id));
    }
  };

  const cardClassName = task.completed ? "completed-task" : "uncompleted-task";

  return (
    <div className={`task-card ${cardClassName} ${loading ? "updating" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        <button className="mark" onClick={handleToggleComplete} disabled={loading}>
          {loading ? "Updating..." : "Mark Completed"}
        </button>
        <button onClick={handleRemoveTask} disabled={loading}>
          {loading ? "Updating..." : "Delete Task"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TaskCard;
