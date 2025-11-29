import React, { useState } from "react";
import api, { ensureCSRF } from "../api";

export default function RequestBlood() {
  const [form, setForm] = useState({
    patient_name: "",
    blood_type_needed: "A+",
    hospital_name: "",
    city: "",
    phone_number: "",
  });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    await ensureCSRF();
    setMsg("");

    try {
      await api.post("requests/", form);
      setMsg("Request submitted");

      setForm({
        patient_name: "",
        blood_type_needed: "A+",
        hospital_name: "",
        city: "",
        phone_number: "",
      });
    } catch (err) {
      setMsg("Error: " + JSON.stringify(err.response?.data));
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Request Blood</h2>

      <form onSubmit={submit} className="space-y-3 bg-white p-6 rounded shadow">
        <input
          required
          value={form.patient_name}
          onChange={(e) =>
            setForm({ ...form, patient_name: e.target.value })
          }
          placeholder="Patient name"
          className="w-full border p-2 rounded"
        />

        <select
          value={form.blood_type_needed}
          onChange={(e) =>
            setForm({ ...form, blood_type_needed: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <input
          required
          value={form.hospital_name}
          onChange={(e) =>
            setForm({ ...form, hospital_name: e.target.value })
          }
          placeholder="Hospital"
          className="w-full border p-2 rounded"
        />

        <input
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          placeholder="City"
          className="w-full border p-2 rounded"
        />

        <input
          required
          value={form.phone_number}
          onChange={(e) =>
            setForm({ ...form, phone_number: e.target.value })
          }
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />

        <div className="flex items-center gap-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Submit
          </button>
          <div className="text-green-600">{msg}</div>
        </div>
      </form>
    </div>
  );
}
