
// // utils/orderEmailService.js
// const nodemailer = require('nodemailer');

// // Create transporter using environment variables
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT) || 465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Verify connection
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Order Email Service - Configuration error:', error.message);
//   } else {
//     console.log('✅ Order Email Service is ready');
//     console.log(`📧 Using account: ${process.env.SMTP_USER}`);
//   }
// });

// // Smart Gadget Brand Colors - White Background with Black, White & Blue
// const BRAND_COLORS = {
//   primary: '#0066FF',        // Bold Blue
//   primaryLight: '#E8F0FE',   // Light Blue for backgrounds
//   primaryDark: '#0044CC',    // Dark Blue
//   white: '#FFFFFF',          // White
//   black: '#000000',          // Pure Black
//   text: '#1A1A1A',           // Near Black for text
//   textLight: '#4A4A4A',      // Dark Gray
//   textMuted: '#888888',      // Medium Gray
//   border: '#E5E5E5',         // Light Gray border
//   lightBg: '#F5F7FA',        // Very Light Gray background
//   success: '#0066FF',        // Blue for success
//   error: '#CC0000',          // Red for errors (keeping minimal)
//   warning: '#FF8C00'         // Orange for warnings (keeping minimal)
// };

// /**
//  * Format currency (BDT)
//  */
// const formatPrice = (price) => {
//   const numPrice = parseFloat(price) || 0;
//   return `৳${numPrice.toFixed(2)}`;
// };

// /**
//  * Format date
//  */
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     return date.toLocaleDateString('en-BD', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   } catch (e) {
//     return 'N/A';
//   }
// };

// /**
//  * Get status badge color
//  */
// const getStatusColor = (status) => {
//   const statusColors = {
//     'placed': '#0066FF',
//     'confirmed': '#0066FF',
//     'processing': '#0066FF',
//     'shipped': '#0066FF',
//     'delivered': '#0066FF',
//     'cancelled': '#CC0000'
//   };
//   return statusColors[status] || '#0066FF';
// };

// const getPaymentStatusColor = (status) => {
//   const statusColors = {
//     'pending': '#FF8C00',
//     'paid': '#0066FF',
//     'failed': '#CC0000',
//     'refunded': '#888888'
//   };
//   return statusColors[status] || '#0066FF';
// };

// /**
//  * Generate order items HTML with proper spacing between image and product name
//  */
// // const generateOrderItemsHTML = (items) => {
// //   if (!items || items.length === 0) return '<p style="color: #4A4A4A;">No items found</p>';
  
// //   let html = `
// //     <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
// //       <thead>
// //         <tr style="background: #F5F7FA; border-bottom: 2px solid #E5E5E5;">
// //           <th style="padding: 12px; text-align: left; font-weight: 600; color: #1A1A1A; font-size: 13px;">Product</th>
// //           <th style="padding: 12px; text-align: center; font-weight: 600; color: #1A1A1A; font-size: 13px;">Quantity</th>
// //           <th style="padding: 12px; text-align: right; font-weight: 600; color: #1A1A1A; font-size: 13px;">Price</th>
// //           <th style="padding: 12px; text-align: right; font-weight: 600; color: #1A1A1A; font-size: 13px;">Total</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //   `;
  
// //   items.forEach((item) => {
// //     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
// //     const totalPrice = price * item.quantity;
    
// //     // Get absolute image URL - important for email clients
// //     const imageUrl = item.image && item.image.startsWith('http') 
// //       ? item.image 
// //       : (item.image ? `http://localhost:5000${item.image}` : 'https://via.placeholder.com/60/E5E5E5/0066FF?text=SG');
    
// //     html += `
// //       <tr style="border-bottom: 1px solid #E5E5E5;">
// //         <td style="padding: 15px 12px;">
// //           <div style="display: flex; align-items: center; gap: 20px;">
// //             <img src="${imageUrl}" alt="${item.productName}" 
// //                  style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #E5E5E5;">
// //             <div style="margin-left: 5px;">
// //               <strong style="color: #1A1A1A; font-size: 15px;">${item.productName}</strong>
// //               ${item.discountPrice > 0 ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #0066FF;">🎉 Sale Price Applied</p>` : ''}
// //             </div>
// //           </div>
// //         </td>
// //         <td style="padding: 15px 12px; text-align: center; font-size: 14px; color: #4A4A4A;">${item.quantity}</td>
// //         <td style="padding: 15px 12px; text-align: right; font-size: 14px; color: #4A4A4A;">${formatPrice(price)}</td>
// //         <td style="padding: 15px 12px; text-align: right; font-weight: 600; color: #0066FF; font-size: 14px;">${formatPrice(totalPrice)}</td>
// //       </tr>
// //     `;
// //   });
  
// //   html += `
// //       </tbody>
// //     </table>
// //   `;
  
// //   return html;
// // };


// // In utils/orderEmailService.js
// const generateOrderItemsHTML = (items) => {
//   if (!items || items.length === 0) return '<p style="color: #4A4A4A;">No items found</p>';
  
//   let html = `
//     <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
//       <thead>
//         <tr style="background: #F5F7FA; border-bottom: 2px solid #E5E5E5;">
//           <th style="padding: 12px; text-align: left; font-weight: 600; color: #1A1A1A; font-size: 13px;">Product</th>
//           <th style="padding: 12px; text-align: center; font-weight: 600; color: #1A1A1A; font-size: 13px;">Quantity</th>
//           <th style="padding: 12px; text-align: right; font-weight: 600; color: #1A1A1A; font-size: 13px;">Price</th>
//           <th style="padding: 12px; text-align: right; font-weight: 600; color: #1A1A1A; font-size: 13px;">Total</th>
//         </tr>
//       </thead>
//       <tbody>
//   `;
  
//   items.forEach((item) => {
//     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//     const totalPrice = price * item.quantity;
//     const unit = item.unit || 'pcs';
    
//     const imageUrl = item.image && item.image.startsWith('http') 
//       ? item.image 
//       : (item.image ? `http://localhost:5000${item.image}` : 'https://via.placeholder.com/60/E5E5E5/0066FF?text=SG');
    
//     // Format price with unit
//     const formattedPrice = `${formatPrice(price)}/${unit}`;
    
//     html += `
//       <tr style="border-bottom: 1px solid #E5E5E5;">
//         <td style="padding: 15px 12px;">
//           <div style="display: flex; align-items: center; gap: 20px;">
//             <img src="${imageUrl}" alt="${item.productName}" 
//                  style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #E5E5E5;">
//             <div style="margin-left: 5px;">
//               <strong style="color: #1A1A1A; font-size: 15px;">${item.productName}</strong>
//               ${item.discountPrice > 0 ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #0066FF;">🎉 Sale Price Applied</p>` : ''}
//             </div>
//           </div>
//         </td>
//         <td style="padding: 15px 12px; text-align: center; font-size: 14px; color: #4A4A4A;">${item.quantity}</td>
//         <td style="padding: 15px 12px; text-align: right; font-size: 14px; color: #4A4A4A;">${formattedPrice}</td>
//         <td style="padding: 15px 12px; text-align: right; font-weight: 600; color: #0066FF; font-size: 14px;">${formatPrice(totalPrice)}</td>
//       </tr>
//     `;
//   });
  
//   html += `
//       </tbody>
//     </table>
//   `;
  
//   return html;
// };
// /**
//  * Generate order summary HTML
//  */
// const generateOrderSummaryHTML = (order) => {
//   const statusColor = getStatusColor(order.orderStatus);
//   const paymentStatusColor = getPaymentStatusColor(order.paymentStatus);
  
//   return `
//     <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #E5E5E5;">
//       <h2 style="margin: 0 0 15px 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">Order Summary</h2>
//       <table style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <td style="padding: 8px 0; width: 140px; color: #4A4A4A;"><strong>Order ID:</strong></td>
//           <td style="color: #0066FF; font-weight: 600;">${order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Order Date:</strong></td>
//           <td style="color: #1A1A1A;">${formatDate(order.createdAt)}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Order Status:</strong></td>
//           <td><span style="display: inline-block; padding: 4px 12px; background: ${statusColor}20; color: ${statusColor}; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.orderStatus.toUpperCase()}</span></td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Payment Status:</strong></td>
//           <td><span style="display: inline-block; padding: 4px 12px; background: ${paymentStatusColor}20; color: ${paymentStatusColor}; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.paymentStatus.toUpperCase()}</span></td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Payment Method:</strong></td>
//           <td style="color: #1A1A1A;">${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</td>
//         </tr>
//         ${order.paymentMethod === 'cod' ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Payment Due:</strong></td>
//           <td style="color: #1A1A1A;">Pay when you receive your gadgets</td>
//         </tr>
//         ` : ''}
//       </table>
//     </div>
//   `;
// };

// /**
//  * Generate pricing breakdown HTML
//  */
// const generatePricingHTML = (order) => {
//   return `
//     <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #E5E5E5;">
//       <h2 style="margin: 0 0 15px 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">Price Breakdown</h2>
//       <table style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Subtotal:</strong></td>
//           <td style="text-align: right; color: #1A1A1A;">${formatPrice(order.subtotal)}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Shipping:</strong></td>
//           <td style="text-align: right; color: #1A1A1A;">${formatPrice(order.shippingCost)}</td>
//         </tr>
//         ${order.discount > 0 ? `
//         <tr>
//           <td style="padding: 8px 0; color: #0066FF;"><strong>Discount:</strong></td>
//           <td style="text-align: right; color: #0066FF;">-${formatPrice(order.discount)}</td>
//         </tr>
//         ${order.couponCode ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Coupon Applied:</strong></td>
//           <td style="text-align: right; color: #0066FF; font-weight: 600;">${order.couponCode}</td>
//         </tr>
//         ` : ''}
//         ` : ''}
//         <tr style="border-top: 2px solid #E5E5E5; margin-top: 10px;">
//           <td style="padding: 12px 0 0 0; font-size: 18px; font-weight: bold; color: #1A1A1A;"><strong>Total:</strong></td>
//           <td style="padding: 12px 0 0 0; text-align: right; font-size: 20px; font-weight: bold; color: #0066FF;">${formatPrice(order.total)}</td>
//         </tr>
//       </table>
//     </div>
//   `;
// };

// /**
//  * Generate customer info HTML
//  */
// const generateCustomerInfoHTML = (order) => {
//   return `
//     <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #E5E5E5;">
//       <h2 style="margin: 0 0 15px 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">Customer Information</h2>
//       <table style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <td style="padding: 8px 0; width: 120px; color: #4A4A4A;"><strong>Name:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo?.fullName || 'N/A'}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Email:</strong></td>
//           <td><a href="mailto:${order.customerInfo?.email}" style="color: #0066FF; text-decoration: none; font-weight: 600;">${order.customerInfo?.email}</a></td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Phone:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo?.phone || 'N/A'}</td>
//         </tr>
      
//         ${order.customerInfo?.whatsapp ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>WhatsApp:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo.whatsapp}</td>
//         </tr>
//         ` : ''}
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Address:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo?.address || 'N/A'}</td>
//         </tr>
//           <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Division:</strong></td>
//           <td style="color: #1A1A1A; font-weight: 600;">${order.customerInfo?.division || 'N/A'}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>City:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo?.city || 'N/A'}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Upazila/Thana:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo?.zone || 'N/A'}</td>
//         </tr>
//         ${order.customerInfo?.area ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Union/Area:</strong></td>
//           <td style="color: #1A1A1A;">${order.customerInfo.area}</td>
//         </tr>
//         ` : ''}
//         ${order.customerInfo?.note ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Order Note:</strong></td>
//           <td style="color: #4A4A4A;">${order.customerInfo.note}</td>
//         </tr>
//         ` : ''}
//       </table>
//     </div>
//   `;
// };

