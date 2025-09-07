import { useEffect, useState } from "react";
import contactsList from "../data/contactsList.json";
import "./App.css";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import SearchBox from "./SearchBox";

function App() {
  const [contacts, setContacts] = useState(() => {
    const localItem = window.localStorage.getItem("contacts-list");
    if (localItem !== null ) return JSON.parse(localItem);

    return contactsList;
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts-list", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      const isDuplicateNumber = prevContacts.some((contact) => contact.number === newContact.number);
      if (isDuplicateNumber) return prevContacts;

      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id != id);
    });
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </>
  );
}

export default App;
