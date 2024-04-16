package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.MenuEntity;
import ir.mbbn.data.entity.UserEntity;
import ir.mbbn.service.CompanyService;
import ir.mbbn.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(CrudApi.BASE_API_PATH + "/menu")
public class MenuController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/")
    public ResponseEntity<List<MenuEntity>> menus() {
        List<MenuEntity> menus = menuService.loadUserMenu();
        return ResponseEntity.ok(menus);
    }
}
