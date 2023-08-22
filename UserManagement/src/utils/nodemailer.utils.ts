import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // Update with your email service (e.g., 'Gmail', 'Outlook')
  host: "box1109.bluehost.com",
  port: 465,
  secure: true,
  auth: {
    user: "shardul.conclusion1@gmail.com", // Replace with your email address
    pass: "yzhoeornrncfgdsv", // Replace with your email password or an app-specific password
  },
});

class NodeMailerConf {
  setMailOptions(user:any) {
    const mailOptions = {
      from: "foodswift@gmail.com",
      to: user.email,
      subject: "Reset your Password",
      text: `Please use the below OTP to reset your password -`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Foodswift Password Reset</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      
          <table style="max-width: 600px; padding: 20px; margin: 0 auto; border-collapse: collapse;">
              <tr>
                  <td style="background-color: #ffffff; text-align: center; padding: 10px;">
                      <img src="https://your-website.com/logo.png" alt="Foodswift Logo" width="150">
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #ffffff; padding: 20px;">
                      <h2 style="color: #333;">Password Reset</h2>
                      <p style="font-size: 16px;">Hi ${user.username},</p>
                      <p style="font-size: 16px;">We received a request to reset your password for your Foodswift account. Use the below OTP to reset your password:</p>
                      <p>OTP: </p> ${user.OTP}
                      <p style="text-align: center;">
                          <a href="https://your-website.com/reset-password/${user.token}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Reset Password</a>
                      </p>
                      <p style="font-size: 16px;">If you didn't request a password reset, you can ignore this email.</p>
                      <p style="font-size: 16px;">Best regards,<br> The Foodswift Team</p>
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #333; color: #fff; text-align: center; padding: 10px;">
                      &copy; 2023 Foodswift. All rights reserved.
                  </td>
              </tr>
          </table>
      
      </body>
      </html>
      `
    };
    return mailOptions;
  }
}

export const mailerConf = new NodeMailerConf();
