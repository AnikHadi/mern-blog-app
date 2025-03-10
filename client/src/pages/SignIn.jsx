import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signin } from "@/utils/signinAction";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const emptyUser = {
  username: "",
  email: "",
  password: "",
};

function SignIn() {
  const [passText, setPassText] = useState(false);
  const [formState, formAction, isPending] = useActionState(signin, emptyUser);
  const navigate = useNavigate();

  if ("success" in formState) {
    if (formState?.success) {
      toast.success(formState.message);
      navigate("/dashboard");
      delete formState.success;
    } else if (!formState?.success) {
      toast.error(formState.message || "Something went wrong!");
      delete formState.success;
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
            This is a demo projects. You can sign up with your email and
            password or with Google account.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1 px-5 py-5 shadow-2xl rounded-xl">
          <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Your Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@domain.com"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Your Password</Label>
              <div className="relative flex items-center">
                <Input
                  type={passText ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <span
                  className="absolute right-3 opacity-50 hover:opacity-70 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    return setPassText((prev) => !prev);
                  }}
                >
                  {passText ? (
                    <EyeOff color="#808080" />
                  ) : (
                    <Eye color="#808080" />
                  )}
                </span>
              </div>
            </div>
            <Button
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white cursor-pointer select-none"
              type="submit"
            >
              {isPending && <Spin />} {isPending ? "Login..." : "Sign In"}
            </Button>
          </form>
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

export default SignIn;
