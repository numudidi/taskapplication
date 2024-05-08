import React from "react";

const CustomSelectStyle = () => (
  <style>
    {`
      .react-dropdown-select {
        border: none !important;
        background-color: #F6F6F6 !important;
        outline: none !important;
        border-radius: 6px !important;
        padding: 0.5rem 1rem !important;

      }
      .react-dropdown-select .react-dropdown-select-content {
        border: none !important;
      }
      .css-wmy1p7-ReactDropdownSelect:focus, .css-wmy1p7-ReactDropdownSelect:focus-within {
        box-shadow: 0 0 #0000 !important;
      }
    `}
  </style>
);

export default CustomSelectStyle;
