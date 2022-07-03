import '../App.css';
import '../styles/App.css';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import MyLoader from '../components/UI/loader/MyLoader';
import Pagination from '../components/UI/pagination/Pagination';

import PostService from '../API/PostService';

import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';

import React, {useState, useEffect, useRef} from 'react';
import { getPageCount} from '../utils/pages';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';






const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const SortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

  

    const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const TotalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(TotalCount, limit))
    })  
  

    useObserver(lastElement, page<totalPages, isPostsLoading, () => {
      setPage(page + 1)
    })
    

    useEffect( () => {
      fetchPosts(limit, page) 
    }, [page, limit])
  
    const createPost = function (newPost) {
      setPosts([...posts, newPost])
      setModal(false)
    }
  
    const removePost = function (post) {
      setPosts(posts.filter(p => p.id !== post.id))
      
    }
    
    const changePage = function (page) {
      setPage(page)
  
      
    }
    return (
      <div className="App">
        <button onClick={fetchPosts}>Get Posts</button>
        <MyButton style={{marginTop: 25}} onClick={()=> setModal(true)}>
          Create post
        </MyButton>
        <hr style={{margin: '15px 0'}} />  
        <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
        </MyModal>
        
        <PostFilter
        filter = {filter}
        setFilter = {setFilter}
        />
        <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue='Num of el'
          options={[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 15, name: '15'},
            {value: -1, name: 'All posts'},
          ]}
        />


        {postError &&
        <div>Error {postError}</div>
        }

        <PostList remove={removePost} posts={SortedAndSearchedPosts} title='List of posts' />
        <div ref={lastElement} style={{height: 20, background: 'white'}}>
          
        </div>
        {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><MyLoader/></div>
        }

        
  
        <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
        />
  
        
      </div>
    );
}

export default Posts;