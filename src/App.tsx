import logo from './assets/logo-nlw-expert.svg'
import {NewNoteCard} from "./components/NewNoteCard.tsx";
import {NoteCard} from "./components/NoteCard.tsx";
export function App() {

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW expert"/>

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />

        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  )
}
