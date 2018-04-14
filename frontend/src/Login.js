
import React, { Component } from "react"
import facade from "./apiFacade";
import { Button, Input, CardText } from 'reactstrap';
import jwtDecode from 'jwt-decode';
import App from './App';
import About from './About';

export class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }
  }

  login = (evt) => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  onChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }

  render() {
    return (


      <div>
        <h1>
        <CardText>Welcome</CardText>
        </h1>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange} >
          <Input placeholder="User Name" id="username" />
          <Input placeholder="Password" id="password" />
          <Button color="success" >Login</Button>
        </form> </div>


    )
  }
}
export class LoggedIn extends Component {
  constructor(props) {
    super(props);

    var userToken = facade.getToken();
    var decoded = jwtDecode(userToken);
    var userName = decoded.sub;
    var userRoles = decoded.roles;

    this.state = {
      dataFromServer: "Fetching!!",
      username: userName,
      userroles: userRoles,
    };
  }
  componentDidMount() {
    try {
      facade.fetchData().then(res => this.setState({ dataFromServer: res }));
    } catch (error) {

    }
  }

  render() {

    var userroles = this.state.userroles;
    console.log(userroles);
    //<About data={userroles} />
    return (
      <div>

      <App userroles={userroles} />
      
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    )
  }
}

// <App userroles={this.state.userroles} />


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }

  login = (user, pass) => {
    facade.login(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  }

  render() {
    return (
      <div>
        <div>

          {!this.state.loggedIn ? (<LogIn login={this.login} />) :
            (<div>
              <LoggedIn />
              <button onClick={this.logout}>Logout</button>
            </div>)}

        </div></div>
    )
  }
}