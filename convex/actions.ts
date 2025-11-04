import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendOrderEmail = action({
  args: {
    to: v.string(),
    orderId: v.optional(v.string()),
    name: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    grandTotal: v.number(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const resend = new Resend(apiKey);

    const html = getHTML(args).trim();

    await resend.emails.send({
      from: "Audiophile by Dev_id <onboarding@resend.dev>",
      to: args.to,
      subject: `Your Audiophile order ${args.orderId ?? ""}`,
      html,
    });
  },
});


function getHTML(args: any){
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
              
              <tr>
                <td style="background-color:#191919;padding:32px;text-align:center">
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px">audiophile</h1>
                </td>
              </tr>

              <tr>
                <td style="padding:40px 32px">
                  <div style="border-left:4px solid #D87D4A;padding-left:16px;margin-bottom:32px">
                    <h2 style="margin:0 0 8px 0;color:#191919;font-size:24px;font-weight:600">Order Confirmed</h2>
                    <p style="margin:0;color:#888;font-size:14px">Thank you for your purchase, ${args.name}!</p>
                  </div>

                  ${args.orderId ? `
                  <div style="background-color:#f9f9f9;border-radius:6px;padding:16px;margin-bottom:32px">
                    <p style="margin:0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Order Number</p>
                    <p style="margin:8px 0 0 0;color:#191919;font-size:18px;font-weight:700">${args.orderId}</p>
                  </div>
                  ` : ""}

                  <div style="margin-bottom:32px">
                    <h3 style="margin:0 0 16px 0;color:#191919;font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Order Summary</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e5e5">
                      ${args.items.map((item: any) => `
                        <tr>
                          <td style="padding:16px 0;border-bottom:1px solid #e5e5e5">
                            <p style="margin:0;color:#191919;font-size:15px;font-weight:500">${item.name}</p>
                            <p style="margin:4px 0 0 0;color:#888;font-size:13px">Quantity: ${item.quantity}</p>
                          </td>
                          <td align="right" style="padding:16px 0;border-bottom:1px solid #e5e5e5">
                            <p style="margin:0;color:#191919;font-size:15px;font-weight:600">$${((item.price * item.quantity) / 100).toFixed(2)}</p>
                          </td>
                        </tr>
                      `).join("")}
                      <tr>
                        <td style="padding:20px 0 0 0">
                          <p style="margin:0;color:#191919;font-size:18px;font-weight:700">Total</p>
                        </td>
                        <td align="right" style="padding:20px 0 0 0">
                          <p style="margin:0;color:#D87D4A;font-size:24px;font-weight:700">$${(args.grandTotal / 100).toFixed(2)}</p>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding:8px 0">
                        <a href="${process.env.SITE_URL || 'https://your-store.com'}/orders/${args.orderId}" 
                           style="display:inline-block;background-color:#D87D4A;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:600;font-size:14px;letter-spacing:0.5px;text-transform:uppercase;transition:background-color 0.2s">
                          View Order Details
                        </a>
                      </td>
                    </tr>
                  </table>

                  <div style="margin-top:40px;padding-top:32px;border-top:1px solid #e5e5e5">
                    <p style="margin:0 0 8px 0;color:#666;font-size:14px">We'll send you shipping confirmation when your items are on the way.</p>
                    <p style="margin:0;color:#666;font-size:14px">Questions? <a href="mailto:support@audiophile.com" style="color:#D87D4A;text-decoration:none">Contact our support team</a></p>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="background-color:#f9f9f9;padding:24px 32px;text-align:center">
                  <p style="margin:0 0 8px 0;color:#888;font-size:13px">© ${new Date().getFullYear()} audiophile. All rights reserved.</p>
                  <p style="margin:0;color:#aaa;font-size:12px">Premium audio equipment for music enthusiasts</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`
}