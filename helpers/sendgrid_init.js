const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY);

module.exports = (email, token) => {
  console.log(token);
  var link = `http://localhost:3000/verify-account/${token}`;
  var emailText =
    '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><a href="' +
    link +
    '">Click Here To Verify</a></body></html>';

  return new Promise((resolve, reject) => {
    const msgObject = {
      from: {
        name: "Shashank Mishra",
        email: "indianhercules15@gmail.com",
      },
      to: email,
      subject: "Sending email using sendgrid",
      text: "First test email Goto: " + token,
      html: emailText,
    };

    sgMail.send(msgObject).then(
      () => {
        return resolve({
          success: true,
          msg: "Verification Email Sent",
        });
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
        return reject({
          success: false,
          msg: "API Server Error",
        });
      }
    );
  });
};
