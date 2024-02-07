export function NoteCard() {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
          <span className="text-sm font-medium text-slate-200">
            há 4 dias
          </span>

      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequuntur dolore facilis, fugit hic
        ipsum laborum modi nostrum optio pariatur praesentium quaerat reiciendis rem reprehenderit repudiandae rerum
        sapiente vel veniam?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deserunt ea expedita explicabo inventore
        laborum maiores minima mollitia nam nisi odio optio porro quia recusandae reprehenderit, sapiente totam unde ut.
      </p>

      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
    </button>
  )
}