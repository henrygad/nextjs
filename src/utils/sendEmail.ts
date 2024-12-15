import nodemailer from 'nodemailer'
import verifyEmailTemplate from './html/verifyEmailTemplate';
import resetPassWordTemplate from './html/resetPasswordTemplate';


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});

const sendEmail = ({ type, userName, emailTo, OTP, cb = () => null }: { type: string, userName: string, emailTo: string, OTP: string, cb?: () => void }) => {
    const getType = type.toUpperCase();

    const mailOptions = {
        from: `<${process.env.GMAIL}>`,
        to: emailTo,
        subject: getType === "VERIFY" ? 'Email Verification' : 'Reset Password',
        html: getType === "VERIFY" ? verifyEmailTemplate({ userName, emailTo, OTP }) : resetPassWordTemplate({ userName, emailTo, OTP })
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            throw ("Email error: email was not sent");
        } else {
            cb();
        };
    });

};

export default sendEmail;
