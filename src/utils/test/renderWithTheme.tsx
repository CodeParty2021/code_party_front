import React from "react";
import { mount, render, shallow } from "enzyme";
import { ThemeProvider } from "styled-components";
import { TestTheme } from "styles/Themes/TestTheme";
import "jest-styled-components";

export const mountWithTheme = (
  children: React.ReactNode,
  theme = TestTheme
) => {
  console.log(children, mount, ThemeProvider, TestTheme);
  return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

export const renderWithTheme = (children: React.ReactNode, theme = TestTheme) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export const shallowWithTheme = (
  children: React.ReactNode,
  theme = TestTheme
) => shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
