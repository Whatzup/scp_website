import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define users table (for administrators/staff accessing the dashboard)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID of the coordinator
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define leads table to collect client inquiries
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  mobileNumber: text('mobile_number').notNull(),
  email: text('email'),
  companyName: text('company_name'),
  projectType: text('project_type').notNull(), // Residential, Commercial, Industrial
  requirementType: text('requirement_type').notNull(), // VRV/VRF, Ductable AC, Cassette, etc.
  cityLocation: text('city_location').notNull(),
  approximateArea: text('approximate_area'), // Optional
  briefRequirement: text('brief_requirement'), // Optional message
  preferredContactMethod: text('preferred_contact_method'), // Optional (Call, WhatsApp, Email)
  ctaUsed: text('cta_used'), // Track button clicked: Get Free Consultation, Request Site Visit, Get HVAC Estimate
  status: text('status').default('Pending').notNull(), // Pending, Contacted, In Progress, Closed
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Configure relationship definitions for type-safe queries
export const usersRelations = relations(users, () => ({}));
