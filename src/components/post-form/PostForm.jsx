import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

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
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

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
    // <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    //     <div className="w-2/3 px-2">
    //         <Input
    //             label="Title :"
    //             placeholder="Title"
    //             className="mb-4"
    //             {...register("title", { required: true })}
    //         />
    //         <Input
    //             label="Slug :"
    //             placeholder="Slug"
    //             className="mb-4"
    //             {...register("slug", { required: true })}
    //             onInput={(e) => {
    //                 setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
    //             }}
    //         />
    //         <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    //     </div>
    //     <div className="w-1/3 px-2">
    //         <Input
    //             label="Featured Image :"
    //             type="file"
    //             className="mb-4"
    //             accept="image/png, image/jpg, image/jpeg, image/gif"
    //             {...register("image", { required: !post })}
    //         />
    //         {post && (
    //             <div className="w-full mb-4">
    //                 <img
    //                     src={appwriteService.getFilePreview(post.featuredImage)}
    //                     alt={post.title}
    //                     className="rounded-lg"
    //                 />
    //             </div>
    //         )}
    //         <Select
    //             options={["active", "inactive"]}
    //             label="Status"
    //             className="mb-4"
    //             {...register("status", { required: true })}
    //         />
    //         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
    //             {post ? "Update" : "Submit"}
    //         </Button>
    //     </div>
    // </form>

    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      <div className="w-2/3 px-4">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="mb-4 bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="w-1/3 px-4">
        <Input
          label="Featured Image"
          type="file"
          className="block w-full text-sm text-gray-300
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-600 file:text-white
                                hover:file:bg-indigo-700
                                file:cursor-pointer cursor-pointer my-2"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg border border-gray-600"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 bg-gray-800 text-black border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-700" : "bg-indigo-600"}
          className="w-full py-2 hover:bg-indigo-600 transition duration-200"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
