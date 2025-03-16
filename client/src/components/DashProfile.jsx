import { useActionState } from "react";
import { useSelector } from "react-redux";
import PasswordInput from "./share/PasswordInput";
import Spin from "./share/Spin";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [state, formAction, isPending] = useActionState({}, {});
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-center text-2xl mb-4 font-bold">Profile</h1>
      <form className="flex flex-col  justify-center" action={formAction}>
        <div className="w-36  rounded-full self-center bg-gray-300">
          <img
            src={currentUser?.avatar}
            alt="user"
            className="w-36 h-36 rounded-full border-6 border-green-600"
          />
        </div>
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
          disabled={isPending}
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
