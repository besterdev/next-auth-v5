const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <nav>This is a shared navbar for dashboard segment</nav>
      {children}
    </div>
  );
};

export default Dashboardlayout;
