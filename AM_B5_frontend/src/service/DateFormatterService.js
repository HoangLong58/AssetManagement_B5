import React from "react";

class DateFormatter {
    dateFormat(value) {
        var date = new Date(value)

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, '0');

        const day = String(date.getDate()).padStart(2, '0');

        return [day, month, year].join('/');
    }
}

export default new DateFormatter()