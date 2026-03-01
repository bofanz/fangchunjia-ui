import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { menuBarStateSelector } from './menuBarState.ts';
import { useCallback } from 'react';
import clsx from 'clsx';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  LinkSlashIcon,
  ListBulletIcon,
  NumberedListIcon,
  StrikethroughIcon,
  UnderlineIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function Divider() {
  return <div className="divider" />;
}

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert((e as Error).message);
    }
  }, [editor]);

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={clsx(editorState.isBold && 'is-active')}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={clsx(editorState.isItalic && 'is-active')}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={clsx(editorState.isUnderline && 'is-active')}
        >
          <UnderlineIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={clsx(editorState.isStrike && 'is-active')}
        >
          <StrikethroughIcon />
        </button>
        <button
          onClick={setLink}
          className={clsx(editorState.isLink && 'is-active', 'bg-red-100')}
        >
          <LinkIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editorState.isLink}
        >
          <LinkSlashIcon />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <XMarkIcon />
        </button>
        <Divider />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(editorState.isBulletList && 'is-active')}
        >
          <ListBulletIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(editorState.isOrderedList && 'is-active')}
        >
          <NumberedListIcon />
        </button>
        <Divider />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <ArrowUturnLeftIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <ArrowUturnRightIcon />
        </button>
      </div>
    </div>
  );
};
