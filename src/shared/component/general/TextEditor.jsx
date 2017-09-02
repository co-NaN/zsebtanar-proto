import * as React from 'react'
import { connect } from 'react-redux'
import { openFileManager, openMarkdownHelpModal } from 'shared/store/actions/modal'
import Button from 'shared/component/general/Button'
import Markdown from 'shared/component/general/Markdown'

export default connect(undefined, {
  openFileManager,
  openMarkdownHelpModal
})(
  class ExerciseForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = { value: props.value || '' }
    }

    update = () => {
      const { name, value } = this.text
      this.props.onChange({ name, value })
      this.setState({ value })
    }

    wrapText = (char) => () => {
      const {selectionStart: start, selectionEnd: end, value} = this.text
      this.text.value = `${value.slice(0, start)}${char}${value.slice(start, end)}${char}${value.slice(end)}`
      this.update()
    }

    multiLine = (char) => () => {
      const {selectionStart, selectionEnd: end, value} = this.text
      const start = value.lastIndexOf('\n', selectionStart) + 1
      const sStart = value.slice(0, start)
      const text = value.slice(start, end).split('\n').map(x => `${char}${x}`).join('\n')
      const sEnd = value.slice(end)
      this.text.value = `${sStart}${text}${sEnd}`
      this.update()
    }

    insertFile = () => {
      this.props.openFileManager({
        onSelect: ({ url, file }) => {
          this.text.value += `![${file.name}](${url} "${file.name}" =100x)`
          this.update()
        }
      })
    }

    render() {
      return (
        <div className={this.props.className || ''}>
          <div className="btn-toolbar m-2" role="toolbar" aria-label="Szövet szerkesztő eszközök">
            <div className="btn-group mr-2" role="group" aria-label="Formázás">
              <Button secondary onAction={this.wrapText('**')} title="Félkövér">
                <i className="fa fa-bold" />
              </Button>
              <Button secondary onAction={this.wrapText('*')} title="Dölt">
                <i className="fa fa-italic" />
              </Button>
              <Button secondary onAction={this.wrapText('~~')} title="Áthúzott">
                <i className="fa fa-strikethrough" />
              </Button>
              <Button secondary onAction={this.wrapText('$')} title="Matematika jelölés">
                <i className="fa fa-usd" />
              </Button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Listák">
              <Button secondary onAction={this.multiLine('* ')} title="Normál lista">
                <i className="fa fa-list-ul" />
              </Button>
              <Button secondary onAction={this.multiLine('1. ')} title="Számozott lista">
                <i className="fa fa-list-ol" />
              </Button>
              <Button secondary onAction={this.multiLine('    ')} title="Behúzás">
                <i className="fa fa-indent" />
              </Button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Link">
              <Button secondary onAction={this.multiLine('')} title="Hivatkozás">
                <i className="fa fa-link" />
              </Button>
              <Button secondary onAction={this.insertFile}>
                <i className="fa fa-image" /> Kép beszúrása
              </Button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Egyéb">
              <Button secondary onAction={this.props.openMarkdownHelpModal}>
                <i className="fa fa-question-circle" />
              </Button>
            </div>
          </div>
          <textarea
            className="form-control"
            name={this.props.name}
            rows={this.props.row || 10}
            required={this.props.required}
            onChange={this.update}
            ref={inp => {
              this.text = inp
            }}
            value={this.state.value}
          />

          <Markdown source={this.state.value}/>
        </div>
      )
    }
  }
)