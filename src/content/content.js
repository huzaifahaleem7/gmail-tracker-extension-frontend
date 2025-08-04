import { createEmailId } from "../api/emailApi.js";
import { BASE_URL } from "../config/config.js";

console.log("content.js loaded");

document.addEventListener("click", async (e) => {
  const sendButton = e.target.closest('div[aria-label^="Send"]');
  if (sendButton) {
    await injectTrackingPixel();
  }
});

const injectTrackingPixel = async () => {
  const composeBox = document.querySelector(
    'div[aria-label="Message Body"][contenteditable="true"]'
  );

  if (!composeBox) {
    console.warn("Gmail compose box not found.");
    return;
  }

  //createEmailId
  const emailId = await createEmailId();
  if (!emailId) {
    console.warn("Email ID creation failed.");
    return;
  }

  // Create pixel image tag with tracking URL
  const pixelHTML = `<img src="${BASE_URL}/pixel?emailId=${emailId}" style="display:none;" width="1" height="1" />`;
  composeBox.innerHTML += pixelHTML;

  console.log("Tracking pixel injected with emailId:", emailId);
};

