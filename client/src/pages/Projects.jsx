import CallToAction from "@/components/CallToAction";

function Projects() {
  return (
    <div className="max-w-4xl grid gap-8 p-3 mx-auto min-h-[calc(100vh-271px)]">
      <div className="grid gap-3">
        <h1 className="text-4xl font-semibold text-center my-7 text-slate-900 dark:text-slate-300">
          Explore Our Projects
        </h1>
        <p className=" text-center text-gray-500 text-lg">
          Dive into a collection of fun and engaging projects designed to help
          you learn and master HTML, CSS, and JavaScript. Whether you're a
          beginner or an experienced developer, these projects will challenge
          your skills and inspire creativity. Start building today and take your
          development journey to the next level!
        </p>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 p-8  rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold pb-3  text-slate-900 dark:text-slate-300">
          Why Build Projects?
        </h1>
        <p>
          Building projects is one of the best ways to learn programming. It
          allows you to apply theoretical knowledge in a practical way, solve
          real-world problems, and create a portfolio that showcases your skills
          to potential employers or clients.
        </p>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 p-8  rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold pb-3  text-slate-900 dark:text-slate-300">
          What You'll Learn
        </h1>
        <ul className="list-disc pl-4">
          <li>How to structure HTML for clean and semantic code</li>
          <li>
            Styling with CSS & Tailwind CSS to create visually appealing designs
          </li>
          <li>Adding interactivity with JavaScript</li>
          <li>Debugging and problem-solving techniques</li>
          <li>Best practices for responsive and accessible web design</li>
        </ul>
      </div>
      <div>
        <CallToAction />
      </div>
    </div>
  );
}

export default Projects;
