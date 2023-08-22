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
  setMailOptions(user: any) {
    const mailOptions = {
      from: "shardul.conclusion@gmail.com",
      to: user.email,
      subject: "Reset your Password",
      text: `Please use the below OTP to reset your password -`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Foodswift Password Reset</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap"
            rel="stylesheet"
          />
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      
          <table style="max-width: 600px; padding: 20px; margin: 0 auto; border-collapse: collapse;">
              <tr>
                  <td style="background-color: #ffffff; text-align: center; padding: 10px;">
                  <img
                  src="https://staging-apps.toki.mn/upload/constant/tokiuploads/nas_upload/businessimage/FILE_1692671104318aQsjO.png"
                  alt="Foodswift Logo"
                  style="height: 150px; width: 150px; border-radius: 50%"
                />
                    <p style="font-family: 'Dancing Script', cursive; font-size: 24px; margin-top:0">Food Swift</p>
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #ffffff; padding: 20px;">
                      <h2 style="color: #333; margin: 0">Password Reset</h2>
                      <p style="font-size: 16px;">Hi ${user.username},</p>
                      <p style="font-size: 16px;">We received a request to reset your password for your Foodswift account. Use the below OTP to reset your password:</p>
                      <p style="font-size: 16px;">OTP: ${user.OTP} </p> 
                      <p style="text-align: center;">
                          <button (click)="https://your-website.com/reset-password/${user.token}" style="border:none;cursor: pointer;background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Reset Password</button>
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
      `,
    };
    return mailOptions;
  }
}

export const mailerConf = new NodeMailerConf();
