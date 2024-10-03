import React from 'react';
// import '../app/globals.css';

const SideBar = () => {
  return (
    <div className="flex z-10 flex-col text-white fixed h-screen w-full gap-4 bg-[#1A1A1A] pt-[30px] px-3 top-0 left-0 md:hidden ">
      <section className="flex flex-col md:hidden side-items">
        <span>Home</span>
        <span>About</span>
        <span>Project</span>
        <span>Services</span>
        <span>Resume</span>
      </section>
      <section className="contact-item md:hidden flex border-[#4FC3F7] py-[18px] px-[50px] rounded-[75px] transition duration-300 ease-in-out transform hover:bg-[#4FC3F7] hover:scale-105">
        Contact Me
      </section>
    </div>
  );
};

export default SideBar;
