import * as React from 'react'
import { mapObjIndexed, pathOr } from 'ramda'
import { pairsInOrder } from '../../../../shared/util/fn'
import { Markdown } from 'client-common/component/general/Markdown'
import { DecimalAccuracyWarning } from '../common/DecimalAccuracyWarning'
import UCNumberListProps = DB.UCNumberListProps

interface NumberListProps extends UCNumberListProps {
  name: string
  value?: string
  onChange: any
}

export class NumberList extends React.Component<any, any> {
  private readOnly: boolean

  constructor(props: NumberListProps) {
    super(props)

    this.state = {
      fields: pairsInOrder(props.fields),
      solutions: props.value || mapObjIndexed(() => '', props.fields)
    }
  }

  setSolution = e => {
    const { name, value } = e.currentTarget
    const solutions = { ...this.state.solutions, [name]: value }
    this.setState({ ...this.state, solutions })

    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        value: solutions
      })
    }
  }

  render() {
    const { prefix, postfix, resources, multiLine } = this.props
    return (
      <div className={`user-control number-list ${multiLine ? 'multiline' : ''}`}>
        <Markdown source={prefix} resources={resources} className="prefix" />
        {this.renderItems()}
        <Markdown source={postfix} resources={resources} className="postfix" />
        {this.props.fractionDigits > 0 &&
        <DecimalAccuracyWarning fractionDigits={this.props.fractionDigits}/>}
      </div>
    )
  }

  renderItems() {
    const { fields } = this.state
    const { resources } = this.props

    return fields.map(([id, item]) => (
      <div className="item" key={id}>
        {item.prefix && <Markdown source={item.prefix} resources={resources} />}
        {this.readOnly ? this.renderReadOnly(id) : this.renderNormal(id)}
        {item.postfix && <Markdown source={item.postfix} resources={resources} />}
      </div>
    ))
  }

  renderNormal(id) {
    return (
      <input
        name={id}
        type="number"
        className="form-control value mx-1"
        onChange={this.setSolution}
        value={pathOr(this.state.solutions, ['props', 'value', 'options'], this)[id]}
        step={1 / Math.pow(10, this.props.fractionDigits || 0)}
      />
    )
  }

  renderReadOnly(id) {
    return <span className="value mx-1">{this.state.solutions[id]}</span>
  }
}
