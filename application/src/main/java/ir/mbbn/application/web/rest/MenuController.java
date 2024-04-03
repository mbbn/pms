package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.MenuEntity;
import ir.mbbn.data.entity.UserEntity;
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
@RequestMapping(CrudApi.BASE_API_PATH + "/Menu")
public class MenuController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/")
    public ResponseEntity<List<MenuEntity>> menus() {
        ArrayList<MenuEntity> menus = new ArrayList<>();
        menus.add(MenuEntity.builder()
                .id(UUID.randomUUID().toString())
                .title("قابلیت").build());
        HashSet<MenuEntity> subMenu = new HashSet<>();
        subMenu.add(MenuEntity.builder()
                .id(UUID.randomUUID().toString())
                .title("محصول ۱").build());
        subMenu.add(MenuEntity.builder()
                .id(UUID.randomUUID().toString())
                .title("محصول ۲").build());
        menus.add(MenuEntity.builder()
                .id(UUID.randomUUID().toString())
                .title("محصولات")
                .subMenu(subMenu)
                .build());
        menus.add(MenuEntity.builder()
                .id(UUID.randomUUID().toString())
                .title("مشتریان").build());
        menus.add(MenuEntity.builder()
                .id(UUID.randomUUID().toString())
                .title("تماس با ما").build());
        return ResponseEntity.ok(menus);
    }
}