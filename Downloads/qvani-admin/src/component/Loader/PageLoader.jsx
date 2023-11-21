import React from "react";
import { ThreeDots  } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#7985f5" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

export default PageLoader;
