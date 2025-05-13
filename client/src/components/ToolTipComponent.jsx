import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ToolTipComponent({ data, length }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span variant="outline">
            {data.length > length ? `${data.slice(0, length)}...` : data}
          </span>
        </TooltipTrigger>
        {data.length > length && (
          <TooltipContent className=" w-[300px] sm:w-sm md:w-md ">
            <span>{data}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
