import { div } from 'motion/react-client'
import ProjectCard from './externals/projectcard'
const projects = [
    {
        title:"Nexus Dashboard",
        description:"A real-time analytics platform...",
        liveUrl:"https://yoursite.com",
        githubUrl:"https://github.com/you/repo",
        tech:["React", "TypeScript", "Redis"],
        wip: true
    },
    {
        title:"Nexus Dashboard",
        description:"A real-time analytics platform...",
        liveUrl:"https://yoursite.com",
        githubUrl:"https://github.com/you/repo",
        tech:["React", "TypeScript", "Redis"],
        wip: true
    },


]
export default function Projects(){
    return<>

            <div className="justify-center  grid grid-cols-1 md:grid-cols-2 gap-2">
                {projects.map((project, index) => (
                    <div className='flex justify-center items-center'>
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        liveUrl={project.liveUrl}
                        githubUrl={project.githubUrl}
                        tech={project.tech}
                        wip={project.wip}
                    />
                    </div>
                ))}
            </div>
        
    </>
}