import { baseUrl, uuidLocalKey } from "./constant";

export const dateTime: (date: Date) => string = (date) => {
  // Extract parts
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM/PM
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24h to 12h format and handle midnight (0)

  // Format final output
  return `${month}/${day}/${year} ${hours}:${minutes}${amPm}`;
};

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const makeRequest = async <T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = null,
  headers: HeadersInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data); // Attach body for POST, PUT
    }

    const response = await fetch(`${baseUrl}/${url}`, options);

    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    console.error("API Error:", error);

    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};

// Save UUID to local storage
const saveUUID = (): string => {
  let uuid = localStorage.getItem("uuid");

  // Check if UUID already exists
  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem("uuid", uuid); // Store it
    console.log("New UUID generated and stored:", uuid);
  } else {
    console.log("Existing UUID retrieved:", uuid);
  }

  return uuid;
};

// Retrieve UUID from local storage
export const getUUID = (): string => {
  const uuid = localStorage.getItem(uuidLocalKey);
  if (uuid != null) return uuid; // Returns null if not set
  return saveUUID();
};

const generateUUID = (): string => {
  return crypto.randomUUID(); // Modern way to generate UUID (browser support required)
};
