
// // utils/emailOtpService.js
// const nodemailer = require('nodemailer');

// // Validate environment variables
// const requiredEnvVars = ['INFO_SMTP_USER', 'INFO_SMTP_PASSWORD', 'INFO_SMTP_HOST', 'INFO_SMTP_PORT'];
// for (const envVar of requiredEnvVars) {
//   if (!process.env[envVar]) {
//     console.error(`❌ Missing required environment variable: ${envVar}`);
//     console.error('Please check your .env file');
//   }
// }

// // Smart Gadget Brand Colors - Black & Color Theme
// const SMART_GADGET_COLORS = {
//   primary: '#00D4FF',        // Cyber Blue
//   secondary: '#7B61FF',      // Purple
//   accent: '#FF6B6B',         // Red accent
//   textDark: '#FFFFFF',       // White text on dark bg
//   textLight: '#A0A0B0',      // Grey text
//   white: '#1A1A1A',          // Dark card background
//   lightBg: '#0A0A0A',        // Pure Black background
//   border: '#2A2A2A',         // Dark border
//   success: '#00E676',        // Green
//   warning: '#FFD93D'         // Yellow warning
// };

// // Create transporter for Hostinger SMTP (port 465 with SSL)
// const transporter = nodemailer.createTransport({
//   host: process.env.INFO_SMTP_HOST,
//   port: parseInt(process.env.INFO_SMTP_PORT) || 465,
//   secure: true,
//   auth: {
//     user: process.env.INFO_SMTP_USER,
//     pass: process.env.INFO_SMTP_PASSWORD
//   },
//   tls: {
//     rejectUnauthorized: false
//   },
//   debug: true,
//   logger: true
// });

// // Verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.error('❌ Email server connection error:', error);
//     console.error('Please check your SMTP credentials in .env file');
//   } else {
//     console.log('✅ Email server is ready to send messages');
//     console.log(`📧 Connected to: ${process.env.INFO_SMTP_HOST}`);
//   }
// });

// // Generate 6-digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Send OTP email with Smart Gadget branding
// const sendOTPEmail = async (email, otp, contactPerson) => {
//   if (!process.env.INFO_SMTP_USER || !process.env.INFO_SMTP_PASSWORD) {
//     throw new Error('Email credentials not configured. Please check your .env file.');
//   }

//   const mailOptions = {
//     from: `"Smart Gadget" <${process.env.INFO_SMTP_USER}>`,
//     to: email,
//     subject: '🔐 Verify Your Email - Smart Gadget',
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@400;700&display=swap');
//         </style>
//       </head>
//       <body style="font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: ${SMART_GADGET_COLORS.lightBg};">
//         <div style="max-width: 600px; margin: 20px auto; background-color: ${SMART_GADGET_COLORS.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.8); border: 1px solid ${SMART_GADGET_COLORS.border};">
          
//           <!-- Header with Smart Gadget Branding -->
//           <div style="background: linear-gradient(135deg, ${SMART_GADGET_COLORS.primary} 0%, ${SMART_GADGET_COLORS.secondary} 100%); padding: 35px 20px; text-align: center;">
//             <div style="display: inline-block; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 20px; margin-bottom: 15px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
//               <span style="font-size: 28px; margin-right: 10px;">⚡</span>
//               <span style="font-family: 'Orbitron', monospace; color: ${SMART_GADGET_COLORS.textDark}; font-weight: 700; font-size: 20px; letter-spacing: 2px;">SMART GADGET</span>
//             </div>
//             <p style="color: ${SMART_GADGET_COLORS.textDark}; margin: 10px 0 0; opacity: 0.9; font-size: 14px;">Premium Tech Store • Bangladesh</p>
//           </div>
          
//           <!-- Content -->
//           <div style="padding: 40px 30px;">
//             <h2 style="color: ${SMART_GADGET_COLORS.textDark}; margin-top: 0; font-family: 'Orbitron', monospace; font-size: 22px; font-weight: 700; letter-spacing: 1px;">Welcome to Smart Gadget, ${contactPerson}! 🚀</h2>
            
//             <p style="color: ${SMART_GADGET_COLORS.textLight}; line-height: 1.6; margin-bottom: 20px; font-size: 15px;">
//               Thank you for choosing Smart Gadget — Bangladesh's premier destination for cutting-edge tech! 
//               To complete your registration and unlock exclusive deals, please verify your email address using the OTP below:
//             </p>
            
