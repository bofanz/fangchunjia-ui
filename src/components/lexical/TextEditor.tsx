import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { type EditorState, ParagraphNode, TextNode } from 'lexical';
import { LinkNode } from '@lexical/link';
import { useState } from 'react';

import ToolbarPlugin from './plugins/ToolbarPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { constructImportMap, exportMap } from './utils';
import EditorTheme from './EditorTheme';

const placeholder = 'Enter some rich text...';

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: 'React.js Demo',
  nodes: [ParagraphNode, TextNode, LinkNode],
  onError(error: Error) {
    throw error;
  },
  theme: EditorTheme,
};

function EditorInner({
  onChange,
}: {
  onChange: (editorState: EditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const isEditable = useLexicalEditable();

  const onRef = (elem: HTMLDivElement) => {
    if (elem !== null) {
      setFloatingAnchorElem(elem);
    }
  };

  return (
    <div className="editor-container my-8">
      <ToolbarPlugin editor={editor} setIsLinkEditMode={setIsLinkEditMode} />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <ClickableLinkPlugin disabled={isEditable} />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        {floatingAnchorElem && (
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        )}
      </div>
    </div>
  );
}

export default function TextEditor({
  editorState,
  setEditorState,
}: {
  editorState?: EditorState;
  setEditorState: Function;
}) {
  function onChange(editorState: EditorState) {
    setEditorState(editorState);
  }

  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        ...(editorState && { editorState: editorState }),
      }}
    >
      <EditorInner onChange={onChange} />
    </LexicalComposer>
  );
}
