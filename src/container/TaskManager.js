import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import "./TaskManager.css";

// Set the app element for accessibility
Modal.setAppElement('#root');

const TaskManager = () => {
  // State for tasks
  const [arr, setArr] = useState([]);

  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // State for filters
  const [filter, setFilter] = useState("All");

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for modals
  const [editIndex, setEditIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setArr(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(arr));
  }, [arr]);

  // Filter tasks based on selected filter and search term
  const filteredTasks = arr.filter(task => {
    const matchesFilter = filter === "All" || (filter === "Completed" && task.completed) || (filter === "Incomplete" && !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openAddModal = () => {
    setEditIndex(null);
    setTitle("");
    setDescription("");
    setDate("");
    setShowAddModal(true);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setTitle(arr[index].title);
    setDescription(arr[index].description);
    setDate(arr[index].dueDate);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const addTask = () => {
    if (title === "" || description === "" || date === "") {
      alert("Please add the details properly");
    } else {
      const newTask = { title, description, dueDate: date, completed: false };
      setArr(prevArr => [...prevArr, newTask]);
      closeAddModal();
    }
  };

  const editTask = () => {
    if (editIndex !== null) {
      setArr(prevArr => {
        const updatedTasks = [...prevArr];
        updatedTasks[editIndex] = { ...updatedTasks[editIndex], title, description, dueDate: date };
        return updatedTasks;
      });
      closeAddModal();
    }
  };

  const removeBtn = () => {
    if (deleteIndex !== null) {
      setArr(prevArr => prevArr.filter((_, index) => index !== deleteIndex));
      closeDeleteModal();
    }
  };

  const completeTask = (index) => {
    setArr(prevArr => {
      const updatedTasks = [...prevArr];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  };

  return (
    <>
      <div className="TaskManager_container">
        <div className="btns">
          <button onClick={() => setFilter("All")} className="button-name" role="button">
            All
          </button>
          <button onClick={() => setFilter("Completed")} className="button-name" role="button">
            Completed
          </button>
          <button onClick={() => setFilter("Incomplete")} className="button-name" role="button">
            Incomplete
          </button>
          <button onClick={openAddModal} className="button-name" role="button">
            Add Task
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={closeAddModal}
        contentLabel="Add/Edit Task"
        className="Modal"
        overlayClassName="Overlay"
      >
        <CSSTransition
          in={showAddModal}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="modal-content">
            <h2>{editIndex !== null ? "Edit Task" : "Add Task"}</h2>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add the title"
              />
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give the description"
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <button onClick={editIndex !== null ? editTask : addTask}>
              {editIndex !== null ? "Save Changes" : "Add Task"}
            </button>
            <button onClick={closeAddModal} className="cancel">
              Cancel
            </button>
          </div>
        </CSSTransition>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Are you sure you want to delete this task?</h2>
        <button onClick={removeBtn} className="confirm">
          Yes, Delete
        </button>
        <button onClick={closeDeleteModal} className="cancel">
          Cancel
        </button>
      </Modal>

      <div className="maintain_cards">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Title</h3>
          <h3>Description</h3>
          <h3>Submission</h3>
        </div>
        {filteredTasks.length === 0 ? (
          <h2 className="no-tasks-message">
            No Tasks Found
          </h2>
        ) : (
          filteredTasks.map((data, idx) => (
            <div className="cards" key={idx}>
              <h3>
                {idx + 1}. <span>{data.title}</span>
                <i onClick={() => openEditModal(idx)} className="ri-edit-2-fill edit"></i>
              </h3>
              <p>{data.description}</p>
              <div>
                <p>Date:-{data.dueDate}</p>
                <button className="completeBtn" onClick={() => completeTask(idx)}>
                  {data.completed ? "Complete" : "Incomplete"}
                </button>
                <button className="deleteBtn" onClick={() => openDeleteModal(idx)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TaskManager;
