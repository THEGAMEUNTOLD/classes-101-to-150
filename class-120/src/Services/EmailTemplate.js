export function getVerificationEmailTemplate(username, verificationLink) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">
      
      <h2 style="color: #111827;">Welcome to MyPerplexity </h2>
      
      <p style="color: #374151; font-size: 16px;">
        Hi ${username},
      </p>

      <p style="color: #374151; font-size: 16px;">
        Thanks for signing up! Please verify your email address to activate your account.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" 
           style="background-color: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 16px;">
          Verify Email
        </a>
      </div>

      <p style="color: #6b7280; font-size: 14px;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <hr style="margin: 20px 0;" />

      <p style="color: #9ca3af; font-size: 12px;">
        © ${new Date().getFullYear()} MyPerplexity. All rights reserved.
      </p>

    </div>
  </div>
  `;
}