// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import css from './app.module.css';

export const App = () => {
  const [contacts, setContact] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('My-Contacts'));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.filter(
        person => person.name.toLowerCase() === name.toLowerCase()
      ).length
    ) {
      return alert(`${name} is already in contacts`);
    }
    setContact(prevContacts => [contact, ...prevContacts]);
  };

  const filterByName = () => {
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContacts;
  };

  const deleteContact = event => {
    const id = event.currentTarget.id;
    const updateList = contacts.filter(contact => contact.id !== id);
    setContact(updateList);
  };

  useEffect(() => {
    localStorage.setItem('My-Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filtered = filterByName();
  return (
    <div
      style={{
        height: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList list={filtered} deleteContact={deleteContact} />
    </div>
  );
};

/* export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.filter(
        person => person.name.toLowerCase() === name.toLowerCase()
      ).length
    ) {
      return alert(`${name} is already in contacts`);
    }
    this.setState({ contacts: [...contacts, contact] });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('My-Contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('My-Contacts', JSON.stringify(contacts));
    }
  }

  filter = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContacts;
  };

  deleteContact = event => {
    const id = event.currentTarget.id;
    const updateList = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: updateList,
    });
  };

  render() {
    const filtered = this.filter();
    return (
      <div
        style={{
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactList list={filtered} deleteContact={this.deleteContact} />
      </div>
    );
  }
}
*/
