// frontend\src\services\productService.tsx
const API_URL = "http://localhost:8000/api/products";

// Ambil semua product
export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Gagal mengambil data produk");
  return await res.json();
};

// Tambah product baru
export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number;
}) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal membuat produk");
  return await res.json();
};

// Update product
export const updateProduct = async (
  id: number,
  data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category_id: number;
  }
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal mengupdate produk");
  return await res.json();
};

// Hapus product
export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus produk");
  return await res.json();
};