import React from 'react';
import FooterList from './FooterList';

const FooterContent = () => {
    return (
        <div className="fithub-footer-content">
            <a class="footer-svg" href="#">
                <img src='src\img\logo.svg'></img> 
            </a>
            <FooterList />
        </div>
    );
};

export default FooterContent;
