import dotenv from "dotenv";
dotenv.config();
import express from "express";
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



console.log("✅ SERVER FILE LOADED");



dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));

let step = 0;
let lead = {};

app.post("/chat", (req, res) => {
  const msg = req.body.message?.trim();

  if (!msg) {
    return res.json({ reply: "Please type a message 🙂" });
  }

if (step === 0) {
  step = 1;
  return res.json({
    reply: "👋 Welcome to AI-_-GROW! We’re here to help you grow your business. What’s your name?"
  });

 
}


  if (step === 1) {
    lead.name = msg;
    step = 2;
    return res.json({ reply: `Nice to meet you, ${lead.name}! What’s your email address?` });
  }


if (step === 2) {
  lead.email = msg;
  step = 3;

  const date = new Date().toLocaleString();
  const line = `${lead.name},${lead.email},${date}\n`;

  // Save lead to CSV (always works)
  fs.appendFile("leads.csv", line, (err) => {
    if (err) console.error("File error:", err);
  });

  // Safe email / WhatsApp sending
  try {
    // Email sending
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Lead",
      text: `Name: ${lead.name}\nEmail: ${lead.email}\nDate: ${date}`
    });

    // WhatsApp sending
    client.messages.create({
      from: process.env.TWILIO_SANDBOX,
      to: process.env.MY_WHATSAPP,
      body: `📩 New Lead!\nName: ${lead.name}\nEmail: ${lead.email}\nDate: ${date}`
    });

  } catch (err) {
    console.error("Warning: could not send email/WhatsApp", err);
  }

  return res.json({
    reply: `✅ Thank you ${lead.name}!  
Your details have been saved. We’ll contact you soon.  

How can we help you today?
• Website
• Chatbot
• Automation
• Pricing`
  });
}



  let reply = "💬 A team member will contact you shortly.";

  const text = msg.toLowerCase();

  if (text.includes("website")) {
    reply = "🌐 We build modern websites that convert visitors into customers.";
  } else if (text.includes("chatbot")) {
    reply = "🤖 Our chatbots help businesses sell & support 24/7.";
  } else if (text.includes("automation")) {
    reply = "⚙️ We automate repetitive tasks to save time & money.";
  } else if (text.includes("pricing")) {
    reply = "💰 Pricing depends on your needs. Would you like a free quote?";
  }

  res.json({ reply });
});





app.listen(3000, () => console.log("Server running on http://localhost:3000"));
