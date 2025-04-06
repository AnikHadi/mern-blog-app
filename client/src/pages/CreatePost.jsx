import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";

export default function CreatePost() {
  const { quill, quillRef, Quill } = useQuill();
  const counterRef = useRef();
  const [quillText, setQuillText] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log(quill.root.innerHTML);
        counterRef.current.innerHTML = quill.root.innerHTML;
      });
    }
  }, [quill]);

  return (
    <div className="min-h-screen max-w-3xl p-3 mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">CreatePost</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Input
            type="text"
            placeholder="Title"
            id="title"
            required
            className="flex-1"
          />
          <Select className="">
            <SelectTrigger className="w-full sm:w-[200px] ">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="reactjs">React.js</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <Input id="picture" type="file" />
          <Button>Upload Image</Button>
        </div>
        <div className="h-[300px] mb-16">
          <div ref={quillRef} />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-indigo-500/80 hover:from-indigo-500  via-purple-500/80 hover:via-purple-500 to-pink-500/80 hover:to-pink-500"
        >
          Publish Post
        </Button>
      </form>
      <div ref={counterRef} />
    </div>
  );
}
