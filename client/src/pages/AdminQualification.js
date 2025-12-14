import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "http://localhost:5000";

const AdminQualification = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/qualifications`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching qualifications", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_BASE_URL}/api/qualifications/${editingId}`
      : `${API_BASE_URL}/api/qualifications`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Error saving qualification");
        return;
      }

      setForm({
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        completion: "",
        description: "",
      });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      console.error("Error saving qualification", err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      completion: item.completion ? item.completion.slice(0, 10) : "",
      description: item.description || "",
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      await fetch(`${API_BASE_URL}/api/qualifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchItems();
    } catch (err) {
      console.error("Error deleting qualification", err);
    }
  };

  return (
    <div className="page admin-page">
      <h1>Admin - Qualifications</h1>
      <p>
        Logged in as: {user?.email} ({user?.role})
      </p>

      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editingId ? "Edit Qualification" : "Add New Qualification"}</h2>

        <input
          name="title"
          placeholder="Title (e.g., Diploma)"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="firstname"
          placeholder="First Name"
          value={form.firstname}
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          placeholder="Last Name"
          value={form.lastname}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="completion"
          type="date"
          value={form.completion}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      <h2>Existing Qualifications</h2>
      {items.map((item) => (
        <div key={item._id}>
          <strong>{item.title}</strong> – {item.firstname} {item.lastname}
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminQualification;