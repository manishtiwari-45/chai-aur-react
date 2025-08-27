import React from 'react';

function Footer() {
return (
    <footer className="bg-[#0d1b2a] text-white py-6 mt-auto">
    <div className="max-w-4xl mx-auto text-center px-4">
        
        <h3 className="text-xl font-bold mb-2">About the Creator</h3>
        

        <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
        Hi, I am Manish Tiwari, a passionate developer from Lucknow. I love building useful and beautiful web applications with tools like React and Vite. This to-do app is a project to showcase my skills.
        </p>

        <div className="flex justify-center space-x-6 mb-4">
        <a href="https://github.com/manishtiwari-45" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-200">GitHub</a>
        <a href="https://linkedin.com/in/manish-tiwari2578" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-200">LinkedIn</a>
        <a target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-200">Email: manishtiwari2578@gmail.com</a>
        </div>

        <p className="text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} To-Do App Project. All Rights Reserved.
        </p>

    </div>
    </footer>
);
}

export default Footer;