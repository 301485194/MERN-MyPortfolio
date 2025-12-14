
import { useState } from "react";

const API_BASE_URL = "http://localhost:5000";

const Contact = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error submitting contact form");
      }

      setStatus("Your contact details have been submitted successfully!");
      setForm({
        firstname: "",
        lastname: "",
        email: "",
      });
    } catch (err) {
      console.error("Error submitting contact:", err);
      setStatus("There was a problem sending your details. Please try again.");
    }
  };

  return (
    <div className="page contact-page">
      <h1>Contact Me</h1>
      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
