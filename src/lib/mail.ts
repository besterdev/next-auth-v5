import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
        <p>Hi there,</p>
        <p>Please Confirm your email by clicking the link below.</p>
        <p>Click <a href="${confirmLink}">here</a> to confirm email 🤘🏻</p>
        `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
        <p>Hi there,</p>
        <p>Please reset your password by clicking the link below.</p>
        <p>Click <a href="${resetLink}">here</a> to reset password 🔑</p>
        `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your 2FA token",
    html: `
        <p>Hi there, 🚀</p>
        <p>Your 2FA code: ${token}</p>
        `,
  });
};
