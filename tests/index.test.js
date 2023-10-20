// index.test.js
const { getNotes, addNote, getNoteById, deleteNote, addPerson,getPerson,getPersonById,deletePerson } = require('../index'); // Ajuste o caminho para o arquivo index.js

test('Adicionar uma nova nota', () => {
  const newNote = { content: 'This is a test note', important: true };
  const addedNote = addNote(newNote.content, newNote.important);

  // Verifique se 'content' e 'important' são iguais aos do novo objeto
  expect(addedNote.content).toBe(newNote.content);
  expect(addedNote.important).toBe(newNote.important);

  // Verifique se 'id' é um número (pode verificar o tipo)
  expect(typeof addedNote.id).toBe('number');

  expect(getNotes()).toContainEqual(addedNote);
});

test('Obter todas as notas', () => {
  const notes = getNotes();
  expect(notes).toEqual(expect.arrayContaining([]));
});

test('Obter nota por ID existente', () => {
  const newNote = { content: 'This is a test note', important: true };
  const addedNote = addNote(newNote.content, newNote.important);
  const noteById = getNoteById(addedNote.id);
  expect(noteById).toEqual(addedNote);
});

test('Obter nota por ID inexistente', () => {
  const noteById = getNoteById(9999); // ID inexistente
  expect(noteById).toBeUndefined();
});

test('Excluir nota por ID existente', () => {
  const newNote = { content: 'This is a test note', important: true };
  const addedNote = addNote(newNote.content, newNote.important);
  const notesBeforeDeletion = getNotes();
  deleteNote(addedNote.id);
  const notesAfterDeletion = getNotes();
  expect(notesAfterDeletion).not.toContainEqual(addedNote);
  expect(notesAfterDeletion).toHaveLength(notesBeforeDeletion.length - 1);
});

test('Tentar excluir nota por ID inexistente', () => {
  const notesBeforeDeletion = getNotes();
  deleteNote(9999); // Tenta excluir uma nota com um ID inexistente
  const notesAfterDeletion = getNotes();
  expect(notesAfterDeletion).toEqual(notesBeforeDeletion);
});


//testes para person
test('Adicionar uma nova pessoa', () => {
  const newPerson = { name: 'Test Person', number: '1234567890' };
  const addedPerson = addPerson(newPerson.name, newPerson.number);

  expect(addedPerson.name).toBe(newPerson.name);
  expect(addedPerson.number).toBe(newPerson.number);
  expect(typeof addedPerson.id).toBe('number');
  expect(getPerson()).toContainEqual(addedPerson);
});

test('Obter todas as pessoas', () => {
  const persons = getPerson();
  expect(persons).toEqual(expect.arrayContaining([]));
});

test('Obter pessoa por ID existente', () => {
  const newPerson = { name: 'Test Person', number: '1234567890' };
  const addedPerson = addPerson(newPerson.name, newPerson.number);
  const personById = getPersonById(addedPerson.id);
  expect(personById).toEqual(addedPerson);
});

test('Obter pessoa por ID inexistente', () => {
  const personById = getPersonById(9999); // ID inexistente
  expect(personById).toBeUndefined();
});

test('Excluir pessoa por ID existente', () => {
  const newPerson = { name: 'Test Person', number: '1234567890' };
  const addedPerson = addPerson(newPerson.name, newPerson.number);
  const personsBeforeDeletion = getPerson();
  deletePerson(addedPerson.id);
  const personsAfterDeletion = getPerson();
  expect(personsAfterDeletion).not.toContainEqual(addedPerson);
  expect(personsAfterDeletion).toHaveLength(personsBeforeDeletion.length - 1);
});

test('Tentar excluir pessoa por ID inexistente', () => {
  const personsBeforeDeletion = getPerson();
  deletePerson(9999); // Tenta excluir uma pessoa com um ID inexistente
  const personsAfterDeletion = getPerson();
  expect(personsAfterDeletion).toEqual(personsBeforeDeletion);
});
