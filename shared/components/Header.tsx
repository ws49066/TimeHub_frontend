type HeaderProps = {
  title: string;
  description: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="bg-white p-4 border-b border-[#D7D7D7]">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </header>
  );
}
