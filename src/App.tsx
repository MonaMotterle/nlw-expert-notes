import logo from './assets/logo-nlw-expert.svg'
import {NewNoteCard} from "./components/NewNoteCard.tsx";
import {NoteCard} from "./components/NoteCard.tsx";

const notes = [
  {
    date: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam aut delectus doloribus error, est exercitationem fuga laudantium magni repellendus temporibus vitae voluptas voluptatibus. Consectetur mollitia quis sapiente tempore voluptate."
  },
  {
    date: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur eos eum eveniet ex exercitationem fugit id iste laudantium molestiae nesciunt obcaecati odit pariatur quaerat quis, sapiente soluta, tenetur, voluptatem!"
  },
  {
    date: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet porro quidem voluptate. Architecto dolorum error est eum fuga rerum. Blanditiis cupiditate id inventore magnam maxime optio quasi, sequi tempore voluptas!"
  },
]

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

        {notes.map(note => <NoteCard note={note} />)}
      </div>
    </div>
  )
}
