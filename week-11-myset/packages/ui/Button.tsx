/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-alert */
"use client";

import * as React from "react";

export function Button() {
  return <button onClick={() => alert("boop")}>Boop</button>;
}