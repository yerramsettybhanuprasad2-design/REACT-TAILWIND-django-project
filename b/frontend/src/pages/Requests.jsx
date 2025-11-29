import React, { useEffect, useState } from "react";
import api, { ensureCSRF } from "../api";

export default function Requests() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------
  // CHECK LOGIN STATUS
  // --------------------------
  async function checkLogin() {
    try {
      const res = await api.get("auth/check/");
      if (res.data.is_staff) {
        setLoggedIn(true);
        loadRequests();
      } else {
        setLoggedIn(false);
      }
    } catch {
      setLoggedIn(false);
    }
  }

  // --------------------------
  // LOAD REQUESTS
  // --------------------------
  async function loadRequests() {
    try {
      const res = await api.get("requests/");
      setRequests(res.data);
      setLoading(false);
    } catch {
      setLoggedIn(false);
    }
  }

  // --------------------------
  // LOGIN
  // --------------------------
  async function handleLogin(e) {
    e.preventDefault();
    await ensureCSRF();
    setLoginError("");

    try {
      const res = await api.post("auth/login/", loginData);
      if (res.data.detail === "ok") {
        setLoggedIn(true);
        loadRequests();
      }
    } catch {
      setLoginError("Invalid username or password");
    }
  }

  // --------------------------
  // LOGOUT
  // --------------------------
  async function handleLogout() {
    await api.post("auth/logout/");
    setLoggedIn(false);
  }

  // --------------------------
  // DELETE REQUEST
  // --------------------------
  async function handleDelete(id) {
    if (!window.confirm("Delete this request?")) return;
    await ensureCSRF();
    await api.delete(`requests/${id}/`);
    loadRequests();
  }

  useEffect(() => {
    checkLogin();
  }, []);

  // --------------------------
  // NOT LOGGED IN → SHOW LOGIN ONLY
  // --------------------------
  if (loggedIn === false) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {loginError && <p className="text-red-600 mb-3">{loginError}</p>}

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            required
            placeholder="Username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full border p-2 rounded"
            required
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />

          <button className="w-full bg-red-600 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  // --------------------------
  // STILL CHECKING LOGIN
  // --------------------------
  if (loggedIn === null) return <p className="p-6">Checking login...</p>;

  // --------------------------
  // LOGGED IN → SHOW REQUESTS
  // --------------------------
  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blood Requests</h2>

        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded shadow flex justify-between"
            >
              <div>
                <p><b>Patient:</b> {req.patient_name}</p>
                <p><b>Blood Type:</b> {req.blood_type_needed}</p>
                <p><b>Hospital:</b> {req.hospital_name}</p>
                <p><b>City:</b> {req.city}</p>
                <p><b>Phone:</b> {req.phone_number}</p>
              </div>

              <button
                onClick={() => handleDelete(req.id)}
                className="bg-red-600 text-white px-3 py-1 rounded h-fit"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
