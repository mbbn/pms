package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "ROLE", uniqueConstraints = {
        @UniqueConstraint(name = "UK_ROLE_NAME", columnNames = "NAME")
})
@Data
public class RoleEntity {

    @Id
    @Column(name = "ROLE_ID")
    private String id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "ROLE_AUTHORITY",
            joinColumns = @JoinColumn(name = "ROLE_ID"), foreignKey = @ForeignKey(name = "FK_ROLE_AUTHORITY_ROLE_ID"),
            inverseJoinColumns = @JoinColumn(name = "AUTHORITY_ID"),inverseForeignKey = @ForeignKey(name = "FK_ROLE_AUTHORITY_AUTHORITY_ID"))
    private Set<AuthorityEntity> authorities;
}
