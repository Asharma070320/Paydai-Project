import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import "./TaskManager.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';

Modal.setAppElement("#root");

const TaskManager = ({ theme }) => {
  const [arr, setArr] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setArr(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(arr));
  }, [arr]);

  const filteredTasks = arr.filter((task) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Incomplete" && !task.completed);
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

  const closeAddModal = () => setShowAddModal(false);

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
      error("Please add the details properly");
    } else {
      const newTask = { title, description, dueDate: date, completed: false };
      setArr((prevArr) => [...prevArr, newTask]);
      closeAddModal();
      success("Successfully Added the Task");
    }
  };

  const editTask = () => {
    if (editIndex !== null) {
      setArr((prevArr) => {
        const updatedTasks = [...prevArr];
        updatedTasks[editIndex] = {
          ...updatedTasks[editIndex],
          title,
          description,
          dueDate: date,
        };
        return updatedTasks;
      });
      closeAddModal();
    }
  };

  const removeBtn = () => {
    if (deleteIndex !== null) {
      setArr((prevArr) => prevArr.filter((_, index) => index !== deleteIndex));
      closeDeleteModal();
      success("Successfully Deleted");
    }
  };

  const completeTask = (index) => {
    setArr((prevArr) => {
      const updatedTasks = [...prevArr];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  };

  const error = (text) => {
    toast.error(text, { position: "top-center" });
  };

  const success = (text) => {
    toast.success(text, { position: "top-center" });
  };

  return (
    <>
      <ToastContainer />
      <div className="TaskManager_container" style={{ backgroundColor: theme ? "black" : "#dddbff", color: theme ? "white" : "black" }}>
        <div className="btns">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setFilter("All")} className={`button-name ${filter === "All" ? "active" : ""}`} role="button">
            All
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setFilter("Completed")} className={`button-name ${filter === "Completed" ? "active" : ""}`} role="button">
            Completed
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setFilter("Incomplete")} className={`button-name ${filter === "Incomplete" ? "active" : ""}`} role="button">
            Incomplete
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={openAddModal} className="button-name" role="button">
            Add Task
          </motion.button>
        </div>

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
            <h2 style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '15px' }}>{editIndex !== null ? "Edit Task" : "Add Task"}</h2>
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
            <motion.button whileTap={{ scale: 0.9 }} onClick={editIndex !== null ? editTask : addTask}>
              {editIndex !== null ? "Save Changes" : "Add Task"}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={closeAddModal} className="cancel">
              Cancel
            </motion.button>
          </div>
        </CSSTransition>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Are you sure you want to delete this task?</h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={removeBtn} className="confirm">
          Yes, Delete
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={closeDeleteModal} className="cancel">
          Cancel
        </motion.button>
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
          <h2 className="no-tasks-message">No Tasks Found</h2>
        ) : (
          filteredTasks.map((data, idx) => (
            <div className="cards" key={idx}>
              <h3>
                {idx + 1}. <span>{data.title}</span>
                <i onClick={() => openEditModal(idx)} className="ri-edit-2-fill edit"></i>
              </h3>
              <p>{data.description}</p>
              <div>
                <p>Date: {data.dueDate}</p>
                <motion.button whileTap={{ scale: 0.9 }} className="completeBtn" onClick={() => completeTask(idx)}>
                  {data.completed ? "Mark Incomplete" : "Mark Complete"}
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} className="deleteBtn" onClick={() => openDeleteModal(idx)}>
                  Delete
                </motion.button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TaskManager;
