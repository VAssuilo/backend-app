const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

// Crie um token personalizado para registrar o corpo da solicitação POST
morgan.token('postData', (req) => JSON.stringify(req.body));

// Configure o Morgan para registrar mensagens no formato desejado
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :postData')
);


//exercicos do 3.0
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browsers can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' });
  }

  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  const newNote = {
    id: maxId + 1,
    content: body.content,
    important: body.important || false,
  };

  notes = [...notes, newNote];

  res.status(201).json(newNote); // Retorna o código 201 (Created) e a nova nota
}
);


app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});


app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

//exercicios do 3.1
let phonebookData = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/persons', (req, res) => {
  res.json(phonebookData);
});

app.get('/info', (req, res) => {
  const currentTime = new Date();
  const entryCount = phonebookData.length;

  res.send(`
    <div>
      <p>Phonebook has info for ${entryCount} people</p>
      <p>${currentTime}</p>
    </div>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebookData.find(entry => entry.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  phonebookData = phonebookData.filter(entry => entry.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    });
  }

  if (phonebookData.some(entry => entry.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const newEntry = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number
  };

  phonebookData.push(newEntry);

  res.json(newEntry);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
// função para adicionar as pessoas
const addPerson = (name, number) => {
  const maxId = phonebookData.length > 0 ? Math.max(...phonebookData.map((person) => person.id)) : 0;
  const newPerson = {
    id: maxId + 1,
    name: name,
    number: number,
  };
  phonebookData = [...phonebookData, newPerson];
  return newPerson;
};


// Função para obter todas as pessoas
const getPerson = () => {
  return phonebookData;
};

// Função para excluir uma pessoa por ID
const deletePerson = (id) => {
  phonebookData = phonebookData.filter((person) => person.id !== id);
};

const getPersonById = (id) => {
  return phonebookData.find((person) => person.id === id);
};


// função para adicionar as notas
const addNote = (content, important) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  const newNote = {
    id: maxId + 1,
    content: content, // Use content em vez de newNote.content
    important: important || false, // Use important em vez de newNote.important
  };
  notes = [...notes, newNote];
  return newNote;
};


// Função para obter todas as notas
const getNotes = () => {
  return notes;
};

// Função para excluir uma nota por ID
const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
};
const getNoteById = (id) => {
  return notes.find((note) => note.id === id);
};
module.exports = {
  getNotes,
  addNote,
  deleteNote,
  getNoteById,
  addPerson,
  getPerson,
  deletePerson,
  getPersonById
};