// /**
//  * Generate delivery info HTML - Shows delivery note and cancellation reason for all order statuses
//  */
// const generateDeliveryInfoHTML = (order) => {
//   // Check if there's any delivery information to show
//   const hasDeliveryNote = order.deliveryNote && order.deliveryNote.trim() !== '';
//   const hasTrackingNumber = order.trackingNumber && order.trackingNumber.trim() !== '';
//   const hasDeliveredDate = order.deliveredAt && order.orderStatus === 'delivered';
//   const hasCancellationReason = order.cancellationReason && order.cancellationReason.trim() !== '' && order.orderStatus === 'cancelled';
  
//   // If no information at all, return empty
//   if (!hasDeliveryNote && !hasTrackingNumber && !hasDeliveredDate && !hasCancellationReason) {
//     return '';
//   }
  
//   // Determine the background color based on order status
//   let bgColor = '#F5F7FA';
//   let borderColor = '#0066FF';
//   let titleColor = '#1A1A1A';
//   let titleIcon = '📝';
  
//   if (order.orderStatus === 'delivered') {
//     bgColor = '#E8F0FE';
//     borderColor = '#0066FF';
//     titleColor = '#0066FF';
//     titleIcon = '✅';
//   } else if (order.orderStatus === 'shipped') {
//     bgColor = '#E8F0FE';
//     borderColor = '#0066FF';
//     titleColor = '#0066FF';
//     titleIcon = '🚚';
//   } else if (order.orderStatus === 'cancelled') {
//     bgColor = '#FEE2E2';
//     borderColor = '#CC0000';
//     titleColor = '#CC0000';
//     titleIcon = '❌';
//   } else if (order.orderStatus === 'confirmed') {
//     bgColor = '#E8F0FE';
//     borderColor = '#0066FF';
//     titleColor = '#0066FF';
//     titleIcon = '✅';
//   } else if (order.orderStatus === 'processing') {
//     bgColor = '#E8F0FE';
//     borderColor = '#0066FF';
//     titleColor = '#0066FF';
//     titleIcon = '⚙️';
//   }
  
//   return `
//     <div style="background: ${bgColor}; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${borderColor}; border: 1px solid ${borderColor}30;">
//       <h2 style="margin: 0 0 15px 0; color: ${titleColor}; font-size: 18px; display: flex; align-items: center; gap: 8px; font-weight: 700;">
//         <span>${titleIcon}</span> <span>${order.orderStatus === 'cancelled' ? 'Cancellation Information' : 'Delivery Information'}</span>
//       </h2>
//       <table style="width: 100%; border-collapse: collapse;">
//         ${hasCancellationReason ? `
//         <tr>
//           <td style="padding: 8px 0; width: 140px; color: #4A4A4A;"><strong>Cancellation Reason:</strong></td>
//           <td><div style="background: #FFFFFF; padding: 12px; border-radius: 8px; margin-top: 5px; color: #CC0000; border: 1px solid #E5E5E5;">${order.cancellationReason}</div></td>
//         </tr>
//         ` : ''}
//         ${hasDeliveredDate ? `
//         <tr>
//           <td style="padding: 8px 0; width: 140px; color: #4A4A4A;"><strong>Delivered Date:</strong></td>
//           <td style="color: #1A1A1A;">${formatDate(order.deliveredAt)}</td>
//         </tr>
//         ` : ''}
//         ${hasTrackingNumber ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Tracking Number:</strong></td>
//           <td><code style="background: #FFFFFF; padding: 4px 8px; border-radius: 4px; color: #0066FF; border: 1px solid #E5E5E5; font-weight: 600;">${order.trackingNumber}</code></td>
//         </tr>
//         ` : ''}
//         ${hasDeliveryNote ? `
//         <tr>
//           <td style="padding: 8px 0; color: #4A4A4A;"><strong>Delivery Note:</strong></td>
//           <td><div style="background: #FFFFFF; padding: 12px; border-radius: 8px; margin-top: 5px; color: #1A1A1A; border: 1px solid #E5E5E5;">${order.deliveryNote}</div></td>
//         </tr>
//         ` : ''}
//       </table>
//     </div>
//   `;
// };

