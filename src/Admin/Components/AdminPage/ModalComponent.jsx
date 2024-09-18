export const ModalComponent = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-[0.4] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this item?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onDelete}
            className="delete-button p-2 rounded-md w-24 border-2 border-red-500 bg-red-500 text-white"
          >
            <i className="fa-regular fa-trash-can"></i> Delete
          </button>
          <button
            onClick={onClose}
            className="cancel-button p-2 rounded-md w-24 border-2 border-gray-300 text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
