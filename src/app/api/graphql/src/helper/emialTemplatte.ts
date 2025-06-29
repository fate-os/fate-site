import moment from 'moment';

const BASE_STYLE = `
  body {
    margin: 0;
    padding: 0;
    background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #222;
    font-size: 16px;
    line-height: 1.6;
  }
  .container {
    max-width: 480px;
    margin: 32px auto;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    padding: 32px 24px;
  }
  .header {
    text-align: center;
    margin-bottom: 24px;
  }
  .accent {
    color: #00A76F;
    font-weight: bold;
  }
  .code-box {
    background: #f5f5f5;
    border-radius: 6px;
    padding: 16px;
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 4px;
    margin: 24px 0;
    font-weight: bold;
  }
  .button {
    display: inline-block;
    background: #00A76F;
    color: #fff !important;
    padding: 10px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    margin: 16px 0;
  }
  .footer {
    margin-top: 32px;
    text-align: center;
    color: #888;
    font-size: 13px;
  }
`;

export const VERIFY_TEMPLATE = (code: number) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
  <style>${BASE_STYLE}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 class="accent">Account Verification</h2>
    </div>
    <p>Use the code below to verify your account:</p>
    <div class="code-box">${code}</div>
    <p style="font-size:14px;color:#888;">This code will expire in 15 minutes. Please do not share it with anyone.</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Fate Os
    </div>
  </div>
