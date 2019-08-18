import { createBrowserHistory } from 'history';

const ENV = process.env.NODE_ENV;

let publicUrl: string = '';

if (ENV === 'development') {
  publicUrl = '/';
} else {
  publicUrl = '/Tomato-ts';
}

export default createBrowserHistory({ basename: publicUrl });
