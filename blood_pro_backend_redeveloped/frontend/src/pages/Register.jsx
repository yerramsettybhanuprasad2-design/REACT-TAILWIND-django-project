async function ensureCSRF() {
  // call the backend endpoint to set CSRF cookie
  try {
    await fetch('http://localhost:8000/api/auth/csrf/', { credentials: 'include' });
  } catch (e) {
    // ignore - will attempt post anyway
    console.warn('CSRF endpoint call failed', e);
  }
}

import React, {useState} from 'react'
import api from '../api'
export default function Register(){
  const [form,setForm]=useState({name:'',blood_type:'A+',contact_number:'',city:''})
  const [msg,setMsg]=useState('')
  async function submit(e){
    await ensureCSRF();
    e.preventDefault(); setMsg('')
    try{ const res = await api.post('donors/', form); setMsg('Registered successfully'); setForm({name:'',blood_type:'A+',contact_number:'',city:''}) }
    catch(err){ setMsg('Error: '+(err.response?.data||err.message)) }
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register as a Donor</h2>
      <form onSubmit={submit} className="space-y-3 bg-white p-6 rounded shadow">
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full border p-2 rounded" />
        <select value={form.blood_type} onChange={e=>setForm({...form,blood_type:e.target.value})} className="w-full border p-2 rounded">
          <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
        </select>
        <input required value={form.contact_number} onChange={e=>setForm({...form,contact_number:e.target.value})} placeholder="Contact number" className="w-full border p-2 rounded" />
        <input required value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="City" className="w-full border p-2 rounded" />
        <div className="flex items-center gap-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded">Register</button>
          <div className="text-green-600">{msg}</div>
        </div>
      </form>
    </div>
  )
}
