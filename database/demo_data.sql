-- === ADMIN ÚČET ===
-- pokud nefunguje: IDENTIFIED WITH mysql_native_password BY 'admin';
CREATE USER IF NOT EXISTS 'cetbaAdmin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON `maturitni\_cetba`.* TO 'cetbaAdmin'@'localhost';

-- === AUTOŘI ===

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Carlo", "Goldoni");

INSERT INTO author (`firstName`, `lastName`)
VALUES (NULL, "Moliére");

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Svatopluk", "Čech");

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Arthur Conan", "Doyle");

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Antoine de", "Saint-Exupéry");

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jan", "Werich");

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Jiří", "Voskovec");

INSERT INTO author (`firstName`, `lastName`)
VALUES ("Viktor", "Dyk");


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


-- === KNIHY AUTOŘI ===

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("6", "6"), ("6", "7");

INSERT INTO book_has_author (`book_id`, `author_id`)
VALUES ("7", "8"), ("8", "8");

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
