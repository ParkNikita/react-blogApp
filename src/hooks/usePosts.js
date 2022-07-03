import { useMemo } from "react"

export const useSortedPosts = function (posts, sort) {
    const SortedPosts = useMemo( () => {
        if (sort) {
          return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
      }, [sort, posts])

    return SortedPosts;
} 

export const usePosts = function(posts, sort, query) {
    const SortedPosts = useSortedPosts(posts, sort)

    const SortedAndSearchedPosts = useMemo( () => {
        return SortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
      }, [query, SortedPosts])    

    return SortedAndSearchedPosts
}

  