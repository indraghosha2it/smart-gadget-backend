


// // utils/welcomeEmailService.js
// const nodemailer = require('nodemailer');

// // Smart Gadget Brand Colors - Black & Tech Theme
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

// // Create transporter using environment variables
// const transporter = nodemailer.createTransport({
//   host: process.env.INFO_SMTP_HOST,
//   port: parseInt(process.env.INFO_SMTP_PORT) || 465,
//   secure: true,
//   auth: {
//     user: process.env.INFO_SMTP_USER,
//     pass: process.env.INFO_SMTP_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Verify connection
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Welcome Email Service - Configuration error:', error.message);
//   } else {
//     console.log('✅ Welcome Email Service is ready');
//   }
// });

// /**
//  * Send welcome email to newly registered customer (Regular Signup)
//  * @param {string} email - Customer email
//  * @param {string} name - Customer name (contactPerson)
//  */
// const sendWelcomeEmail = async (email, name) => {
//   console.log('📧 Sending welcome email to:', email);
  
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//   const currentYear = new Date().getFullYear();

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@400;700&display=swap');
//         body { 
//           font-family: 'Inter', 'Segoe UI', Arial, sans-serif; 
//           line-height: 1.6; 
//           color: ${SMART_GADGET_COLORS.textDark}; 
//           margin: 0;
//           padding: 0;
//           background-color: ${SMART_GADGET_COLORS.lightBg};
//         }
//         .container {
//           max-width: 600px;
//           margin: 20px auto;
//           background-color: ${SMART_GADGET_COLORS.white};
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.8);
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .header {
//           background: linear-gradient(135deg, ${SMART_GADGET_COLORS.primary} 0%, ${SMART_GADGET_COLORS.secondary} 100%);
//           padding: 35px 20px;
//           text-align: center;
//         }
//         .header h1 {
//           color: ${SMART_GADGET_COLORS.textDark};
//           margin: 0;
//           font-size: 28px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           font-family: 'Orbitron', monospace;
//           letter-spacing: 2px;
//         }
//         .header h1 span:first-child {
//           font-size: 32px;
//         }
//         .header .subtitle {
//           color: ${SMART_GADGET_COLORS.textDark};
//           margin: 10px 0 0;
//           opacity: 0.9;
//           font-size: 14px;
//           letter-spacing: 1px;
//         }
//         .content {
//           padding: 35px 30px;
//           text-align: left;
//         }
//         .welcome-message {
//           font-size: 16px;
//           margin-bottom: 25px;
//           color: ${SMART_GADGET_COLORS.textLight};
//         }
//         .welcome-message strong {
//           color: ${SMART_GADGET_COLORS.textDark};
//         }
//         .benefits-box {
//           background: ${SMART_GADGET_COLORS.lightBg};
//           border-left: 4px solid ${SMART_GADGET_COLORS.primary};
//           padding: 20px;
//           margin: 25px 0;
//           border-radius: 12px;
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .benefits-box h3 {
//           margin: 0 0 15px 0;
//           color: ${SMART_GADGET_COLORS.primary};
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-family: 'Orbitron', monospace;
//           font-size: 16px;
//           letter-spacing: 1px;
//         }
//         .benefits-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .benefits-list li {
//           padding: 10px 0;
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           border-bottom: 1px solid ${SMART_GADGET_COLORS.border};
//           color: ${SMART_GADGET_COLORS.textLight};
//         }
//         .benefits-list li:last-child {
//           border-bottom: none;
//         }
//         .benefits-list li span:first-child {
//           font-size: 22px;
//         }
//         .benefits-list li strong {
//           color: ${SMART_GADGET_COLORS.textDark};
//         }
//         .button {
//           display: inline-block;
//           background: linear-gradient(135deg, ${SMART_GADGET_COLORS.primary} 0%, ${SMART_GADGET_COLORS.secondary} 100%);
//           color: ${SMART_GADGET_COLORS.textDark};
//           padding: 14px 35px;
//           text-decoration: none;
//           border-radius: 50px;
//           font-weight: bold;
//           margin: 20px 0;
//           text-align: center;
//           font-family: 'Orbitron', monospace;
//           font-size: 14px;
//           letter-spacing: 1px;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           box-shadow: 0 4px 15px rgba(0,212,255,0.3);
//         }
//         .button:hover {
//           transform: scale(1.05);
//           box-shadow: 0 6px 25px rgba(0,212,255,0.5);
//         }
//         .footer {
//           background: ${SMART_GADGET_COLORS.lightBg};
//           padding: 25px;
//           text-align: center;
//           font-size: 12px;
//           color: ${SMART_GADGET_COLORS.textLight};
//           border-top: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .social-links {
//           margin: 15px 0;
//         }
//         .social-links a {
//           color: ${SMART_GADGET_COLORS.primary};
//           text-decoration: none;
//           margin: 0 10px;
//           font-weight: bold;
//           transition: color 0.3s ease;
//         }
//         .social-links a:hover {
//           color: ${SMART_GADGET_COLORS.secondary};
//         }
//         .highlight {
//           color: ${SMART_GADGET_COLORS.primary};
//           font-weight: bold;
//         }
//         .support-box {
//           margin-top: 25px;
//           padding: 20px;
//           background: ${SMART_GADGET_COLORS.lightBg};
//           border-radius: 12px;
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .support-box p {
//           color: ${SMART_GADGET_COLORS.textLight};
//           margin: 0 0 10px 0;
//           font-size: 14px;
//         }
//         .support-box a {
//           color: ${SMART_GADGET_COLORS.primary};
//           text-decoration: none;
//           transition: color 0.3s ease;
//         }
//         .support-box a:hover {
//           color: ${SMART_GADGET_COLORS.secondary};
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>
//             <span>⚡</span>
//             <span>Welcome to Smart Gadget!</span>
//             <span>🚀</span>
//           </h1>
//           <p class="subtitle">Premium Tech Store • Bangladesh</p>
//         </div>
        
//         <div class="content">
//           <div class="welcome-message">
//             <p>Dear <strong>${name}</strong>,</p>
//             <p>🎉 <span class="highlight">Welcome to the Smart Gadget family!</span> We're absolutely thrilled to have you on board!</p>
//             <p>Your account has been successfully created and verified. Get ready for a cutting-edge tech experience with amazing gadgets, exclusive deals, and premium service!</p>
//           </div>
          
//           <div class="benefits-box">
//             <h3>
//               <span>✨</span>
//               <span>What Awaits You at Smart Gadget</span>
//             </h3>
//             <ul class="benefits-list">
//               <li><span>💻</span> <span><strong>Latest Tech</strong> - Cutting-edge gadgets at unbeatable prices</span></li>
//               <li><span>🔌</span> <span><strong>Official Warranty</strong> - All products come with manufacturer warranty</span></li>
//               <li><span>🚚</span> <span><strong>Express Delivery</strong> - Fast shipping across Bangladesh</span></li>
//               <li><span>🛡️</span> <span><strong>24/7 Support</strong> - Our tech experts are always here to help</span></li>
//               <li><span>🎯</span> <span><strong>Exclusive Deals</strong> - Special discounts for our members</span></li>
//             </ul>
//           </div>
          
//           <div style="text-align: center;">
//             <a href="${frontendUrl}/customer/dashboard" class="button">
//               🚀 Go to Your Dashboard →
//             </a>
//           </div>
          
//           <div class="support-box">
//             <p><strong>📞 Need Help?</strong></p>
//             <p>Our friendly tech support team is here for you!</p>
//             <p style="margin: 10px 0 0 0;">
//               📧 <a href="mailto:${process.env.INFO_SMTP_USER}">${process.env.INFO_SMTP_USER}</a><br>
//               📞 +880 1234 567890
//             </p>
//           </div>
//         </div>
        
//         <div class="footer">
//           <div class="social-links">
//             <a href="#">Facebook</a> | 
//             <a href="#">Instagram</a> | 
//             <a href="#">YouTube</a>
//           </div>
//           <p>&copy; ${currentYear} Smart Gadget. All rights reserved.</p>
//           <p>Premium Tech Store • Bangladesh</p>
//           <p>
//             <a href="${frontendUrl}/privacy" style="color: ${SMART_GADGET_COLORS.textLight};">Privacy Policy</a> | 
//             <a href="${frontendUrl}/terms" style="color: ${SMART_GADGET_COLORS.textLight};">Terms of Service</a>
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   try {
//     const result = await transporter.sendMail({
//       from: `"Smart Gadget" <${process.env.INFO_SMTP_USER}>`,
//       to: email,
//       subject: `⚡ Welcome to Smart Gadget, ${name}! 🚀`,
//       html: htmlContent
//     });
    
//     console.log('✅ Welcome email sent to:', email, 'Message ID:', result.messageId);
//     return { success: true, messageId: result.messageId };
//   } catch (error) {
//     console.error('❌ Welcome email error:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Send welcome email for Google signup users
//  * @param {string} email - Customer email
//  * @param {string} name - Customer name
//  * @param {boolean} requiresProfileCompletion - Whether profile needs completion
//  */
// const sendGoogleWelcomeEmail = async (email, name, requiresProfileCompletion = true) => {
//   console.log('📧 Sending Google welcome email to:', email);
  
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//   const currentYear = new Date().getFullYear();

//   const profileNote = requiresProfileCompletion ? `
//     <div style="margin: 25px 0; padding: 20px; background: ${SMART_GADGET_COLORS.lightBg}; border-left: 4px solid ${SMART_GADGET_COLORS.accent}; border-radius: 12px; border: 1px solid ${SMART_GADGET_COLORS.border};">
//       <h3 style="margin: 0 0 10px 0; color: ${SMART_GADGET_COLORS.primary}; display: flex; align-items: center; gap: 8px; font-family: 'Orbitron', monospace; font-size: 16px; letter-spacing: 1px;">
//         <span>📝</span>
//         <span>Complete Your Profile</span>
//       </h3>
//       <p style="margin: 0; font-size: 14px; color: ${SMART_GADGET_COLORS.textLight};">Please visit your dashboard to complete your profile information so we can personalize your tech recommendations and provide the best shopping experience for you!</p>
//     </div>
//   ` : '';

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@400;700&display=swap');
//         body { 
//           font-family: 'Inter', 'Segoe UI', Arial, sans-serif; 
//           line-height: 1.6; 
//           color: ${SMART_GADGET_COLORS.textDark}; 
//           margin: 0;
//           padding: 0;
//           background-color: ${SMART_GADGET_COLORS.lightBg};
//         }
//         .container {
//           max-width: 600px;
//           margin: 20px auto;
//           background-color: ${SMART_GADGET_COLORS.white};
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.8);
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .header {
//           background: linear-gradient(135deg, ${SMART_GADGET_COLORS.primary} 0%, ${SMART_GADGET_COLORS.secondary} 100%);
//           padding: 35px 20px;
//           text-align: center;
//         }
//         .header h1 {
//           color: ${SMART_GADGET_COLORS.textDark};
//           margin: 0;
//           font-size: 28px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           font-family: 'Orbitron', monospace;
//           letter-spacing: 2px;
//         }
//         .header h1 span:first-child {
//           font-size: 32px;
//         }
//         .header .subtitle {
//           color: ${SMART_GADGET_COLORS.textDark};
//           margin: 10px 0 0;
//           opacity: 0.9;
//           font-size: 14px;
//           letter-spacing: 1px;
//         }
//         .content {
//           padding: 35px 30px;
//           text-align: left;
//         }
//         .welcome-message {
//           font-size: 16px;
//           margin-bottom: 25px;
//           color: ${SMART_GADGET_COLORS.textLight};
//         }
//         .welcome-message strong {
//           color: ${SMART_GADGET_COLORS.textDark};
//         }
//         .google-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: ${SMART_GADGET_COLORS.lightBg};
//           padding: 8px 16px;
//           border-radius: 50px;
//           font-size: 13px;
//           margin: 10px 0;
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//           color: ${SMART_GADGET_COLORS.textLight};
//         }
//         .google-badge strong {
//           color: ${SMART_GADGET_COLORS.textDark};
//         }
//         .benefits-box {
//           background: ${SMART_GADGET_COLORS.lightBg};
//           border-left: 4px solid ${SMART_GADGET_COLORS.primary};
//           padding: 20px;
//           margin: 25px 0;
//           border-radius: 12px;
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .benefits-box h3 {
//           margin: 0 0 15px 0;
//           color: ${SMART_GADGET_COLORS.primary};
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-family: 'Orbitron', monospace;
//           font-size: 16px;
//           letter-spacing: 1px;
//         }
//         .benefits-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .benefits-list li {
//           padding: 10px 0;
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           border-bottom: 1px solid ${SMART_GADGET_COLORS.border};
//           color: ${SMART_GADGET_COLORS.textLight};
//         }
//         .benefits-list li:last-child {
//           border-bottom: none;
//         }
//         .benefits-list li span:first-child {
//           font-size: 22px;
//         }
//         .benefits-list li strong {
//           color: ${SMART_GADGET_COLORS.textDark};
//         }
//         .button {
//           display: inline-block;
//           background: linear-gradient(135deg, ${SMART_GADGET_COLORS.primary} 0%, ${SMART_GADGET_COLORS.secondary} 100%);
//           color: ${SMART_GADGET_COLORS.textDark};
//           padding: 14px 35px;
//           text-decoration: none;
//           border-radius: 50px;
//           font-weight: bold;
//           margin: 20px 0;
//           text-align: center;
//           font-family: 'Orbitron', monospace;
//           font-size: 14px;
//           letter-spacing: 1px;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           box-shadow: 0 4px 15px rgba(0,212,255,0.3);
//         }
//         .button:hover {
//           transform: scale(1.05);
//           box-shadow: 0 6px 25px rgba(0,212,255,0.5);
//         }
//         .footer {
//           background: ${SMART_GADGET_COLORS.lightBg};
//           padding: 25px;
//           text-align: center;
//           font-size: 12px;
//           color: ${SMART_GADGET_COLORS.textLight};
//           border-top: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .social-links {
//           margin: 15px 0;
//         }
//         .social-links a {
//           color: ${SMART_GADGET_COLORS.primary};
//           text-decoration: none;
//           margin: 0 10px;
//           font-weight: bold;
//           transition: color 0.3s ease;
//         }
//         .social-links a:hover {
//           color: ${SMART_GADGET_COLORS.secondary};
//         }
//         .highlight {
//           color: ${SMART_GADGET_COLORS.primary};
//           font-weight: bold;
//         }
//         .support-box {
//           margin-top: 25px;
//           padding: 20px;
//           background: ${SMART_GADGET_COLORS.lightBg};
//           border-radius: 12px;
//           border: 1px solid ${SMART_GADGET_COLORS.border};
//         }
//         .support-box p {
//           color: ${SMART_GADGET_COLORS.textLight};
//           margin: 0 0 10px 0;
//           font-size: 14px;
//         }
//         .support-box a {
//           color: ${SMART_GADGET_COLORS.primary};
//           text-decoration: none;
//           transition: color 0.3s ease;
//         }
//         .support-box a:hover {
//           color: ${SMART_GADGET_COLORS.secondary};
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>
//             <span>🔐</span>
//             <span>Welcome to Smart Gadget!</span>
//             <span>🚀</span>
//           </h1>
//           <p class="subtitle">Premium Tech Store • Bangladesh</p>
//         </div>
        
//         <div class="content">
//           <div class="welcome-message">
//             <p>Dear <strong>${name}</strong>,</p>
//             <div class="google-badge">
//               <span>🔐</span>
//               <span>You've signed up with <strong>Google</strong></span>
//             </div>
//             <p>🎉 <span class="highlight">Welcome to the Smart Gadget family!</span> We're so excited to have you join our community of tech enthusiasts!</p>
//             <p>Your account has been successfully created with Google Sign-In. Get ready to explore our cutting-edge collection of gadgets and tech accessories!</p>
//           </div>
          
//           ${profileNote}
          
//           <div class="benefits-box">
//             <h3>
//               <span>✨</span>
//               <span>Your Smart Gadget Benefits</span>
//             </h3>
//             <ul class="benefits-list">
//               <li><span>💻</span> <span><strong>Latest Tech</strong> - Cutting-edge gadgets at unbeatable prices</span></li>
//               <li><span>🔌</span> <span><strong>Official Warranty</strong> - All products come with manufacturer warranty</span></li>
//               <li><span>🚚</span> <span><strong>Express Delivery</strong> - Fast shipping across Bangladesh</span></li>
//               <li><span>🛡️</span> <span><strong>24/7 Support</strong> - Our tech experts are always here to help</span></li>
//               <li><span>🎯</span> <span><strong>Exclusive Deals</strong> - Special discounts for our members</span></li>
//             </ul>
//           </div>
          
//           <div style="text-align: center;">
//             <a href="${frontendUrl}/customer/dashboard" class="button">
//               🚀 Go to Your Dashboard →
//             </a>
//           </div>
          
//           <div class="support-box">
//             <p><strong>📞 Need Help?</strong></p>
//             <p>Our friendly tech support team is here for you!</p>
//             <p style="margin: 10px 0 0 0;">
//               📧 <a href="mailto:${process.env.INFO_SMTP_USER}">${process.env.INFO_SMTP_USER}</a><br>
//               📞 +880 1234 567890
//             </p>
//           </div>
//         </div>
        
//         <div class="footer">
//           <div class="social-links">
//             <a href="#">Facebook</a> | 
//             <a href="#">Instagram</a> | 
//             <a href="#">YouTube</a>
//           </div>
//           <p>&copy; ${currentYear} Smart Gadget. All rights reserved.</p>
//           <p>Premium Tech Store • Bangladesh</p>
//           <p>
//             <a href="${frontendUrl}/privacy" style="color: ${SMART_GADGET_COLORS.textLight};">Privacy Policy</a> | 
//             <a href="${frontendUrl}/terms" style="color: ${SMART_GADGET_COLORS.textLight};">Terms of Service</a>
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   try {
//     const result = await transporter.sendMail({
//       from: `"Smart Gadget" <${process.env.INFO_SMTP_USER}>`,
//       to: email,
//       subject: `⚡ Welcome to Smart Gadget, ${name}! 🚀`,
//       html: htmlContent
//     });
    
//     console.log('✅ Google welcome email sent to:', email, 'Message ID:', result.messageId);
//     return { success: true, messageId: result.messageId };
//   } catch (error) {
//     console.error('❌ Google welcome email error:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// module.exports = {
//   sendWelcomeEmail,
//   sendGoogleWelcomeEmail
// };


// utils/welcomeEmailService.js
const nodemailer = require('nodemailer');

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

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.INFO_SMTP_HOST,
  port: parseInt(process.env.INFO_SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.INFO_SMTP_USER,
    pass: process.env.INFO_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Welcome Email Service - Configuration error:', error.message);
  } else {
    console.log('✅ Welcome Email Service is ready');
  }
});

/**
 * Send welcome email to newly registered customer (Regular Signup)
 * @param {string} email - Customer email
 * @param {string} name - Customer name (contactPerson)
 */
const sendWelcomeEmail = async (email, name) => {
  console.log('📧 Sending welcome email to:', email);
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const currentYear = new Date().getFullYear();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { 
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #1A1A1A; 
          margin: 0;
          padding: 0;
          background-color: #F5F7FA;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #FFFFFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #E5E5E5;
        }
        .header {
          background: #000000;
          padding: 35px 20px;
          text-align: center;
        }
        .header h1 {
          color: #FFFFFF;
          margin: 0;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .header h1 span:first-child {
          font-size: 32px;
        }
        .header .subtitle {
          color: #FFFFFF;
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .content {
          padding: 35px 30px;
          text-align: left;
        }
        .welcome-message {
          font-size: 16px;
          margin-bottom: 25px;
          color: #4A4A4A;
        }
        .welcome-message strong {
          color: #1A1A1A;
        }
        .benefits-box {
          background: #F5F7FA;
          border-left: 4px solid #0066FF;
          padding: 20px;
          margin: 25px 0;
          border-radius: 12px;
          border: 1px solid #E5E5E5;
        }
        .benefits-box h3 {
          margin: 0 0 15px 0;
          color: #0066FF;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefits-list li {
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #E5E5E5;
          color: #4A4A4A;
        }
        .benefits-list li:last-child {
          border-bottom: none;
        }
        .benefits-list li span:first-child {
          font-size: 22px;
        }
        .benefits-list li strong {
          color: #1A1A1A;
        }
        .button {
          display: inline-block;
          background: #000000;
          color: #FFFFFF;
          padding: 14px 35px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: #1A1A1A;
        }
        .footer {
          background: #F5F7FA;
          padding: 25px;
          text-align: center;
          font-size: 12px;
          color: #4A4A4A;
          border-top: 1px solid #E5E5E5;
        }
        .social-links {
          margin: 15px 0;
        }
        .social-links a {
          color: #0066FF;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .social-links a:hover {
          color: #0044CC;
        }
        .highlight {
          color: #0066FF;
          font-weight: bold;
        }
        .support-box {
          margin-top: 25px;
          padding: 20px;
          background: #F5F7FA;
          border-radius: 12px;
          border: 1px solid #E5E5E5;
        }
        .support-box p {
          color: #4A4A4A;
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        .support-box a {
          color: #0066FF;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .support-box a:hover {
          color: #0044CC;
        }
        .support-box strong {
          color: #1A1A1A;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>
            <span>⚡</span>
            <span>Welcome to Smart Gadget!</span>
            <span>🚀</span>
          </h1>
          <p class="subtitle">Premium Tech Store • Bangladesh</p>
        </div>
        
        <div class="content">
          <div class="welcome-message">
            <p>Dear <strong>${name}</strong>,</p>
            <p>🎉 <span class="highlight">Welcome to the Smart Gadget family!</span> We're absolutely thrilled to have you on board!</p>
            <p>Your account has been successfully created and verified. Get ready for a cutting-edge tech experience with amazing gadgets, exclusive deals, and premium service!</p>
          </div>
          
          <div class="benefits-box">
            <h3>
              <span>✨</span>
              <span>What Awaits You at Smart Gadget</span>
            </h3>
            <ul class="benefits-list">
              <li><span>💻</span> <span><strong>Latest Tech</strong> - Cutting-edge gadgets at unbeatable prices</span></li>
              <li><span>🔌</span> <span><strong>Official Warranty</strong> - All products come with manufacturer warranty</span></li>
              <li><span>🚚</span> <span><strong>Express Delivery</strong> - Fast shipping across Bangladesh</span></li>
              <li><span>🛡️</span> <span><strong>24/7 Support</strong> - Our tech experts are always here to help</span></li>
              <li><span>🎯</span> <span><strong>Exclusive Deals</strong> - Special discounts for our members</span></li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/customer/dashboard" class="button">
              🚀 Go to Your Dashboard →
            </a>
          </div>
          
          <div class="support-box">
            <p><strong>📞 Need Help?</strong></p>
            <p>Our friendly tech support team is here for you!</p>
            <p style="margin: 10px 0 0 0;">
              📧 <a href="mailto:${process.env.INFO_SMTP_USER}">${process.env.INFO_SMTP_USER}</a><br>
              📞 +880 1234 567890
            </p>
          </div>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> | 
            <a href="#">Instagram</a> | 
            <a href="#">YouTube</a>
          </div>
          <p>&copy; ${currentYear} Smart Gadget. All rights reserved.</p>
          <p>Premium Tech Store • Bangladesh</p>
          <p>
            <a href="${frontendUrl}/privacy" style="color: #4A4A4A; text-decoration: none;">Privacy Policy</a> | 
            <a href="${frontendUrl}/terms" style="color: #4A4A4A; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await transporter.sendMail({
      from: `"Smart Gadget" <${process.env.INFO_SMTP_USER}>`,
      to: email,
      subject: `⚡ Welcome to Smart Gadget, ${name}! 🚀`,
      html: htmlContent
    });
    
    console.log('✅ Welcome email sent to:', email, 'Message ID:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Welcome email error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email for Google signup users
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {boolean} requiresProfileCompletion - Whether profile needs completion
 */
const sendGoogleWelcomeEmail = async (email, name, requiresProfileCompletion = true) => {
  console.log('📧 Sending Google welcome email to:', email);
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const currentYear = new Date().getFullYear();

  const profileNote = requiresProfileCompletion ? `
    <div style="margin: 25px 0; padding: 20px; background: #F5F7FA; border-left: 4px solid #0066FF; border-radius: 12px; border: 1px solid #E5E5E5;">
      <h3 style="margin: 0 0 10px 0; color: #0066FF; display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">
        <span>📝</span>
        <span>Complete Your Profile</span>
      </h3>
      <p style="margin: 0; font-size: 14px; color: #4A4A4A;">Please visit your dashboard to complete your profile information so we can personalize your tech recommendations and provide the best shopping experience for you!</p>
    </div>
  ` : '';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { 
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #1A1A1A; 
          margin: 0;
          padding: 0;
          background-color: #F5F7FA;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #FFFFFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #E5E5E5;
        }
        .header {
          background: #000000;
          padding: 35px 20px;
          text-align: center;
        }
        .header h1 {
          color: #FFFFFF;
          margin: 0;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .header h1 span:first-child {
          font-size: 32px;
        }
        .header .subtitle {
          color: #FFFFFF;
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .content {
          padding: 35px 30px;
          text-align: left;
        }
        .welcome-message {
          font-size: 16px;
          margin-bottom: 25px;
          color: #4A4A4A;
        }
        .welcome-message strong {
          color: #1A1A1A;
        }
        .google-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F5F7FA;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 13px;
          margin: 10px 0;
          border: 1px solid #E5E5E5;
          color: #4A4A4A;
        }
        .google-badge strong {
          color: #1A1A1A;
        }
        .benefits-box {
          background: #F5F7FA;
          border-left: 4px solid #0066FF;
          padding: 20px;
          margin: 25px 0;
          border-radius: 12px;
          border: 1px solid #E5E5E5;
        }
        .benefits-box h3 {
          margin: 0 0 15px 0;
          color: #0066FF;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefits-list li {
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #E5E5E5;
          color: #4A4A4A;
        }
        .benefits-list li:last-child {
          border-bottom: none;
        }
        .benefits-list li span:first-child {
          font-size: 22px;
        }
        .benefits-list li strong {
          color: #1A1A1A;
        }
        .button {
          display: inline-block;
          background: #000000;
          color: #FFFFFF;
          padding: 14px 35px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          text-align: center;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: #1A1A1A;
        }
        .footer {
          background: #F5F7FA;
          padding: 25px;
          text-align: center;
          font-size: 12px;
          color: #4A4A4A;
          border-top: 1px solid #E5E5E5;
        }
        .social-links {
          margin: 15px 0;
        }
        .social-links a {
          color: #0066FF;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .social-links a:hover {
          color: #0044CC;
        }
        .highlight {
          color: #0066FF;
          font-weight: bold;
        }
        .support-box {
          margin-top: 25px;
          padding: 20px;
          background: #F5F7FA;
          border-radius: 12px;
          border: 1px solid #E5E5E5;
        }
        .support-box p {
          color: #4A4A4A;
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        .support-box a {
          color: #0066FF;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .support-box a:hover {
          color: #0044CC;
        }
        .support-box strong {
          color: #1A1A1A;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>
            <span>🔐</span>
            <span>Welcome to Smart Gadget!</span>
            <span>🚀</span>
          </h1>
          <p class="subtitle">Premium Tech Store • Bangladesh</p>
        </div>
        
        <div class="content">
          <div class="welcome-message">
            <p>Dear <strong>${name}</strong>,</p>
            <div class="google-badge">
              <span>🔐</span>
              <span>You've signed up with <strong>Google</strong></span>
            </div>
            <p>🎉 <span class="highlight">Welcome to the Smart Gadget family!</span> We're so excited to have you join our community of tech enthusiasts!</p>
            <p>Your account has been successfully created with Google Sign-In. Get ready to explore our cutting-edge collection of gadgets and tech accessories!</p>
          </div>
          
          ${profileNote}
          
          <div class="benefits-box">
            <h3>
              <span>✨</span>
              <span>Your Smart Gadget Benefits</span>
            </h3>
            <ul class="benefits-list">
              <li><span>💻</span> <span><strong>Latest Tech</strong> - Cutting-edge gadgets at unbeatable prices</span></li>
              <li><span>🔌</span> <span><strong>Official Warranty</strong> - All products come with manufacturer warranty</span></li>
              <li><span>🚚</span> <span><strong>Express Delivery</strong> - Fast shipping across Bangladesh</span></li>
              <li><span>🛡️</span> <span><strong>24/7 Support</strong> - Our tech experts are always here to help</span></li>
              <li><span>🎯</span> <span><strong>Exclusive Deals</strong> - Special discounts for our members</span></li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/customer/dashboard" class="button">
              🚀 Go to Your Dashboard →
            </a>
          </div>
          
          <div class="support-box">
            <p><strong>📞 Need Help?</strong></p>
            <p>Our friendly tech support team is here for you!</p>
            <p style="margin: 10px 0 0 0;">
              📧 <a href="mailto:${process.env.INFO_SMTP_USER}">${process.env.INFO_SMTP_USER}</a><br>
              📞 +880 1234 567890
            </p>
          </div>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> | 
            <a href="#">Instagram</a> | 
            <a href="#">YouTube</a>
          </div>
          <p>&copy; ${currentYear} Smart Gadget. All rights reserved.</p>
          <p>Premium Tech Store • Bangladesh</p>
          <p>
            <a href="${frontendUrl}/privacy" style="color: #4A4A4A; text-decoration: none;">Privacy Policy</a> | 
            <a href="${frontendUrl}/terms" style="color: #4A4A4A; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await transporter.sendMail({
      from: `"Smart Gadget" <${process.env.INFO_SMTP_USER}>`,
      to: email,
      subject: `⚡ Welcome to Smart Gadget, ${name}! 🚀`,
      html: htmlContent
    });
    
    console.log('✅ Google welcome email sent to:', email, 'Message ID:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Google welcome email error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendGoogleWelcomeEmail
};