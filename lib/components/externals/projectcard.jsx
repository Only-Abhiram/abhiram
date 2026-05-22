export default function ProjectCard({
  title = "Email Automation",
  description = "AI-powered workflow automation for classifying, summarizing, and managing emails intelligently.",
  liveUrl,
  githubUrl,
  tech = ["React", "Node", "Gmail API"],
  wip = false,
}) {
  return (
    <div
      className="
      w-full max-w-[420px]
      bg-white
      rounded-[20px]
      border border-zinc-200
      p-7
      shadow-[0_2px_10px_rgba(0,0,0,0.04),0_10px_30px_rgba(0,0,0,0.05)]
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-[0_8px_20px_rgba(0,0,0,0.06),0_16px_45px_rgba(0,0,0,0.08)]
    "
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-[19px] font-semibold text-black leading-tight">
          {title}
        </h2>

        {wip && (
          <span
            className="
            flex items-center gap-2
            bg-black text-white
            rounded-full
            px-3 py-1
            text-[11px]
            whitespace-nowrap
          "
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            In Progress
          </span>
        )}
      </div>

      <p className="text-[13px] text-zinc-500 leading-6 mb-5">
        {description}
      </p>

      <hr className="border-zinc-200 mb-5" />

      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <span
            key={t}
            className="
            font-mono
            text-[11px]
            px-3 py-1
            rounded-full
            bg-zinc-100
            border border-zinc-200
            text-zinc-700
            transition
            hover:bg-black
            hover:text-white
          "
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3">

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="
            w-[42px] h-[42px]
            rounded-full
            border border-zinc-300
            flex items-center justify-center
            text-black
            transition-all duration-200
            hover:bg-black hover:text-white hover:-translate-y-1
            "
          >
            ↗
          </a>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="
            w-[42px] h-[42px]
            rounded-full
            border border-zinc-300
            flex items-center justify-center
            text-black
            transition-all duration-200
            hover:bg-black hover:text-white hover:-translate-y-1
          "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}