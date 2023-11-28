const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-md z-10 relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
