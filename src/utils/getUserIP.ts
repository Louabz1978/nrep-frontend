/**
 * Utility function to get the user's IP address
 * This function tries multiple methods to get the IP address
 */
export const getUserIP = async (): Promise<string> => {
  try {
    // Method 1: Try using a public IP service
    const response = await fetch("https://api.ipify.org?format=json");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    }
  } catch (error) {
    console.warn("Failed to get IP from ipify.org:", error);
  }

  try {
    // Method 2: Try using another IP service
    const response = await fetch("https://ipapi.co/json/");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    }
  } catch (error) {
    console.warn("Failed to get IP from ipapi.co:", error);
  }

  try {
    // Method 3: Try using ipinfo.io
    const response = await fetch("https://ipinfo.io/json");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    }
  } catch (error) {
    console.warn("Failed to get IP from ipinfo.io:", error);
  }

  // Fallback: Return unknown if all methods fail
  return "Unknown";
};

/**
 * Get current date and time in a formatted string (Christian/Gregorian calendar)
 */
export const getCurrentDateTime = (): string => {
  const now = new Date();
  return now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Baghdad",
  });
};
