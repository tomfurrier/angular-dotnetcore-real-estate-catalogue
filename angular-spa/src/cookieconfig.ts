import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'http://real-estate-catalogue.firebaseapp.com'
  },
  palette: {
    popup: {
      background: '#fff'
    },
    button: {
      background: '##9ccc65'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};
