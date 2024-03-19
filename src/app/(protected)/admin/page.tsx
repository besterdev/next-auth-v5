"use client";

import { UserRole } from "@prisma/client";

import { admin } from "@/actions/admin";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success";
import { RoleGate } from "@/components/auth/role-gate";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!", {
          description: "You are allowed to see this content!",
          duration: 3000,
          position: "bottom-center",
          icon: "🔑",
          id: "admin",
        });
      } else {
        toast.error("Forbidden API Route!", {
          description: "You are not allowed to see this content!",
          duration: 3000,
          position: "bottom-center",
          icon: "🔒",
          id: "admin",
        });
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error, {
          description: "You are not allowed to see this content!",
          duration: 3000,
          position: "bottom-center",
          icon: "🔒",
          id: "admin",
        });
      }

      if (data.success) {
        toast.success(data.success, {
          description: "You are allowed to see this content!",
          duration: 3000,
          position: "bottom-center",
          icon: "🔑",
          id: "admin",
        });
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
