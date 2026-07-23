export const sendOTP = async (phone, otp) => {
  try {
    const authKey = process.env.MSG91_AUTH_KEY;
    const sender = process.env.MSG91_SENDER_ID || "MAYLKI";
    const templateId = process.env.MSG91_TEMPLATE_ID || "default_template";

    // Only attempt real send if keys are configured
    if (!authKey || authKey === "your_msg91_key") {
      console.log(`[MSG91 MOCK] OTP ${otp} sent to ${phone}`);
      return true;
    }

    const response = await fetch(`https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${phone}&authkey=${authKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OTP: otp })
    });

    const data = await response.json();
    console.log(`[MSG91] Response:`, data);
    return data.type === 'success';
  } catch (error) {
    console.error("SMS sending failed:", error);
    return false;
  }
};
