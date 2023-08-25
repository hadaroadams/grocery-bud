import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import List from './List';



function App() {
  const [editToggle,setEditToggle]=useState(false)
  const [editId,setEditId] = useState('')
  const [text,setText] = useState('')
  const [groceryList,setGroceryList] = useState([])
  useEffect(()=>{
    setGroceryList(Object.values(localStorage))
  },[])

  const display=(e)=>{
      let time  
      e.preventDefault()
    if(text.trim()==''){
      toast('Please Provide Value',{
        position:'top-center',
        theme:'light',
        type:'error'
      })
    }else{
      if(editToggle){
        time =editId
        toast('Item has been Edited',{position:'top-center', theme:'light',type:'success'})
      }else{
        time=new Date().getTime()
         toast('Item Added to list',{
        position:'top-center',
        theme:'light',
        type:'success'
      })
    }
      localStorage.setItem(time,JSON.stringify({
        id:time,
        item:text,
      }))
      setGroceryList(Object.values(localStorage))
      console.log(time)
      setEditToggle(false)
      setText('')
     
    }
  }
  const edit=(id)=>{
    //let time = new Date().getTime()
    let focus = JSON.parse(localStorage.getItem(id))
    console.log(focus)
    setText(focus.item)
    setEditId(id)
    setEditToggle(true)
  }
  const clear=(id)=>{
    localStorage.removeItem(id)
    setGroceryList(Object.values(localStorage))
    setEditToggle(false)
    setText('')
    toast('Item has been deleted',{
        position:'top-center',
        theme:'light',
        type:'error'
      })
  }
  const clearAll=()=>{
    localStorage.clear();
    setGroceryList([]);
    setText('');
    setEditToggle(false)
    toast('All items has been deleted',{
        position:'top-center',
        theme:'light',
        type:'warning'
      })
  }
  console.log(groceryList)
  return (
    <main className=" h-screen w-full flex justify-center bg-[#F8FAFC]">
      <section className=' w-10/12 h-fit bg-[#FFFFFF] mt-[150px] grocery p-8 rounded-md md:w-[600px]'>
        <h1 className='text-center text-3xl mb-4'>Grocery Bud</h1>
        <form className='flex h-9' onSubmit={(e)=>{display(e)}}>
          <input type='text' className='w-9/12 bg-[#F8FAFC] rounded-l-md border px-3' onChange={(e)=>{setText(e.target.value)}} value={text}/>
          <button className='w-3/12 bg-[#0dadda] rounded-r-md text-[white] text-sm '>Add Item</button>
        </form>
        <div>
          {groceryList.map((item)=>{
            let list= JSON.parse(item)
            console.log(list)
            return <List grocery={list.item} remove={()=>{clear(list.id)}} edit={()=>{edit(list.id)}} />
          })}
        </div>
        <div className='flex'>
              <button className='text-red-600 mx-auto tracking-[2px] hover:text-red-700 duration-150 mt-4' onClick={clearAll}>Clear Items</button>
        </div>
      </section>
      <ToastContainer/>
    </main>
  );
}

export default App;
