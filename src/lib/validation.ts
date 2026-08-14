import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().optional().or(z.literal("")),
  primaryModality: z.string().trim().min(2, "Tell us your primary modality"),
  modalities: z.array(z.string()).default([]),
  town: z.string().trim().min(2, "Enter your town"),
  format: z.enum(["IN_PERSON", "VIRTUAL", "BOTH"]).default("IN_PERSON"),
  yearsPracticing: z.coerce.number().int().min(0).max(80).optional(),
  credentials: z.string().trim().min(5, "List your training, certifications, or licenses"),
  insurance: z.coerce.boolean().default(false),
  businessInfo: z.string().trim().optional().or(z.literal("")),
  website: z.string().trim().optional().or(z.literal("")),
  instagram: z.string().trim().optional().or(z.literal("")),
  bio: z.string().trim().min(20, "Tell us about your practice (at least a couple sentences)"),
  message: z.string().trim().optional().or(z.literal("")),
  agreedToCodeOfConduct: z.coerce.boolean().refine((v) => v === true, {
    message: "You must agree to the code of conduct to apply",
  }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const rsvpSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email"),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  source: z.string().optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
