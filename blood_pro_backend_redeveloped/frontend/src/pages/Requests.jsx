import React,{useEffect, useState} from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
export default function Requests(){
  const [items,setItems]=useState([]); const [loading,setLoading]=useState(true); const navigate = useNavigate()
  useEffect(()=>{ fetchList() },[])
  async function fetchList(){ setLoading(true); try{ const res = await api.get('requests/'); setItems(res.data) }catch(err){ if(err.response && err.response.status===401) navigate('/login'); else console.error(err) } setLoading(false) }
  async function remove(id){ try{ await api.delete('requests/'+id+'/'); fetchList() }catch(err){ console.error(err) }}
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Blood Requests (Admin)</h2>
      {loading? <p>Loading...</p> : items.length===0? <p className="text-gray-500">No requests</p> : (
        <div className="space-y-3">{items.map(it=>(
          <div key={it.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.patient_name} <span className="text-sm text-gray-500">({it.blood_type_needed})</span></div>
              <div className="text-sm text-gray-600">{it.hospital_name} — {it.phone_number}</div>
            </div>
            <button onClick={()=>remove(it.id)} className="px-3 py-1 bg-gray-100 rounded">Delete</button>
          </div>
        ))}</div>
      )}
    </div>
  )
}
