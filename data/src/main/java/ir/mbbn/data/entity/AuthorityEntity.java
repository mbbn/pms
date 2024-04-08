package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "AUTHORITY", uniqueConstraints = {
        @UniqueConstraint(name = "UK_AUTHORITY", columnNames = "AUTHORITY")
})
@Data
public class AuthorityEntity extends BaseEntity<String> implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "AUTHORITY_ID", length = 36)
    private String id;

    @Column(name = "AUTHORITY", nullable = false)
    private String authority;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", nullable = false, foreignKey = @ForeignKey(name = "FK_AUTHORITY_POST"))
    private RoleEntity role;
}