// /**
//  * Send order placed email to customer
//  */
// const sendOrderPlacedEmail = async (order, customerEmail) => {
//   console.log('📧 Sending order placed email to customer...');
  
//   try {
//     if (!customerEmail) {
//       throw new Error('Customer email is missing');
//     }

//     const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//     const itemsHTML = generateOrderItemsHTML(order.items);
//     const summaryHTML = generateOrderSummaryHTML(order);
//     const pricingHTML = generatePricingHTML(order);
//     const customerInfoHTML = generateCustomerInfoHTML(order);
//     const deliveryInfoHTML = generateDeliveryInfoHTML(order);

//     const result = await transporter.sendMail({
//       from: `"Smart Gadget" <${process.env.SMTP_USER}>`,
//       to: customerEmail,
//       subject: `📦 Order Placed! Order #${order.orderNumber || order._id.slice(-8).toUpperCase()} - Smart Gadget`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <style>
//             body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F5F7FA; }
//             .container { max-width: 700px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
//             .header { background: #000000; padding: 30px; text-align: center; }
//             .header h1 { color: #FFFFFF; margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 700; letter-spacing: 0.5px; }
//             .header p { color: #FFFFFF; margin: 10px 0 0 0; opacity: 0.9; }
//             .content { padding: 35px 30px; }
//             .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; display: flex; align-items: center; gap: 8px; color: #1A1A1A; }
//             .button { background: #000000; color: #FFFFFF; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: none; }
//             .button:hover { background: #1A1A1A; }
//             .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; }
//             p { color: #4A4A4A; }
//             strong { color: #1A1A1A; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>
//                 <span>📦</span>
//                 <span>Order Placed!</span>
//               </h1>
//               <p>Your order has been received and is pending confirmation</p>
//             </div>
//             <div class="content">
//               <p style="margin-bottom: 25px; font-size: 16px;">Dear <strong>${order.customerInfo?.fullName || 'Valued Customer'}</strong>,</p>
//               <p style="margin-bottom: 25px; font-size: 16px;">Thank you for your order! We have received your order and it is now pending confirmation. You will receive another email once your order is confirmed.</p>
              
//               ${summaryHTML}
//               ${customerInfoHTML}
//               ${deliveryInfoHTML}
              
//               <div class="section-title">
//                 <span>📦</span>
//                 <span>Order Items</span>
//               </div>
//               ${itemsHTML}
              
//               ${pricingHTML}
              
//               <div style="margin: 35px 0 25px; text-align: center;">
//                 <a href="${frontendUrl}/customer/orders" class="button">Track Your Order</a>
//               </div>
              
//               <div class="footer">
//                 <p style="margin-bottom: 5px;">Best regards,</p>
//                 <p style="margin: 0; font-weight: bold; color: #0066FF;">Smart Gadget Team</p>
//                 <p style="font-size: 12px; color: #888888; margin-top: 15px;">Need help? Contact us at ${process.env.SMTP_USER}</p>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });
    
//     console.log('✅ Order placed email sent:', result.messageId);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Order placed email error:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Send order notification email to admin (for new orders and status updates)
//  */
// const sendOrderNotificationToAdmin = async (order, eventType = 'new') => {
//   console.log('📧 Sending order notification email to admin...');
  
//   try {
//     const adminEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;
//     const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//     const itemsHTML = generateOrderItemsHTML(order.items);
//     const summaryHTML = generateOrderSummaryHTML(order);
//     const pricingHTML = generatePricingHTML(order);
//     const customerInfoHTML = generateCustomerInfoHTML(order);
    
//     // Set header based on event type
//     let headerTitle = '';
//     let headerEmoji = '';
//     let additionalMessage = '';
    
//     if (eventType === 'new') {
//       headerTitle = 'New Order Received!';
//       headerEmoji = '🛍️';
//       additionalMessage = 'A new order has been placed and requires your attention.';
//     } else if (eventType === 'status_update') {
//       const statusInfo = {
//         'confirmed': { title: 'Order Confirmed', emoji: '✅' },
//         'processing': { title: 'Order Processing', emoji: '⚙️' },
//         'shipped': { title: 'Order Shipped', emoji: '🚚' },
//         'delivered': { title: 'Order Delivered', emoji: '📦' },
//         'cancelled': { title: 'Order Cancelled', emoji: '❌' }
//       };
//       const info = statusInfo[order.orderStatus] || { title: 'Order Updated', emoji: '📝' };
//       headerTitle = info.title;
//       headerEmoji = info.emoji;
//       additionalMessage = `Order status has been updated to "${order.orderStatus.toUpperCase()}".`;
//     } else if (eventType === 'payment_update') {
//       const paymentInfo = {
//         'paid': { title: 'Payment Received', emoji: '💰' },
//         'failed': { title: 'Payment Failed', emoji: '⚠️' },
//         'refunded': { title: 'Payment Refunded', emoji: '💸' }
//       };
//       const info = paymentInfo[order.paymentStatus] || { title: 'Payment Updated', emoji: '💳' };
//       headerTitle = info.title;
//       headerEmoji = info.emoji;
//       additionalMessage = `Payment status has been updated to "${order.paymentStatus.toUpperCase()}".`;
//     }
    
//     const result = await transporter.sendMail({
//       from: `"Smart Gadget System" <${process.env.SMTP_USER}>`,
//       to: adminEmail,
//       subject: `${headerEmoji} ${headerTitle} - Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <style>
//             body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; background-color: #F5F7FA; }
//             .container { max-width: 700px; margin: 20px auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
//             .header { background: #000000; padding: 25px 30px; text-align: center; }
//             .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 700; }
//             .content { padding: 30px; }
//             .button { background: #000000; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; border: none; }
//             .button:hover { background: #1A1A1A; }
//             .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; color: #1A1A1A; }
//             p { color: #4A4A4A; }
//             strong { color: #1A1A1A; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>
//                 <span>${headerEmoji}</span>
//                 <span>${headerTitle}</span>
//               </h1>
//             </div>
//             <div class="content">
//               <p>${additionalMessage}</p>
              
//               ${customerInfoHTML}
//               ${summaryHTML}
              
//               <div class="section-title">📦 Order Items</div>
//               ${itemsHTML}
              
//               ${pricingHTML}
              
//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="${frontendUrl}/admin/orders" class="button">View Order in Dashboard</a>
//               </div>
              
//               <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #F59E0B;">
//                 <p style="margin: 0; font-size: 14px; color: #92400E;">⚠️ Please review and take necessary action.</p>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });
    
