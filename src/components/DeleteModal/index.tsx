import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onDelete }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="mt-6 flex justify-end">
          <button
            className="mr-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 text-gray-600 border border-gray-300 hover:border-gray-400 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
