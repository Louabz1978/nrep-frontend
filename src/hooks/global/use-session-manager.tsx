import { useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { useUser } from "@/stores/useUser";

export const useSessionManager = () => {
  const { setUser, user } = useUser();
  const timersRef = useRef<{
    refresh: NodeJS.Timeout | null;
    logout: NodeJS.Timeout | null;
  }>({
    refresh: null,
    logout: null,
  });

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
    secureLocalStorage.removeItem("LOGIN_TIME");
    setUser(null);
    window.location.href = "/login";
  }, [setUser]);

  const refreshSession = useCallback(async () => {
    logout();
    // try {
    //   // Implement your token refresh logic here
    //   // For example:
    //   // const newToken = await refreshTokenFunction();
    //   // secureLocalStorage.setItem("ACCESS_TOKEN", { data: newToken });

    //   // Reset login time on refresh
    //   const newLoginTime = Date.now();
    //   secureLocalStorage.setItem("LOGIN_TIME", {
    //     data: newLoginTime.toString(),
    //   });

    //   toast.success("تم تجديد الجلسة بنجاح");
    //   scheduleTimers(); // Reschedule timers with new login time
    // } catch (error) {
    //   logout();
    //   toast.error("فشل في تجديد الجلسة");
    // }
  }, [logout]);

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

  const forceLogout = useCallback(() => {
    toast.error("انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.");
    logout();
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
    const fiftyFiveMinutes = 55 * 60 * 1000;
    const sixtyMinutes = 60 * 60 * 1000;

    // Calculate remaining time
    const timeUntilRefresh = Math.max(0, fiftyFiveMinutes - timeSinceLogin);
    const timeUntilLogout = Math.max(0, sixtyMinutes - timeSinceLogin);

    // Clear existing timers
    clearTimers();

    // Schedule refresh prompt
    if (timeUntilRefresh > 0) {
      timersRef.current.refresh = setTimeout(
        showRefreshPrompt,
        timeUntilRefresh
      );
    } else if (timeSinceLogin < sixtyMinutes) {
      // If already past 55min but not yet 60min, show prompt immediately
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

  // Check session on mount and on visibility change
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
  }, [scheduleTimers, clearTimers, user?.user_id]);

  return { refreshSession };
};
