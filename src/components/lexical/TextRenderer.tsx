import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { type EditorState, ParagraphNode, TextNode } from 'lexical';
import { LinkNode } from '@lexical/link';

import { constructImportMap, exportMap } from './utils';
import RendererTheme from './RendererTheme';

const placeholder = 'Enter some rich text...';

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: 'TextRenderer',
  nodes: [ParagraphNode, TextNode, LinkNode],
  onError(error: Error) {
    throw error;
  },
  theme: RendererTheme,
};

export default function TextRenderer({
  editorState,
}: {
  editorState?: EditorState;
}) {
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: editorState,
        editable: false,
      }}
    >
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <LinkPlugin />
          <ClickableLinkPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
