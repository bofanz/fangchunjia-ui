import { useEditor, EditorContent, type Content } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { MenuBar } from './MenuBar';
import Link from '@tiptap/extension-link';

export default function Editor({
  content,
  setContent,
}: {
  content?: Content;
  setContent: Function;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https', 'mailto'],
        isAllowedUri: () => true,
        shouldAutoLink: (url) => {
          try {
            url.includes(':') ? new URL(url) : new URL(`https://${url}`);

            return true;
          } catch {
            return false;
          }
        },
      }),
    ],
    content: content,
    enableContentCheck: true,
    onUpdate: (e) => {
      setContent(e.editor.getJSON());
    },
    onContentError: () => {},
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="tiptap-wrapper">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
