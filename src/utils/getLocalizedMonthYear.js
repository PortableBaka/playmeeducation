const availableLangs = {
    en: "en-EN",
    ru: "ru-RU",
};

export function getLocalizedMonthYear(lang, year, month) {
    const locale = availableLangs[lang];
    if(!locale){
        return "Invalid locale"
    }
    const indexedMonth = month - 1;
    var formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
    var date = new Date(Date.UTC(year, indexedMonth, 1, 0, 0, 0));
    return formatter.format(date)
}