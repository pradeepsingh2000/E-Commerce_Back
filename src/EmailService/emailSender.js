const nodemailer = require("nodemailer");
const { sendOtpEmail } = require("./emailTemplates");

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async orderPlaced(toEmail,data){
    const template = await sendOtpEmail(otp)
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: toEmail,
        subject: "OTP Verification",
        html: template,
       
      });
      console.log("Message sent: %s", info);
      return info
    } catch (e) {
      console.error("Error sending email:", e)
    }
  }
  async otpsend(toEmail, otp) {
   
    const template = await sendOtpEmail(otp)
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: toEmail,
        subject: "OTP Verification",
        html: template,
       
      });
      console.log("Message sent: %s", info);
      return info
    } catch (e) {
      console.error("Error sending email:", e);
    }
  }
}
module.exports = new EmailSender();
