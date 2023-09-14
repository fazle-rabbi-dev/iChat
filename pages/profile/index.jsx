import React from 'react'

function ProfileUi() {
  return (
    <section className="">
      <h2 className="font_opensans text-2xl bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent font-extrabold">
        Welcome, Fazle Rabbi
      </h2>
      <span className="text-sm text-gray-500 font-light">Manage Your Profile_</span>
      <div className="flex flex-col gap-3 my-4 bg-gray-200 rounded px-2 py-4">
        <button className="text-sm px-2 py-2 bg-purple-700 text-white rounded">
          Change My Name
        </button>
        <button className="text-sm px-2 py-2 bg-rose-700 text-white rounded">
          Delete My Account
        </button>
      </div>
      <p className="mt-5 text-center text-blue-600 font-bold tracking-wide">These feature's is not available right now!</p>
    </section>
  )
}

export default ProfileUi
