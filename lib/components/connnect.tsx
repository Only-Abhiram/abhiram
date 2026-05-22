const email = "abhirampalle06@gmail.com"
const socials = [
  { name: "instagram", logo: "https://img.icons8.com/?size=100&id=32292&format=png&color=000000", link: "https://www.instagram.com/abhiiram.goud/" },
  { name: "x",         logo: "https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000", link: "https://x.com/abhiram_0" },
  { name: "linkedin",  logo: "https://img.icons8.com/?size=100&id=61956&format=png&color=000000", link: "https://www.linkedin.com/in/abhiram-palle-bb8b10285/" },
]

export default function Socials() {
  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex w-[60%] justify-evenly gap-5">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            title={s.name}
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-500 bg-white hover:border-gray-900 hover:bg-gray-50 transition-colors duration-150"
          >
            <img src={s.logo} alt={s.name} className="w-5 h-5 object-contain" />
          </a>
        ))}
      </div>

      <a
        href={`mailto:${email}`}
        className="text-xs text-gray-400 hover:text-gray-900 tracking-wide transition-colors duration-150"
      >
        {email}
      </a>
    </div>
  )
}