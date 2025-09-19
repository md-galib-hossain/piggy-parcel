import { Email, EmailBuilder } from "../interfaces/EmailBuilder";

export class PiggyParcelEmailBuilder implements EmailBuilder {
  private email: Email = { 
    subject: "", 
    html: "", 
    to: [] 
  };

  setSubject(subject: string): EmailBuilder {
    this.email.subject = subject;
    return this;
  }

  setHtml(html: string): EmailBuilder {
    this.email.html = html;
    return this;
  }

  addRecipient(to: string): EmailBuilder {
    this.email.to.push(to);
    return this;
  }

  addCc(cc: string): EmailBuilder {
    if (!this.email.cc) this.email.cc = [];
    this.email.cc.push(cc);
    return this;
  }

  addBcc(bcc: string): EmailBuilder {
    if (!this.email.bcc) this.email.bcc = [];
    this.email.bcc.push(bcc);
    return this;
  }

  addAttachment(filePath: string, name?: string): EmailBuilder {
    if (!this.email.attachments) this.email.attachments = [];
    const attachment: { path: string; name?: string } = { path: filePath };
    if (name) attachment.name = name;
    this.email.attachments.push(attachment);
    return this;
  }

  build(): Email {
    // Validate required fields
    if (!this.email.subject) {
      throw new Error("Email subject is required");
    }
    if (!this.email.html) {
      throw new Error("Email HTML content is required");
    }
    if (this.email.to.length === 0) {
      throw new Error("At least one recipient is required");
    }
    
    return { ...this.email }; // Return a copy to prevent mutations
  }
}
