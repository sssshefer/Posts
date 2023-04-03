import React, {useEffect, useRef, useState} from 'react'

import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from '../components/PostForm'
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages"
import Pagination from "../components/UI/pagination/Pagination"
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pageView, setPageView] = useState(true);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()
    const [isDeletingPosts, setIsDeletingPosts] = useState(false);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        if (pageView) {
            setPosts(response.data);


        } else {
            setPosts([...posts, ...response.data])
        }

        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));

    })
    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    }, pageView)


    useEffect(() => {
        fetchPosts();

    }, [limit])

    useEffect(() => {
        if (!pageView) {
            fetchPosts();
        }

    }, [page,limit])


    useEffect(() => {
        let intervalId;
        if (isDeletingPosts) {
            intervalId = setInterval(() => {
                if (posts.length) {
                    removePost(posts[0])
                } else {
                    setTimeout(() => {
                        setIsDeletingPosts(false)
                        fetchPosts();
                    }, 250)

                }
            }, 200);
        }
        return () => {
            clearInterval(intervalId);
        }

    }, [isDeletingPosts, posts]);


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts => posts.filter(p => p.id !== post.id))
    }
    const changePage = page => {
        setIsDeletingPosts(true)
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}/>
            <MySelect value={limit}
                      onChange={value => setLimit(value)}
                      defaultValue="Number of elem on the page"
                      options={[
                          {value: 5, name: '5'},
                          {value: 10, name: '10'},
                          {value: 25, name: '25'},
                          {value: -1, name: 'Show all'},
                      ]}>

            </MySelect>
            <MySelect value={pageView}
                      onChange={value => setPageView(value)}
                      defaultValue="Pagination"
                      options={[
                          {value: true, name: 'On'},
                          {value: '', name: 'Off'},
                      ]}>

            </MySelect>
            {postError &&
            <h1>Error has happened ${postError}</h1>
            }
            <PostList isPostsLoading={isPostsLoading} limit={limit} remove={removePost} title="List of posts"
                      posts={sortedAndSearchedPosts}/>
            {!pageView &&
            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
            }

            {pageView && <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}/>

            }
        </div>
    )
        ;
}

export default Posts;
