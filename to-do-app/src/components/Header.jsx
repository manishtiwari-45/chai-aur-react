import React from 'react';

function Header() {
return (
    <header className="py-3 shadow-lg bg-[#0d1b2a]">
    {/* Flexbox container to align the logo and title */}
    <div className="flex justify-center items-center gap-x-4">
        
        {/* Your Logo (Image File) */}
        <img 
        src="/main.svg" // This path works because the image is in the 'public' folder
        alt="Mera Task Logo" 
        className="h-10 w-10" // You can adjust the height and width as needed
        />
        
        {/* Your New App Name */}
        <h1 className="text-3xl font-bold text-white tracking-wider">
        Mera Task
        </h1>
        
    </div>
    </header>
);
}

export default Header;