import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

// 1. Validate environment variables at the start.
if (
  !process.env.MAILTRAP_HOST ||
  !process.env.MAILTRAP_PORT ||
  !process.env.MAILTRAP_USER ||
  !process.env.MAILTRAP_PASS ||
  !process.env.DOMAIN
) {
  throw new Error(
    "Missing one or more required environment variables for mailer."
  );
}

// 2. Create the Nodemailer transport object once and reuse it.
const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
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
    // 4. Generate a secure, random token and hash it for database storage.
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // 5. Update the user document with the correct token and expiry.
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

    // 6. Construct the verification or reset URL.
    const page = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const url = `${process.env.DOMAIN}/${page}?token=${hashedToken}`;

    const mailOptions = {
      from: "auth@nextjs.pro", // Use a professional "from" address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${url}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.</p><p>${url}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
