import React from "react";
import { Button } from "./Button";
import "jest-styled-components";
// import renderer from 'react-test-renderer'
// import { ThemeProvider } from "styled-components";
// import { TestTheme } from "styles/Themes/TestTheme";
import { shallowWithTheme } from "utils/test/renderWithTheme";

describe("<Button />", () => {
  it("snapshot test", () => {
    const wrapper = shallowWithTheme(<Button />);
    // const tree = renderer.create(
    //   <ThemeProvider theme={TestTheme}>
    //     <Button />
    //   </ThemeProvider>
    // ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
