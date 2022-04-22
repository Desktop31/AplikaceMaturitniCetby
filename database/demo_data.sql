-- === ADMIN ÚČET ===
-- pokud nefunguje: IDENTIFIED WITH mysql_native_password BY 'admin';
CREATE USER IF NOT EXISTS 'cetbaAdmin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON `maturitni\_cetba`.* TO 'cetbaAdmin'@'localhost';

-- === AUTOŘI ===

-- id 1
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Carlo", "Goldoni");

-- id 2
INSERT INTO author (`firstName`, `lastName`)
VALUES (NULL, "Moliére");

-- id 3
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Svatopluk", "Čech");

-- id 4
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Arthur Conan", "Doyle");

-- id 5
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Antoine de", "Saint-Exupéry");

-- id 6
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jan", "Werich");

-- id 7
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jiří", "Voskovec");

-- id 8
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Viktor", "Dyk");

-- id 9
INSERT INTO author (`firstName`, `lastName`) 
VALUES (NULL, "Neznámý");

-- id 10
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Alexandr Sergejevič", "Puškin");

-- id 11
INSERT INTO author (`firstName`, `lastName`)
VALUES (NULL, "Sofokles");

-- id 12
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Francois", "Villon");

-- id 13
INSERT INTO author (`firstName`, `lastName`)
VALUES ("William", "Shakespeare");

-- id 14
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jonathan", "Swift");


-- === KNIHY ===

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Sluha dvou pánů", "18.", "svet", "https://www.databazeknih.cz/knihy/sluha-dvou-panu-71316");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Lakomec", "18.", "svet", "https://www.databazeknih.cz/knihy/lakomec-1958");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Nový epochální výlet pana Broučka, tentokráte do XV. století", "19.", "cz", "https://www.databazeknih.cz/knihy/pan-broucek-novy-epochalni-vylet-pana-broucka-tentokrat-do-xv-stoleti-1170");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Pes Baskervillský", "20./21.", "svet", "https://www.databazeknih.cz/knihy/pribehy-sherlocka-holmese-pes-baskervillsky-35044");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Malý princ", "20./21.", "svet", "https://www.databazeknih.cz/knihy/maly-princ-606");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Balada z hadrů", "20./21.", "cz", "https://www.databazeknih.cz/knihy/balada-z-hadru-98652");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Milá sedmi loupežníků", "20./21.", "cz", "https://www.databazeknih.cz/knihy/mila-sedmi-loupezniku-3425");

INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Krysař", "20./21.", "cz", "https://www.databazeknih.cz/knihy/krysar-42447");

-- id 9
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Kristiánova legenda", "18.", "cz", "https://www.databazeknih.cz/knihy/kristianova-legenda-zivot-a-umuceni-svateho-vaclava-a-baby-jeho-svate-ludmily-52323");

-- id 10
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Piková dáma", "19.", "svet", "https://www.databazeknih.cz/knihy/pikova-dama-2311");

-- id 11
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Bible: Starý zákon (Genesis, Exodus)", "18.", "svet", "https://www.databazeknih.cz/knihy/bible-ceska-stary-zakon-348677");

-- id 12
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Král Oidipus", "18.", "svet", "https://www.databazeknih.cz/knihy/kral-oidipus-5503");

-- id 13
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Píseň o Rolandovi", "18.", "svet", "https://www.databazeknih.cz/knihy/pisen-o-rolandovi-96352");

-- id 14
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Závěť", "18.", "svet", "https://www.databazeknih.cz/knihy/zavet-a-jine-balady-379714");

-- id 15
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Romeo a Julie", "18.", "svet", "https://www.databazeknih.cz/knihy/romeo-a-julie-244287");

-- id 16
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Gulliverovy cesty", "18.", "svet", "https://www.databazeknih.cz/knihy/gulliverovy-cesty-35047");


-- === KNIHY AUTOŘI ===

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("6", "6"), ("6", "7");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("7", "8"), ("8", "8");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("9", "9"), ("10", "10");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("11", "9"), ("13", "9");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("12", "11"), ("14", "12"), ("15", "13"), ("16", "14");

-- == Lepsi pridani knihy == --

-- ===template=== --
-- id 15
-- INSERT INTO author (`firstName`, `lastName`)
-- VALUES ("", "");

-- id 17
-- INSERT INTO book (`name`, `century`, `category`, `link`)
-- VALUES ("", "", "", "");

-- INSERT INTO book_has_author (`book_id`, `author_id`)
-- VALUES ("", "");
-- ====== --
-- id 15
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jan Amos", "Komenský");

-- id 17
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Labyrint světa a ráj srdce", "18.", "cz", "https://www.databazeknih.cz/knihy/labyrint-sveta-a-raj-srdce-40541");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("17", "15");
-- ====== --
-- id 16
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jane", "Austenová");

-- id 18
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Pýcha a předsudek", "19.", "svet", "https://www.databazeknih.cz/knihy/pycha-a-predsudek-859");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("18", "16");
-- ====== --
-- id 17
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Mary", "Shelleyová");

-- id 19
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Frankenstein", "19.", "svet", "https://www.databazeknih.cz/knihy/frankenstein-7423");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("19", "17");
-- ====== --
-- id 20
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Evžen Oněgin", "19.", "svet", "https://www.databazeknih.cz/knihy/evzen-onegin-284");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("20", "10");
-- ====== --
-- id 18
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Victor", "Hugo");

