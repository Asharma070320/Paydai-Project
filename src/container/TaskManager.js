import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./TaskManager.css";

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
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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
      <div
        className="TaskManager_container"
        style={{
          backgroundColor: theme ? "#2a2828" : "#dddbff",
          color: theme ? "white" : "black",
        }}
      >
        {/* -------Search Bar --------- */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* ------ Show all tasks buttons */}
        <div className="btns">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setFilter("All")}
            className={`button-name ${filter === "All" ? "active" : ""}`}
            role="button"
          >
            All <i class="ri-arrow-down-s-fill"></i>
          </motion.button>
          <motion.button
            style={{ backgroundColor: "green" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFilter("Completed")}
            className={`button-name ${filter === "Completed" ? "active" : ""}`}
            role="button"
          >
            Completed
          </motion.button>
          <motion.button
            style={{ backgroundColor: "#af3737" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFilter("Incomplete")}
            className={`button-name ${filter === "Incomplete" ? "active" : ""}`}
            role="button"
          >
            Incomplete
          </motion.button>
          <motion.button
            style={{ background: "linear-gradient(45deg, #ff6f61, #ff3d00)" }}
            whileTap={{ scale: 0.9 }}
            onClick={openAddModal}
            className="button-name"
            role="button"
          >
            Add Task +
          </motion.button>
        </div>
      </div>

      <TaskModal
        isOpen={showAddModal}
        onRequestClose={closeAddModal}
        title={title}
        description={description}
        date={date}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onDateChange={setDate}
        onSave={editIndex !== null ? editTask : addTask}
        onCancel={closeAddModal}
        isEditing={editIndex !== null}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        onConfirm={removeBtn}
        onCancel={closeDeleteModal}
      />

      <div className="maintain_cards">
        <div className="set_headings">
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
                <i
                  onClick={() => openEditModal(idx)}
                  className="ri-edit-2-fill edit"
                ></i>
              </h3>
              <p>{data.description}</p>
              <div className="date_section">
                <p>Date: {data.dueDate}</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="completeBtn"
                  onClick={() => completeTask(idx)}
                >
                  {data.completed ? "Incomplete" : "Complete"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="deleteBtn"
                  onClick={() => openDeleteModal(idx)}
                >
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
