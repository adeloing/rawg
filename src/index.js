import './style/style.scss';
import "bootstrap";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";
import { routes } from "./routes";

const callRoute = () => {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];
  
    if (pageFunction !== undefined) {
      pageFunction(pageArgument);
    }
  };
  
  window.addEventListener('hashchange', () => callRoute());
  window.addEventListener('DOMContentLoaded', () => callRoute());
  