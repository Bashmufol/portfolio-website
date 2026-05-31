package com.portfolio.dto;

import java.util.Map;

public record ErrorResponse(String message, Map<String, String> errors) {
}
