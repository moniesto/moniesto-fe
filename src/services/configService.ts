import TimeAgo from "javascript-time-ago";
import i18n from "../i18n/i18n";
import api from "./api";
import en from "javascript-time-ago/locale/en.json";
import tr from "javascript-time-ago/locale/tr.json";
import themes from "../style/themes";

import * as locales from "@mui/material/locale";
import * as dateLocales from "@mui/x-date-pickers";
import { defaultConfigs } from "./defaultConfigs";

class config {
  private languages = ["en", "tr"];
  private languagesLocale: string[] = ["enUS", "trTR"];
  public configs = defaultConfigs;
  // errors: {
  //   [key: string]: string;
  // } = defaultResponse.error_codes;
  // validations: {
  //   [key: string]: any;
  // } = defaultResponse.validation;
  // general_info: {
  //   [key: string]: any;
  // } = defaultResponse.general_info;

  translatedErrors = [
    "Account_CheckUsername_InvalidUsername",
    "Account_Login_WrongPassword",
    "Account_Login_NotFoundEmail",
    "Account_Login_NotFoundUsername",
    "Post_CreatePost_InvalidTargets",
    "Moniest_CreateMoniest_InvalidBody",
    "Account_EmailVerification_NotFoundToken",
    "Post_CreatePost_InvalidStop",
    "Account_Register_RegisteredEmail",
    "Account_Authorization_InvalidToken",
    "Account_ChangePassword_WrongPassword",
  ];

  initialize() {
    api.asset
      .configs()
      .then((res) => {
        this.configs = res ? res : this.configs;
      })
      .catch(console.error);
    TimeAgo.addDefaultLocale(en);
    TimeAgo.addLocale(tr);
  }
  getAvailableLanguages = () => this.languages;

  changeLanguage(lang: string) {
    TimeAgo.setDefaultLocale(lang);
    i18n.changeLanguage(lang);
  }
  getTheme(theme_mode: string, lang: string) {
    const languageLocale = this.languagesLocale.find((item) =>
      item.startsWith(lang)
    ) as string;
    return themes(
      theme_mode,
      (locales as any)[languageLocale],
      (dateLocales as any)[languageLocale]
    );
  }
}
export default new config();
