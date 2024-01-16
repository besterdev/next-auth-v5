const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="text-white bg-red-500">This auth navbar</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
