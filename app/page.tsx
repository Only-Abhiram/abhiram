"use client"
import Image from "next/image";
import BlurText from '@/lib/components/externals/blurtxt'
import BlurText2 from '@/lib/components/externals/blurtextnew'
import BottomNav from '@/lib/components/externals/nav'
import Skills from '@/lib/components/skills'
import Projects from '@/lib/components/projects'
import ProjectsList from '@/lib/components/externals/projectlist'
import ScrollReveal from '@/lib/components/externals/blurreveal'
import CodingPlatforms from '@/lib/components/cp'
import Socials from '@/lib/components/connnect'
import VisitorCounter from '@/lib/components/visitorCount'
export default function Home() {
  function scrollToSection(section: string) {
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  const items = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#projects" },
    { label: "CP", href: "#cp" },
    { label: "Connect", href: "#connect" },
  ];
  return (
    <>

      <BottomNav
        items={items}
      />

      <div id="home">
        <Wrapper >

        </Wrapper>

      </div>

      {/* home section  */}

      <Wrapper >
        <BlurText text="hi, i am abhiram" className="text-4xl font-extrabold mb-2"></BlurText>
        {/* <ScrollReveal delay={0}>
          <p className="text-4xl font-extrabold mb-2">hi, i am abhiram</p>
        </ScrollReveal> */}
      </Wrapper>
      <Wrapper>
        <BlurText text="I enjoy building backend systems, automating repetitive work, experimenting with AI agents, and solving challenging problems through competitive programming." className="text-lg text-zinc-500"></BlurText>

        {/* <ScrollReveal delay={100}>
          <p className="text-xl text-zinc-500">I enjoy building backend systems, automating repetitive work, experimenting with AI agents, and solving challenging problems through competitive programming.</p>
        </ScrollReveal> */}
      </Wrapper>




      <div id="projects">
        <Wrapper>
        </Wrapper>
      </div>

      {/* projects */}

      <Wrapper>
        <BlurText text="Projects" className="text-4xl font-extrabold "></BlurText>

        {/* <ScrollReveal delay={250}>
          <p className=""></p>
          </ScrollReveal> */}
      </Wrapper>
      <Wrapper>
        {/* <ScrollReveal delay={250}> */}
        <ProjectsList>

        </ProjectsList>
        {/* </ScrollReveal> */}

      </Wrapper>

      <div id="cp">
        <Wrapper>

        </Wrapper>
      </div>


      {/*CP */}
      <Wrapper>
        <BlurText className="text-4xl font-extrabold " text="Competitive Programming"></BlurText>


      </Wrapper>
      <Wrapper>
        <CodingPlatforms></CodingPlatforms>

      </Wrapper>

      <div id="connect">
        <Wrapper>

        </Wrapper>
      </div>
      <Wrapper>
          
        <BlurText className="text-4xl font-extrabold " text="Connect"></BlurText>
      </Wrapper>
      <Wrapper>
      <Socials></Socials>    
      </Wrapper>
      
      <Wrapper>
      </Wrapper>
      
      <Wrapper>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
    {/* <SpotifyLastPlayed /> */}
    <VisitorCounter />
  {/* </div> */}
      </Wrapper>
      
      <Wrapper>
      </Wrapper>
      
      
      
      <Wrapper>
      </Wrapper>
      <Wrapper>
      </Wrapper>



      






    </>
  );
}

function Wrapper({ children }: { children?: React.ReactNode }) {
  const stripeStyle = {
    backgroundImage:
      "repeating-linear-gradient(-45deg, transparent 0px, transparent 4px, #e5e7eb 4px, #e5e7eb 6px)",
  };

  const hasChildren = Array.isArray(children)
    ? children.some(Boolean)
    : Boolean(children);

  return (
    <div className="w-full flex  min-h-[50px] items-stretch ">
      <div
        className="w-[10%] border border-gray-300"
        style={hasChildren ? stripeStyle : {}}
      />

      <div
        className="w-[80%] flex flex-col justify-center border border-gray-300 p-5"
        style={{ ...(!hasChildren ? stripeStyle : {}), isolation: "auto" }}
      >
        {children}
      </div>

      <div
        className="w-[10%] border border-gray-300"
        style={hasChildren ? stripeStyle : {}}
      />
    </div>
  );
}
