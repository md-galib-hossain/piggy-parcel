import { EmailBuilder } from "../interfaces/EmailBuilder";

export interface EmailTemplate {
  render(data: any, builder: EmailBuilder): EmailBuilder;
}
