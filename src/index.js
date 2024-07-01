import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


let renderEntireTree = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <App />
    );
}

renderEntireTree();




