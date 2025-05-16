import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { imageUpload } from "@/utils/action/authAction";
import { getAllCategories } from "@/utils/action/categoryAction";
import { getSinglePost, updatePost } from "@/utils/action/postAction";
import { formats, modules, placeholder, theme } from "@/utils/quillUtil";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function UpdatePost() {
  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });
  const currentUser = useSelector((state) => state.user.currentUser);
  const filePickerRef = useRef();
  const [allCategories, setAllCategories] = useState([]);
  // const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  // Fetch All Categories in the Database
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      if ("success" in result && result.success) {
        setAllCategories(result.categories);
      } else {
        toast.error(result.message);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Single post Data in the Database
  useEffect(() => {
    const singlePost = async () => {
      const result = await getSinglePost(postId);
      if ("success" in result && result.success) {
        const { title, content, image, category } = result.posts[0];
        setFormData({
          title,
          category,
          image,
          content,
        });
        // setImageFileUrl(image);
        quill && (quill.root.innerHTML = content);
      } else {
        toast.error(result.message);
      }
    };
    singlePost();
  }, [postId, quill]);

  const uploadImageHandler = async () => {
    const file = filePickerRef.current.files[0];
    if (file) {
      const imageUrl = await imageUpload(file);
      if (imageUrl) {
        toast.success("Image uploaded successfully");
        // setImageFileUrl(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      }
    }
  };

  const formAction = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const image = formData.image;
    const content = quill.root.innerHTML;

    if (!title || !content) {
      toast.error("Title & content fields are required");
      return;
    } else {
      const data = { title, category, image, content };
      const result = await updatePost(postId, currentUser._id, data);
      if ("success" in result) {
        if (result.success) {
          toast.success(result.message);
          navigate(`/post/${result.post.slug}`);
        } else {
          toast.error(result.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen max-w-3xl p-3 mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Update Post</h1>
      <form onSubmit={formAction} className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Input
            type="text"
            name="title"
            suggestion="title"
            autoComplete="off"
            placeholder="Title"
            defaultValue={formData?.title}
            id="title"
            required
            className="flex-1"
          />

          <Select
            name="category"
            className=""
            onValueChange={(e) => {
              setFormData((prev) => ({ ...prev, category: e }));
            }}
            value={formData?.category}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category._id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <Input
            id="picture"
            name="picture"
            type="file"
            accept="image/*"
            ref={filePickerRef}
          />
          <Button type="button" onClick={uploadImageHandler}>
            Upload Image
          </Button>
        </div>

        <div className="h-[250px] mb-4">
          <div className="flex items-center justify-center h-full">
            <img
              src={formData?.image}
              alt="Uploaded"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        <div className="h-[300px] mb-16">
          <div ref={quillRef} />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-indigo-500/80 hover:from-indigo-500  via-purple-500/80 hover:via-purple-500 to-pink-500/80 hover:to-pink-500"
        >
          Update Post
        </Button>
      </form>
    </div>
  );
}
