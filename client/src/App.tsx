import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import logo from './images/logo.png';
import './App.css';
import Launches from './components/Launches';
import { Details } from './components/Details';

const client = new ApolloClient({
  uri: 'http://192.168.0.10:9000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="SpaceX Logo" className="logo" />
          <Switch>
            <Route exact path="/" component={Launches} />
            <Route exact path="/details/:id" component={Details} />
            <Launches />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
