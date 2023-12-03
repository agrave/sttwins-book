function setLanguage(lang) {
  Cookies.set("lang", lang, { expires: 1 });
  switch (lang) {
    case "RU":
      header = "Адресная книга Сейнт-Твинс";
      dataUrl = "https://cdn.sttwins.com/static/book/data_ru_new.json";
      break;
    case "UA":
      header = "Адресна книга Сейнт-Твінс";
      dataUrl = "https://cdn.sttwins.com/static/book/data_ua_new.json";
      break;
  }
  $("#header").html(header);
  $("#title").html(header);
}
