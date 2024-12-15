
const resetPassWordTemplate = ({userName, emailTo, OTP}: {userName: string, emailTo: string, OTP: string})=>{
    
    return `<!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .logo img {
                    max-width: 100px;
                }
                .header {
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    color: #007bff;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                }
                .content p {
                    margin: 15px 0;
                }
                .btn {
                    display: inline-block;
                    background: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 16px;
                    margin-top: 20px;
                    text-align: center;
                }
                .btn:hover {
                    background: #0056b3;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #999;
                    text-align: center;
                }
            </style>
         </head>
         <body>
            <div class="container">
                <div class="logo">
                    <img src="LOGO_URL" alt="Your Logo">
                </div>
                <div class="header">
                    <h1>Reset Your Password</h1>
                </div>
                <div class="content">
                    <p>Hi ${userName}</p>
                    <p>
                        You recently requested to reset your password for your account. 
                        This password reset OTP will expire in 5 minutes.
                    </p>

                        <!-- Verification TOKEN -->
                    <p>Verify Your Email ${emailTo}</p>
                    <p style="font-size: 18px; font-weight:semibold;">OTP <br/> ${OTP}</p>

                    <p style="font-size: 12px" >If you didn’t request a password reset, you can safely ignore this email.</p>
                    
                    <div class="footer">
                       <p>Thank you, <br>The TODOapp Team</p>
                        <p>&copy; 2024 TODOapp. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `
};


export default resetPassWordTemplate;