-- id 21
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Chrám matky boží v Pažíži", "19.", "svet", "https://www.databazeknih.cz/knihy/chram-matky-bozi-v-parizi-1093");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("21", "18");
-- ====== --
-- id 19
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Karel Hynek", "Mácha");

-- id 22
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Máj", "19.", "cz", "https://www.databazeknih.cz/knihy/maj-1151");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("22", "19");
-- ====== --
-- id 20
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Karel Havlíček", "Borovský");

-- id 23
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Tyrolské elegie", "19.", "cz", "https://www.databazeknih.cz/knihy/tyrolske-elegie-18998");

-- id 24
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Král Lávra", "19.", "cz", "https://www.databazeknih.cz/knihy/kral-lavra-2324");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("23", "20"), ("24", "20");
-- ====== --
-- id 21
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Karel Jaromír", "Erben");

-- id 25
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Kytice", "19.", "cz", "https://www.databazeknih.cz/knihy/kytice-588");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("25", "21");
-- ====== --
-- id 22
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jack", "London");

-- id 26
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Bílý den", "20./21.", "svet", "https://www.databazeknih.cz/knihy/bily-den-21199");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("26", "22");
-- ====== --
-- id 23
INSERT INTO author (`firstName`, `lastName`)
VALUES ("George Bernard", "Shaw");

-- id 27
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Pygmalion", "20./21.", "svet", "https://www.databazeknih.cz/knihy/pygmalion-2307");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("27", "23");
-- ====== --
-- id 24
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Franz", "Kafka");

-- id 28
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Proměna", "20./21.", "svet", "https://www.databazeknih.cz/knihy/promena-30545");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("28", "24");
-- ====== --
-- id 25
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Petr", "Bezruč");

-- id 29
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Slezské písně", "20./21.", "cz", "https://www.databazeknih.cz/knihy/slezske-pisne-605");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("29", "25");
-- ====== --
-- id 26
INSERT INTO author (`firstName`, `lastName`)
VALUES ("Ivan", "Olbracht");

-- id 30
INSERT INTO book (`name`, `century`, `category`, `link`)
VALUES ("Nikola Šuhaj loupežník", "20./21.", "cz", "https://www.databazeknih.cz/knihy/nikola-suhaj-loupeznik-6126");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("30", "26");
-- ====== --

-- === UČITELÉ ===

-- HESLO: janasusova --
INSERT INTO teacher (`firstName`, `lastName`, `email`, `password`) 
VALUES ("Jana", "Susová", "jana.susova@purkynka.xyz", "$2a$10$fefsAZkc5GMu0CeIo6rNSui4DEHD8khl9y2hvZ74XKJ513r084Yzm");

-- HESLO: petrnovak --
INSERT INTO teacher (`firstName`, `lastName`, `email`, `password`) 
VALUES ("Petr", "Novák", "petr.novak@purkynka.xyz", "$2a$10$O6XXm2edD59RgwVxux9KLOI7eoTUSvqLn3xrGuM/kmUfqw4z80pNO");

-- HESLO: jiribrzobohaty --
INSERT INTO teacher (`firstName`, `lastName`, `email`, `password`) 
VALUES ("Jiří", "Brzobohatý", "jiri.brzobohaty@purkynka.xyz", "$2a$10$qjbAK8MeTLSWD9HCiWOLwuAJkhK6PJ277BnkHPjhYSkvk.NAqTASe");


-- === TŘÍDY ===

INSERT INTO class (`firstYear`, `name`, `teacher_id`) 
VALUES ('2018', 'V4C', '1'), ('2018', 'V4A', '1');

INSERT INTO class (`firstYear`, `name`, `teacher_id`) 
VALUES ('2019', 'V3C', '2');


-- === STUDENTI ===

-- HESLO: tomaskrejci --
-- INSERT INTO student (`firstName`, `lastName`, `email`, `password`, `class_id`) 
-- VALUES ("Tomáš", "Krejčí", "krejci.tomas@purkynka.xyz", "$2a$10$VVa/HJv0FMcoCRLTO6LEl.Lr1kn9ljz.C29FJs8EGyRV/uVmPF2YK", "1"); 

-- HESLO: martinpolak --
INSERT INTO student (`firstName`, `lastName`, `email`, `password`, `class_id`)
VALUES ("Martin", "Polák", "polak.martin@purkynka.xyz", "$2a$10$gEnfQkMkIlvItX8CKmAiFO3W/bWJhP.CmFujOtxQYt5IYaYaLjWnK", "1");

-- HESLO: vitrosicky --
INSERT INTO student (`firstName`, `lastName`, `email`, `password`, `class_id`)
VALUES ("Vít", "Rosický", "rosicky.vit@purkynka.xyz", "$2a$10$VwvYEfy28s4lzJoCHGrcjuYn0JBHWC.TwIwm2b6e1kTambtWtdkiy", "2");


-- === SEZNAM KNIH ===

-- tomas krejci --

-- INSERT INTO student_has_book (`student_id`, `book_id`, `order`, `state`)
-- VALUES ("1", "1", "1", "unread"), ("1", "2", "2", "read"), ("1", "3", "3", "done");

-- martin polak --

INSERT INTO student_has_book (`student_id`, `book_id`, `order`)
VALUES ("2", "4", "1"), ("2", "1", "2");
