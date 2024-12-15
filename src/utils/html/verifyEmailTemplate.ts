
const verifyEmailTemplate = ({userName, emailTo, OTP}: {userName: string, emailTo: string, OTP: string})=>{
    
        return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome Email</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .logo img {
                        max-width: 100px;
                    }
                    .content {
                        text-align: start;
                        color: #333333;
                    }
                    .content-header{
                        text-align: center;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .content h1 {
                        color: #222222;
                    }
                    .content-footer {
                    margin-top: 30px ;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                         <!-- Logo Section -->
                    <div class="logo">
                        <img src="LOGO_URL" alt="Your Logo">
                    </div>

                        <!-- Content Section -->
                    <div class="content">
                        <div class="content-header">
                            <h1>Welcome to <span style="color: green;" >TODOapp</span>!</h1>
                        </div>
                        <p>Hi ${userName}</p>
                        <p>
                            We are thrilled to have you onboard. 
                            To get started, please verify your email address.
                            This OTP will expire in 5 minutes.
                        </p>
                        
                         <!-- Verification TOKEN -->
                        <p>Verify Your Email ${emailTo}</p>
                        <p style="font-size: 18px; font-weight:semibold;">OTP <br/>  ${OTP}</p>
                        
                        <p style="font-size: 12px">If you did not sign up for this account, please ignore this email.</p>       
                    </div>

                    <!-- Footer Section -->
                    <div class="footer">
                        <p>Thank you, <br>The TODOapp Team</p>
                        <p>&copy; 2024 TODOapp. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>`
};

export default verifyEmailTemplate;
