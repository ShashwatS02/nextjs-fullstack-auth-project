import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    // 1. Generate a secure, random token (this is the one we email)
    const unhashedToken = crypto.randomBytes(20).toString("hex");

    // 2. Hash the token (this is what we save to the DB)
    const hashedToken = await bcryptjs.hash(unhashedToken, 10);

    const tokenExpiry = Date.now() + 3600000; // Expires in 1 hour

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: tokenExpiry,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: tokenExpiry,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST!,
      port: Number(process.env.MAILTRAP_PORT!),
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const pageUrl = emailType === "VERIFY" ? "verifyemail" : "reset-password";
    const mailOptions = {
      from: "auth-project@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${pageUrl}?token=${unhashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${pageUrl}?token=${unhashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred in sendEmail");
  }
};
