type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Pre({ children, className }: Props) {
  return (
    <pre
      className={`wrap-break-word whitespace-pre-wrap overflow-wrap-anywhere ${className || ''}`}
    >
      {children}
    </pre>
  );
}
