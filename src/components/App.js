import React from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Fiender } from './Fiender/Fiender';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = (values, { resetForm }) => {
    if (this.state.contacts.some(contact => contact.name === values.name)) {
      alert(`${values.name} is already in contacts`);
    } else {
      values.id = nanoid();
      this.setState(prevState => ({
        contacts: [...prevState['contacts'], values],
      }));
      resetForm();
    }
  };
  handleInputChange = event => {
    this.setState({ filter: event.target.value });
  };
  handleFilter = () => {
    const { filter, contacts } = this.state;
    if (filter === '') {
      return contacts;
    }
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  handleDelete = event => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== event.target.id
      ),
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div>
        <ContactForm
          initialValues={{ name: '', number: '' }}
          onSubmit={this.handleSubmit}
        />
        <Fiender value={this.state.filter} onChange={this.handleInputChange} />
        <h1 className={css.title}>Contacts</h1>
        <ContactList
          contactNames={this.handleFilter()}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

// aaaaa
