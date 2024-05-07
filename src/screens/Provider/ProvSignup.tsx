import React from "react";
import SignupForm from "../../components/Provider/SignupForm";
import LogoImg from "../../assets/Images/WhatsApp_Image_2024-05-07_at_20.13.27_bb0ad381-removebg-preview.png";

function ProviderSignup() {
  return (
    <div className="flex w-full h-screen lg:bg-primary-provider">
       <div className="hidden lg:flex h-full w-1/2 items-center  justify-center">
          <div className="w-1/2">
            <img src={LogoImg} className='' />
          </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <SignupForm />
      </div>
    </div>
  );
}

export default ProviderSignup;
