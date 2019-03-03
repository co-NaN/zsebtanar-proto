import { Icon } from '../../general/Icon'
import * as React from 'react'

export const DecimalAccuracyWarning = value => (
  <small className="form-text text-warning">
    <Icon fa="exclamation-triangle" /> Kérlek, {value.fractionDigits} tizedesjegy pontossággal
    add meg a megoldást.
  </small>
)