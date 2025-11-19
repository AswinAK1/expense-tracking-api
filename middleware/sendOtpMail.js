import nodemailer from "nodemailer";

const sendOtpMail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERS_EMAIL,
      pass: process.env.USERS_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USERS_EMAIL,
    to: email,
    subject: "Your OTP Verification Code",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) console.log("Email send error:", err);
  });
};

export default sendOtpMail;
