"use client"

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Button variant="contained" onClick={() => router.push("/")}>Go to Home</Button>
    </div>
  );
}
