import React from "react";
import { Oval } from "react-loader-spinner";

const SubmitLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Oval
        height={20}
        width={20}
        color="blue"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default SubmitLoader;
