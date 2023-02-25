const axios = require("axios");
const { validateLinks } = require("../../validator");

jest.mock("axios");
beforeEach(() => {
  jest.resetAllMocks();
});
describe("everything related to the validateLinks function", () => {
  it("sould return an array of the objects", () => {
    
    const containerArrayObjects = [{
      href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
      status: 200,
      ok: "OK",
    }];
    axios.get.mockResolvedValueOnce(containerArrayObjects[0]);
    validateLinks(containerArrayObjects).then((data) => {
      expect(data).toHaveLength(1);
    });
  });




  it("soult return a status 404", () => {
    const arrayObject404 = [
      {
        href: "https://example.com",
        status: 404,
        ok: "fail",
      },
    ];
    axios.get.mockResolvedValueOnce(arrayObject404[0]);

    validateLinks(arrayObject404).then((data) => {
      data.forEach((e) => {  // debo recorrer el contenido del objeto para acceder a status
        expect(e.status).not.toBe(200)
      })
    });
  });
});
