import { IoClose } from "react-icons/io5";

export default function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0  flex items-center justify-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-slate-800 rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400  hover:text-gray-600 cursor-pointer"
        >
          <IoClose size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
