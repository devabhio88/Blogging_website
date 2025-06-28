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
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        // src={appwriteService.getFilePreview(post.featuredImage)}
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const userData = useSelector(s => s.auth.userData);

//   const [post, setPost]       = useState(null);
//   const [imgUrl, setImgUrl]   = useState(null);
//   const isAuthor = post && userData && post.userId === userData.$id;

//   // Fetch post
//   useEffect(() => {
//     if (!slug) return navigate("/");
//     appwriteService.getPost(slug)
//       .then(p => {
//         if (!p) return navigate("/");
//         setPost(p);
//                 console.log("Image preview URL:", appwriteService.getFilePreview(featuredImage));
//         return appwriteService.getFilePreview(p.featuredImage);
//       })
//       .then(setImgUrl)
//       .catch(console.error);
//   }, [slug, navigate]);

//   const deletePost = async () => {
//     await appwriteService.deletePost(post.$id);
//     await appwriteService.deleteFile(post.featuredImage);
//     navigate("/");
//   };

//   if (!post) return null;
//   return (
//     <Container className="py-8">
//       <div className="relative mb-4 border rounded-xl overflow-hidden">
//         {imgUrl
//           ? <img src={imgUrl} alt={post.title} className="w-full object-cover h-64" />
//           : <div className="w-full h-64 bg-gray-200 animate-pulse" />
//         }

//         {isAuthor && (
//           <div className="absolute top-4 right-4 flex space-x-2">
//             <Link to={`/edit-post/${post.$id}`}>
//               <Button bgColor="bg-green-500">Edit</Button>
//             </Link>
//             <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
//           </div>
//         )}
//       </div>

//       <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
//       <div className="browser-css">{parse(post.content)}</div>
//     </Container>
//   );
// }
