import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  };

  _onBoldClick() {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    if(newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />, document.getElementById('root')
);
