
export enum ContactTag {
  FAMILY = "FAMILY",
  FRIEND = "FRIEND",
  COLLEAGUE = "COLLEAGUE",
  OTHER = "OTHER",
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  tag: ContactTag;
  isBlocked: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  tag: ContactTag;
}

export interface ContactSection {
  title: string;
  data: Contact[];
}