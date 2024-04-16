import {useEffect, useState} from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import PhoneBookContainer from "./components/PhoneBookContainer/PhoneBookContainer";
import SearchBox from "./components/SearchBox/SearchBox";
import {CONTACT_KEY} from "./consts";
import {getFromLS, addToLS} from "./helpers";
import Notification from "./components/Notification/Notification";

const debounce = (func, delay) => {
  let timer;
  return function (text) {
    clearTimeout(timer);
    timer = setTimeout(() => func(text), delay);
  };
};

function App() {
  const [userContacts, setUserContacts] = useState(
    getFromLS(CONTACT_KEY) || []
  );
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    addToLS(CONTACT_KEY, userContacts);
  }, [userContacts]);
  const handleAddContact = (contact) => {
    setUserContacts((prevContacts) => [...prevContacts, contact]);
  };

  useEffect(() => {});

  const handleFilterChange = debounce((text) => {
    setFilterText(text);
  }, 500);

  const handleDeleteContact = (contactId) => {
    setUserContacts((prevContacts) =>
      prevContacts.filter(({id}) => id !== contactId)
    );
  };

  const filteredContacts = userContacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const emptyContacts = !userContacts.length;
  const contactsNotFound = !emptyContacts && !filteredContacts.length;
  return (
    <PhoneBookContainer>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <SearchBox handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        handleDeleteContact={handleDeleteContact}
      />

      {emptyContacts && <Notification title={"No contacts yet"} />}
      {contactsNotFound && <Notification title={"Contacts are not found"} />}
    </PhoneBookContainer>
  );
}

export default App;
