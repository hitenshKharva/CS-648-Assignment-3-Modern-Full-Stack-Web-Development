const fs = require('fs')
const express = require('express')
const { ApolloServer } = require('apollo-server-express');

const products = [
    {
        id:1,
        Category:'Jeans',
        Name:'Denim Jeans',
        Price:'25',
        Image:'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F40%2Fcf%2F40cf42a76cf1f0ee44baa98d75acc836ef9d85d5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans_slim%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]'
    },
    {
        id:2,
        Category:'Shirts',
        Name:'White Shirt',
        Price:'30',
        Image:'https://media.gq.com/photos/60be6c1dd931a0e0dacdeb14/master/w_2000,h_1333,c_limit/Kirkland-Signature-crew-neck-t-shirts-(6-pack).jpg'
    },
];

const resolvers = {
    Query: {
        productList,
    },
    Mutation: {
        addProduct,
    },
};

function productList() {
    return products;
  }

function addProduct(_, { product }) {
    product.id = products.length + 1;
    products.push(product);
    return product;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    });

const app = express();
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function () {
    console.log('App started on port 3000');
});