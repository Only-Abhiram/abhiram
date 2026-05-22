const projects = [
  {
    title: "Autoscale",
    description: "A tool that automates Instagram comment replies for creators using Meta Webhooks. Receives real-time events and triggers instant, rule-based responses from the creator's account — no manual effort required.",
    liveUrl: "https://autoscale-nine.vercel.app",
    githubUrl: "https://github.com/Only-Abhiram/autoscale",
    tech: ["React", "TypeScript", "Redis"],
    wip: true
  },
  {
    title: "Ask Better",
    description: "A Chrome Extension that refines your raw input into clear, powerful prompts before sending — works across ChatGPT, Gemini, and Claude so you get better outputs on the first try.",
    liveUrl: "",
    githubUrl: "https://github.com/Only-Abhiram/Ask_Better_Chrome_Extension",
    tech: ["React", "TypeScript", "Redis"],
    wip: true
  },


]

import BlurText from '@/lib/components/externals/blurtxt'
const githubIcon = "https://img.icons8.com/?size=100&id=AZOZNnY73haj&format=png&color=000000"
const LinkIcon = "https://img.icons8.com/?size=100&id=ShxmdGrBKyPw&format=png&color=000000"
function Btn({ icon, link }) {
  let url = LinkIcon
  if (icon == "github") url = githubIcon
  return<a href={link} target="_blank">
    <img src={url} className="h-8 w-8  rounded-full hover:scale-120 transition-all duration-200">
    </img>
  </a>

}
export default function ProjectsList() {
  return (
    <section className="w-full max-w-3xl ">


      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-full "
          >
            <div className="flex w-full gap-3 items-center">
              <h2 className="text-2xl md:text-2xl font-semibold text-black">
                {project.title}
              </h2>

              {project.liveUrl && (
                <Btn link={project.liveUrl} icon={"arrow"}>
                </Btn>
              )}

              {project.githubUrl && (
                <Btn link={project.githubUrl} icon={"github"}>
                </Btn>
              )}
            </div>

            <p className="mt-2 text-zinc-500 text-lg leading-relaxed max-w-2xl">
              <BlurText text={project.description}></BlurText>
              
            </p>


          </div>
        ))}
      </div>
    </section>
  );
}