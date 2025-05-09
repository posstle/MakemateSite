import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save contact form submission to storage
      const contact = await storage.createContact({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
      });
      
      // Create a test account if no SMTP credentials are provided
      // In production, you would use actual SMTP credentials
      let transporter;
      
      if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      } else {
        // For development, use Ethereal email service
        const testAccount = await nodemailer.createTestAccount();
        
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      }
      
      // Send email notification
      const mailOptions = {
        from: '"makemate Website" <no-reply@makemate.com>',
        to: "hello@makemate.com", // This would be your company email
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          ${validatedData.company ? `Company: ${validatedData.company}` : ''}
          Subject: ${validatedData.subject}
          
          Message:
          ${validatedData.message}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      };
      
      await transporter.sendMail(mailOptions);
      
      res.status(201).json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      }
      
      res.status(500).json({ success: false, message: "Failed to submit contact form" });
    }
  });
  
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getNewsletterByEmail(validatedData.email);
      
      if (existingSubscriber) {
        return res.status(200).json({ success: true, message: "Already subscribed to newsletter" });
      }
      
      // Save newsletter subscription to storage
      const newsletter = await storage.createNewsletter(validatedData);
      
      res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      }
      
      res.status(500).json({ success: false, message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
