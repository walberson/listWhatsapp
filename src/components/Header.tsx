type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle = 'subtitulo padrão' }: HeaderProps) {
  return (
    <div>
      <h1>{title}</h1>
      <span style={{ fontSize: 30 }}>{subtitle}</span>
    </div>
  );
}
