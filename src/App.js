import './App.css';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

import Navbar from './components/UI/Navbar/Navbar';
import { useEffect, useState } from 'react';


function App() {

  const [isAuth, setIsAuth] = useState(false)
  useEffect( ()=> {
    if (localStorage.getItem('auth'))
      setIsAuth(true)
  },[])

 
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
      }}>
      <BrowserRouter>
        <Navbar/>
          <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  )


}

export default App;



















// function App() {
//   const [posts, setPosts] = useState([
//     {id: 1, title: 'JavaScript 1', description: 'some Text'},
//     {id: 2, title: 'JavaScript 2', description: 'some Text'},
//     {id: 3, title: 'JavaScript 3', description: 'some Text'},
    
//   ])

//   const [title, setTitle] = useState()
//   const DescriptionInputRef = useRef()



//   const addNewPost = function (e) {
//     e.preventDefault()
//     const newPost = {
//       id: Date.now(),
//       title: title,
//       description: DescriptionInputRef.current.value
//     }
//     setPosts([...posts, newPost])
    
//   }

//   return (
//     <div className="App">
//       <form action="">
//         <MyInput  
//         value = {title}
//         onChange = {e => setTitle(e.target.value)}
//         type = 'text'
//         placeholder='Name of post'
//         />

//         <MyInput 
//         ref = {DescriptionInputRef}
//         type="text" 
//         placeholder='Description of post'
//         />
//         <MyButton onClick={addNewPost}>Create Post</MyButton>
        
//       </form>

//       <PostList posts={posts} title='List of posts' />
//     </div>
//   );
// }

// export default App;
