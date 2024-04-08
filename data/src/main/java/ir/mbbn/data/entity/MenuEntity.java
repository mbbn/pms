package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Data
@Entity
@Table(name = "MENU")
@EqualsAndHashCode(callSuper = true)
public class MenuEntity extends BaseEntity<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "MENU_ID", length = 36)
    private String id;

    @Column(name = "TITLE", nullable = false)
    private String title;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", foreignKey = @ForeignKey(name = "FK_MENU_PARENT"))
    private MenuEntity parent;*/

    /*@OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private Set<MenuEntity> subMenu;*/
}
