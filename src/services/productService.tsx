const API_URL = "http://localhost:8000/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createProduct = async (data: FormData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: data, // pakai FormData untuk upload gambar
  });
  return await res.json();
};

export const updateProduct = async (id: number, data: FormData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "POST", // Laravel biasanya pakai POST + _method=PUT untuk form data
    body: data,
  });
  return await res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
