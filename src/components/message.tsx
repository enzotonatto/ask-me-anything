import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CreateMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { RemoveMessageReaction } from "../http/remove-message-reaction";


interface MessageProps {
    id: string
    text: string
    amountOfReactions: number
    answered?: boolean
}

export function Message({
  id: messageId, 
  text, 
  amountOfReactions, 
  answered = false
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);

  if (!roomId) {
    throw new Error("Messages components must be used within page");
  }

  async function createMessageReactionAction() {

    if (!roomId){
      return
    }

    try {
      await CreateMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Falha ao reagir a mensagem');
      
    }


    setHasReacted(true)
  }

  async function removeMessageReactionAction() {

    if (!roomId){
      return
    }

    try {
      await RemoveMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Falha ao remover reação mensagem');
      
    }

    setHasReacted(false)
  }

  return (
    <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
        {text}
      {hasReacted ? (
        <button
          onClick={removeMessageReactionAction}
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          onClick={createMessageReactionAction}
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  );
}
