import * as React from 'react'
import strings from 'client-common/strings'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button } from 'client-common/component/general/Button'
import { Loading } from 'client-common/component/general/Loading'
import { openProviderSignUp } from 'client-common/store/actions/modal'
import { facebookSignIn, googleSignIn, signUp } from 'client-common/store/actions/auth'
import { CloseButton } from '../general/CloseButton'

interface SignUpModalProps extends RouteComponentProps<{}>, ui.ModalProps {}
interface SignUpModalStateProps {
  session: state.Session
}
interface SignUpModalDispatchProps {
  signUp: typeof signUp
  googleSignIn: typeof googleSignIn
  facebookSignIn: typeof facebookSignIn
  openProviderSignUp: typeof openProviderSignUp
}

const mapStateToProps = state => ({
  session: state.app.session
})

export const SignUpModal = withRouter(
  connect<SignUpModalStateProps, SignUpModalDispatchProps, SignUpModalProps>(
    mapStateToProps,
    {
      signUp,
      googleSignIn,
      facebookSignIn,
      openProviderSignUp
    }
  )(
    class extends React.Component<SignUpModalStateProps & SignUpModalDispatchProps & SignUpModalProps, {}> {
      success = data => {
        if (!data || !data.error) {
          this.props.close()
          this.props.history.push('/')
        }
      }

      emailSingUp = () => {
        this.props.openProviderSignUp({
          data: {},
          requestPassword: true,
          onSave: (data, { email, password }) => {
            this.props.signUp(email, password, data).then(this.success)
          }
        })
      }

      googleSignUp = () => {
        this.props.googleSignIn().then(this.success)
      }

      facebookSignUp = () => {
        this.props.facebookSignIn().then(this.success)
      }

      render() {
        const { close } = this.props

        return (
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Regisztráció</h5>
                <CloseButton onClick={close} aria-label="Bezárás"/>
              </div>
              <div className="modal-body">{this.renderContent()}</div>
            </div>
          </div>
        )
      }

      renderContent() {
        const { session } = this.props

        if (session && session.error) {
          return this.renderError()
        } else {
          if (session && session.emailSignUpLoading) {
            return <Loading />
          } else {
            return this.renderOptions()
          }
        }
      }

      renderError() {
        const { session } = this.props
        return (
          <div className="alert alert-danger" role="alert">
            {strings[session.error.code] || 'Nem várt hiba történt a regisztráció során'}
          </div>
        )
      }

      renderOptions() {
        return (
          <div>
            <div className="col-12 my-5">
              <ul className="list-unstyled">
                <li className="my-1">
                  <Button
                    onAction={this.googleSignUp}
                    className="btn btn-outline-primary btn-block"
                  >
                    <i className="fa fa-lg fa-google" /> Google fiókkal
                  </Button>
                </li>
                <li className="my-1">
                  <Button
                    onAction={this.facebookSignUp}
                    className="btn btn-outline-primary btn-block"
                  >
                    <i className="fa fa-lg fa-facebook" /> Facebook fiókkal
                  </Button>
                </li>
                <li className="my-1">
                  <Button onAction={this.emailSingUp} className="btn btn-outline-primary btn-block">
                    <i className="fa fa-lg fa-envelope" /> E-mail címmel
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )
      }
    }
  )
)

// default export for dynamic import
export default SignUpModal