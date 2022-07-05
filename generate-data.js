const { count } = require('console');
const faker = require('faker');
const fs = require('fs');

// Set locale to use Vietnamese
faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category   // CONTACTS
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      date: faker.date.between('2000-01-01', '2022-01-01'),
      address: faker.address.cityName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(3),
      company: faker.commerce.department(),
      company_address: '',
      owner: faker.commerce.department(),
      facebook: '',
      zalo: '',
      linked: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

// SEGMENTS

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.words(5),
        total: faker.datatype.number(),
        total_lastweek: faker.datatype.number(),
        createdAt: Date.now(),
        // updatedAt: Date.now(),
      };

      productList.push(product);
    });
  }

  return productList;
};

// IFFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Po',
    },
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully =))');
  });
})();
