type HeaderProps = {
    name: string;
  };
  
  export default function Header({ name }: HeaderProps) {
    return (
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {name}!</h1>
      </div>
    );
  }
  