import React, { useState } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

export default (props: any) => {
  const { onChange } = props;
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  
  const onEditorChange = (state: any) => {
    onChange(onChange);
    setEditorState(state);
  }

  const controls = [
    'font-size',
    'font-family',
    'line-height',
    'letter-spacing',
    'text-color',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'superscript',
    'subscript',
    'remove-styles',
    'emoji',
    'text-align',
    'text-indent',
    'undo',
    'redo',
    'separator',
  ];

  return (
    <BraftEditor
      controls={controls}
      value={editorState}
      onChange={onEditorChange}
    />
  )
}
