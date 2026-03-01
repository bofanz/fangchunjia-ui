import type { JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { renderToReactElement } from '@tiptap/static-renderer';

export default function TiptapRenderer({ content }: { content?: JSONContent }) {
  const extensions = [StarterKit];

  return (
    <div className="tiptap-renderer">
      {content &&
        renderToReactElement({
          content: content,
          extensions,
        })}
    </div>
  );
}
