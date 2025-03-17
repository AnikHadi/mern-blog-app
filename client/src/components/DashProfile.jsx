import { updateProfile } from "@/utils/action/authAction";
import { useActionState, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordInput from "./share/PasswordInput";
import Spin from "./share/Spin";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [state, formAction, isPending] = useActionState(updateProfile, {});
  const [imageUploading, setImageUploading] = useState(false);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const handleImageChange = async (e) => {
    setImageUploading(true);
    const file = e.target.files[0];
    if (!file) return;
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "mern-blog");
    imageData.append("cloud_name", "dmxub0wye");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmxub0wye/image/upload",
      {
        method: "POST",
        body: imageData,
      }
    );
    const data = await res.json();
    setImageFileUrl(data.url);
    setImageUploading(false);
  };
  if ("success" in state) {
    if (state?.success) {
      // dispatch(signInSuccess(state));
      toast.success(state?.message || "Profile updated successfully");
      // navigate("/dashboard");
      delete state.success;
    } else {
      // dispatch(signInFailure(state));
      toast.error(state?.message || "Failed to update profile");
      delete state?.success;
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-center text-2xl mb-4 font-bold">Profile</h1>
      <form action={formAction} className="flex flex-col justify-center">
        <Input
          id="avatar"
          type="file"
          name="avatar"
          accept="image/*"
          hidden
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div className="w-36 rounded-full self-center relative group">
          <img
            src={imageFileUrl || currentUser?.avatar}
            alt="user"
            className="w-36 h-36 rounded-full border-6 border-green-600"
          />
          <FaEdit
            size={20}
            onClick={() => filePickerRef.current.click()}
            className="editIcon absolute cursor-pointer bottom-5 right-4 transform -translate-x-[20%]  text-gray-400/70 hover:text-gray-900/70  invisible group-hover:visible group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
          />
        </div>
        {imageUploading && (
          <div className="flex justify-start items-center gap-4 mt-2 bg-green-300 px-2 py-2 rounded-sm shadow-md ">
            <Spin />
            <span className="text-gray-800 text-lg">Picture Uploading...!</span>
          </div>
        )}
        <div className="flex flex-col gap-1.5 mt-3">
          <Label htmlFor="username">UserName</Label>
          <Input
            type="text"
            id="username"
            name="username"
            defaultValue={currentUser?.username}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-1.5 mt-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={currentUser?.email}
          />
        </div>
        <PasswordInput name="password" className="md:max-w-full mt-3" />
        <Button
          className="px-2 py-1 border-2 border-indigo-500 bg-white text-gray-900 transition delay-100 duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white rounded-lg  cursor-pointer select-none mt-4"
          type="submit"
          disabled={isPending || imageUploading}
        >
          {isPending && <Spin />} {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
      <div className="flex justify-between gap-2 mt-4">
        <Button variant="destructive" className="cursor-pointer">
          Delete Account
        </Button>
        <Button className="cursor-pointer bg-yellow-300 text-black shadow-xs hover:bg-yellow-300/70 focus-visible:ring-yellow-300/20 dark:focus-visible:ring-yellow-300/40">
          Sign Out
        </Button>
      </div>
    </div>
  );
}
