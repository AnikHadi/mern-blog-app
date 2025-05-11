import { Button } from "./ui/button";

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center sm:flex-row gap-4 border-2 border-teal-400 py-7 px-5 rounded-tl-2xl rounded-br-2xl">
      <div className="flex-1 flex flex-col gap-2">
        <h1 className="text-2xl text-center font-bold text-slate-700 dark:text-slate-300/90">
          Want to learn HTML, CSS and JavaScript by building fun and engaging
          projects?
        </h1>
        <p className="text-slate-500 dark:text-slate-300/60 text-center">
          Check our 100 js projects website and start building your own projects
        </p>
        <Button className="w-full text-white bg-gradient-to-r from-violet-600 cursor-pointer to-[#da2f94] hover:from-[#da2f94] hover:to-violet-600 rounded-none rounded-tl-lg rounded-br-lg">
          100 JS Project Website
        </Button>
      </div>
      <div className="flex-1">
        <img
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png"
          alt="topProject"
          className="sm:h-[180px] md:h-[200px]"
        />
      </div>
    </div>
  );
}
