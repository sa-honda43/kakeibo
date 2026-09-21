package com.example.kakeibo_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Table(name = "items")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date; // 日付 (YYYY-MM-DD)

    @Column(nullable = false)
    private String type; // 入出金区分 (収入 / 支出)

    @Column(nullable = false)
    private String tag; // タグ・カテゴリ (食費、交通費など)

    @Column(nullable = false)
    private Integer amount; // 金額

    @Size(max = 20, message = "摘要は20文字以内で入力してください")
    private String description; // 摘要・メモ (任意入力)
    
}