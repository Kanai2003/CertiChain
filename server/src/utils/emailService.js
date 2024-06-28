import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  type: "SMTP",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (user, subject, body) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
