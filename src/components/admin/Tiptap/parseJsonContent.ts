import type { JSONContent } from '@tiptap/react';

export function parseJsonContent(v: string): JSONContent | undefined {
  try {
    return JSON.parse(v);
  } catch (e) {
    console.error('An error occurred when parsing project description');
  }
}
