import Product from "../models/user"
const path = require('path');

export const redirectRep = async (req, res) => {
    res.sendFile(path.join(__dirname, '../representante.html'));
    res.status(201);
}
export const redirectHom = async (req, res) => {
    res.sendFile(path.join(__dirname, '../home.html'));
    res.status(201);
}
/*
export const getProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}*/