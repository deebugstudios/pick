import React from "react";

export default function ThousandConverter(props) {
  function reverseString(str) {
    return str.split("").reverse().join("");
  }
  const num = props.value;

  /**
   * @param {string | number}
   */

  const emptyStr = "";
  const group_regex = /\d{3}/g;

  // delete extra comma by regex replace.
  const trimComma = (str) => str.replace(/^[,]+|[,]+$/g, emptyStr);

  const str = num + emptyStr;
  const [integer, decimal] = str.split(".");

  const conversed = reverseString(integer);

  const grouped = trimComma(
    reverseString(conversed.replace(/\d{3}/g, (match) => `${match},`))
  );

  return !decimal ? grouped : `${grouped}.${decimal}`;
}
