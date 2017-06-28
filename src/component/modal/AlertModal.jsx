import React from 'react'

const modalSize = (size) => {
  switch (size){
    case 'small': return 'modal-sm'
    case 'large': return 'modal-lg'
    default: return ''
  }
}

export default (function AlertModal(props) {
  return (
    <div className={`modal-dialog ${modalSize(props.size)}`} role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden={true} onClick={props.close}>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {props.text}
        </div>
        <div className="modal-footer text-center">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.close}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  )
})