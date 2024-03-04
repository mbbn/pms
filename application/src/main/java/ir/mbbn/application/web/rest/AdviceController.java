package ir.mbbn.application.web.rest;

import ir.mbbn.application.web.dto.ErrorDTO;
import ir.mbbn.common.type.ResponseCode;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Locale;

@ControllerAdvice
public class AdviceController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private MessageSource messageSource;

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorDTO> exceptionHandler(NoResourceFoundException exception) {
        String messageKey = ResponseCode.NOT_FOUND.getMessageKey();
        Locale locale = LocaleContextHolder.getLocale();
        String errorMessage = messageSource.getMessage(messageKey, null, locale);
        logger.error("unknown error occurred!", exception);
        return ResponseEntity.internalServerError().body(ErrorDTO.builder()
                .httpStatus(HttpStatus.NOT_FOUND)
                .responseCode(ResponseCode.NOT_FOUND.getCode())
                .message(errorMessage)
                .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> exceptionHandler(Exception exception) {
        String messageKey = ResponseCode.UNKNOWN.getMessageKey();
        Locale locale = LocaleContextHolder.getLocale();
        String errorMessage = messageSource.getMessage(messageKey, null, locale);
        logger.error("unknown error occurred!", exception);
        return ResponseEntity.internalServerError().body(ErrorDTO.builder()
                .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                .responseCode(ResponseCode.UNKNOWN.getCode())
                .message(errorMessage)
                .build());
    }
}
