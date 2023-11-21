import React from "react";
import { Oval } from "react-loader-spinner";
// import { useThemeContext } from "../../Context/ThemeContext";

export default function ButtonLoader() {
  //   const { isDarkTheme } = useThemeContext();

  return (
    <Oval
      height={15}
      width={15}
      //   color={isDarkTheme ? "black" : "black"}
      color="black"
      wrapperStyle={{}}
      wrapperclassName=""
      visible={true}
      ariaLabel="oval-loading"
      //   secondaryColor={isDarkTheme ? "black" : "black"}
      secondaryColor="black"
      strokeWidth={7}
      strokeWidthSecondary={2}
    />
  );
}
