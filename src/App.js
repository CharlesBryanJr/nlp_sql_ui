const React = require('react');
const { Container, CssBaseline } = require('@material-ui/core');
const { BrowserRouter, Switch, Route, Redirect } = require('react-router-dom');
const { createTheme, ThemeProvider } = require('@material-ui/core/styles');

const Navbar = require('./components/Navbar/Navbar');
const Dashboard = require('./components/Dashboard/Dashboard');
const Query = require('./components/Queries/Query');

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#787878',
      paper: '#888888',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c0c0c0',
    },
  },
});

const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'));

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

module.exports = App;