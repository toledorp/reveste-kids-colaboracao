import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendLikeNotificationEmail = async ({
  ownerEmail,
  ownerName,
  interestedUserName,
  clothingTitle,
}) => {
  if (!ownerEmail) {
    console.log("E-mail do dono da peça não encontrado.");
    return;
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: ownerEmail,
    subject: "Sua peça recebeu um novo interesse no Reveste Kids",
    html: `
      <h2>Olá, ${ownerName || "usuário"}!</h2>

      <p>Uma pessoa demonstrou interesse em uma peça do seu closet.</p>

      <p><strong>Peça:</strong> ${clothingTitle || "Peça sem título"}</p>
      <p><strong>Interessado:</strong> ${
        interestedUserName || "Usuário interessado"
      }</p>

      <p>Acesse o Reveste Kids para verificar a possível troca.</p>
    `,
  });

  console.log("E-mail enviado:", info.messageId);
};

export default {
  sendLikeNotificationEmail,
};