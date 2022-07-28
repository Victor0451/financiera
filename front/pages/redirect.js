import React from "react";
import Layout from "../components/Layouts/Layout";
import RedirectToLogin from "../components/auth/RedirectToLogin";

const redirect = () => {
  return (
    <Layout>
      <RedirectToLogin />
    </Layout>
  );
};

export default redirect;
