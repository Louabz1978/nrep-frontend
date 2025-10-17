import { useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { useUser } from "@/stores/useUser";
import { refreshTokenFunction } from "@/api/global/refreshToken/refreshToken";
import logoutFunction from "@/api/global/logout/logout";

export const useSessionManager = () => {
  const { setUser, user } = useUser();
  const timersRef = useRef<{
    refresh: NodeJS.Timeout | null;
    logout: NodeJS.Timeout | null;
  }>({
    refresh: null,
    logout: null,
  });
  const scheduleTimersRef = useRef<() => void>(() => {});

  const clearTimers = useCallback(() => {
    if (timersRef.current.refresh) {
      clearTimeout(timersRef.current.refresh);
      timersRef.current.refresh = null;
    }
    if (timersRef.current.logout) {
      clearTimeout(timersRef.current.logout);
      timersRef.current.logout = null;
    }
  }, []);

  const logout = useCallback(() => {
    secureLocalStorage.removeItem("ACCESS_TOKEN");
    secureLocalStorage.removeItem("USER");
    secureLocalStorage.removeItem("REFRESH_TOKEN");
    secureLocalStorage.removeItem("LOGIN_TIME");
    setUser(null);
    window.location.href = "/login";
  }, [setUser]);

  const refreshSession = useCallback(async () => {
    try {
      const refreshToken = secureLocalStorage.getItem(
        "REFRESH_TOKEN"
      ) as unknown as { data: string };
      const newToken = await refreshTokenFunction({
        refresh_token: refreshToken?.data as string,
      });
      secureLocalStorage.setItem("ACCESS_TOKEN", { data: newToken });

      const newLoginTime = Date.now();
      secureLocalStorage.setItem("LOGIN_TIME", {
        data: newLoginTime.toString(),
      });

      toast.success("تم تجديد الجلسة بنجاح");
      // avoid direct dependency on scheduleTimers to break circular hook deps
      if (typeof scheduleTimersRef.current === "function") {
        scheduleTimersRef.current();
      }
    } catch {
      toast.error("فشل في تجديد الجلسة");
    }
  }, []);

  const showRefreshPrompt = useCallback(() => {
    toast.info("جلسة العمل على وشك الانتهاء", {
      position: "top-center",
      description: "هل ترغب في تجديد جلسة العمل؟",
      duration: 300000, // 5 minutes
      action: {
        label: "تجديد",
        onClick: refreshSession,
      },
      actionButtonStyle: {
        backgroundColor: "var(--primary)",
        color: "white",
      },
    });
  }, [refreshSession]);

  const forceLogout = useCallback(async () => {
    try {
      const accessTokenObj = secureLocalStorage.getItem(
        "ACCESS_TOKEN"
      ) as unknown as { data?: string } | null;
      const token =
        accessTokenObj && typeof accessTokenObj === "object"
          ? accessTokenObj.data
          : undefined;

      if (token) {
        await logoutFunction({ token: String(token), type: "force" });
      }
    } catch {
      // swallow
    } finally {
      toast.error("انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.");
      logout();
    }
  }, [logout]);

  const scheduleTimers = useCallback(() => {
    const loginTimeData = secureLocalStorage.getItem("LOGIN_TIME");
    if (
      !loginTimeData ||
      typeof loginTimeData !== "object" ||
      !("data" in loginTimeData)
    ) {
      return;
    }

    const loginTime = parseInt(loginTimeData.data as string);
    const now = Date.now();
    const timeSinceLogin = now - loginTime;
    // const fiftyFiveMinutes = 55 * 60 * 1000;
    // const sixtyMinutes = 60 * 60 * 1000;
    const fiftyFiveMinutes = 0.25 * 60 * 1000;
    const sixtyMinutes = 0.5 * 60 * 1000;

    // Calculate remaining time
    const timeUntilRefresh = Math.max(0, fiftyFiveMinutes - timeSinceLogin);
    const timeUntilLogout = Math.max(0, sixtyMinutes - timeSinceLogin);

    // Clear existing timers
    clearTimers();

    // Schedule refresh prompt
    if (timeUntilRefresh > 0) {
      timersRef.current.refresh = setTimeout(() => {
        showRefreshPrompt();
      }, timeUntilRefresh);
    } else if (timeSinceLogin < sixtyMinutes) {
      showRefreshPrompt();
    }

    // Schedule forced logout
    if (timeUntilLogout > 0) {
      timersRef.current.logout = setTimeout(forceLogout, timeUntilLogout);
    } else {
      // If already past 60min, logout immediately
      forceLogout();
    }
  }, [showRefreshPrompt, forceLogout, clearTimers]);

  // keep the latest schedule function in a ref for other callbacks
  scheduleTimersRef.current = scheduleTimers;

  // Check session on mount and on visibility change
  const stableUserId =
    (user as unknown as { data?: { user_id?: number } })?.data?.user_id ??
    user?.user_id;

  useEffect(() => {
    const userData = secureLocalStorage.getItem("USER");
    if (userData) {
      scheduleTimers();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleTimers();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimers();
    };
  }, [scheduleTimers, clearTimers, stableUserId]);

  return { refreshSession };
};
