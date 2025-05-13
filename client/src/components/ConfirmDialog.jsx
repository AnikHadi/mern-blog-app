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
      <DialogDescription className="text-md text-center mb-3">
        {description}
      </DialogDescription>

      <DialogFooter className="sm:justify-center text-sm">
        <DialogClose asChild>
          <Button
            onClick={onClick}
            className=" cursor-pointer bg-red-600/70 hover:bg-red-600"
          >
            {btnName}
          </Button>
        </DialogClose>
        <DialogClose asChild>
          {/* <Button
            type="button"
            variant="secondary"
            className=" cursor-pointer bg-amber-300/50 hover:bg-amber-300"
          >
            Cancel
          </Button> */}
          <button className="flex justify-center items-center text-white   rounded-md  bg-gradient-to-br from-purple-800 to-blue-700 hover:from-blue-700 hover:to-purple-800 cursor-pointer px-[2px]">
            <span className="rounded-md text-gray-900 dark:text-gray-100 hover:text-gray-100  bg-white dark:bg-[#10172a] py-[6px] px-3 bg-gradient-to-br  hover:from-blue-700 hover:to-purple-800 ">
              No, Cancel
            </span>
          </button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
