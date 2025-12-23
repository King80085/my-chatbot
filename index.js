import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import nodemailer from "nodemailer";
import twilio from "twilio";



const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const myWhatsAppNumber = process.env.MY_WHATSAPP;
const twilioSandboxNumber = process.env.TWILIO_SANDBOX; // Twilio sandbox
const email_user = process.env.EMAIL_USER
const email_pass = process.env.EMAIL_PASS

const client = twilio(accountSid, authToken);

const input = document.getElementById("userInput");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();     // stop form reload
    sendMessage();
  }
});


console.log("✅ SERVER FILE LOADED");



dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});





app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
let step = 0;
let lead = {};

app.post("/chat", (req, res) => {
  const { message = "", businessType = "" } = req.body;
  const msg = message.toLowerCase();


  let reply = "Please select an option so I can assist you.";

  
  // 🔁 Allow category change anytime
  if (
    msg.includes("change business") ||
    msg.includes("switch business") ||
    msg.includes("change category")
  ) {
    return res.json({
      reply: "No problem 😊 Please choose a new business category:",
      resetCategory: true
    });
  }

  // ===== WEBSITE =====
  if (businessType === "Website/HTML/CSS/JS") {
    reply = "Website services available. Ask about pricing, redesign, or fixes.";
  }

  // ===== LANDING PAGE =====
  else if (businessType === "Landing Page") {
    reply = "Landing page services available. Ask about audits, UX, or pricing.";
  }

  // ===== CHATBOT =====
  else if (businessType === "Chatbot") {
    reply = "Chatbot services available. Ask about OpenAI, Tidio, or custom bots.";
  }

  // ===== NO CATEGORY SELECTED =====
  else {
    reply = "Please select a business category to continue.";
  }

  // ================= WEBSITE =================
  if (businessType === "Website/HTML/CSS/JS") {
    if (msg.includes("website")) {
      reply = `
Website Services:
• Website redesign: R2500 – R5000
• Website pages (1–10): R250 – R20000
      `;
    } 
    else if (msg.includes("html") || msg.includes("css") || msg.includes("js")) {
      reply = `
Development & Fixes:
• Speed optimization
• Mobile optimization
• CTA tracking
• Bug fixes: R100 – R2000
• Full package: R7000 – R15000
      `;
    } 
    else {
      reply = `
Contact Us:
📞 068 255 3677 / 062 985 4774
💬 WhatsApp: 068 255 3677
📧 aigrow80085@gmail.com
      `;
    }
  }

  // ================= LANDING PAGE =================
  else if (businessType === "Landing Page") {
    if (msg.includes("landing")) {
      reply = `
Landing Page Packages:
• Small business: R1500 – R4000
• Medium business: R4000 – R10000
• Large business: R10000 – R25000
      `;
    } 
    else if (msg.includes("booster") || msg.includes("ux")) {
      reply = `
UX Boosters:
• One page: R1500 – R5000
• Multiple pages: R5000 – R20000
      `;
    } 
    else if (msg.includes("audit")) {
      reply = `
Landing Page Audit:
• Basic audit: R500 – R4000
• Detailed audit + call: R3000 – R12000
      `;
    } 
    else {
      reply = `
Contact Us:
📞 068 255 3677 / 062 985 4774
💬 WhatsApp: 068 255 3677
📧 aigrow80085@gmail.com
      `;
    }
  }

  // ================= CHATBOT =================
  else if (businessType === "Chatbot") {
    if (
      msg.includes("openai") ||
      msg.includes("tidio") ||
      msg.includes("dialogflow") ||
      msg.includes("custom")
    ) {
      reply = `
Chatbot Pricing:
• Basic branded bot: R6000 – R10000
• Lead capture + CRM + analytics: R12000 – R22000
• Advanced AI with memory: R25000 – R45000+

Add-ons:
• Analytics setup: R1500 – R5000
• CRM integration: R3000 – R10000
• Custom UI: R2000 – R8000
• Maintenance: R800 – R3000 / month
      `;
    } 
    else {
      reply = `
Contact Us:
📞 068 255 3677 / 062 985 4774
💬 WhatsApp: 068 255 3677
📧 aigrow80085@gmail.com
      `;
   }
  }

  //====Other=====
  else if (businessType === "other") {
    if (msg.includes("contact")) {
      reply = `
Contact Us:
📞 068 255 3677 / 062 985 4774
💬 WhatsApp: 068 255 3677
📧 aigrow80085@gmail.com`;
    }
  }

  // ================= FALLBACK =================
  else {
    reply = "Please choose a business category to continue.";
  }

  res.json({ reply });
});







app.listen(3000, () => console.log("Server running on http://localhost:3000"));
