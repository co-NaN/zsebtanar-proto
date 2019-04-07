import * as React from 'react'
import { Markdown } from 'client-common/component/general/Markdown'
import { DecimalAccuracyWarning } from '../common/DecimalAccuracyWarning'

interface SingleNumberProps extends DB.UCSingleNumberProps {
  name: string
  value?: string
  onChange: ({name, value}: {name: string, value: string}) => void
  resources: MarkdownResources
  readOnly?: boolean
}

export function SingleNumber(props: SingleNumberProps) {
  const setSolution = e => {
    if (props.onChange) {
      props.onChange({ name: props.name, value: e.currentTarget.value })
    }
  }

  return (
    <div className="user-control single-number">
      <div className="d-flex align-items-center">
        <span className="prefix">
          <Markdown source={props.prefix} resources={props.resources} />
        </span>
        {props.readOnly ? (
          <strong>&nbsp;{props.value}&nbsp;</strong>
        ) : (
          <input
            name={props.name}
            type="number"
            className="form-control col-4 mx-1"
            onChange={setSolution}
            value={props.value}
            step={1 / Math.pow(10, props.fractionDigits || 0)}
          />
        )}
        <span className="postfix">
          <Markdown source={props.postfix} resources={props.resources} />
        </span>
      </div>
      {props.fractionDigits > 0 &&
      <DecimalAccuracyWarning fractionDigits={props.fractionDigits}/>}
    </div>
  )
}
