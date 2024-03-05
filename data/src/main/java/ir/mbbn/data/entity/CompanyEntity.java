package ir.mbbn.data.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "COMPANY", uniqueConstraints = {
})
@EqualsAndHashCode(callSuper = true)
public class CompanyEntity extends BaseEntity<String>{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "COMPANY_ID", length = 36)
    private String id;

    @Column(name = "HOST_NAME", nullable = false)
    private String hostName;

    @Column(name = "LATIN_NAME", nullable = false)
    private String latinName;

    @Column(name = "PERSIAN_NAME", nullable = false)
    private String persianName;

    @Column(name = "ABOUT")
    private String about;
}
