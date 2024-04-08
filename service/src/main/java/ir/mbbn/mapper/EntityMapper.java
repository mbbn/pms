package ir.mbbn.mapper;

import ir.mbbn.data.entity.*;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
public interface EntityMapper {
    EntityMapper mapper = Mappers.getMapper(EntityMapper.class);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "mobile", source = "mobile")
    @Mapping(target = "enabled", source = "enabled")
    @Mapping(target = "roles", source = "roles")
    @Mapping(target = "posts", source = "posts")
    UserEntity convert(UserEntity entity);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "latinName", source = "latinName")
    @Mapping(target = "persianName", source = "persianName")
    @Mapping(target = "about", source = "about")
    CompanyEntity convert(CompanyEntity entity);
}
