// import axios from "axios";

// const API_URL = "http://localhost:8000/api/categories"; // ganti sesuai backend kamu

// export const getCategories = async () => {
//   const res = await axios.get(API_URL);
//   return res.data;
// };

// export const createCategory = async (data: { name: string }) => {
//   const res = await axios.post(API_URL, data);
//   return res.data;
// };

// export const updateCategory = async (id: number, data: { name: string }) => {
//   const res = await axios.put(`${API_URL}/${id}`, data);
//   return res.data;
// };

// export const deleteCategory = async (id: number) => {
//   const res = await axios.delete(`${API_URL}/${id}`);
//   return res.data;
// };

const API_URL = "http://localhost:8000/api/categories";

export const getCategories = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createCategory = async (data: { name: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updateCategory = async (id: number, data: { name: string }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteCategory = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
