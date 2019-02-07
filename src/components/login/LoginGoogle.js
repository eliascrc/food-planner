import React, { Component } from 'react';
import ApiCalendar from 'react-google-calendar-api';

const event = {
  'summary': 'Test Event',
  'description': 'A test event for my app.',
  'start': {
    'dateTime': '2019-02-05T11:15:00-06:00',
    'timeZone': 'America/Costa_Rica'
  },
  'end': {
    'dateTime': '2019-02-05T11:20:00-06:00',
    'timeZone': 'America/Costa_Rica'
  },
  'reminders': {
    'useDefault': false,
    'overrides': [
      { 'method': 'popup', 'minutes': 10 }
    ]
  }
};

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gapi: null,
      enableAuth: false,
    }
  }

  handleItemClick = (e, name) => {
    e.preventDefault();

    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
    } else if (name === 'create') {
      ApiCalendar.createEvent(event)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidMount() {

    ApiCalendar.onLoad(() => {
      ApiCalendar.setCalendar('primary');
      ApiCalendar.listenSign(() => {
        //
      })

      this.setState({ gapi: window['gapi'], enableAuth: true });
    })
  }

  render() {
    const { gapi, enableAuth } = this.state;
    if (gapi !== null) {
      console.log(gapi.auth2.getAuthInstance());
    }
    return (
      <div>
        <button disabled={!enableAuth}
          onClick={(e) => this.handleItemClick(e, 'sign-in')}
        >
          sign-in
        </button>
        <button disabled={!enableAuth}
          onClick={(e) => this.handleItemClick(e, 'sign-out')}
        >
          sign-out
        </button>
        <button disabled={!enableAuth}
          onClick={(e) => this.handleItemClick(e, 'create')}
        >
          create event
        </button>
      </div>
    )
  }
}
