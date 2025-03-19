import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function ConfirmDialog({
  title,
  description,
  btnName,
  onClick,
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className=" py-3">
        <DialogDescription className="text-md">{description}</DialogDescription>
      </div>

      <DialogFooter className="sm:justify-between">
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer bg-amber-300/50 hover:bg-amber-300"
          >
            Close
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={onClick}
            className="cursor-pointer bg-red-600/70 hover:bg-red-600"
          >
            {btnName}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
