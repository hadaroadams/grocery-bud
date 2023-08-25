import React from 'react'

function List({grocery,remove,edit}) {
  return (
    <article className=' flex items-center w-full my-5'>
        <input type="checkbox"/>
        <p className='flex-1 ml-3 text-lg' >{grocery}</p>
        <div className=''> 
            <button className=' text-green-500 hover:text-green-700 duration-150' onClick={edit}><i class="fa-solid fa-pen-to-square"></i></button>
            <button className='ml-3 text-red-600 hover:text-red-800 duration-150'onClick={remove}><i class="fa-solid fa-trash"></i></button>
        </div>
    </article>
  )
}

export default List