</body>
</html>`;

interface OTPEmailParams {
  otp: string;
  recipientName: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
}

export function generateOTPEmail(params: OTPEmailParams): string {
  const {
    otp,
    recipientName,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">${companyName}</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Your verification code is:</p>
        <div class="code-box">${otp}</div>
        <p style="font-size:14px;color:#888;">This code will expire in 15 minutes. Please do not share this code with anyone.</p>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface WelcomeEmailParams {
  recipientName: string;
  recipientEmail: string;
  quickStartLink: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
}

export function generateWelcomeEmail(params: WelcomeEmailParams): string {
  const {
    recipientName,
    recipientEmail,
    quickStartLink,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Welcome to ${companyName}!</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>We're excited to have you join us. Use <b>${recipientEmail}</b> to log in and get started.</p>
        <a href="${quickStartLink}" class="button">Get Started</a>
        <p style="margin-top:24px;">Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a></p>
        <div class="footer">
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface ResetPinEmailParams {
  recipientName: string;
  otp: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
  expirationTime?: string;
}

export function generateResetPinEmail(params: ResetPinEmailParams): string {
  const {
    recipientName,
    otp,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
    expirationTime = '15 minutes',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Reset Your Password</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Use the following code to reset your password:</p>
        <div class="code-box">${otp}</div>
        <p style="font-size:14px;color:#888;">This code is valid for <b>${expirationTime}</b>. If you didn't request this, ignore this email.</p>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface SubscriptionEmailParams {
  subscription_plan: string;
  hosted_invoice_url?: string;
  invoice_pdf?: string;
  recipientName: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
}

export function generateSubscriptionEmail(params: SubscriptionEmailParams): string {
  const {
    subscription_plan,
    hosted_invoice_url,
    invoice_pdf,
    recipientName,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmation - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Subscription Confirmed</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Thank you for subscribing to the <b>${subscription_plan}</b> plan!</p>
        <p style="font-size:14px;color:#888;">Confirmation Date: ${new Date().toLocaleDateString()}</p>
        <div style="margin:20px 0;">
          ${hosted_invoice_url ? `<a href="${hosted_invoice_url}" class="button">View Invoice</a>` : ''}
          ${invoice_pdf ? `<a href="${invoice_pdf}" class="button">Download PDF</a>` : ''}
        </div>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface SubscriptionDispatchEmailParams {
  recipientName: string;
  subscription_plan: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
  update_payment_link?: string;
  resubscribe_link?: string;
}

// 2. Past Due Subscription Template
export function generatePastDueSubscriptionEmail(params: SubscriptionDispatchEmailParams): string {
  const {
    recipientName,
    subscription_plan,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
    update_payment_link = '#',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Past Due - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Payment Past Due</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Your <b>${subscription_plan}</b> subscription payment is overdue. Please update your payment method to maintain access.</p>
        <a href="${update_payment_link}" class="button">Update Payment</a>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

// 3. Canceled Subscription Template
export function generateCanceledSubscriptionEmail(params: SubscriptionDispatchEmailParams): string {
  const {
    recipientName,
    subscription_plan,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
    resubscribe_link,
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Canceled - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Subscription Canceled</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Your <b>${subscription_plan}</b> subscription has been canceled. Your account will be downgraded to the Free Plan.</p>
        ${resubscribe_link ? `<a href="${resubscribe_link}" class="button">Resubscribe</a>` : ''}
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface RefundEmailParams {
  recipientName: string;
  refundAmount: string;
  refundDate: string;
  supportEmail?: string;
  currency?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
}

export function generateRefundInitiatedEmail(params: RefundEmailParams): string {
  const {
    recipientName,
    refundAmount,
    refundDate,
    currency,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refund Initiated - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Refund Initiated</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>We've processed your refund request.</p>
        <div class="code-box" style="font-size:1em;letter-spacing:1px;">Amount: <b>${refundAmount} ${currency || ''}</b><br>Initiated: ${moment(new Date(refundDate)).format('LLL')}</div>
        <p style="font-size:14px;color:#888;">Funds should arrive in 5-10 business days.</p>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface SubscriptionFailEmailParams {
  recipientName: string;
  subscription_plan: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
}

export function generateFailedSubscriptionEmail(params: SubscriptionFailEmailParams): string {
  const {
    recipientName,
    subscription_plan,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Payment Failed</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>We were unable to process your payment for the <b>${subscription_plan}</b> plan. Your access is currently at risk.</p>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface CancellationEmailParams {
  recipientName: string;
  subscription_plan: string;

  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  paymentUpdateLink?: string;
}

export function generatePastDueCancellationEmail(params: CancellationEmailParams): string {
  const {
    recipientName,
    subscription_plan,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    paymentUpdateLink = '#',
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Canceled - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Subscription Canceled</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Your <b>${subscription_plan}</b> subscription has been canceled due to unresolved past due payments.</p>
        <a href="${paymentUpdateLink}" class="button">Reactivate Subscription</a>
        <div class="footer">
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface FreeTrialEmailParams {
  recipientName: string;
  trialEndDate: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  dashboardLink?: string;
  trialDuration?: number;
}

export function generateFreeTrialStartedEmail(params: FreeTrialEmailParams): string {
  const {
    recipientName,
    trialEndDate,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    dashboardLink = '#',
    trialDuration = 7,
  } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Free Trial Has Begun! - ${companyName}</title>
    <style>${BASE_STYLE}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="accent">Your ${trialDuration}-Day Free Trial Is Active!</h2>
        </div>
        <p>Hi ${recipientName},</p>
        <p>Your free trial is now active through <b>${new Date(trialEndDate).toLocaleDateString()}</b>.</p>
        <a href="${dashboardLink}" class="button">Go to Dashboard</a>
        <div class="footer">
            No payment required during trial. Cancel anytime.<br>
            Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
            &copy; ${new Date().getFullYear()} ${companyName}
        </div>
    </div>
</body>
</html>
  `;
}

interface DeletedUserEmailParams {
  recipientName: string;
  supportEmail?: string;
  companyName?: string;
  brandColor?: string;
  textColor?: string;
  forSixMonth?: boolean;
}

export function generateDeletedUserEmail(params: DeletedUserEmailParams): string {
  const {
    recipientName,
    supportEmail = 'founder@fate-os.com',
    companyName = 'Fate Os',
    brandColor = '#00A76F',
    textColor = '#333333',
    forSixMonth = false,
  } = params;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account Deletion Notice</title>
    <style>${BASE_STYLE}</style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2 class="accent">${companyName}</h2>
      </div>
      <p>Hi ${recipientName},</p>
      <p>Your account has been deleted due to inactivity${forSixMonth ? '.' : ' over the past 6 months, as per our data retention policy.'}</p>
      <p>If this was unintentional or if you'd like to use our services again, you are welcome to create a new account at any time.</p>
      <p>If you have any questions or concerns, feel free to contact our support team.</p>
      <div class="footer">
        Need help? Email <a href="mailto:${supportEmail}" style="color:${brandColor};">${supportEmail}</a>.<br>
        &copy; ${new Date().getFullYear()} ${companyName}
      </div>
    </div>
  </body>
  </html>
  `;
}
