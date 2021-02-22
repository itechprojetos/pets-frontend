import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: window.location.href.includes('/dev/build') ? '/dev/build/' : '/'
});

export default history;
