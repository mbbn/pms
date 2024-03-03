package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "USER_POST", uniqueConstraints = {
        @UniqueConstraint(name = "UK_USER_POST", columnNames = "USER_ID,POST_ID")
})
@Data
public class UserPostEntity extends BaseEntity<Integer>{

    @Id
    @Column(name = "USER_POST_ID")
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_POST_POST_ID"))
    private PostEntity post;
    @Column(name = "ENABLED")
    private Boolean enable;
    @Column(name = "EXPIRE_AT")
    private LocalDateTime expireAt;
}
