
function BlurText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      <style>{`
        @keyframes blurIn {
          0%   { filter: blur(12px); opacity: 0; transform: translateY(8px); }
          100% { filter: blur(0px);  opacity: 1; transform: translateY(0px); }
        }
        .blur-in {
          animation: blurIn 0.8s ease forwards;
          opacity: 0;
        }
      `}</style>
      <span className={`flex flex-wrap gap-x-2 ${className}`}>
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            className="blur-in"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {word}
          </span>
        ))}
      </span>
    </>
  );
}
export default BlurText;