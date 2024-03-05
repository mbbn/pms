package ir.mbbn.service;

import ir.mbbn.data.entity.CompanyEntity;
import ir.mbbn.data.entity.UserEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EntityMapper {
    EntityMapper mapper = Mappers.getMapper(EntityMapper.class);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "mobile", source = "mobile")
    UserEntity convert(UserEntity entity);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "latinName", source = "latinName")
    @Mapping(target = "persianName", source = "persianName")
    @Mapping(target = "about", source = "about")
    CompanyEntity convert(CompanyEntity entity);
}
