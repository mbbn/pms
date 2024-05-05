package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "CATEGORY", uniqueConstraints = {@UniqueConstraint(name = "UK_CATEGORY", columnNames = "LATIN_NAME")})
@EqualsAndHashCode(callSuper = true)
public class CategoryEntity extends BaseEntity<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "CATEGORY_ID", length = 36)
    private String id;

    @Column(name = "LATIN_NAME", nullable = false)
    private String latinName;

    @Column(name = "PERSIAN_NAME", nullable = false)
    private String persianName;

    @Column(name = "IMAGE", nullable = false)
    private byte[] image;
}
