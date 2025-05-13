import { TiWarning } from "react-icons/ti";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";

export default function ConfirmDialog({ description, btnName, onClick }) {
  return (
    <DialogContent className="sm:max-w-[425px]  rounded-lg p-5">
      <DialogTitle></DialogTitle>
      <TiWarning size={70} className="w-full text-center text-red-600 " />
      <DialogDescription className="text-md text-center mb-3 text-gray-800">
        {description}
      </DialogDescription>

      <DialogFooter className="sm:justify-center text-sm">
        <DialogClose asChild>
          <Button
            onClick={onClick}
            className=" rounded-lg cursor-pointer font-bold bg-red-600/70 hover:bg-red-600"
          >
            {btnName}
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <button className="transition group flex items-center justify-center text-white font-bold  rounded-lg p-[1.5px] bg-gradient-to-br from-purple-800 to-blue-700 hover:from-blue-700 hover:to-purple-800 cursor-pointer mt-[1px] mr-[1px]">
            <span className="flex justify-center items-center w-full h-full rounded-lg text-gray-900 dark:text-gray-100 hover:text-gray-100  bg-white dark:bg-[#10172a]  py-[6px] px-3 bg-gradient-to-br  hover:from-blue-700 hover:to-purple-800 ">
              No, Cancel
            </span>
          </button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
