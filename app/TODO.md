### Obecné:
  - [DONE] SQL injection ochrana (htmlspecialchars vstupy)
  - [DONE] mysql setup
  - [DONE] pokud kniha done, změnit možnost odebrat na požádat o výměnu
  - [DONE] zobrazit +/- v seznamu knih pouze pokud je přihlášen žák
  - rozdělit knihy v seznamu podle kategorií
  - zobrazení víc autorů u knihy
  - registrace
  - manuál
  - dokumentace

### Student:
  - [DONE] systém pořadí knih
  - [DONE] přidání/odebrání knihy
  - [DONE] žádost o odebrání
  - [DONE] poznámky u knihy z pohledu žáka
  - [DONE] změna pořadí knih

### Teacher:
  - [DONE] seznam tříd
  - [DONE] seznam žáků ve třídě
  - [DONE] seznam žáka z pohledu učitele
  - [DONE] uzamknout počet knih k testu
  - [DONE] žádosti o odebrání
  - [DONE] poznámky u knihy z pohledu učitele

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
    - student klikne na registraci
    - zadá email (+ kontrola jestli už není v db)
    - obdrží email s linkem na potvrzení
    - link otevře stránku se zvolením jména, příjmení, hesla, třídy a emailu učitele (třída a učitel - kontrola databází)
    - vytvoří se účet studenta bez třídy (už může vybírat knihy)
    - učitel obdrží email s žádostí o vstup studenta do třídy
    - učitel potvrdí žádost, studentovi je přiřazena třída
  

---

### Potřebná nastavení:
  - mysql: SET GLOBAL event_scheduler = ON;

---

### Níká priorita:
  - stránka na generování hashe pro admina
  - ?generátor PDF seznamu knih
  - [DONE] ?light/dark mode switche
  - ??opravit darkmode (barevna cast css se nastavi pred poslanim html)
  - ??statistiky (vyhledat žáky třídy X s dílem Y, ...)
  - ????? discord bot notifikace
