import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
        </Switch>
      </div>
    );
  }
}

export default Main;