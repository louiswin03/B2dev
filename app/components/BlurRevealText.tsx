type BlurRevealTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

export function BlurRevealText({ text, delay = 0, className = "" }: BlurRevealTextProps) {
  return (
    <span
      className={`inline-block opacity-0 animate-blur-in ${className}`}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {text}
    </span>
  );
}

