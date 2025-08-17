import React from "react";
import { Marquee } from "./Marquee";

const BrandIconsGrid = () => {
  return (
    <div
      className="bg-white dark:bg-neutral-900 w-screen  pt-16 pb-16"
      id="faq"
    >
      <h2 className="text-4xl font-bold text-center">I learned and trained by</h2>
      <p className="pt-6 pb-8 text-base max-w-2xl text-center m-auto dark:text-neutral-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit nam maxime quas
        fugiat tempore blanditiis, eveniet quia accusantium.
      </p>



    
      <div className="mx-auto w-screen  bg-white dark:bg-transparent ">

      <Marquee>
        <div className="text-center flex  gap-30  justify-center items-center w-screen ml-0  mr-0   ">

      
          <a target="_blank" href="">
            <img
              alt=""
              className="h-20  mx-auto"
              src="https://www.svgrepo.com/show/442910/brand-apple.svg"
            />
          </a>
          <a target="_blank" href="">
            <img
              alt=""
              className="h-20  mx-auto"
              src="https://www.svgrepo.com/show/443329/brand-pixar.svg"
            />
          </a>
          <a target="_blank" href="">
            <img
              alt=""
              className="h-20  mx-auto"
              src="https://www.svgrepo.com/show/443079/brand-geforce.svg"
            />
          </a>
          <a target="_blank" href="">
            <img
              alt=""
              className="h-20  mx-auto"
              src="https://www.svgrepo.com/show/443042/brand-ethereum.svg"
            />
          </a>
          <a target="_blank" href="">
            <img
              alt=""
              className="h-20  mx-auto"
              src="https://www.svgrepo.com/show/443206/brand-line.svg"
            />
          </a>
          <a target="_blank" href="">
            <img
              alt=""
              className="h-20  mx-auto"
              src="https://www.svgrepo.com/show/519278/slack.svg"
            />
          </a>
          
        </div>
        </Marquee>


      </div>

      


    </div>
  );
};

export default BrandIconsGrid;
