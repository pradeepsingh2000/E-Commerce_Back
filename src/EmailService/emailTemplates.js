const sendOtpEmail =(opt) =>{
    return (`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #3498db;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #f2f2f2;
      padding: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>OTP Verification</h2>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Your One-Time Password (OTP) for verification is:</p>
      <h3 style="color: #e74c3c;">${opt}</h3>
      <p>Please use this OTP to complete the verification process.</p>
    </div>
    <div class="footer">
      <p>Thank you for using our service.</p>
    </div>
  </div>
</body>
</html>

    `)
}

module.exports ={sendOtpEmail}