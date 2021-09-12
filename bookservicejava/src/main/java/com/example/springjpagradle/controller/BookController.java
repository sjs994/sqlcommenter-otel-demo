package com.example.springjpagradle.controller;

import com.example.springjpagradle.entity.Book;
import com.example.springjpagradle.repository.BookRepository;
import io.opencensus.common.Scope;
import io.opencensus.trace.Tracer;
import io.opencensus.trace.Tracing;
import io.opencensus.trace.samplers.Samplers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    // Quick way to add tracing information to check SQLCommenter code.
    private static Tracer tracer = Tracing.getTracer();

    @GetMapping("/books")
    public List<Book> fetchAll() {
        try (Scope scope = tracer.spanBuilder("fetch")
                .setSampler(Samplers.alwaysSample())
                .startScopedSpan()) {
            return bookRepository.findAll();
        }
    }

    @PostMapping("/books")
    public Book create(@RequestBody Book book) {
        try (Scope scope = tracer.spanBuilder("create")
                .setSampler(Samplers.alwaysSample())
                .startScopedSpan()) {
            return bookRepository.save(book);
        }
    }
}
