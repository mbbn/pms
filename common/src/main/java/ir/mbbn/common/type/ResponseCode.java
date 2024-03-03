package ir.mbbn.common.type;

import lombok.Getter;

@Getter
public enum ResponseCode {
    UNKNOWN(-1, "error.unknown");

    private final int code;
    private final String messageKey;

    ResponseCode(int code, String messageKey) {
        this.code = code;
        this.messageKey = messageKey;
    }

}