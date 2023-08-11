// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'outpass123@gmail.com',
//     pass: 'daddy@69',
//   },
// });

// function sendMagicLinkEmail({ email, token }) {
//   return new Promise((resolve, reject) => {
//     const verificationLink = `https://localhost:3000/verify?token=${token}`;
//     const mailOptions = {
//       from: 'outpass123@gmail.com',
//       to: email,
//       subject: 'Email Verification',
//       html: `<p>Click the link below to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending verification email:', error);
//         reject(error); // Reject the promise if there's an error
//       } else {
//         console.log('Verification email sent:', info.response);
//         resolve(info.response); // Resolve the promise if the email is sent successfully
//       }
//     });
//   });
// }


// const sendGridMailer=require("@sendgrid/mail")
// sendGridMailer.setApiKey(process.env.SEND_GRID_API_KEY)

// function sendMagicLinkEmail({email,token}){
//   return sendGridMailer.send({
//     to: email,
//     from: 'outpass123@gmail.com',
//     subject:"Confirm Sign up",
//     html: `<p>Click the link below to verify your email:</p><a href="https://localhost:3000/verify?token=${token}">https://localhost:3000/verify?token=${token}</a>`,
//   })
// }

// module.exports = { sendMagicLinkEmail };

const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateUserJWTSecret() {
  const randomString = generateRandomString(32); // You can choose the length you want
  return `${randomString}`;
}
const JWT_SECRET = generateUserJWTSecret();
function generateVerificationToken(email) {
  const token = jwt.sign({ userId:email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

function sendVerificationEmail(email,token) {
  const verificationToken = generateVerificationToken(email);
  const verificationLink = (token==1)?`http://localhost:3000/verify?token=${verificationToken}`:`http://localhost:3000/PasswordReset?token=${verificationToken}`;
  console.log(JWT_SECRET);
  const SENDGRID_API_KEY = "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";
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: 'outpass123@gmail.com', // Change to your verified sender
    subject:(token==1)? 'Confirm Sign up':'Reset Password',
    html: (token==1)?`<p>Click on the link to verify your account:<a href="${verificationLink}"> ${verificationLink}</a></p>`:`<p>Click on the link to reset your password</p> : <a href="http://localhost:3000/PasswordReset?token=${verificationToken}">Reset Password</a>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      console.log(verificationLink);
    })
    .catch((error) => {
      console.error(error);
    });
}


module.exports = {
  sendVerificationEmail,
  JWT_SECRET,
};
