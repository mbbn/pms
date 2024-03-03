package ir.mbbn.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.annotation.Annotation;
import java.util.HashSet;
import java.util.Set;

public class ReflectionUtil {
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
