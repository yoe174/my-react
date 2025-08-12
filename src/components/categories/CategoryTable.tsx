// frontend\src\components\categories\CategoryTable.tsx
import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import CategoryFormModal from "./CategoryFormModal";

interface Category {
  id: number;
  name: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Category | undefined>();

  const loadData = async () => {
    const data = await getCategories();
    setCategories(data as Category[]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (formData: { name: string }, id?: number) => {
    if (id) {
      await updateCategory(id, formData);
    } else {
      await createCategory(formData);
    }
    setIsModalOpen(false);
    setEditData(undefined);
    loadData();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      loadData();
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="font-semibold">Categories</h2>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          + Create
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader className="px-4 py-3">ID</TableCell>
              <TableCell isHeader className="px-4 py-3">Name</TableCell>
              <TableCell isHeader className="px-4 py-3">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="px-4 py-3">{cat.id}</TableCell>
                <TableCell className="px-4 py-3">{cat.name}</TableCell>
                <TableCell className="px-4 py-3 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setEditData(cat);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditData(undefined); }}
        onSubmit={handleSave}
        initialData={editData}
      />
    </div>
  );
}
