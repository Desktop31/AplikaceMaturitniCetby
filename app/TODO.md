### Obecné:
  - [DONE] SQL injection ochrana (htmlspecialchars vstupy)
  - [DONE] mysql setup
  - [DONE] pokud kniha done, změnit možnost odebrat na požádat o výměnu
  - [DONE] zobrazit +/- v seznamu knih pouze pokud je přihlášen žák
  - [DONE] rozdělit knihy v seznamu podle kategorií
  - [DONE] zobrazení víc autorů u knihy
  - [DONE] registrace
  - manuál
  - dokumentace
  - naplnit databázi knih

### Student:
  - [DONE] systém pořadí knih
  - [DONE] přidání/odebrání knihy
  - [DONE] žádost o odebrání
  - [DONE] poznámky u knihy z pohledu žáka
  - [DONE] změna pořadí knih
  - [DONE] kontrola limitu 20 knih
  - [DONE] přidání/odebrání přes ajax

### Teacher:
  - [DONE] seznam tříd
  - [DONE] seznam žáků ve třídě
  - [DONE] seznam žáka z pohledu učitele
  - [DONE] uzamknout počet knih k testu
  - [DONE] žádosti o odebrání
  - [DONE] poznámky u knihy z pohledu učitele
  - [DONE] stav knihy při změně poznámky/zrušení done
  - ?změna hesla

### Databáze:
  - [DONE] pořadí knihy (vyřeším pomocí data přidání)
  - [DONE] počet knih k testu ve třídě
  - [DONE] změnit třídu u studenta jako nepovinnou
  - [DONE] změnit swap request na remove request

---

### Plán:
  - [DONE] možná změnit žádost o výměnu na žádost o odebrání 
  - admin mění propadlé studenty zatím v databázi
  - admin vypíná knihy zatím z databáze
  - přidání učitele: udělá administrátor, zatím z databáze
  - přidání studenta: 
    - [DONE] student klikne na registraci
    - [DONE] zadá email (+ kontrola jestli už není v db)
    - [DONE] obdrží email s linkem na potvrzení
    - [DONE] link otevře stránku se zvolením jména, příjmení, hesla a třídy
      (třída - kontrola databází)
    - [DONE] vytvoří se účet studenta bez třídy (už může vybírat knihy)
    - [DONE] smazání tokenu po potvrzení
    - [DONE] učitel obdrží email s žádostí o vstup studenta do třídy
    - [DONE] učitel potvrdí žádost, studentovi je přiřazena třída
  

---

### Potřebná nastavení:
  - mysql: SET GLOBAL event_scheduler = ON;

---

### Níká priorita:
  - [DONE] počet knih u studenta v seznamu učitele
  - stránka na generování hashe pro admina
  - ?generátor PDF seznamu knih
  - [DONE] ?light/dark mode switche
  - ??opravit darkmode (barevna cast css se nastavi pred poslanim html)
  - ??statistiky (vyhledat žáky třídy X s dílem Y, ...)
  - ????? discord bot notifikace
