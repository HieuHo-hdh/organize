import React, { Component } from "react";
import { connect } from "react-redux";

import { showErrorMessage } from "../../services/notifyService";

import LoginForm from "../../compoments/account/LoginForm";
import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { UserTypes } from "../../constants";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(valueForm) {
    const { login, setUserData, getProfile } = this.props;
    this.setState({ loading: true });

    login({
      params: valueForm,
      onCompleted: (responseData) => {
        if (responseData && responseData.token) {
          if (setUserData(responseData)) {
            // this.props.history.push(sitePathConfig.admin.path);
            if (responseData.kind === UserTypes.ADMIN)
              this.props.history.push(sitePathConfig.admin.path);
            else
              this.props.history.push(
                sitePathConfig.restaurantByShopAccount.path
              );
          }
        } else {
          this.setState({ loading: false });
          showErrorMessage(
            "Your Username or Password is incorrect. Please try again!"
          );
        }
      },
      onError: (err) => {
        this.setState({ loading: false });
        showErrorMessage(
          "Your Username or Password is incorrect. Please try again!"
        );
      },
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="login-container">
        <h1 className="page-title">LOGIN</h1>
        <div className="login-content">
          <LoginForm onLogin={this.onLogin} loading={loading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.account.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actions.login(payload)),
  setUserData: (data) => actions.setUserData(data),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
