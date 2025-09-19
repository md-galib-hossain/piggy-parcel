export interface Email {
  subject: string;
  html: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  attachments?: { path: string; name?: string }[];
}

export interface EmailBuilder {
  setSubject(subject: string): EmailBuilder;
  setHtml(html: string): EmailBuilder;
  addRecipient(to: string): EmailBuilder;
  addCc(cc: string): EmailBuilder;
  addBcc(bcc: string): EmailBuilder;
  addAttachment(filePath: string, name?: string): EmailBuilder;
  build(): Email;
}
