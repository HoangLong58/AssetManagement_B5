package com.nashtech.assetmanagement.constraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Calendar;
import java.util.Date;

public class BirthDayValidator implements ConstraintValidator<BirthDay, Date> {
    @Override
    public boolean isValid(Date date, ConstraintValidatorContext constraintValidatorContext) {
        Calendar dateInCalendar = Calendar.getInstance();
        dateInCalendar.setTime(date);
        return Calendar.getInstance().get(Calendar.YEAR) - dateInCalendar.get(Calendar.YEAR) >= 18;
    }
}
