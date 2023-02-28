const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData, null, 2);
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const getById = async (id) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => String(contact.id) === String(id));
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const id = crypto.randomUUID();
    const contacts = await listContacts();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (contact) => String(contact.id) !== String(id)
    );

    if (newContacts.length === contacts.length) {
      console.log(
        `Contact with ID "${id}" don't removed! ID "${id}" not found!`
      );
      return;
    }

    console.log("Contact deleted successfully! New list of contacts: ");
    console.table(newContacts);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
};