//             <!-- OTP Box -->
//             <div style="background: ${SMART_GADGET_COLORS.lightBg}; border: 2px solid ${SMART_GADGET_COLORS.primary}; border-radius: 16px; padding: 25px; text-align: center; margin: 30px 0; box-shadow: 0 0 30px rgba(0,212,255,0.1);">
//               <p style="color: ${SMART_GADGET_COLORS.textLight}; font-size: 12px; margin-bottom: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Verification Code</p>
//               <h1 style="font-size: 52px; letter-spacing: 14px; color: ${SMART_GADGET_COLORS.primary}; margin: 10px 0; font-family: 'Orbitron', monospace; font-weight: 700; text-shadow: 0 0 40px rgba(0,212,255,0.3);">${otp}</h1>
//               <p style="color: ${SMART_GADGET_COLORS.textLight}; font-size: 12px; margin-top: 10px;">Enter this code to verify your email</p>
//             </div>
            
//             <p style="color: ${SMART_GADGET_COLORS.textLight}; line-height: 1.6;">
//               This OTP is valid for <strong style="color: ${SMART_GADGET_COLORS.primary};">10 minutes</strong>.
//             </p>
            
//             <!-- Benefits Section -->
//             <div style="background: ${SMART_GADGET_COLORS.lightBg}; border-radius: 12px; padding: 20px; margin: 30px 0; border: 1px solid ${SMART_GADGET_COLORS.border};">
//               <p style="color: ${SMART_GADGET_COLORS.textDark}; font-weight: bold; margin-bottom: 15px; text-align: center; font-size: 14px; letter-spacing: 1px;">⚡ What awaits you at Smart Gadget? ⚡</p>
//               <table style="width: 100%; font-size: 13px;">
//                 <tr>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.primary}; font-size: 18px; width: 30px;">💻</td>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.textDark};">Latest gadgets at unbeatable prices</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.secondary}; font-size: 18px;">🔌</td>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.textDark};">Official warranty on all products</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.success}; font-size: 18px;">🚚</td>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.textDark};">Express delivery across Bangladesh</td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.accent}; font-size: 18px;">🛡️</td>
//                   <td style="padding: 8px 0; color: ${SMART_GADGET_COLORS.textDark};">24/7 tech support & after-sales service</td>
//                 </tr>
//               </table>
//             </div>
            
//             <div style="background-color: rgba(255,107,107,0.05); border-left: 4px solid ${SMART_GADGET_COLORS.accent}; padding: 15px; margin: 20px 0; border-radius: 8px;">
//               <p style="color: ${SMART_GADGET_COLORS.textLight}; margin: 0; font-size: 13px;">
//                 <strong style="color: ${SMART_GADGET_COLORS.accent};">🔒 Important:</strong> If you didn't request this registration, please ignore this email. 
//                 Your account will not be activated without verification.
//               </p>
//             </div>
//           </div>
          
//           <!-- Footer -->
//           <div style="background-color: ${SMART_GADGET_COLORS.lightBg}; padding: 25px 30px; text-align: center; border-top: 1px solid ${SMART_GADGET_COLORS.border};">
//             <p style="color: ${SMART_GADGET_COLORS.textLight}; font-size: 12px; margin: 0;">
//               &copy; ${new Date().getFullYear()} Smart Gadget. All rights reserved.<br>
//               <span style="font-size: 11px;">Premium Tech Store • Bangladesh</span>
//             </p>
//             <p style="color: ${SMART_GADGET_COLORS.textLight}; font-size: 11px; margin-top: 10px;">
//               <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}" style="color: ${SMART_GADGET_COLORS.primary}; text-decoration: none; font-weight: 600;">Visit Our Store</a> | 
//               <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}/support" style="color: ${SMART_GADGET_COLORS.secondary}; text-decoration: none; font-weight: 600;">Support Center</a>
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `,
//     text: `
//       Welcome to Smart Gadget, ${contactPerson}! 🚀

//       Thank you for choosing Smart Gadget — Bangladesh's premier destination for cutting-edge tech!

//       Your OTP verification code is: ${otp}

//       This code is valid for 10 minutes.

