package ir.mbbn.application.config;

import ir.mbbn.common.type.RestRepository;
import ir.mbbn.common.util.ReflectionUtil;
import ir.mbbn.data.entity.BaseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.*;
import java.util.stream.Collectors;

@Configuration
public class RepositoryConfiguration {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Bean
    public Map<String, BaseEntity<?>> entityMapName() {
        HashMap<String, BaseEntity<?>> classHashMap = new HashMap<>();

        ClassLoader classLoader = ClassLoader.getSystemClassLoader();
        Set<Package> packages = Arrays.stream(classLoader.getDefinedPackages()).filter(p -> p.getName().startsWith("ir.mbbn")).collect(Collectors.toSet());
        for(Package p:packages){
            String packageName = p.getName();
            Set<Class<?>> annotationInPackage = ReflectionUtil.getClassesWithAnnotationInPackage(packageName, RestRepository.class);
            for (Class<?> aClass : annotationInPackage) {
                try {
                    String fullName = aClass.getCanonicalName();
                    String entityName = fullName.substring(fullName.lastIndexOf(".") +1).replaceAll("Entity$", "");
                    BaseEntity example = (BaseEntity) aClass.newInstance();
                    classHashMap.put(entityName, example);
                } catch (InstantiationException e) {
                    throw new RuntimeException(e);
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }

            }
        }
        return classHashMap;
    }
}
