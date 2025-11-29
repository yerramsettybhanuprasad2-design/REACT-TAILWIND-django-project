import React from 'react'
export default function Home(){
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-extrabold text-red-600">Donate blood. Save lives.</h2>
        <p className="mt-4 text-gray-700">Quickly find donors, register to donate, or request blood for patients. Simple, fast, reliable.</p>
        <div className="mt-6 flex gap-3">
          <a href="/register" className="px-5 py-3 bg-red-600 text-white rounded shadow">Register as Donor</a>
          <a href="/find" className="px-5 py-3 border rounded">Find Donor</a>
        </div>
      </div>
      <div className="rounded overflow-hidden shadow-lg">
        <img src="/hero.jpg" alt="donate" className="w-full h-72 object-cover"/>
      </div>
    </div>
  )
}
