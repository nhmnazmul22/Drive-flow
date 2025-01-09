import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, otpCode) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PROVIDE_EMAIL, // Your email
      pass: process.env.PROVIDE_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.PROVIDE_EMAIL, // Sender address
    to: email, // Receiver's email
    subject: "Verify Your Email Address",
    html: `
        <h3>Email Verification</h3>
        <p>Your OTP Code is:</p>
        <p${otpCode}</p> 
      `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err.toString());
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
