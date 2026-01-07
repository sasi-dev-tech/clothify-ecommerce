//package com.example.clothingstore;
//package com.example.clothingstore.controller;
//
//import com.example.clothingstore.Product;
//import com.example.clothingstore.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/products")
//@CrossOrigin(origins = "http://localhost:5173")
//public class ProductController {
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @GetMapping
//    public List<Product> getAllProducts() {
//        return productRepository.findAll();
//    }
//
//    @PostMapping("/data")
//    public Product createProduct(@RequestBody Product product) {
//        return productRepository.save(product);
//    }
//}
