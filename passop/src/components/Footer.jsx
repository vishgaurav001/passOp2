import React from 'react';

const Footer = () => {
    return (
        <footer className="max-h-20 ">
            <div className="container mx-auto px-4 max-w-5xl text-center">
                <h1 className="text-2xl font-bold text-green-900">
                    <span className="text-green-400">&lt;/</span>
                    Pass<span className="text-green-800">OP</span>
                    <span className="text-green-400">&gt;</span>
                </h1>
                <p className="text-gray-700 text-sm mt-1">Your own password manager</p>
                
            </div>
        </footer>
    );
};

export default Footer;
