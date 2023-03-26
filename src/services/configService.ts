import TimeAgo from "javascript-time-ago";
import i18n from "../i18n/i18n";
import api from "./api";
import en from "javascript-time-ago/locale/en.json";
import tr from "javascript-time-ago/locale/tr.json";
import themes from "../style/themes";

import * as locales from "@mui/material/locale";
import * as dateLocales from "@mui/x-date-pickers";
class config {

    private languages = ['en', 'tr']
    private languagesLocale: string[] = ['enUS', 'trTR']
    errors: string[] = [];
    initialize() {
        api.asset.error_codes().then((res) => this.errors = res)
        TimeAgo.addDefaultLocale(en);
        TimeAgo.addLocale(tr);
    }
    getAvailableLanguages = () => this.languages;

    changeLanguage(lang: string) {
        TimeAgo.setDefaultLocale(lang);
        i18n.changeLanguage(lang);
    }
    getTheme(theme_mode: string, lang: string) {
        const languageLocale = this.languagesLocale.find((item) => item.startsWith(lang)) as string
        return themes(theme_mode, (locales as any)[languageLocale], (dateLocales as any)[languageLocale])
    }

}
export default new config()