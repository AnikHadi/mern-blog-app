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
          <span variant="outline" className="cursor-pointer">
            {data.length > length ? `${data.slice(0, length)}...` : data}
          </span>
        </TooltipTrigger>
        {data.length > length && (
          <TooltipContent
            className={`${data.length > 100 && "w-[300px] sm:w-sm md:w-md"}`}
          >
            <span>{data}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
