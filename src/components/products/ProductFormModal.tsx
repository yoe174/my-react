import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    formData: { name: string; description: string; price: string; stock: number; category_id: number },
    id?: number
  ) => void;
  initialData?: { id?: number; name: string; description: string; price: string; stock: number; category_id: number };
  categories: { id: number; name: string }[];
}

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData, categories }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setStock(initialData.stock);
      setCategoryId(initialData.category_id);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setStock(0);
      setCategoryId(categories[0]?.id || 0);
    }
  }, [initialData, categories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Product" : "Create Product"}
        </h2>
        
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Price"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Stock"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
        
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 dark:bg-gray-700 dark:text-white"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onSubmit({ name, description, price, stock, category_id: categoryId }, initialData?.id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// // src/products/ProductFormModal.tsx
// import React, { useState, useEffect } from "react";
// import { createProduct, updateProduct } from "../../services/productService";
// import { getCategories } from "../../services/categoryService";

// interface ProductData {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category_id: number;
// }

// interface ProductFormModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   editData?: ProductData; // data product yang mau diedit
// }

// const ProductFormModal: React.FC<ProductFormModalProps> = ({
//   isOpen,
//   onClose,
//   onSuccess,
//   editData,
// }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(0);
//   const [stock, setStock] = useState(0);
//   const [categoryId, setCategoryId] = useState<number | "">("");
//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

//   // Load kategori
//   useEffect(() => {
//     getCategories().then((res) => setCategories(res.data));
//   }, []);

//   // Kalau edit, isi form dengan data produk
//   useEffect(() => {
//     if (editData) {
//       setName(editData.name || "");
//       setDescription(editData.description || "");
//       setPrice(editData.price || 0);
//       setStock(editData.stock || 0);
//       setCategoryId(editData.category_id || "");
//     } else {
//       // Reset form kalau mode create
//       setName("");
//       setDescription("");
//       setPrice(0);
//       setStock(0);
//       setCategoryId("");
//     }
//   }, [editData, isOpen]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload = {
//       name,
//       description,
//       price,
//       stock,
//       category_id: Number(categoryId),
//     };

//     try {
//       if (editData) {
//         // UPDATE
//         await updateProduct(editData.id, payload);
//       } else {
//         // CREATE
//         await createProduct(payload);
//       }
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert("Gagal menyimpan data produk");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//       <div className="bg-white p-4 rounded w-[400px]">
//         <h2 className="text-lg font-bold mb-4">
//           {editData ? "Edit Product" : "Create Product"}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Nama Produk"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <textarea
//             placeholder="Deskripsi"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="number"
//             placeholder="Harga"
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Stok"
//             value={stock}
//             onChange={(e) => setStock(Number(e.target.value))}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <select
//             value={categoryId}
//             onChange={(e) => setCategoryId(Number(e.target.value))}
//             className="border p-2 w-full mb-4"
//             required
//           >
//             <option value="">Pilih Kategori</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 px-3 py-1 rounded"
//             >
//               Batal
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               Simpan
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductFormModal;
