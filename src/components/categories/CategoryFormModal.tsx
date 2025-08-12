// frontend\src\components\categories\CategoryFormModal.tsx
import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string }, id?: number) => void;
  initialData?: { id?: number; name: string };
}

export default function CategoryFormModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Category" : "Create Category"}
        </h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onSubmit({ name }, initialData?.id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
