import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen bg-gray-900 py-12">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-800">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Title and Author Actions */}
              <div className="border-b border-gray-700 pb-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    {post.title}
                  </h1>
                  {isAuthor && (
                    <div className="flex space-x-2 ml-4">
                      <Link to={`/edit-post/${post.$id}`}>
                        <Button 
                          bgColor="bg-green-700" 
                          className="!px-4 !py-2 text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        bgColor="bg-red-700" 
                        onClick={deletePost}
                        className="!px-4 !py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center space-x-4 text-gray-400 text-sm">
                  
                
                  <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Content */}
              <div className="browser-css">
                    {parse(post.content) }
                    
                    </div>

              {/* Footer */}
              <div className="border-t border-gray-700 pt-6 mt-8">
                <div className="flex items-center text-gray-400 text-sm">
                  <span>Last updated: {new Date(post.$updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
    ) : null;
}
