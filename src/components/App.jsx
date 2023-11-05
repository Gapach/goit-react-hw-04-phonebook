import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import  ContactForm  from './ContactForm/ContactForm';
import  Filter  from './Filter/Filter';
import  ContactList  from './ContactList/ContactList';



const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts((prevContacts) => [...prevContacts, contact]);
    }
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;