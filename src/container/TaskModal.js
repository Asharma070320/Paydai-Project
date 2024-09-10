import React from "react";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";
import "./TaskManager.css";

const TaskModal = ({
  isOpen,
  onRequestClose,
  title,
  description,
  date,
  onTitleChange,
  onDescriptionChange,
  onDateChange,
  onSave,
  onCancel,
  isEditing
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Add/Edit Task"
    className="Modal"
    overlayClassName="Overlay"
  >
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className="modal-content">
        <h2
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "15px",
          }}
        >
          {isEditing ? "Edit Task" : "Add Task"}
        </h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Add the title"
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Give the description"
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </label>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onSave}
        >
          {isEditing ? "Save Changes" : "Add Task"}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCancel}
          className="cancel"
        >
          Cancel
        </motion.button>
      </div>
    </CSSTransition>
  </Modal>
);

export default TaskModal;