//     console.log('✅ Admin order notification sent:', result.messageId);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Admin notification error:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Send order status update email to customer
//  */
// const sendOrderStatusUpdateEmail = async (order, customerEmail, oldStatus, newStatus) => {
//   console.log('📧 Sending order status update email with full details...');
  
//   try {
//     if (!customerEmail) {
//       throw new Error('Customer email is missing');
//     }
    
//     const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//     const newStatusColor = getStatusColor(newStatus);
//     const itemsHTML = generateOrderItemsHTML(order.items);
//     const summaryHTML = generateOrderSummaryHTML(order);
//     const pricingHTML = generatePricingHTML(order);
//     const customerInfoHTML = generateCustomerInfoHTML(order);
//     const deliveryInfoHTML = generateDeliveryInfoHTML(order);
    
//     let statusTitle = '';
//     let statusMessage = '';
//     let statusEmoji = '';
    
//     switch(newStatus) {
//       case 'confirmed':
//         statusTitle = 'Order Confirmed!';
//         statusMessage = 'Great news! Your order has been confirmed and is being prepared for shipment. Our team is working hard to pack your items carefully.';
//         statusEmoji = '✅';
//         break;
//       case 'processing':
//         statusTitle = 'Order Processing';
//         statusMessage = 'Your order is now being processed. Our team is preparing your items for shipment.';
//         statusEmoji = '⚙️';
//         break;
//       case 'shipped':
//         statusTitle = 'Order Shipped!';
//         statusMessage = 'Your order has been shipped and is on its way to you! Get ready to receive your wonderful products.';
//         statusEmoji = '🚚';
//         break;
//       case 'delivered':
//         statusTitle = 'Order Delivered!';
//         statusMessage = 'Your order has been delivered! We hope you love your new items. Thank you for shopping with us!';
//         statusEmoji = '🎁';
//         break;
//       case 'cancelled':
//         statusTitle = 'Order Cancelled';
//         statusMessage = 'Your order has been cancelled. If you have any questions, please contact our support team.';
//         statusEmoji = '❌';
//         break;
//       default:
//         statusTitle = `Order ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`;
//         statusMessage = `Your order status has been updated to ${newStatus}.`;
//         statusEmoji = '📝';
//     }
    
//     const result = await transporter.sendMail({
//       from: `"Smart Gadget" <${process.env.SMTP_USER}>`,
//       to: customerEmail,
//       subject: `${statusEmoji} ${statusTitle} - Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <style>
//             body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F5F7FA; }
//             .container { max-width: 700px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
//             .header { background: #000000; padding: 30px; text-align: center; }
//             .header h1 { color: #FFFFFF; margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 700; }
//             .header p { color: #FFFFFF; margin: 10px 0 0 0; opacity: 0.9; }
//             .content { padding: 35px 30px; }
//             .status-box { background: ${newStatusColor}10; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${newStatusColor}; border: 1px solid ${newStatusColor}30; }
//             .status-badge { display: inline-block; padding: 8px 24px; background: ${newStatusColor}; color: #FFFFFF; border-radius: 40px; font-weight: 600; text-transform: uppercase; font-size: 14px; }
//             .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; display: flex; align-items: center; gap: 8px; color: #1A1A1A; }
//             .button { background: #000000; color: #FFFFFF; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: none; }
//             .button:hover { background: #1A1A1A; }
//             .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; }
//             p { color: #4A4A4A; }
//             strong { color: #1A1A1A; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>
//                 <span>${statusEmoji}</span>
//                 <span>${statusTitle}</span>
//               </h1>
//               <p>Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//             </div>
//             <div class="content">
//               <p style="margin-bottom: 25px; font-size: 16px;">Dear <strong>${order.customerInfo?.fullName || 'Valued Customer'}</strong>,</p>
              
//               <div class="status-box">
//                 <div class="status-badge">${newStatus.toUpperCase()}</div>
//                 <p style="margin: 15px 0 0 0;">${statusMessage}</p>
//               </div>
              
//               ${summaryHTML}
//               ${customerInfoHTML}
//               ${deliveryInfoHTML}
              
//               <div class="section-title">
//                 <span>📦</span>
//                 <span>Order Items</span>
//               </div>
//               ${itemsHTML}
              
//               ${pricingHTML}
              
//               <div style="margin: 35px 0 25px; text-align: center;">
//                 <a href="${frontendUrl}/customer/orders" class="button">View Order Details</a>
//               </div>
              
//               <div class="footer">
//                 <p style="margin-bottom: 5px;">Best regards,</p>
//                 <p style="margin: 0; font-weight: bold; color: #0066FF;">Smart Gadget Team</p>
//                 <p style="font-size: 12px; color: #888888; margin-top: 15px;">Need help? Contact us at ${process.env.SMTP_USER}</p>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });
    
//     console.log('✅ Order status update email sent:', result.messageId);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Status update email error:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Send payment status update email to customer
//  */
// const sendPaymentStatusUpdateEmail = async (order, customerEmail, oldStatus, newStatus) => {
//   console.log('📧 Sending payment status update email...');
  
//   try {
//     if (!customerEmail) {
//       throw new Error('Customer email is missing');
//     }
    
//     const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//     const itemsHTML = generateOrderItemsHTML(order.items);
//     const summaryHTML = generateOrderSummaryHTML(order);
//     const pricingHTML = generatePricingHTML(order);
//     const customerInfoHTML = generateCustomerInfoHTML(order);
    
//     let statusMessage = '';
//     let statusEmoji = '';
//     let statusColor = '#0066FF';
    
//     switch(newStatus) {
//       case 'paid':
//         statusMessage = 'Your payment has been successfully received. Thank you for your purchase!';
//         statusEmoji = '✅';
//         statusColor = '#0066FF';
//         break;
//       case 'failed':
//         statusMessage = 'Your payment has failed. Please try again or contact your bank.';
//         statusEmoji = '❌';
//         statusColor = '#CC0000';
//         break;
//       case 'refunded':
//         statusMessage = 'Your payment has been refunded. The amount will be credited back to your original payment method within 3-5 business days.';
//         statusEmoji = '💰';
//         statusColor = '#888888';
//         break;
//       default:
//         statusMessage = `Your payment status has been updated to ${newStatus}.`;
//         statusEmoji = '📝';
//         statusColor = '#0066FF';
//     }
    
//     const result = await transporter.sendMail({
//       from: `"Smart Gadget" <${process.env.SMTP_USER}>`,
//       to: customerEmail,
//       subject: `${statusEmoji} Payment Status Update - Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <style>
//             body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F5F7FA; }
//             .container { max-width: 700px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
//             .header { background: #000000; padding: 30px; text-align: center; }
//             .header h1 { color: #FFFFFF; margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 700; }
//             .header p { color: #FFFFFF; margin: 10px 0 0 0; opacity: 0.9; }
//             .content { padding: 35px 30px; }
//             .status-box { background: ${statusColor}10; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${statusColor}; border: 1px solid ${statusColor}30; }
//             .status-badge { display: inline-block; padding: 8px 24px; background: ${statusColor}; color: #FFFFFF; border-radius: 40px; font-weight: 600; text-transform: uppercase; font-size: 14px; }
//             .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; display: flex; align-items: center; gap: 8px; color: #1A1A1A; }
//             .button { background: #000000; color: #FFFFFF; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: none; }
//             .button:hover { background: #1A1A1A; }
//             .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; }
//             p { color: #4A4A4A; }
//             strong { color: #1A1A1A; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>
//                 <span>${statusEmoji}</span>
//                 <span>Payment Status Update</span>
//               </h1>
//               <p>Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//             </div>
//             <div class="content">
//               <p style="margin-bottom: 25px; font-size: 16px;">Dear <strong>${order.customerInfo?.fullName || 'Valued Customer'}</strong>,</p>
              
