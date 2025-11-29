import React,{useState} from 'react'
import api from '../api'
export default function FindDonor(){
  const [blood,setBlood]=useState(''); const [city,setCity]=useState(''); const [list,setList]=useState([])
  async function search(e){ e.preventDefault(); try{ const res = await api.get('donors/', {params:{blood_type:blood,city}}); setList(res.data) } catch(err){ console.error(err) } }
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Find Donor</h2>
      <form onSubmit={search} className="flex gap-2 mb-4">
        <input value={blood} onChange={e=>setBlood(e.target.value)} placeholder="Blood Type" className="border p-2 rounded w-28" />
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="border p-2 rounded flex-1" />
        <button className="bg-red-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      <div className="space-y-3">
        {list.length===0? <p className="text-gray-500">No donors</p> : list.map(d=>(
          <div key={d.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{d.name} <span className="text-sm text-gray-500">({d.blood_type})</span></div>
              <div className="text-sm text-gray-600">{d.city} — {d.contact_number}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
