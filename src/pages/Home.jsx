import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard, Button} from '../components'
import { Link } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-4 text-center bg-gray-800">
    <Container>
        <div className="flex flex-col items-center justify-center">
            <div className="p-4 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-4 hover:text-gray-500 transition-colors">
                    Welcome! Please log in to read posts.
                </h1>
                <p className="text-gray-300 mb-6">
                    Join our community to access insightful articles and discussions!
                </p>
                
                <Link to="/login">
                    <Button bgColor="bg-blue-600" className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    </Container>
</div>

        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home