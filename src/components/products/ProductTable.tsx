import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import ProductFormModal from "./ProductFormModal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category_id: number;
  category_name?: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Product | undefined>();

  const loadData = async () => {
    const data = await getProducts();
    const sorted = (data as Product[]).sort((a, b) => a.id - b.id);
    setProducts(sorted);
    const catData = await getCategories();
    setCategories(catData as Category[]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (
    formData: { name: string; description: string; price: string; stock: number; category_id: number },
    id?: number
  ) => {
    const processedFormData = {
      ...formData,
      price: Number(formData.price),
    };
    if (id) {
      await updateProduct(id, processedFormData);
    } else {
      // If createProduct expects FormData, keep this; otherwise, pass processedFormData
      await createProduct(processedFormData);
    }
    setIsModalOpen(false);
    setEditData(undefined);
    loadData();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      loadData();
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="font-semibold">Products</h2>
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
              <TableCell isHeader className="px-4 py-3">Category</TableCell>
              <TableCell isHeader className="px-4 py-3">Price</TableCell>
              <TableCell isHeader className="px-4 py-3">Stock</TableCell>
              <TableCell isHeader className="px-4 py-3">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="px-4 py-3">{p.id}</TableCell>
                <TableCell className="px-4 py-3">{p.name}</TableCell>
                <TableCell className="px-4 py-3">{p.category_name || p.category_id}</TableCell>
                <TableCell className="px-4 py-3">{p.price}</TableCell>
                <TableCell className="px-4 py-3">{p.stock}</TableCell>
                <TableCell className="px-4 py-3 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setEditData(p);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditData(undefined); }}
        onSubmit={handleSave}
        initialData={editData}
        categories={categories}
      />
    </div>
  );
}
