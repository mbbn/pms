package ir.mbbn.application.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@WebFilter(urlPatterns = "/api/*", dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD})
public class RequestLogFilter implements Filter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        if (servletRequest instanceof HttpServletRequest && servletResponse instanceof HttpServletResponse) {
            ContentCachingResponseWrapper responseWrapper = null;
            try {
                ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper((HttpServletRequest) servletRequest);
                responseWrapper = new ContentCachingResponseWrapper((HttpServletResponse) servletResponse);
                chain.doFilter(requestWrapper, responseWrapper);
                requestLog(requestWrapper);
            } finally {
                if (responseWrapper != null) {
                    responseLog((HttpServletRequest) servletRequest, responseWrapper);
                }
            }
        } else {
            //ignore this filter
            chain.doFilter(servletRequest, servletResponse);
        }
    }

    private void requestLog(ContentCachingRequestWrapper wrappedRequest) {
        try {
            String body = null;

            String method = wrappedRequest.getMethod();
            StringBuilder stringBuilder = new StringBuilder();
            String remoteAddr = wrappedRequest.getRemoteAddr();
            stringBuilder.append("[").append(remoteAddr).append("]").append(" ");
            stringBuilder.append("[").append(method).append("]").append(" ");

            String requestURI = wrappedRequest.getRequestURI();
            stringBuilder.append(requestURI);

            Map<String, String[]> parameters = wrappedRequest.getParameterMap();
            if(!parameters.isEmpty()){
                stringBuilder.append("?");
                String[] queryParams = new String[parameters.size()];
                int i=0;
                for (Map.Entry<String, String[]> entry : parameters.entrySet()) {
                    String key = entry.getKey();
                    String val;
                    String[] value = entry.getValue();
                    val = value != null && value.length > 0 ? value[0] : "";
                    queryParams[i++] = key + "=" + val;
                }
                stringBuilder.append(String.join("&",queryParams));
            }
            stringBuilder.append(" ");

            String protocol = wrappedRequest.getProtocol();
            stringBuilder.append("[").append(protocol).append("]").append(" ");

            String contentType = wrappedRequest.getHeader(HttpHeaders.CONTENT_TYPE);
            if(StringUtils.hasText(contentType)){
                stringBuilder.append("[").append(HttpHeaders.CONTENT_TYPE).append(": ").append(contentType).append("]").append(" ");
            }

            int contentLength = wrappedRequest.getContentLength();
            if (contentLength > 0) {
                body = new String(wrappedRequest.getContentAsByteArray(), StandardCharsets.UTF_8);
            }
            stringBuilder.append(body);

            String logStr = stringBuilder.toString();
            logger.debug(logStr);
        } catch (Exception e) {
            logger.error("fail to log incoming request because {}", e.getLocalizedMessage());
        }
    }

    private void responseLog(HttpServletRequest request, ContentCachingResponseWrapper responseWrapper) {
        try {
            String method = request.getMethod();
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("[").append(method).append("]").append(" ");

            String requestURI = request.getRequestURI();
            stringBuilder.append(requestURI).append(" ");

            String protocol = request.getProtocol();
            stringBuilder.append("[").append(protocol).append("]").append(" ");

            byte[] responseArray = responseWrapper.getContentAsByteArray();
            String responseStr = new String(responseArray, responseWrapper.getCharacterEncoding());
            stringBuilder.append(responseStr).append(" ");

            int status = responseWrapper.getStatus();
            stringBuilder.append("[").append(status).append("]").append(" ");

            String logStr = stringBuilder.toString();
            logger.debug(logStr);
            responseWrapper.copyBodyToResponse();
        } catch (UnsupportedEncodingException e) {
            logger.error("invalid character encoding! => {}", e.getLocalizedMessage());
        } catch (Exception e) {
            logger.error("fail to send response to client", e);
        }

    }
}