//               <div class="status-box">
//                 <div class="status-badge">${newStatus.toUpperCase()}</div>
//                 <p style="margin: 15px 0 0 0;">${statusMessage}</p>
//               </div>
              
//               ${summaryHTML}
//               ${customerInfoHTML}
              
//               <div class="section-title">
//                 <span>📦</span>
//                 <span>Order Items</span>
//               </div>
//               ${itemsHTML}
              
//               ${pricingHTML}
              
//               <div style="margin: 35px 0 25px; text-align: center;">
//                 <a href="${frontendUrl}/customer/orders" class="button">View Order Details</a>
//               </div>
              
//               <div class="footer">
//                 <p style="margin-bottom: 5px;">Best regards,</p>
//                 <p style="margin: 0; font-weight: bold; color: #0066FF;">Smart Gadget Team</p>
//                 <p style="font-size: 12px; color: #888888; margin-top: 15px;">Need help? Contact us at ${process.env.SMTP_USER}</p>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });
    
//     console.log('✅ Payment status update email sent:', result.messageId);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Payment status update email error:', error.message);
//     return { success: false, error: error.message };
//   }
// };

// // Export all email functions
// module.exports = {
//   sendOrderPlacedEmail,
//   sendOrderNotificationToAdmin,
//   sendOrderStatusUpdateEmail,
//   sendPaymentStatusUpdateEmail
// };


// utils/orderEmailService.js
const nodemailer = require('nodemailer');

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Order Email Service - Configuration error:', error.message);
  } else {
    console.log('✅ Order Email Service is ready');
    console.log(`📧 Using account: ${process.env.SMTP_USER}`);
  }
});

// Smart Gadget Brand Colors - White Background with Black, White & Blue
const BRAND_COLORS = {
  primary: '#0066FF',
  primaryLight: '#E8F0FE',
  primaryDark: '#0044CC',
  white: '#FFFFFF',
  black: '#000000',
  text: '#1A1A1A',
  textLight: '#4A4A4A',
  textMuted: '#888888',
  border: '#E5E5E5',
  lightBg: '#F5F7FA',
  success: '#0066FF',
  error: '#CC0000',
  warning: '#FF8C00'
};

/**
 * Format currency (BDT)
 */
const formatPrice = (price) => {
  const numPrice = parseFloat(price) || 0;
  return `৳${numPrice.toFixed(2)}`;
};

/**
 * Format date
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'N/A';
  }
};

/**
 * Get status badge color
 */
const getStatusColor = (status) => {
  const statusColors = {
    'placed': '#0066FF',
    'confirmed': '#0066FF',
    'processing': '#0066FF',
    'shipped': '#0066FF',
    'delivered': '#0066FF',
    'cancelled': '#CC0000'
  };
  return statusColors[status] || '#0066FF';
};

const getPaymentStatusColor = (status) => {
  const statusColors = {
    'pending': '#FF8C00',
    'paid': '#0066FF',
    'failed': '#CC0000',
    'refunded': '#888888'
  };
  return statusColors[status] || '#0066FF';
};

/**
 * Generate order items HTML with color-wise quantity display
 */
