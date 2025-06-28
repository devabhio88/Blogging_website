import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    console.log(featuredImage);
    
  return (
    <Link to={`/post/${$id}`}>
        {/* <div className='w-full bg-gray-100 rounded-xl p-4'> */}
              <div className="card card-compact bg-base-100 w-full max-h-50 shadow hover:shadow-lg active:scale-95">

            <div className='w-full justify-center mb-4'>
                {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title} */}
                                <img src={appwriteService.getFileView(featuredImage)} alt={title}

                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import appwriteService from "../appwrite/config";

// function PostCard({ $id, title, featuredImage }) {
//   const [imgUrl, setImgUrl] = useState(null);

//   useEffect(() => {
//     if (!featuredImage) return;
//         console.log("Image preview URL:", appwriteService.getFilePreview(featuredImage));
//     appwriteService.getFilePreview(featuredImage)
//       .then(setImgUrl)
//       .catch(console.error);
//   }, [featuredImage]);

//   return (
//     <Link to={`/post/${$id}`}>
//       <div className="card card-compact bg-base-100 shadow hover:shadow-lg active:scale-95">
//         <div className="w-full mb-4">
//           {imgUrl
//             ? <img src={imgUrl} alt={title} className="rounded-xl w-full object-cover h-48" />
//             : <div className="rounded-xl w-full h-48 bg-gray-200 animate-pulse" />
//           }
//         </div>
//         <h2 className='text-xl font-bold'>{title}</h2>
//       </div>
//     </Link>
//   );
// }

// export default PostCard;
