import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, $createdAt, content }) {
  const extractTextFromHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
};

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-200'>
                <div className='relative'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className='w-full h-48 object-cover rounded-t-xl'
                    />
                </div>

                <div className='p-4'>
                    
                    <h2 className='text-xl font-bold text-white'>{title}</h2>
                    
                    <p className='text-gray-400 mt-2'>{`${extractTextFromHtml(content.substring(0, 50))}...`}</p>
                    <h2 className='text-sm text-gray-600'>{`Posted at : ${new Date($createdAt).toLocaleDateString()}`}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
