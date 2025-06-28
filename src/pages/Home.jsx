import { useEffect, useState } from "react";
import { PostCard, Signup } from "../components";
import appwriteService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts as setPostsInStore } from "../store/postSlice";
import { Query } from "appwrite"; // Import Query from appwrite

const Home = () => {
  const { status: authStatus, userData } = useSelector((state) => state.auth);
  const { posts, searchTerm } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (authStatus) {
      appwriteService
        .getPosts([Query.equal("status", "active")])
        .then((postsFromDB) => {
          if (isMounted && postsFromDB) {
            dispatch(setPostsInStore(postsFromDB.documents));
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
  }, [authStatus, dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (!filteredPosts.length && authStatus) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-2xl">Not found!</h1>
      </div>
    );
  }

  if (!filteredPosts.length && !authStatus) {
    return (
      <div className="w-full">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="/assets/Illustrations_reading-side.svg"
              className="max-w-xs md:max-w-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold">
                Empowering Writers, One Post at a Time
              </h1>
              <p className="py-6">
                Whether you&apos;re a seasoned blogger or just starting out, our
                platform provides the tools and community you need to succeed.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById("signup").showModal()}
              >
                Join Our Community
              </button>
              <dialog id="signup" className="modal">
                <div className="modal-box">
                  <Signup />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {filteredPosts.map((post) =>
          post.status === "active" ? (
            <div key={post.$id}>
              <PostCard {...post} author={userData.name} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Home;
