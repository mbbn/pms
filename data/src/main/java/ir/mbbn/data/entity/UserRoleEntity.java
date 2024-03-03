package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "USER_ROLE", uniqueConstraints = {
        @UniqueConstraint(name = "UK_USER_ROLE", columnNames = "USER_ID,ROLE_ID")
})
@Data
public class UserRoleEntity extends BaseEntity<Integer>{

    @Id
    @Column(name = "USER_ROLE_ID")
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_ROLE_ROLE_ID"))
    private RoleEntity role;
    @Column(name = "ENABLED")
    private Boolean enable;
    @Column(name = "EXPIRE_AT")
    private LocalDateTime expireAt;
}
