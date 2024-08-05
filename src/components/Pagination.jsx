/* eslint-disable react/jsx-props-no-spreading */
const React = require('react');
const { useEffect } = require('react');
const { useDispatch, useSelector } = require('react-redux');
const { Pagination, PaginationItem } = require('@material-ui/lab');
const { Link } = require('react-router-dom');

const { getPosts } = require('../actions/posts');
const useStyles = require('./styles').default;

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

module.exports = Paginate;