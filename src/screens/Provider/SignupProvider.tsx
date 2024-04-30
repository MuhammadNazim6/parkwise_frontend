import React from "react";
import SignupForm from "../../components/Provider/SignupForm";
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-white-transparent.png";

function SignupProvider() {
  return (
    <div className="flex w-full h-screen lg:bg-primary-provider">
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            <h1 className="text-4xl text-center text-white leading-normal">
              "Embark on a journey of convenience and ease. Sign up as a parking
              provider today!"
            </h1>
          </div>
          <div className="m-10 ml-28">
            <img
              src={LogoImg}
              className="w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupProvider;
