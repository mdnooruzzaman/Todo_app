import { useEffect, useState  } from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import './App.scss';
import Todo from './components/todo'
import Input from './components/input';
import Add from './components/add';
import Register from './components/register';
import SignIn from './components/signin';
import Signout from './components/signout';


function App() {
  const todo = [
    {
      id:1,
      topic: "Learning react"
    },
    {
      id: 2,
      topic: "Learning english"
    },
    {
      id: 3,
      topic: "Learning japanese"
    }
  ]


  //Fetching data from localstorage
  
const local_storage = () => {
  const l = localStorage.getItem("list");
  
  if(l == null){
    return [...todo]
  }else{
    return JSON.parse(localStorage.getItem("list"))
  }
}


  const [add , setAdd] = useState(local_storage());
  const [input , setInput] = useState("");
  const [toggel , setToggel] = useState(true);
  const [update , setUpdate] = useState("")
  const [userAuthentic , setUserAuthentic] = useState(false)
  


  //handling input field

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  //hadling the delete operation

  const handleDelete = (id) => {
      const item = add.filter(c => c.id !== id)
       setAdd(item)
    //    console.log(item)
    // console.log("item deleted")

    fetch(`home/delete/${id}` , {method:"DELETE"})
      .then(() => console.log("deleted successfully"));
  }

 //Handling the add operation

  const handleAdd = () => { // Here just i just concatinating new element in the array
   
      setAdd(todo => [...todo , 
        {id: todo.length+1,
        topic:input}
      ])

   
    fetch(`/home/add` , {
      method : "POST",
      headers :  {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
      body : JSON.stringify({
        content : input
      })

      })
      .then(res => res.json())
      .then(result => console.log(result))
      .then(console.log("added"))

     

     
    }
   const handleFetch = () => {
    fetch(`/home/fetch`)
    .then(res => res.json())
    .then((result) => setAdd(result))
   }
   
    
  useEffect(() => {
    handleFetch()
  } ,[])

  //Handle the edit operation 

  const handleEdit = (id) => {
    const data = add.find(c => c.id === id); //Handling the event using props and finding the data of matching id
    setToggel(false) ;
    setInput(data.topic);
    setUpdate(id)  // this is required for to update the element in the array and it has been used in bellow handleUpdate function at (c.id === update)
   // console.log(data.topic)
   console.log(id)
  }


  const handleUpdate = () =>{
    console.log(update)
    console.log(input)
    
    fetch(`/home/edit/${update}` , {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: input
      })
    })
    .then(res => res.json())
    .then(result => console.log(result))
    .then(console.log("updated successfully"))
    .then(handleFetch())

  //   setAdd(add.map(c => {  //concatinating the updated data 
  //     if(c.id === update){
  //         return{ ...c , topic:input}
  //     }
  //     return c ;
      
  // })
  // )

    setToggel(true) //Again after the updatation of element making toggel true to change into add button
    setInput(" ");
    setUpdate(null)
  }

  localStorage.setItem('list' ,JSON.stringify(add));

  const handleAuthentication = () => {
    setUserAuthentic(true)
  }

  const handleLogOut = () =>{
    setUserAuthentic(false);
   
  }
  
  return (
    
    <div className="App">
      { !userAuthentic ?
     <BrowserRouter>
        <Routes>
          <Route exect path="/" element={<Register  onRegister={handleAuthentication}/>}/>
          <Route path="/signin" element={<SignIn onSignIn = {handleAuthentication}/>}/>
        </Routes>
      </BrowserRouter>
      :
      <BrowserRouter>
          <Signout onLogout = {handleLogOut}/>
            <h1>
              To Do App
            </h1>
            <div className='head'>
                <Input
                    toggel = {toggel}
                    value = {input}
                    onChange = {handleChange}
                />
                <Add
                    value = {toggel}
                    onAdd = {handleAdd}
                    onUpdate = {handleUpdate}
                />
            </div>
        
                <div>
                    {add.map( c =>
                    <Todo
                      key = {c.id}
                      id = {c.id}
                      value = {c.topic}
                      onDelete = {handleDelete}
                      onEdit = {handleEdit}
                    />
                    )}
                  
                </div>
         </BrowserRouter>} 
    </div>
    
  );
}


export default App;
