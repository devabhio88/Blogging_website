import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const {userData} = useSelector((state) => state.auth.userData);  //userdata is an object with user data so we destructure it to get the userData object and then we get the $id from it.
    const submit = async (data) => {
        //for updating the post
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        // for adding new post
        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(userData);
                
                console.log(typeof userData)
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            // src={appwriteService.getFilePreview(post.featuredImage)}
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

// import React, { useEffect, useState, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//     defaultValues: {
//       title: post?.title || "",
//       slug:  post?.$id   || "",
//       content: post?.content || "",
//       status: post?.status  || "active",
//     },
//   });

//   const navigate = useNavigate();
//   const userData = useSelector(s => s.auth.userData);
//   const [existingImg, setExistingImg] = useState(null);

//   // Load existing image preview
//   useEffect(() => {
//     if (!post?.featuredImage) return;
//     appwriteService.getFilePreview(post.featuredImage)
//       .then(setExistingImg)
//       .catch(console.error);
//   }, [post]);

//   const submit = async (data) => {
//     // — Handle file upload
//     let fileId = post?.featuredImage;
//     if (data.image?.[0]) {
//       const file = await appwriteService.uploadFile(data.image[0]);
//       fileId = file.$id;
//       if (post?.featuredImage) {
//         await appwriteService.deleteFile(post.featuredImage);
//       }
//     }

//     // — Create or update
//     if (post) {
//       const updated = await appwriteService.updatePost(post.$id, {
//         ...data,
//         featuredImage: fileId,
//       });
//       if (updated) navigate(`/post/${updated.$id}`);
//     } else {
//       const created = await appwriteService.createPost({
//         ...data,
//         featuredImage: fileId,
//         userId: userData.$id,
//       });
//       if (created) navigate(`/post/${created.$id}`);
//     }
//   };

//   const slugTransform = useCallback((val) =>
//     val
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z\d]+/g, "-")
//       .replace(/^-+|-+$/g, "")
//   , []);

//   // Auto‑slugify title
//   useEffect(() => {
//     const sub = watch((val, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(val.title));
//       }
//     });
//     return () => sub.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input label="Title" {...register("title", { required: true })} className="mb-4" />
//         <Input
//           label="Slug"
//           {...register("slug", { required: true })}
//           className="mb-4"
//           onInput={e => setValue("slug", slugTransform(e.currentTarget.value))}
//         />
//         <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
//       </div>

//       <div className="w-1/3 px-2">
//         <Input
//           label="Featured Image"
//           type="file"
//           accept="image/*"
//           {...register("image", { required: !post })}
//           className="mb-4"
//         />

//         {existingImg && (
//           <div className="mb-4 w-full">
//             <img src={existingImg} alt={post.title} className="rounded-lg w-full object-cover h-48" />
//           </div>
//         )}

//         <Select options={["active","inactive"]} {...register("status", { required: true })} label="Status" className="mb-4" />
//         <Button type="submit" className="w-full" bgColor={post ? "bg-green-500" : undefined}>
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }
