package com.example.kakeibo_backend.service;

import com.example.kakeibo_backend.entity.Item;
import com.example.kakeibo_backend.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // 全件取得
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // 新規登録
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    // 更新
    public Item updateItem(Long id, Item newItemData) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setDate(newItemData.getDate());
                    item.setType(newItemData.getType());             // 区分 (支出 / 収入)
                    item.setTag(newItemData.getTag());               // タグ
                    item.setAmount(newItemData.getAmount());
                    item.setDescription(newItemData.getDescription()); // 摘要
                    return itemRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
    }

    // 削除
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}