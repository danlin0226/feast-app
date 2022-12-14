import React, { useEffect } from "react";
import SignIn from "../../components/sign-in/SignIn";
import authImg from "../../assets/auth.jpg";
import "./RegisterPage.scss";

const RegisterPage = ({ setShowNav }) => {
  const textContent = {
    page: "register",
    title: "Create Account",
    subheader: "Please enter account details",
    subheader2: "Already have an account?",
    link: "Sign in",
    linkUrl: "/signin",
  };

  useEffect(() => {
    setShowNav(false);
  }, []);
  return (
    <section className="authPage">
      <div className="authPage__left">
        <img className="authPage__img" src={authImg} alt="" />
      </div>
      <div className="authPage__right">
        <SignIn textContent={textContent} />
      </div>
    </section>
  );
};

export default RegisterPage;
