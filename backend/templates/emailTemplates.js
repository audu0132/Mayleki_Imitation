/**
 * HTML Email notification templates for Mayleki Boutique
 */

export const generateRentalConfirmationEmail = ({ customerName, orderId, productName, rentalStart, rentalEnd, depositAmount }) => {
  return `
    <div style="font-family: 'Cinzel', serif, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0a09; color: #f5f5f4; padding: 32px; border: 1px solid #d4af37;">
      <h1 style="color: #d4af37; text-align: center; margin-bottom: 24px;">Mayleki Imitation Jewellery</h1>
      <p>Dear ${customerName},</p>
      <p>Your royal rental booking <strong>#${orderId}</strong> for <em>${productName}</em> has been securely reserved.</p>
      <div style="background: #1c1917; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Rental Period:</strong> ${rentalStart} to ${rentalEnd}</p>
        <p><strong>Refundable Security Deposit:</strong> ₹${depositAmount}</p>
      </div>
      <p>Our concierge will dispatch your piece in velvet protective packaging 24 hours before your reservation date.</p>
      <p style="margin-top: 32px; text-align: center; font-size: 12px; color: #a8a29e;">Mayleki Heritage Studio • FC Road, Pune</p>
    </div>
  `;
};
