package com.example.springjpagradle.repository;

import com.example.springjpagradle.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
