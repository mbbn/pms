package ir.mbbn.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ReflectionUtil {

    public static Set<Class<?>> getClassesWithAnnotationInPackages(String prefixPackageName,Class<? extends Annotation> annotaionClass) {
        Set<Class<?>> classes = new HashSet<>();;
        ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
        Set<Package> packages = Arrays.stream(systemClassLoader.getDefinedPackages()).filter(p -> p.getName().startsWith(prefixPackageName)).collect(Collectors.toSet());
        for (Package p : packages) {
            String packageName = p.getName();
            Set<Class<?>> classesInPackage = getClassesWithAnnotationInPackage(packageName, annotaionClass);
            classes.addAll(classesInPackage);
        }
        return classes;
    }

    public static Set<Class<?>> getClassesWithAnnotationInPackage(String packageName, Class<? extends Annotation> annotaionClass) {
        Set<Class<?>> classes = new HashSet<>();
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        String path = packageName.replaceAll("[.]", "/");
        InputStream resourceAsStream = classLoader.getResourceAsStream(path);
        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(resourceAsStream))){
            String classFileName;
            while ((classFileName = bufferedReader.readLine()) != null) {
                if(classFileName.endsWith(".class")){
                    try {
                        String className = classFileName.substring(0, classFileName.length() - ".class".length());
                        Class<?> cls = Class.forName(packageName + "." + className);
                        if (cls.isAnnotationPresent(annotaionClass)) {
                            classes.add(cls);
                        }
                    } catch (ClassNotFoundException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return classes;
    }
}
