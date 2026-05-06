import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'PetLove';
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    const updateMeta = (selector, content) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      } else if (selector.startsWith('meta[name')) {
        const name = selector.match(/"([^"]+)"/)[1];
        element = document.createElement('meta');
        element.name = name;
        element.content = content;
        document.head.appendChild(element);
      } else if (selector.startsWith('meta[property')) {
        const property = selector.match(/"([^"]+)"/)[1];
        element = document.createElement('meta');
        element.setAttribute('property', property);
        element.content = content;
        document.head.appendChild(element);
      }
    };

    if (description) {
      updateMeta('meta[name="description"]', description);
      updateMeta('meta[property="og:description"]', description);
    }
    updateMeta('meta[property="og:title"]', fullTitle);
  }, [title, description, location]);

  return null;
};

export default SEO;
