package com.example.kakeibo_backend.controller;

import com.example.kakeibo_backend.entity.Item;
import com.example.kakeibo_backend.service.ItemService;
import jakarta.validation.Valid; // ★バリデーション用に追記
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // 取得 (GET)
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    // 登録 (POST) - ★ @Valid を追加
    @PostMapping
    public Item createItem(@Valid @RequestBody Item item) {
        return itemService.createItem(item);
    }

    // 更新 (PUT: /api/items/{id}) - ★ @Valid を追加
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @Valid @RequestBody Item item) {
        return itemService.updateItem(id, item);
    }

    // 削除 (DELETE: /api/items/{id})
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }
}