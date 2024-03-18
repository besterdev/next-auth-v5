"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleLogout = () => logout();

  return (
    <div className="p-10 bg-white rounded-xl">
      <h1>Settings</h1>

      <p>
        Logged in as <strong>{user?.email}</strong>
      </p>

      <Button onClick={handleLogout}>Sign out</Button>
    </div>
  );
};

export default SettingsPage;
