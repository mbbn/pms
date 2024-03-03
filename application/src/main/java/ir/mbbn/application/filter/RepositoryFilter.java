package ir.mbbn.application.filter;

import ir.mbbn.data.entity.BaseEntity;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AssignableTypeFilter;

import java.io.IOException;

@WebFilter(urlPatterns = "/api/*/repo/*", dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD})
public class RepositoryFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
