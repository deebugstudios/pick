import React from "react";
import Thanks, { Thanks2 } from "../javascript/Thanks";

export default function ReportThanks() {
  return (
    <Thanks First="Thank you. The Admin has" Second="received your report." />
  );
}

export function ReportThanks2() {
  return (
    <Thanks2 First="Thank you. The Admin has" Second="received your report." />
  );
}
