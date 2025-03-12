import OAuth from "@/components/share/OAuth";
import PasswordInput from "@/components/share/PasswordInput";
import Spin from "@/components/share/Spin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInFailure, signInSuccess } from "@/redux/user/userSlice";
import { signin } from "@/utils/action/authAction";
import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function SignIn() {
  const [state, formAction, isPending] = useActionState(signin, {});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if ("success" in state) {
    if (state?.success) {
      dispatch(signInSuccess(state));
      toast.success(state?.message);
      navigate("/dashboard");
      delete state.success;
    } else {
      dispatch(signInFailure(state));
      toast.error(state?.message || "Something went wrong!");
      delete state?.success;
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Hadi's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo projects. You can sign in with your email and
            password or with Google account.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1 px-5 py-5 shadow-2xl rounded-xl">
          <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="grid w-full md:max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Your Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@domain.com"
              />
            </div>
            <PasswordInput inputName="password" />
            <Button
              disabled={isPending}
              className="px-2 py-1 border-2 border-indigo-500 bg-white text-gray-900 transition delay-100 duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white rounded-lg  cursor-pointer select-none"
              type="submit"
            >
              {isPending && <Spin />} {isPending ? "Login..." : "Sign In"}
            </Button>
          </form>
          <OAuth />
          <div className="flex gap-2 text-sm mt-3">
            <span>You didn't have any account?</span>
            <Link to="/sign-up" className="ml-2 text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
