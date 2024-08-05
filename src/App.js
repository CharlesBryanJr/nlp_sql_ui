import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Carriers from './components/Carriers/Carriers';
import CreateCarrier_TP from './components/Carriers/CreateCarrier/CreateCarrier_TP';
import Loads from './components/Loads/Loads';
import CreateLoad_TP from './components/Loads/CreateLoad/CreateLoad_TP';
import Invoices from './components/Invoices/Invoices';
import CreateInvoice_TP from './components/Invoices/CreateInvoice/CreateInvoice_TP';
import Draft from './components/Drafts/Draft';
import Query from './components/Queries/Query';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9', // You can keep this or adjust as needed
    },
    secondary: {
      main: '#f48fb1', // You can keep this or adjust as needed
    },
    background: {
      default: '#787878', // Significantly lighter than before
      paper: '#888888', // Significantly lighter than before
    },
    text: {
      primary: '#ffffff',
      secondary: '#c0c0c0', // Lighter secondary text for better contrast
    },
  },
});

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/Dashboard" />} />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/Query" exact component={Query} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;