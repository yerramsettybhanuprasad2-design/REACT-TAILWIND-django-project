import React, {useState} from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [form,setForm]=useState({username:'',password:''}); const [msg,setMsg]=useState(''); const navigate=useNavigate()
  async function submit(e){ e.preventDefault(); setMsg(''); try{ const res = await api.post('auth/login/', form); if(res.status===200){ navigate('/requests') } }catch(err){ setMsg('Login failed') }}
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={submit} className="space-y-3 bg-white p-6 rounded shadow">
        <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Username" className="w-full border p-2 rounded" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full border p-2 rounded" />
        <div className="flex items-center gap-3"><button className="bg-red-600 text-white px-4 py-2 rounded">Login</button><div className="text-red-600">{msg}</div></div>
      </form>
    </div>
  )
}
