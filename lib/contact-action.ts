"use server";

import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
  deliveryMethod?: "email" | "whatsapp";
  redirectUrl?: string;
}

function buildMessageText(data: ContactFormData) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");
}

function getWhatsAppUrl(data: ContactFormData) {
  const rawNumber =
    process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!rawNumber) {
    return null;
  }

  const sanitizedNumber = rawNumber.replace(/\D/g, "");
  if (!sanitizedNumber) {
    return null;
  }

  const text = [
    "Hello Abishek,",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(text)}`;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  // Server-side validation (defense in depth)
  if (!data.name || !data.email || !data.subject || !data.message) {
    return { success: false, error: "All fields are required." };
  }

  if (data.name.length > 100) {
    return { success: false, error: "Name is too long." };
  }

  if (data.subject.length > 200) {
    return { success: false, error: "Subject is too long." };
  }

  if (data.message.length > 5000) {
    return { success: false, error: "Message is too long." };
  }

  // Basic email format check (belt-and-suspenders beyond Zod client validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, error: "Invalid email address." };
  }

  const emailApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    "Portfolio Contact <onboarding@resend.dev>";
  const whatsappUrl = getWhatsAppUrl(data);

  try {
    if (emailApiKey && contactToEmail) {
      const resend = new Resend(emailApiKey);
      const { error } = await resend.emails.send({
        from: contactFromEmail,
        to: [contactToEmail],
        subject: `Portfolio Contact: ${data.subject}`,
        text: buildMessageText(data),
        replyTo: data.email,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, deliveryMethod: "email" };
    }

    if (whatsappUrl) {
      return {
        success: true,
        deliveryMethod: "whatsapp",
        redirectUrl: whatsappUrl,
      };
    }

    return {
      success: false,
      error:
        "Contact form is not configured yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL, or configure WHATSAPP_NUMBER.",
    };
  } catch (error) {
    console.error("Contact form error:", error);

    if (whatsappUrl) {
      return {
        success: true,
        deliveryMethod: "whatsapp",
        redirectUrl: whatsappUrl,
      };
    }

    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
}
