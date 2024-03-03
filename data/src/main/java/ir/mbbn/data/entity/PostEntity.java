package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "POST", uniqueConstraints = {
        @UniqueConstraint(name = "UK_POST_NAME", columnNames = "NAME")
})
@Data
public class PostEntity extends BaseEntity<String>{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "POST_ID", length = 36)
    private String id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "POST_ROLE", foreignKey = @ForeignKey(name = "FK_POST_ROLE_POST_ID"),
            inverseForeignKey = @ForeignKey(name = "FK_POST_ROLE_ROLE_ID"))
    private Set<RoleEntity> roles;
}
