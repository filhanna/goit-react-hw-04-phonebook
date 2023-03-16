import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Fiender } from './Fiender/Fiender';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    if (contacts.some(contact => contact.name === values.name)) {
      alert(`${values.name} is already in contacts`);
    } else {
      values.id = nanoid();
      setContacts(prevState => [...prevState, values]);
      resetForm();
    }
  };
  const handleInputChange = event => {
    setFilter(event.target.value);
  };
  const handleFilter = () => {
    if (filter === '') {
      return contacts;
    }
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  const handleDelete = event => {
    setContacts(contacts.filter(contact => contact.id !== event.target.id));
  };

  return (
    <div>
      <ContactForm
        initialValues={{ name: '', number: '' }}
        onSubmit={handleSubmit}
      />
      <Fiender value={filter} onChange={handleInputChange} />
      <h1 className={css.title}>Contacts</h1>
      <ContactList contactNames={handleFilter()} onDelete={handleDelete} />
    </div>
  );
}
