import { useEffect, useState } from "react";

export default function Test() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/test")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test CORS Laravel ↔ React</h1>
      {data ? (
        <>
          <p>Pesan: {data.message}</p>
          <p>Waktu: {data.time}</p>
        </>
      ) : (
        <p>Gagal mengambil data</p>
      )}
    </div>
  );
}