export const CyberpunkWavyText = () => {
  return (
    <div className="flex justify-center items-center space-x-1">
      {"Please wait...".split("").map((letter, index) => (
        <span
          key={index}
          className="inline-block text-cyan-400 animate-wave"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};
