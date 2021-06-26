const {
  getItemsList,
} = require('');


describe("getItemsList", () => {

  it("should test result data", () => {
    //   axios.get = jest.fn().mockImplementation(() => ({
        
    //       "status": "success",
    //       "pizzas": [
    //         {
    //           "ingredients": null,
    //           "_id": "60d5f32fec996431e8de878e",
    //           "name": "hawaiana",
    //           "price": 10,
    //           "image": "pizza-image-1624634159215.jpg",
    //           "createdAt": "2021-06-25T15:15:59.434Z",
    //           "updatedAt": "2021-06-25T15:15:59.434Z",
    //           "__v": 0
    //         }
    //      ]
    //  }));
      getItemsList("calculadora").then(result => {
          expect(result.items.length).toBeGreaterThanOrEqual(5)
      });
  });
});