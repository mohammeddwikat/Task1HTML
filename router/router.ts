import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { ICategory } from "../models/categories";
import { IProduct } from "../models/products";
import { ICheckout } from "../models/checkout";
import { Guid } from 'js-guid';


const GUID = require('mongoose-guid');
const jsonParser = bodyParser.json();
const Category = require("../models/categories");
const router = express.Router();
const Product = require("../models/products");
const Checkout = require("../models/checkout");

router.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// Category APIs

/**Send all categories that stored in the database */
router.get("/category", async (req: Request, res: Response) => {
  try {
    const category: ICategory = await Category.find();
    if (category === null) {
      res.status(404).json({ message: "records not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * add new category 
 * @param {Object} jsonParser - The object help the middleware in dealing with JSON objects
 */
router.post("/category", jsonParser, async (req: Request, res: Response) => {
  const category = new Category({
    id: req.body.id,
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(201).send("Success " + newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/** Return a category based on the sent id */
router.get(
  "/category/:id",
  getCategory,
  async (req: Request, res: CategoryResponse) => {
    res.json(res.category);
  }
);

/** Delete record from categories collection based on the sent id */
router.delete(
  "/category/:id",
  getCategory,
  async (req: Request, res: CategoryResponse) => {
    try {
      await Category.remove(res.category);
      res.send("The Record deleted Successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * Update record in category collection based on the sent id
 * @param {Function} getCategory - Function middleware get the specific category if found and edit the response object in adding the found category on it
 * @param {Object} jsonParser - The object help the middleware in dealing with JSON objects
 */
router.patch(
  "/category/:id",
  getCategory,
  jsonParser,
  async (req: Request, res: CategoryResponse) => {
    if (res.category !== undefined && req.body !== undefined) {
      if (req.body.name != null) {
        res.category.name = req.body.name;
        console.log(req.body.name);
      }
      try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Products APIs

/**Send all products that stored in the database */
router.get("/product", async (req: Request, res: Response) => {
  try {
    const product: IProduct = await Product.find();
    if (product === null) {
      res.status(404).json({ message: "records not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * add new product 
 * @param {Object} jsonParser - The object help the middleware in dealing with JSON objects
 */
router.post("/product", jsonParser, async (req: Request, res: Response) => {
  const category = await Category.findById(req.body.categoryId);
  if (category === null) {
    res.status(404).json({ message: "The Category cannot found" });
  } else if (isCodeFormatValid(req.body.code) === false) {
    res.status(406).json({ message: "The code format is wrong" });
  } else {
    const product = new Product({
      ...req.body,
    });
    try {
      const newCategory = await product.save();
      res.status(201).send("Success " + newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

/** Return a product based on the sent id */
router.get(
  "/product/:id",
  getProduct,
  async (req: Request, res: ProductResponse) => {
    res.json(res.product);
  }
);

/** Delete record from products collection based on the sent id */
router.delete(
  "/product/:id",
  getProduct,
  async (req: Request, res: ProductResponse) => {
    try {
      await Product.remove(res.product);
      res.send("The Record deleted Successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * Update record in products collection based on the sent id
 * @param {Function} getProduct - Function middleware get the specific product if found and edit the response object in adding the found product on it
 * @param {Object} jsonParser - The object help the middleware in dealing with JSON objects
 */
router.patch(
  "/product/:id",
  getProduct,
  jsonParser,
  async (req: Request, res: ProductResponse) => {
    if (res.product !== undefined && req.body !== undefined) {
      const arrayOfKeys = Object.keys(req.body);
      arrayOfKeys.forEach(async (key) => {
        if (res.product !== undefined) {
          if (key === "code") {
            if (!isCodeFormatValid(req.body[key])) {
              res.status(406).json({ message: "The code is wrong" });
            }
          }
          if (key === "categoryId") {
            const category = await Category.findById(req.body[key]);
            if (category === null) {
              res.status(404).json({ message: "The Category cannot found" });
            }
          }
          res.product.set(key, req.body[key]);
        }
      });
      try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

// Checkout API

/**Send all checkouts that stored in the database */
router.get("/checkout", async(req: Request, res: Response) => {
  try {
    const checkout: ICheckout = await Checkout.find();
    if (checkout === null) {
      res.status(404).json({ message: "records not found" });
    } else {
      res.status(200).json(checkout);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * add new checkout 
 * @param {Object} jsonParser - The object help the middleware in dealing with JSON objects
 */
router.post("/checkout", jsonParser, async(req: Request, res: Response) => {  
  const checkout = new Checkout({
    
    ...req.body,
    id : Guid.newGuid()
  });
  try {
    const newCheckout = await checkout.save();
    res.status(201).send("Success " + newCheckout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

interface CategoryResponse extends Response {
  category?: ICategory;
}

interface ProductResponse extends Response {
  product?: IProduct;
}

interface CheckoutResponse extends Response {
  checkout?: ICategory;
}

/**
 * Middleware help in finding the required category and return it if it found
 * @param {Callback} next -Call the next middleware in the stack to handle the next request
 */
async function getCategory(
  req: Request,
  res: CategoryResponse,
  next: NextFunction
) {
  let category: ICategory;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Cannot find the category" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.category = category;
  next();
}

/**
 * Middleware help in finding the required category and return it if it found
 * @param {Callback} next -Call the next middleware in the stack to handle the next request 
 */
async function getProduct(
  req: Request,
  res: ProductResponse,
  next: NextFunction
) {
  let product: IProduct;
  try {
    product = await Product.findById(req.params.id);
    if (product === null) {
      return res.status(404).json({ message: "The record cannot found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}

/**
 * Check if the code used the required format 
 * @param {string} code - The code that sent in the body request 
 */
const isCodeFormatValid: Function = (code: string): boolean => {
  return /^\w{3,4}(\-)\w{3,4}(\-)\w{3,4}$/.test(code);
};


module.exports = router;
