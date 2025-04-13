// ProtectedLayout.jsx
import React, { useState } from 'react';
import Header from '../pages/Header/Header';
import Modal from '../pages/Modal/Modal';
import TaskList from '../pages/TaskList/TaskList';

const ProtectedLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header openModal={openModal} />
      <main>
        <TaskList openModal={openModal} />
      </main>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default ProtectedLayout;
