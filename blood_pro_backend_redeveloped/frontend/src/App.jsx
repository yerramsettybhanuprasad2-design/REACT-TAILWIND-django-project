import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import FindDonor from './pages/FindDonor'
import RequestBlood from './pages/RequestBlood'
import Requests from './pages/Requests'
import Login from './pages/Login'

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-600">Blood Pro</h1>
          <nav className="space-x-3">
            <Link to="/" className="text-gray-700 hover:text-red-600">Home</Link>
            <Link to="/register" className="text-gray-700 hover:text-red-600">Register</Link>
            <Link to="/find" className="text-gray-700 hover:text-red-600">Find Donor</Link>
            <Link to="/request" className="text-gray-700 hover:text-red-600">Request Blood</Link>
            <Link to="/requests" className="text-gray-700 hover:text-red-600">Requests</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/find" element={<FindDonor/>} />
          <Route path="/request" element={<RequestBlood/>} />
          <Route path="/requests" element={<Requests/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
}
