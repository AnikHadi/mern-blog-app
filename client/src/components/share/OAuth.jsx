import { app } from "@/firebase";
import { signInFailure, signInSuccess } from "@/redux/user/userSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          avatar: resultFromGoogle.user.photoURL,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(result));
        navigate("/dashboard");
      } else {
        dispatch(signInFailure(result));
      }
    } catch (error) {
      dispatch(
        signInFailure({
          success: false,
          message: error.message,
        })
      );
    }
  };
  return (
    <Button
      className="mt-4 w-full px-2 py-1 border-2 border-indigo-500 bg-white text-gray-900 transition delay-100 duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white rounded-lg  cursor-pointer select-none"
      onClick={signInWithGoogle}
    >
      <FcGoogle /> Continue with Google
    </Button>
  );
}
