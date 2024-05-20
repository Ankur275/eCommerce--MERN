const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    if (!options.email || !options.subject || !options.message) {
      throw new Error("Missing required email options (email, subject, message)");
    }

    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    console.log("Sending email with options:", mailOptions); // Debug log
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully"); // Debug log
  } catch (error) {
    console.error("Error sending email:", error); // Log the error
    // throw error; // Re-throw the error to be handled by the calling function
  }
};

module.exports = sendEmail;
