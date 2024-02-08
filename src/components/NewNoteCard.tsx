import * as Dialog from '@radix-ui/react-dialog';
import {X} from "lucide-react";
import {ChangeEvent, FormEvent, useState} from "react";
import {toast} from "sonner";

interface INewNoteCard {
  onCreateNote: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null;

export function NewNoteCard({ onCreateNote }: INewNoteCard) {
  const [isRecording, setIsRecording] = useState(false);
  const [showOnboard, setShowOnboard] = useState(true);
  const [content, setContent] = useState('');

  function handleStartEditor() {
    setShowOnboard(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value === '') {
      setShowOnboard(true)
    }
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error('API de reconhecimento de fala não disponível');
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setShowOnboard(false);

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new (SpeechRecognitionAPI);

    speechRecognition.lang = 'pt-BR';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;


    speechRecognition.onresult = (event) => {
      setContent(event.results[0][0].transcript);
    };

    speechRecognition.onerror = (event) => {
      toast.error('Erro ao gravar a nota');
      console.log('Erro ao gravar a nota: ', event)
      setIsRecording(false);
      setShowOnboard(true);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    speechRecognition?.stop();
    speechRecognition = null

    setIsRecording(false)
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    onCreateNote(content);

    setContent('');
    setShowOnboard(true);

    toast.success('Nota criada com sucesso')
  }

  const recordAudioButton = (
    <button
      type="button"
      onClick={handleStartRecording}
      className="font-medium text-lime-400 hover:underline"
    >
      gravando uma nota
    </button>
  )

  const writeNoteButton = (
    <button
      type="button"
      className="font-medium text-lime-400 hover:underline"
      onClick={handleStartEditor}
    >
      utilize apenas texto
    </button>
  )

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="rounded-md flex flex-col gap-3 text-left bg-slate-700 p-5 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>


      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"/>

        <Dialog.Content
          className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none "
        >
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5"/>
          </Dialog.Close>

          <form
            className="flex flex-col flex-1"
          >
            <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              Adicionar nota
            </span>

              {showOnboard ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece {recordAudioButton} em áudio ou se preferir {writeNoteButton}.
                </p>
              ) : (
                <textarea
                  autoFocus
                  value={content}
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                disabled={content === ''}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
                Salvar nota
              </button>
            )}
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}