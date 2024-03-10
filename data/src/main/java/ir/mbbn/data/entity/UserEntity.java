package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "PMS_USER", uniqueConstraints = {
        @UniqueConstraint(name = "UK_USER_EMAIL", columnNames = "EMAIL"),
        @UniqueConstraint(name = "UK_USER_MOBILE", columnNames = "MOBILE")
})
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends BaseEntity<String> implements UserDetails, CredentialsContainer {

    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "USER_ID", length = 36)
    private String id;
    @Column(name = "MOBILE", nullable = false)
    private Integer mobile;
    @Column(name = "PASSWORD", nullable = false)
    private String password;
    @Column(name = "ENABLED", nullable = false)
    private Boolean enabled;
    @Column(name = "LOCKED", nullable = false)
    private Boolean locked;
    @Column(name = "CHANGE_PASSWORD_TIME")
    private LocalDateTime changePasswordTime;
    @Column(name = "EXPIRE_AT")
    private LocalDateTime expireAt;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_POST_USER_ID"))
    private Set<UserPostEntity> posts;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_ROLE_USER_ID"))
    private Set<UserRoleEntity> roles;

    @Override
    public void eraseCredentials() {
        this.password = null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<RoleEntity> userRoles;
        if(roles != null && !roles.isEmpty()){
            userRoles = roles.stream().map(UserRoleEntity::getRole).collect(Collectors.toSet());
        } else {
            userRoles = new HashSet<>();
        }
        if(posts != null && !posts.isEmpty()){
            posts.parallelStream()
                    .filter(UserPostEntity::getEnable)
                    .filter(userPostEntity -> userPostEntity.getExpireAt() != null && userPostEntity.getExpireAt().isAfter(LocalDateTime.now()))
                    .forEach(userPostEntity -> userRoles.addAll(userPostEntity.getPost().getRoles()));
        }

        HashSet<AuthorityEntity> authorities = new HashSet<>();
        for (RoleEntity role : userRoles) {
            authorities.addAll(role.getAuthorities());
        }
        return authorities;
    }

    @Override
    public String getUsername() {
        if(mobile != null){
            return mobile.toString();
        }
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return expireAt == null || expireAt.isAfter(LocalDateTime.now());
    }

    @Override
    public boolean isAccountNonLocked() {
        return locked== null || !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return changePasswordTime == null || changePasswordTime.isAfter(LocalDateTime.now());
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
