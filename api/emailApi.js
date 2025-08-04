import { BASE_URL } from "../config/config.js";

//createEmailId
const createEmailId = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    console.log("createEmailId:", data.emailId);
    return data.emailId;
  } catch (error) {
    console.error("createEmailId error:", error.message);
    return null;
  }
};

//checkEmailStatus
const checkEmailStatus = async (emailId) => {
  try {
    const response = await fetch(`${BASE_URL}/status/${emailId}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    console.log("checkEmailStatus:", data);
    return data;
  } catch (error) {
    console.error("checkEmailStatus error:", error.message);
    return null;
  }
};

export { createEmailId, checkEmailStatus };
