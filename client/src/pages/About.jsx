import CallToAction from "@/components/CallToAction";

function About() {
  return (
    <div className="min-h-[calc(100vh-260px)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-3 text-center">
        <div className="grid gap-3">
          <h1 className="text-3xl font-semibold text-center my-7">
            About Hadi's Blog
          </h1>
          <div className="text-base text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to Hadi's Blog! This blog was created by Hadiuzzaman as a
              personal project to share his thoughts and ideas with the world.
              Hadi is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Hadi is always learning and exploring new technologies,
              so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
          <div className="mt-10">
            <CallToAction />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
