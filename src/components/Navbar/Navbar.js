const React = require('react');
const { useState, useEffect, useCallback } = require('react');
const { AppBar, Typography, Toolbar, Avatar, Button } = require('@material-ui/core');
const { Link, useHistory, useLocation } = require('react-router-dom');
const { useDispatch } = require('react-redux');
const jwt_decode = require('jwt-decode');

const CAB_logo = require('../../images/CAB_logo.png');
const { LOGOUT } = require('../../constants/actionTypes');
const useStyles = require('./styles');

const Navbar = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    history.push('/auth');
    setUser(null);
    localStorage.removeItem('profile');
  }, [dispatch, history]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setUser(JSON.parse(storedProfile));
    }
  }, [location]);

  useEffect(() => {
    const token = user ? user.token : null;

    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwt_decode(token);
        const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();
        if (isTokenExpired) {
          logout();
        }
      }
    };

    checkTokenExpiration();
  }, [logout, user]); // Use 'user' directly as a dependency

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={CAB_logo} alt="icon" height="45px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className={classes.profile}>
            <Typography variant="h6">Athena SQL Assistant</Typography>
            <Button component={Link} to="/auth" variant="contained" color="primary">
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

module.exports = Navbar;