//       ⚡ What awaits you at Smart Gadget? ⚡
//       💻 Latest gadgets at unbeatable prices
//       🔌 Official warranty on all products
//       🚚 Express delivery across Bangladesh
//       🛡️ 24/7 tech support & after-sales service

//       🔒 Important: If you didn't request this registration, please ignore this email.

//       Visit us at: ${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}
//       Support: ${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}/support
//     `
//   };

//   try {
//     console.log(`📧 Attempting to send OTP email to: ${email}`);
//     console.log(`📧 Using SMTP server: ${process.env.INFO_SMTP_HOST}:${process.env.INFO_SMTP_PORT}`);
    
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ OTP email sent successfully to ${email}`);
//     console.log(`📧 Message ID: ${info.messageId}`);
    
//     return true;
//   } catch (error) {
//     console.error('❌ Email send error details:', {
//       error: error.message,
//       code: error.code,
//       command: error.command,
//       response: error.response,
//       responseCode: error.responseCode
//     });
    
//     if (error.code === 'EAUTH') {
//       throw new Error('Email authentication failed. Please check your SMTP username and password.');
//     } else if (error.code === 'ESOCKET') {
//       throw new Error(`Could not connect to SMTP server ${process.env.INFO_SMTP_HOST}:${process.env.INFO_SMTP_PORT}. Please check your network and firewall settings.`);
//     } else if (error.code === 'ETIMEDOUT') {
//       throw new Error('Connection to SMTP server timed out. Please check your network.');
//     } else {
//       throw new Error(`Failed to send OTP email: ${error.message}`);
//     }
//   }
// };

// module.exports = {
//   generateOTP,
//   sendOTPEmail
// };



// utils/emailOtpService.js
const nodemailer = require('nodemailer');

// Validate environment variables
const requiredEnvVars = ['INFO_SMTP_USER', 'INFO_SMTP_PASSWORD', 'INFO_SMTP_HOST', 'INFO_SMTP_PORT'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    console.error('Please check your .env file');
  }
}

// Smart Gadget Brand Colors - White Background with Black, White & Blue
const SMART_GADGET_COLORS = {
  primary: '#0066FF',        // Bold Blue
  secondary: '#0044CC',      // Dark Blue
  accent: '#0066FF',         // Blue accent
  textDark: '#1A1A1A',       // Near Black for text
  textLight: '#4A4A4A',      // Dark Gray
  white: '#FFFFFF',          // White background
  lightBg: '#F5F7FA',        // Very Light Gray background
  border: '#E5E5E5',         // Light Gray border
  success: '#0066FF',        // Blue for success
  warning: '#FF8C00'         // Orange for warnings
};

// Create transporter for Hostinger SMTP (port 465 with SSL)
const transporter = nodemailer.createTransport({
  host: process.env.INFO_SMTP_HOST,
  port: parseInt(process.env.INFO_SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.INFO_SMTP_USER,
    pass: process.env.INFO_SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ Email server connection error:', error);
    console.error('Please check your SMTP credentials in .env file');
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log(`📧 Connected to: ${process.env.INFO_SMTP_HOST}`);
  }
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email with Smart Gadget branding
const sendOTPEmail = async (email, otp, contactPerson) => {
  if (!process.env.INFO_SMTP_USER || !process.env.INFO_SMTP_PASSWORD) {
    throw new Error('Email credentials not configured. Please check your .env file.');
  }

  const mailOptions = {
    from: `"Smart Gadget" <${process.env.INFO_SMTP_USER}>`,
    to: email,
    subject: '🔐 Verify Your Email - Smart Gadget',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        </style>
      </head>
      <body style="font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #F5F7FA;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5;">
          
          <!-- Header with Smart Gadget Branding - BLACK -->
          <div style="background: #000000; padding: 35px 20px; text-align: center;">
            <div style="display: inline-block; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 20px; margin-bottom: 15px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
              <span style="font-size: 28px; margin-right: 10px;">⚡</span>
              <span style="font-family: 'Inter', Arial, sans-serif; color: #FFFFFF; font-weight: 700; font-size: 20px; letter-spacing: 2px;">SMART GADGET</span>
            </div>
            <p style="color: #FFFFFF; margin: 10px 0 0; opacity: 0.9; font-size: 14px;">Premium Tech Store • Bangladesh</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1A1A1A; margin-top: 0; font-family: 'Inter', Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">Welcome to Smart Gadget, ${contactPerson}! 🚀</h2>
            
            <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px; font-size: 15px;">
              Thank you for choosing Smart Gadget — Bangladesh's premier destination for cutting-edge tech! 
              To complete your registration and unlock exclusive deals, please verify your email address using the OTP below:
            </p>
            
            <!-- OTP Box -->
            <div style="background: #F5F7FA; border: 2px solid #0066FF; border-radius: 16px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #4A4A4A; font-size: 12px; margin-bottom: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Verification Code</p>
              <h1 style="font-size: 52px; letter-spacing: 14px; color: #0066FF; margin: 10px 0; font-family: 'Inter', Arial, sans-serif; font-weight: 700;">${otp}</h1>
              <p style="color: #4A4A4A; font-size: 12px; margin-top: 10px;">Enter this code to verify your email</p>
            </div>
            
            <p style="color: #4A4A4A; line-height: 1.6;">
              This OTP is valid for <strong style="color: #0066FF;">10 minutes</strong>.
            </p>
            
            <!-- Benefits Section -->
            <div style="background: #F5F7FA; border-radius: 12px; padding: 20px; margin: 30px 0; border: 1px solid #E5E5E5;">
              <p style="color: #1A1A1A; font-weight: bold; margin-bottom: 15px; text-align: center; font-size: 14px; letter-spacing: 0.5px;">⚡ What awaits you at Smart Gadget? ⚡</p>
              <table style="width: 100%; font-size: 13px;">
                <tr>
                  <td style="padding: 8px 0; color: #0066FF; font-size: 18px; width: 30px;">💻</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">Latest gadgets at unbeatable prices</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #0066FF; font-size: 18px;">🔌</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">Official warranty on all products</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #0066FF; font-size: 18px;">🚚</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">Express delivery across Bangladesh</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #0066FF; font-size: 18px;">🛡️</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">24/7 tech support & after-sales service</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #F5F7FA; border-left: 4px solid #0066FF; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <p style="color: #4A4A4A; margin: 0; font-size: 13px;">
                <strong style="color: #0066FF;">🔒 Important:</strong> If you didn't request this registration, please ignore this email. 
                Your account will not be activated without verification.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #F5F7FA; padding: 25px 30px; text-align: center; border-top: 1px solid #E5E5E5;">
            <p style="color: #4A4A4A; font-size: 12px; margin: 0;">
              &copy; ${new Date().getFullYear()} Smart Gadget. All rights reserved.<br>
              <span style="font-size: 11px;">Premium Tech Store • Bangladesh</span>
            </p>
            <p style="color: #4A4A4A; font-size: 11px; margin-top: 10px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}" style="color: #0066FF; text-decoration: none; font-weight: 600;">Visit Our Store</a> | 
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}/support" style="color: #0066FF; text-decoration: none; font-weight: 600;">Support Center</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to Smart Gadget, ${contactPerson}! 🚀

      Thank you for choosing Smart Gadget — Bangladesh's premier destination for cutting-edge tech!

      Your OTP verification code is: ${otp}

      This code is valid for 10 minutes.

      ⚡ What awaits you at Smart Gadget? ⚡
      💻 Latest gadgets at unbeatable prices
      🔌 Official warranty on all products
      🚚 Express delivery across Bangladesh
      🛡️ 24/7 tech support & after-sales service

      🔒 Important: If you didn't request this registration, please ignore this email.

      Visit us at: ${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}
      Support: ${process.env.NEXT_PUBLIC_APP_URL || 'https://smartgadget.com'}/support
    `
  };

  try {
    console.log(`📧 Attempting to send OTP email to: ${email}`);
    console.log(`📧 Using SMTP server: ${process.env.INFO_SMTP_HOST}:${process.env.INFO_SMTP_PORT}`);
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    
    return true;
  } catch (error) {
    console.error('❌ Email send error details:', {
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check your SMTP username and password.');
    } else if (error.code === 'ESOCKET') {
      throw new Error(`Could not connect to SMTP server ${process.env.INFO_SMTP_HOST}:${process.env.INFO_SMTP_PORT}. Please check your network and firewall settings.`);
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Connection to SMTP server timed out. Please check your network.');
    } else {
      throw new Error(`Failed to send OTP email: ${error.message}`);
    }
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail
};