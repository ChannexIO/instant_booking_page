import moment from "moment";

import { DATE_API_FORMAT, DATE_FORMAT, DATE_UI_FORMAT, DATE_UI_FULL_MONTH_FORMAT } from "constants/formats"

import dateFormatter from "./date_formatter";

const VALID_DATE = moment("2020-10-05");
const VALID_FORMATTED_CLIENT_DATE = VALID_DATE.format(DATE_FORMAT)
const VALID_FORMATTED_API_DATE = VALID_DATE.format(DATE_API_FORMAT);
const VALID_FORMATTED_UI_DATE = VALID_DATE.format(DATE_UI_FORMAT);
const VALID_FORMATTED_UI_FULL_MONTH_DATE = VALID_DATE.format(DATE_UI_FULL_MONTH_FORMAT);

const INVALID_DATE = moment.invalid();

describe("Date formatter", () => {
  test("It should correctly format to client format", () => {
    const formattedDate = dateFormatter.toClient(VALID_DATE); 

    expect(formattedDate).toEqual(VALID_FORMATTED_CLIENT_DATE);
  });

  test("It should correctly format to api format", () => {
    const formattedDate = dateFormatter.toApi(VALID_DATE); 
    
    expect(formattedDate).toEqual(VALID_FORMATTED_API_DATE);
  });

  test("It should correctly format to ui format", () => {
    const formattedDate = dateFormatter.toUi(VALID_DATE); 

    expect(formattedDate).toEqual(VALID_FORMATTED_UI_DATE);
  });

  test("It should correctly format to ui with full month format", () => {
    const formattedDate = dateFormatter.toUiFullMonth(VALID_DATE); 
    
    expect(formattedDate).toEqual(VALID_FORMATTED_UI_FULL_MONTH_DATE);
  });

  test("It should return null for invalid client format", () => {
    const formattedDate = dateFormatter.toClient(INVALID_DATE); 

    expect(formattedDate).toEqual(null);
  });

  test("It should return null for invalid api format", () => {
    const formattedDate = dateFormatter.toApi(INVALID_DATE); 

    expect(formattedDate).toEqual(null);
  });

  test("It should return null for invalid ui format", () => {
    const formattedDate = dateFormatter.toUi(INVALID_DATE); 

    expect(formattedDate).toEqual(null);
  });

  test("It should return null for invalid ui with full month format", () => {
    const formattedDate = dateFormatter.toUiFullMonth(INVALID_DATE); 

    expect(formattedDate).toEqual(null);
  });
})