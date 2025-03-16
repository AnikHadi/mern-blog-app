import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PasswordInput({ className, name, ...props }) {
  const [passText, setPassText] = useState(false);
  return (
    <div
      className={cn("grid w-full md:max-w-sm items-center gap-1.5", className)}
    >
      <Label htmlFor={name}>Your Password</Label>
      <div className="relative flex items-center">
        <Input
          type={passText ? "text" : "password"}
          id={name}
          name={name}
          {...props}
          placeholder="Password"
        />
        <span
          className="absolute right-3 opacity-50 hover:opacity-70 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            return setPassText((prev) => !prev);
          }}
        >
          {passText ? <EyeOff color="#808080" /> : <Eye color="#808080" />}
        </span>
      </div>
    </div>
  );
}
