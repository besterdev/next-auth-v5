import { ExtendedUser } from "@/next-auth";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  label: string;
  user?: ExtendedUser;
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-clip">{label}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label="ID" value={user?.id || "-"} />
        <InfoRow label="Name" value={user?.name || "-"} />
        <InfoRow label="Email" value={user?.email || "-"} />
        <InfoRow label="Role" value={user?.role || "-"} />
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <p className="truncate text-xs max-w-[240px] font-mono p-1 bg-slate-100 rounded-md">
        {value}
      </p>
    </div>
  );
};
