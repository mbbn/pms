package ir.mbbn.service;

import ir.mbbn.data.entity.MenuEntity;
import ir.mbbn.data.repository.MenuRepository;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private MenuRepository menuRepository;

    public List<MenuEntity> loadUserMenu() {
        return menuRepository.findAll();
    }
}
