"use client";

import React from "react";
import { UserAuth } from "../Context/AuthContext";

const page = () => {
  const { loggedUser } = UserAuth();

  console.log("from owner page: ",loggedUser);
  return (
    <>
      <div>
        
      </div>
    </>
  );
};

export default page;
