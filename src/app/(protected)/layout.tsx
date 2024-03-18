import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-y-10 ">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
