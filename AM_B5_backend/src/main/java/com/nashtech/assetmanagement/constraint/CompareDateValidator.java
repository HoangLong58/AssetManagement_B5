package com.nashtech.assetmanagement.constraint;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;
import java.util.Date;

@Slf4j
public class CompareDateValidator implements ConstraintValidator<JoinedDate, Object> {
    private String beforeFieldName;
    private String afterFieldName;

    @Override
    public void initialize(JoinedDate constraintAnnotation) {
        beforeFieldName = constraintAnnotation.before();
        afterFieldName = constraintAnnotation.after();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {

        try {
            final Field beforeDateField = value.getClass().getDeclaredField(beforeFieldName);
            beforeDateField.setAccessible(true);

            final Field afterDateField = value.getClass().getDeclaredField(afterFieldName);
            afterDateField.setAccessible(true);

            final Date beforeDate = (Date) beforeDateField.get(value);
            final Date afterDate = (Date) afterDateField.get(value);

            return beforeDate.before(afterDate);
        } catch (final Exception e) {
            log.error("comparedate isvalid");
            e.printStackTrace();
            return false;
        }
    }
}