const generateOrderItemsHTML = (items) => {
  if (!items || items.length === 0) return '<p style="color: #4A4A4A;">No items found</p>';
  
  let html = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <thead>
        <tr style="background: #F5F7FA; border-bottom: 2px solid #E5E5E5;">
          <th style="padding: 12px; text-align: left; font-weight: 600; color: #1A1A1A; font-size: 13px;">Product</th>
          <th style="padding: 12px; text-align: center; font-weight: 600; color: #1A1A1A; font-size: 13px;">Color</th>
          <th style="padding: 12px; text-align: center; font-weight: 600; color: #1A1A1A; font-size: 13px;">Quantity</th>
          <th style="padding: 12px; text-align: right; font-weight: 600; color: #1A1A1A; font-size: 13px;">Price</th>
          <th style="padding: 12px; text-align: right; font-weight: 600; color: #1A1A1A; font-size: 13px;">Total</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Helper function to check if item has colors array
  const hasColorsArray = (item) => {
    return item.colors && item.colors.length > 0;
  };

  // Helper function to get total quantity
  const getTotalQuantity = (item) => {
    if (hasColorsArray(item)) {
      return item.colors.reduce((sum, c) => sum + c.quantity, 0);
    }
    return item.quantity || 0;
  };

  items.forEach((item) => {
    const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
    const unit = item.unit || 'pcs';
    const imageUrl = item.image && item.image.startsWith('http') 
      ? item.image 
      : (item.image ? `http://localhost:5000${item.image}` : 'https://via.placeholder.com/60/E5E5E5/0066FF?text=SG');
    
    // Check if item has colors array
    if (hasColorsArray(item)) {
      // Multi-color product - show each color in separate row
      item.colors.forEach((colorObj, index) => {
        const colorTotal = price * colorObj.quantity;
        const formattedPrice = `${formatPrice(price)}/${unit}`;
        
        html += `
          <tr style="border-bottom: 1px solid #E5E5E5;">
            <td style="padding: 15px 12px;">
              ${index === 0 ? `
              <div style="display: flex; align-items: center; gap: 20px;">
                <img src="${imageUrl}" alt="${item.productName}" 
                     style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #E5E5E5;">
                <div style="margin-left: 5px;">
                  <strong style="color: #1A1A1A; font-size: 15px;">${item.productName}</strong>
                  ${item.discountPrice > 0 ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #0066FF;">🎉 Sale Price Applied</p>` : ''}
                </div>
              </div>
              ` : `
              <div style="display: flex; align-items: center; gap: 20px; padding-left: 90px;">
                <div style="margin-left: 5px;">
                  <span style="color: #888888; font-size: 13px;">↳ ${item.productName}</span>
                </div>
              </div>
              `}
            </td>
            <td style="padding: 15px 12px; text-align: center; vertical-align: middle;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #E5E5E5; background-color: ${colorObj.color}; vertical-align: middle;"></span>
              </div>
            </td>
            <td style="padding: 15px 12px; text-align: center; font-size: 14px; color: #4A4A4A; vertical-align: middle;">${colorObj.quantity}</td>
            <td style="padding: 15px 12px; text-align: right; font-size: 14px; color: #4A4A4A; vertical-align: middle;">${formattedPrice}</td>
            <td style="padding: 15px 12px; text-align: right; font-weight: 600; color: #0066FF; font-size: 14px; vertical-align: middle;">${formatPrice(colorTotal)}</td>
          </tr>
        `;
      });
    } else {
      // Single item without colors
      const totalPrice = price * (item.quantity || 0);
      const formattedPrice = `${formatPrice(price)}/${unit}`;
      const hasColor = item.selectedColor && item.selectedColor !== null && item.selectedColor !== '';
      
      html += `
        <tr style="border-bottom: 1px solid #E5E5E5;">
          <td style="padding: 15px 12px;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <img src="${imageUrl}" alt="${item.productName}" 
                   style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #E5E5E5;">
              <div style="margin-left: 5px;">
                <strong style="color: #1A1A1A; font-size: 15px;">${item.productName}</strong>
                ${item.discountPrice > 0 ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #0066FF;">🎉 Sale Price Applied</p>` : ''}
              </div>
            </div>
          </td>
          <td style="padding: 15px 12px; text-align: center; vertical-align: middle;">
            ${hasColor ? `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #E5E5E5; background-color: ${item.selectedColor}; vertical-align: middle;"></span>
            </div>
            ` : `
            <span style="color: #888888; font-size: 12px;">—</span>
            `}
          </td>
          <td style="padding: 15px 12px; text-align: center; font-size: 14px; color: #4A4A4A; vertical-align: middle;">${item.quantity}</td>
          <td style="padding: 15px 12px; text-align: right; font-size: 14px; color: #4A4A4A; vertical-align: middle;">${formattedPrice}</td>
          <td style="padding: 15px 12px; text-align: right; font-weight: 600; color: #0066FF; font-size: 14px; vertical-align: middle;">${formatPrice(totalPrice)}</td>
        </tr>
      `;
    }
  });
  
  html += `
      </tbody>
    </table>
  `;
  
  return html;
};

/**
 * Generate order summary HTML
 */
const generateOrderSummaryHTML = (order) => {
  const statusColor = getStatusColor(order.orderStatus);
  const paymentStatusColor = getPaymentStatusColor(order.paymentStatus);
  
  return `
    <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #E5E5E5;">
      <h2 style="margin: 0 0 15px 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">Order Summary</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; width: 140px; color: #4A4A4A;"><strong>Order ID:</strong></td>
          <td style="color: #0066FF; font-weight: 600;">${order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Order Date:</strong></td>
          <td style="color: #1A1A1A;">${formatDate(order.createdAt)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Order Status:</strong></td>
          <td><span style="display: inline-block; padding: 4px 12px; background: ${statusColor}20; color: ${statusColor}; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.orderStatus.toUpperCase()}</span></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Payment Status:</strong></td>
          <td><span style="display: inline-block; padding: 4px 12px; background: ${paymentStatusColor}20; color: ${paymentStatusColor}; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.paymentStatus.toUpperCase()}</span></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Payment Method:</strong></td>
          <td style="color: #1A1A1A;">${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</td>
        </tr>
        ${order.paymentMethod === 'cod' ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Payment Due:</strong></td>
          <td style="color: #1A1A1A;">Pay when you receive your gadgets</td>
        </tr>
        ` : ''}
      </table>
    </div>
  `;
};

/**
 * Generate pricing breakdown HTML
 */
const generatePricingHTML = (order) => {
  return `
    <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #E5E5E5;">
      <h2 style="margin: 0 0 15px 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">Price Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Subtotal:</strong></td>
          <td style="text-align: right; color: #1A1A1A;">${formatPrice(order.subtotal)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Shipping:</strong></td>
          <td style="text-align: right; color: #1A1A1A;">${formatPrice(order.shippingCost)}</td>
        </tr>
        ${order.discount > 0 ? `
        <tr>
          <td style="padding: 8px 0; color: #0066FF;"><strong>Discount:</strong></td>
          <td style="text-align: right; color: #0066FF;">-${formatPrice(order.discount)}</td>
        </tr>
        ${order.couponCode ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Coupon Applied:</strong></td>
          <td style="text-align: right; color: #0066FF; font-weight: 600;">${order.couponCode}</td>
        </tr>
        ` : ''}
        ` : ''}
        <tr style="border-top: 2px solid #E5E5E5; margin-top: 10px;">
          <td style="padding: 12px 0 0 0; font-size: 18px; font-weight: bold; color: #1A1A1A;"><strong>Total:</strong></td>
          <td style="padding: 12px 0 0 0; text-align: right; font-size: 20px; font-weight: bold; color: #0066FF;">${formatPrice(order.total)}</td>
        </tr>
      </table>
    </div>
  `;
};

/**
 * Generate customer info HTML
 */
const generateCustomerInfoHTML = (order) => {
  return `
    <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #E5E5E5;">
      <h2 style="margin: 0 0 15px 0; color: #1A1A1A; font-size: 18px; font-weight: 700;">Customer Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; width: 120px; color: #4A4A4A;"><strong>Name:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo?.fullName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Email:</strong></td>
          <td><a href="mailto:${order.customerInfo?.email}" style="color: #0066FF; text-decoration: none; font-weight: 600;">${order.customerInfo?.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Phone:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo?.phone || 'N/A'}</td>
        </tr>
      
        ${order.customerInfo?.whatsapp ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>WhatsApp:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo.whatsapp}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Address:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo?.address || 'N/A'}</td>
        </tr>
          <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Division:</strong></td>
          <td style="color: #1A1A1A; font-weight: 600;">${order.customerInfo?.division || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>City:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo?.city || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Upazila/Thana:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo?.zone || 'N/A'}</td>
        </tr>
        ${order.customerInfo?.area ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Union/Area:</strong></td>
          <td style="color: #1A1A1A;">${order.customerInfo.area}</td>
        </tr>
        ` : ''}
        ${order.customerInfo?.note ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Order Note:</strong></td>
          <td style="color: #4A4A4A;">${order.customerInfo.note}</td>
        </tr>
        ` : ''}
      </table>
    </div>
  `;
};

/**
 * Generate delivery info HTML - Shows delivery note and cancellation reason for all order statuses
 */
const generateDeliveryInfoHTML = (order) => {
  // Check if there's any delivery information to show
  const hasDeliveryNote = order.deliveryNote && order.deliveryNote.trim() !== '';
  const hasTrackingNumber = order.trackingNumber && order.trackingNumber.trim() !== '';
  const hasDeliveredDate = order.deliveredAt && order.orderStatus === 'delivered';
  const hasCancellationReason = order.cancellationReason && order.cancellationReason.trim() !== '' && order.orderStatus === 'cancelled';
  
  // If no information at all, return empty
  if (!hasDeliveryNote && !hasTrackingNumber && !hasDeliveredDate && !hasCancellationReason) {
    return '';
  }
  
  // Determine the background color based on order status
  let bgColor = '#F5F7FA';
  let borderColor = '#0066FF';
  let titleColor = '#1A1A1A';
  let titleIcon = '📝';
  
  if (order.orderStatus === 'delivered') {
    bgColor = '#E8F0FE';
    borderColor = '#0066FF';
    titleColor = '#0066FF';
    titleIcon = '✅';
  } else if (order.orderStatus === 'shipped') {
    bgColor = '#E8F0FE';
    borderColor = '#0066FF';
    titleColor = '#0066FF';
    titleIcon = '🚚';
  } else if (order.orderStatus === 'cancelled') {
    bgColor = '#FEE2E2';
    borderColor = '#CC0000';
    titleColor = '#CC0000';
    titleIcon = '❌';
  } else if (order.orderStatus === 'confirmed') {
    bgColor = '#E8F0FE';
    borderColor = '#0066FF';
    titleColor = '#0066FF';
    titleIcon = '✅';
  } else if (order.orderStatus === 'processing') {
    bgColor = '#E8F0FE';
    borderColor = '#0066FF';
    titleColor = '#0066FF';
    titleIcon = '⚙️';
  }
  
  return `
    <div style="background: ${bgColor}; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${borderColor}; border: 1px solid ${borderColor}30;">
      <h2 style="margin: 0 0 15px 0; color: ${titleColor}; font-size: 18px; display: flex; align-items: center; gap: 8px; font-weight: 700;">
        <span>${titleIcon}</span> <span>${order.orderStatus === 'cancelled' ? 'Cancellation Information' : 'Delivery Information'}</span>
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${hasCancellationReason ? `
        <tr>
          <td style="padding: 8px 0; width: 140px; color: #4A4A4A;"><strong>Cancellation Reason:</strong></td>
          <td><div style="background: #FFFFFF; padding: 12px; border-radius: 8px; margin-top: 5px; color: #CC0000; border: 1px solid #E5E5E5;">${order.cancellationReason}</div></td>
        </tr>
        ` : ''}
        ${hasDeliveredDate ? `
        <tr>
          <td style="padding: 8px 0; width: 140px; color: #4A4A4A;"><strong>Delivered Date:</strong></td>
          <td style="color: #1A1A1A;">${formatDate(order.deliveredAt)}</td>
        </tr>
        ` : ''}
        ${hasTrackingNumber ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Tracking Number:</strong></td>
          <td><code style="background: #FFFFFF; padding: 4px 8px; border-radius: 4px; color: #0066FF; border: 1px solid #E5E5E5; font-weight: 600;">${order.trackingNumber}</code></td>
        </tr>
        ` : ''}
        ${hasDeliveryNote ? `
        <tr>
          <td style="padding: 8px 0; color: #4A4A4A;"><strong>Delivery Note:</strong></td>
          <td><div style="background: #FFFFFF; padding: 12px; border-radius: 8px; margin-top: 5px; color: #1A1A1A; border: 1px solid #E5E5E5;">${order.deliveryNote}</div></td>
        </tr>
        ` : ''}
      </table>
    </div>
  `;
};

/**
 * Send order placed email to customer
 */
const sendOrderPlacedEmail = async (order, customerEmail) => {
  console.log('📧 Sending order placed email to customer...');
  
  try {
    if (!customerEmail) {
      throw new Error('Customer email is missing');
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const itemsHTML = generateOrderItemsHTML(order.items);
    const summaryHTML = generateOrderSummaryHTML(order);
    const pricingHTML = generatePricingHTML(order);
    const customerInfoHTML = generateCustomerInfoHTML(order);
    const deliveryInfoHTML = generateDeliveryInfoHTML(order);

    const result = await transporter.sendMail({
      from: `"Smart Gadget" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: `📦 Order Placed! Order #${order.orderNumber || order._id.slice(-8).toUpperCase()} - Smart Gadget`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F5F7FA; }
            .container { max-width: 700px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
            .header { background: #000000; padding: 30px; text-align: center; }
            .header h1 { color: #FFFFFF; margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 700; letter-spacing: 0.5px; }
            .header p { color: #FFFFFF; margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 35px 30px; }
            .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; display: flex; align-items: center; gap: 8px; color: #1A1A1A; }
            .button { background: #000000; color: #FFFFFF; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: none; }
            .button:hover { background: #1A1A1A; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; }
            p { color: #4A4A4A; }
            strong { color: #1A1A1A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                <span>📦</span>
                <span>Order Placed!</span>
              </h1>
              <p>Your order has been received and is pending confirmation</p>
            </div>
            <div class="content">
              <p style="margin-bottom: 25px; font-size: 16px;">Dear <strong>${order.customerInfo?.fullName || 'Valued Customer'}</strong>,</p>
              <p style="margin-bottom: 25px; font-size: 16px;">Thank you for your order! We have received your order and it is now pending confirmation. You will receive another email once your order is confirmed.</p>
              
              ${summaryHTML}
              ${customerInfoHTML}
              ${deliveryInfoHTML}
              
              <div class="section-title">
                <span>📦</span>
                <span>Order Items</span>
              </div>
              ${itemsHTML}
              
              ${pricingHTML}
              
              <div style="margin: 35px 0 25px; text-align: center;">
                <a href="${frontendUrl}/customer/orders" class="button">Track Your Order</a>
              </div>
              
              <div class="footer">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: bold; color: #0066FF;">Smart Gadget Team</p>
                <p style="font-size: 12px; color: #888888; margin-top: 15px;">Need help? Contact us at ${process.env.SMTP_USER}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ Order placed email sent:', result.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Order placed email error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send order notification email to admin (for new orders and status updates)
 */
const sendOrderNotificationToAdmin = async (order, eventType = 'new') => {
  console.log('📧 Sending order notification email to admin...');
  
  try {
    const adminEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const itemsHTML = generateOrderItemsHTML(order.items);
    const summaryHTML = generateOrderSummaryHTML(order);
    const pricingHTML = generatePricingHTML(order);
    const customerInfoHTML = generateCustomerInfoHTML(order);
    
    // Set header based on event type
    let headerTitle = '';
    let headerEmoji = '';
    let additionalMessage = '';
    
    if (eventType === 'new') {
      headerTitle = 'New Order Received!';
      headerEmoji = '🛍️';
      additionalMessage = 'A new order has been placed and requires your attention.';
    } else if (eventType === 'status_update') {
      const statusInfo = {
        'confirmed': { title: 'Order Confirmed', emoji: '✅' },
        'processing': { title: 'Order Processing', emoji: '⚙️' },
        'shipped': { title: 'Order Shipped', emoji: '🚚' },
        'delivered': { title: 'Order Delivered', emoji: '📦' },
        'cancelled': { title: 'Order Cancelled', emoji: '❌' }
      };
      const info = statusInfo[order.orderStatus] || { title: 'Order Updated', emoji: '📝' };
      headerTitle = info.title;
      headerEmoji = info.emoji;
      additionalMessage = `Order status has been updated to "${order.orderStatus.toUpperCase()}".`;
    } else if (eventType === 'payment_update') {
      const paymentInfo = {
        'paid': { title: 'Payment Received', emoji: '💰' },
        'failed': { title: 'Payment Failed', emoji: '⚠️' },
        'refunded': { title: 'Payment Refunded', emoji: '💸' }
      };
      const info = paymentInfo[order.paymentStatus] || { title: 'Payment Updated', emoji: '💳' };
      headerTitle = info.title;
      headerEmoji = info.emoji;
      additionalMessage = `Payment status has been updated to "${order.paymentStatus.toUpperCase()}".`;
    }
    
    const result = await transporter.sendMail({
      from: `"Smart Gadget System" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `${headerEmoji} ${headerTitle} - Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; background-color: #F5F7FA; }
            .container { max-width: 700px; margin: 20px auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
            .header { background: #000000; padding: 25px 30px; text-align: center; }
            .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 700; }
            .content { padding: 30px; }
            .button { background: #000000; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; border: none; }
            .button:hover { background: #1A1A1A; }
            .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; color: #1A1A1A; }
            p { color: #4A4A4A; }
            strong { color: #1A1A1A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                <span>${headerEmoji}</span>
                <span>${headerTitle}</span>
              </h1>
            </div>
            <div class="content">
              <p>${additionalMessage}</p>
              
              ${customerInfoHTML}
              ${summaryHTML}
              
              <div class="section-title">📦 Order Items</div>
              ${itemsHTML}
              
              ${pricingHTML}
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${frontendUrl}/admin/orders" class="button">View Order in Dashboard</a>
              </div>
              
              <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #F59E0B;">
                <p style="margin: 0; font-size: 14px; color: #92400E;">⚠️ Please review and take necessary action.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ Admin order notification sent:', result.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Admin notification error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send order status update email to customer
 */
const sendOrderStatusUpdateEmail = async (order, customerEmail, oldStatus, newStatus) => {
  console.log('📧 Sending order status update email with full details...');
  
  try {
    if (!customerEmail) {
      throw new Error('Customer email is missing');
    }
    
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const newStatusColor = getStatusColor(newStatus);
    const itemsHTML = generateOrderItemsHTML(order.items);
    const summaryHTML = generateOrderSummaryHTML(order);
    const pricingHTML = generatePricingHTML(order);
    const customerInfoHTML = generateCustomerInfoHTML(order);
    const deliveryInfoHTML = generateDeliveryInfoHTML(order);
    
    let statusTitle = '';
    let statusMessage = '';
    let statusEmoji = '';
    
    switch(newStatus) {
      case 'confirmed':
        statusTitle = 'Order Confirmed!';
        statusMessage = 'Great news! Your order has been confirmed and is being prepared for shipment. Our team is working hard to pack your items carefully.';
        statusEmoji = '✅';
        break;
      case 'processing':
        statusTitle = 'Order Processing';
        statusMessage = 'Your order is now being processed. Our team is preparing your items for shipment.';
        statusEmoji = '⚙️';
        break;
      case 'shipped':
        statusTitle = 'Order Shipped!';
        statusMessage = 'Your order has been shipped and is on its way to you! Get ready to receive your wonderful products.';
        statusEmoji = '🚚';
        break;
      case 'delivered':
        statusTitle = 'Order Delivered!';
        statusMessage = 'Your order has been delivered! We hope you love your new items. Thank you for shopping with us!';
        statusEmoji = '🎁';
        break;
      case 'cancelled':
        statusTitle = 'Order Cancelled';
        statusMessage = 'Your order has been cancelled. If you have any questions, please contact our support team.';
        statusEmoji = '❌';
        break;
      default:
        statusTitle = `Order ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`;
        statusMessage = `Your order status has been updated to ${newStatus}.`;
        statusEmoji = '📝';
    }
    
    const result = await transporter.sendMail({
      from: `"Smart Gadget" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: `${statusEmoji} ${statusTitle} - Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F5F7FA; }
            .container { max-width: 700px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
            .header { background: #000000; padding: 30px; text-align: center; }
            .header h1 { color: #FFFFFF; margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 700; }
            .header p { color: #FFFFFF; margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 35px 30px; }
            .status-box { background: ${newStatusColor}10; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${newStatusColor}; border: 1px solid ${newStatusColor}30; }
            .status-badge { display: inline-block; padding: 8px 24px; background: ${newStatusColor}; color: #FFFFFF; border-radius: 40px; font-weight: 600; text-transform: uppercase; font-size: 14px; }
            .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; display: flex; align-items: center; gap: 8px; color: #1A1A1A; }
            .button { background: #000000; color: #FFFFFF; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: none; }
            .button:hover { background: #1A1A1A; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; }
            p { color: #4A4A4A; }
            strong { color: #1A1A1A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                <span>${statusEmoji}</span>
                <span>${statusTitle}</span>
              </h1>
              <p>Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
            </div>
            <div class="content">
              <p style="margin-bottom: 25px; font-size: 16px;">Dear <strong>${order.customerInfo?.fullName || 'Valued Customer'}</strong>,</p>
              
              <div class="status-box">
                <div class="status-badge">${newStatus.toUpperCase()}</div>
                <p style="margin: 15px 0 0 0;">${statusMessage}</p>
              </div>
              
              ${summaryHTML}
              ${customerInfoHTML}
              ${deliveryInfoHTML}
              
              <div class="section-title">
                <span>📦</span>
                <span>Order Items</span>
              </div>
              ${itemsHTML}
              
              ${pricingHTML}
              
              <div style="margin: 35px 0 25px; text-align: center;">
                <a href="${frontendUrl}/customer/orders" class="button">View Order Details</a>
              </div>
              
              <div class="footer">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: bold; color: #0066FF;">Smart Gadget Team</p>
                <p style="font-size: 12px; color: #888888; margin-top: 15px;">Need help? Contact us at ${process.env.SMTP_USER}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ Order status update email sent:', result.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Status update email error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send payment status update email to customer
 */
const sendPaymentStatusUpdateEmail = async (order, customerEmail, oldStatus, newStatus) => {
  console.log('📧 Sending payment status update email...');
  
  try {
    if (!customerEmail) {
      throw new Error('Customer email is missing');
    }
    
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const itemsHTML = generateOrderItemsHTML(order.items);
    const summaryHTML = generateOrderSummaryHTML(order);
    const pricingHTML = generatePricingHTML(order);
    const customerInfoHTML = generateCustomerInfoHTML(order);
    
    let statusMessage = '';
    let statusEmoji = '';
    let statusColor = '#0066FF';
    
    switch(newStatus) {
      case 'paid':
        statusMessage = 'Your payment has been successfully received. Thank you for your purchase!';
        statusEmoji = '✅';
        statusColor = '#0066FF';
        break;
      case 'failed':
        statusMessage = 'Your payment has failed. Please try again or contact your bank.';
        statusEmoji = '❌';
        statusColor = '#CC0000';
        break;
      case 'refunded':
        statusMessage = 'Your payment has been refunded. The amount will be credited back to your original payment method within 3-5 business days.';
        statusEmoji = '💰';
        statusColor = '#888888';
        break;
      default:
        statusMessage = `Your payment status has been updated to ${newStatus}.`;
        statusEmoji = '📝';
        statusColor = '#0066FF';
    }
    
    const result = await transporter.sendMail({
      from: `"Smart Gadget" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: `${statusEmoji} Payment Status Update - Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F5F7FA; }
            .container { max-width: 700px; margin: 20px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #E5E5E5; }
            .header { background: #000000; padding: 30px; text-align: center; }
            .header h1 { color: #FFFFFF; margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 700; }
            .header p { color: #FFFFFF; margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 35px 30px; }
            .status-box { background: ${statusColor}10; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${statusColor}; border: 1px solid ${statusColor}30; }
            .status-badge { display: inline-block; padding: 8px 24px; background: ${statusColor}; color: #FFFFFF; border-radius: 40px; font-weight: 600; text-transform: uppercase; font-size: 14px; }
            .section-title { font-size: 18px; font-weight: 700; margin: 25px 0 15px 0; display: flex; align-items: center; gap: 8px; color: #1A1A1A; }
            .button { background: #000000; color: #FFFFFF; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: none; }
            .button:hover { background: #1A1A1A; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; }
            p { color: #4A4A4A; }
            strong { color: #1A1A1A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                <span>${statusEmoji}</span>
                <span>Payment Status Update</span>
              </h1>
              <p>Order #${order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
            </div>
            <div class="content">
              <p style="margin-bottom: 25px; font-size: 16px;">Dear <strong>${order.customerInfo?.fullName || 'Valued Customer'}</strong>,</p>
              
              <div class="status-box">
                <div class="status-badge">${newStatus.toUpperCase()}</div>
                <p style="margin: 15px 0 0 0;">${statusMessage}</p>
              </div>
              
              ${summaryHTML}
              ${customerInfoHTML}
              
              <div class="section-title">
                <span>📦</span>
                <span>Order Items</span>
              </div>
              ${itemsHTML}
              
              ${pricingHTML}
              
              <div style="margin: 35px 0 25px; text-align: center;">
                <a href="${frontendUrl}/customer/orders" class="button">View Order Details</a>
              </div>
              
              <div class="footer">
                <p style="margin-bottom: 5px;">Best regards,</p>
                <p style="margin: 0; font-weight: bold; color: #0066FF;">Smart Gadget Team</p>
                <p style="font-size: 12px; color: #888888; margin-top: 15px;">Need help? Contact us at ${process.env.SMTP_USER}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ Payment status update email sent:', result.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Payment status update email error:', error.message);
    return { success: false, error: error.message };
  }
};

// Export all email functions
module.exports = {
  sendOrderPlacedEmail,
  sendOrderNotificationToAdmin,
  sendOrderStatusUpdateEmail,
  sendPaymentStatusUpdateEmail
};