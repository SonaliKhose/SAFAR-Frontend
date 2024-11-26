import React from "react";

function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
