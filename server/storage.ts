import { 
  contacts, 
  type Contact, 
  type InsertContact, 
  newsletters, 
  type Newsletter, 
  type InsertNewsletter,
  users, 
  type User, 
  type InsertUser 
} from "@shared/schema";

// Storage interface with all necessary CRUD methods
export interface IStorage {
  // User methods (already existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: Omit<InsertContact, "agreement">): Promise<Contact>;
  getContact(id: number): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  
  // Newsletter methods
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  getAllNewsletters(): Promise<Newsletter[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private userIdCounter: number;
  private contactIdCounter: number;
  private newsletterIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.userIdCounter = 1;
    this.contactIdCounter = 1;
    this.newsletterIdCounter = 1;
  }

  // User methods - already existing
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact methods
  async createContact(contactData: Omit<InsertContact, "agreement">): Promise<Contact> {
    const id = this.contactIdCounter++;
    const now = new Date();
    
    const contact: Contact = {
      ...contactData,
      id,
      createdAt: now
    };
    
    this.contacts.set(id, contact);
    return contact;
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Newsletter methods
  async createNewsletter(newsletterData: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterIdCounter++;
    const now = new Date();
    
    const newsletter: Newsletter = {
      ...newsletterData,
      id,
      createdAt: now
    };
    
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
  }

  async getAllNewsletters(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
}

// Create and export an instance of the storage
export const storage = new MemStorage();
