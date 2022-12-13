class StringFormatter {
    capitalizeFirstLetter(string) {
        const stringRole = string.toLowerCase()
        return stringRole.charAt(0).toUpperCase() + stringRole.slice(1);
    }

    capitalizeFirstLetterOfEachWord(string) {
        var lower = String(string).toLowerCase();
        return lower.replace(/(^| )(\w)/g, function (x) {
            return x.toUpperCase();
        });
    }
}

export default new StringFormatter()