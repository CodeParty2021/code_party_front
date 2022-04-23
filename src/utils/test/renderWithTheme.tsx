import React from "react";
import { render, shallow } from "enzyme";
import { ThemeProvider } from "styled-components";
import { TestTheme } from "styles/Themes/TestTheme";
import "jest-styled-components";

export const renderWithTheme = (
  tree: React.ReactElement,
  theme = TestTheme
) => {
  return render(<ThemeProvider theme={theme}>{tree}</ThemeProvider>);
};

export const shallowWithTheme = (
  tree: React.ReactElement,
  theme = TestTheme
) => {
  return shallow(<ThemeProvider theme={theme}>{tree}</ThemeProvider>);
};
