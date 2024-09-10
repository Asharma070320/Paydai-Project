import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import "./TaskManager.css";

const DeleteModal = ({ isOpen, onRequestClose, onConfirm, onCancel }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Delete Confirmation"
    className="Modal"
    overlayClassName="Overlay"
  >
    <h2>Are you sure you want to delete this task?</h2>
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onConfirm}
      className="confirm"
    >
      Yes, Delete
    </motion.button>
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onCancel}
      className="cancel"
    >
      Cancel
    </motion.button>
  </Modal>
);

export default DeleteModal;
