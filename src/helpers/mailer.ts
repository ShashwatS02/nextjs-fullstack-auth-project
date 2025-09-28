import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

// 1. Validate environment variables at the start.
// The application will crash immediately if any are missing, which is good practice.
if (
  !process.env.MAILTRAP_HOST ||
  !process.env.MAILTRAP_PORT ||
  !process.env.MAILTRAP_USER ||
  !process.env.MAILTRAP_PASS ||
  !process.env.DOMAIN
) {
  throw new Error("Missing one or more required environment variables.");
}

// 2. Create the Nodemailer transport object once and reuse it.
// This is much more efficient than creating it inside the function.
const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT), // Convert port from string to number
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// 3. Define a clear type for the function's arguments.
type SendEmailProps = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    // 4. Generate a secure, random token for the user.
    const unhashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = await bcryptjs.hash(unhashedToken, 10);

    // Update the user document with the hashed token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // Expires in 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // Expires in 1 hour
      });
    }

    const mailOptions = {
      from: "youremail@example.com", // It's best to use an env variable for this too!
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      // 5. Send the original, unhashed token in the email link.
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${unhashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${unhashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    // Throw the original error to preserve its stack trace for easier debugging
    throw new Error(error.message);
  }
};
