export async function notifyAdmin(subject: string, text: string) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!to || !key) return;
  await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.NOTIFICATION_FROM_EMAIL, to: [to], subject, text }) }).catch(() => undefined);
}
