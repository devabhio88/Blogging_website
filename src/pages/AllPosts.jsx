import { useEffect, useState } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Query } from "appwrite"; // Import Query from appwrite

const AllPosts = () => {
  const { userData } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (userData && userData.$id) {
      appwriteService
        .getPosts([Query.equal("userId", userData.$id), Query.equal("status", "inactive")])
        .then((postsFromDB) => {
          if (isMounted && postsFromDB) {
            setPosts(postsFromDB.documents);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Error fetching posts: ", error);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [userData]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full opacity-75"></div>
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-2xl">No drafts found!</h1>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-base-200">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} author={userData?.name || "Unknown"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;