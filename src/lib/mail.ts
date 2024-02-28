import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
