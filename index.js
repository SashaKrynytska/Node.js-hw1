const { program } = require("commander");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
} = require("./contacts");

program
  .name("MyPhoneBook")
  .description("A simple CLI to manage your contacts")
  .version(1.0);
program
  .option("--action <action>", "choose action")
  .option("--id <id>", "Contact id")
  .option("--name <name>", "Contact name")
  .option("--email <email>", "Contact email")
  .option("--phone <phone>", "Contact phone");
program.parse(process.argv);
// const argv = program.opts();
const { action, id, name, email, phone } = program.opts();

(async () => {
  if (action === "list") {
    const result = await listContacts();
    console.log(result);
  }
  if (action === "get") {
    const result = await getById(id);
    if (!result) {
      throw new Error(`Contact with ${id} not found`);
    }
    console.log(result);
  }
  if (action === "add") {
    const result = await addContact(name, email, phone);
    console.log(result);
  }
  if (action === "remove") {
    await removeContact(id);
  }
})();
