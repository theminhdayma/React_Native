import { useEffect, useState } from "react";
import { MOCK_CONTACTS } from "../constants/MockData";
import { Contact } from "../types";

let internalContacts: Contact[] = MOCK_CONTACTS;

export const useContactData = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const updateContact = (updatedContact: Contact) => {
    internalContacts = internalContacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c
    );
    setContacts(internalContacts);
  };

  const deleteContact = (id: number) => {
    internalContacts = internalContacts.filter((c) => c.id !== id);
    setContacts(internalContacts);
  };

  const addContact = (newContactData: Omit<Contact, "id" | "isBlocked">) => {
    const newContact: Contact = {
      ...newContactData,
      id: Date.now(),
      isBlocked: false,
    };
    internalContacts = [newContact, ...internalContacts];
    setContacts(internalContacts);
  };

  const toggleBlockStatus = (id: number) => {
    const contact = internalContacts.find((c) => c.id === id);
    if (contact) {
      updateContact({ ...contact, isBlocked: !contact.isBlocked });
    }
  };

  return {
    contacts,
    updateContact,
    deleteContact,
    addContact,
    toggleBlockStatus,
  };
};