import logo from './assets/logo-nlw-expert.svg'
import {NewNoteCard} from "./components/NewNoteCard.tsx";
import {NoteCard} from "./components/NoteCard.tsx";
import {ChangeEvent, useState} from "react";
import {toast} from "sonner";

export interface INote {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<INote[]>(() => {
    const notesOnStorage = localStorage.getItem('@nlw-expert-notes');

    return notesOnStorage ? JSON.parse(notesOnStorage) : [];
  });
  
  const filteredNotes = search !== '' ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase())) : notes;

  function handleSearchNote(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query)
  }

  function onCreateNote(content: string) {
    const newNotesArray = [
      {
        id: crypto.randomUUID(),
        date: new Date(),
        content
      },
      ...notes,
    ];

    setNotes(newNotesArray)

    localStorage.setItem('@nlw-expert-notes', JSON.stringify(newNotesArray))
  }

  function onDeleteNote(id:string) {
    const newNotesArr = notes.filter(note => note.id !== id);

    setNotes(newNotesArr);
    localStorage.setItem('@nlw-expert-notes', JSON.stringify(newNotesArr))

    toast.info('Nota apagada com sucesso.')
  }
  
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW expert"/>

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          value={search}
          onChange={handleSearchNote}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onCreateNote={onCreateNote} />

        {filteredNotes.map(note => <NoteCard key={note.id} note={note} onDeleteNote={onDeleteNote} />)}
      </div>
    </div>
  )
}
