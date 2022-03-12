// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ref } from "firebase/database";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("firebase_config");
jest.mock("firebase/database");

//firebaseをモック
const refMock = ref as jest.Mock;
const childMock = ref as jest.Mock;

refMock.mockImplementation((ref: any, path: string) => path);
childMock.mockImplementation((ref: any, path: string) => `${ref}/${path}`);
