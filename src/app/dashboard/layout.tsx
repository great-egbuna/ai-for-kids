"use client";

import DashboardLayout from "@/components/pages/Dashboard/Dashboard";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useUserStore, useUserStoreNonPersist } from "../store/useUserStore";
import { authService } from "../services/auth.service";
import CyberpunkLoader from "@/components/ui/CyberLoading";
import AuthProvider from "../providers/useAuthProvider";

export default function DashboardLayoutComponent({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const {
    authenticatedUser,
    isLoggedIn,
    setAuthenticatedUser,
    setIsLoggedIn,
    setRole,
    setUser,
  } = useUserStore((state) => state);
  const { authLoading } = useUserStoreNonPersist((state) => state);

  useEffect(() => {
    (async () => {
      if (!authLoading) {
        if (!isLoggedIn) {
          console.log("authLoading", isLoggedIn);
          router.push("/");
        }
        if (authenticatedUser && authenticatedUser?.role !== "admin") {
          await authService.signOut();
          setUser(null);
          setAuthenticatedUser(null);
          setIsLoggedIn(false);
          setRole("");
          router.push("/");
        }
      }
    })();
  }, [authLoading, isLoggedIn, authenticatedUser]);
  if (authLoading) return <CyberpunkLoader />;

  if (authenticatedUser?.role !== "admin") return <CyberpunkLoader />;

  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>;
    </AuthProvider>
  );
}
