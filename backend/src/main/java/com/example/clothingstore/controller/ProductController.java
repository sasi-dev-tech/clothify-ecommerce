//package com.example.clothingstore;
package com.example.clothingstore.controller;

import com.example.clothingstore.Product;
import com.example.clothingstore.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import javax.annotation.PostConstruct;
import java.time.Duration;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private Bucket bucket;

    @PostConstruct
    public void setupBucket() {
        Bandwidth limit = Bandwidth.classic(10, Refill.greedy(10, Duration.ofMinutes(1)));
        this.bucket = Bucket4j.builder().addLimit(limit).build();
    }


    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        if (bucket.tryConsume(1)) {
            return ResponseEntity.ok(productRepository.findAll());
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests - try again later.");
        }
    }


    @PostMapping("/data")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        if (bucket.tryConsume(1)) {
            return ResponseEntity.ok(productRepository.save(product));
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests - try again later.");
        }
    }
}
