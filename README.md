# T120B165-Carpooling

## 1. Sprendžiamo uždavinio aprašymas

### 1.1 Sistemos paskirtis

Projekto tikslas - leisti taksi dispečiarinėm lengviau sekti kokius maršrutus važiuoja vairuotuojai pildant maršrutus sistemoje ir leisti taksi vairuotojam įsivesti maršrutus kuriuos važiavom, taip mažinant šešėlio rinką.

Veikimo principas - platformą sudarys dvi dalys: internetinė aplikacija, kuria naudosis vairuotojai ir dispečiarinė, bei aplikacijų programavimo sąsaja, kurią naudosis administratoriai sukurti paskyras dispečiarinėm.

Šios programinės įrangos naudotojas kuris nori būti dispečiarinės darbuotojas paprašys paskyros kuri turės prieigą prie dispečiarinės sistemos. Dispečiarinės darbuotojai galės priregistruoti naujus vairuotojus bei įvesti vairuotojų važiuojamus maršrutus. Vairuotojai patys galės sukurti maršrutą kurį nuvažiavo.

### 1.2 Funkciniai reikalavimai

Neregistruotas vartotojas galės:

1. Peržiūrėti dispečiarines

Dispečiarinė galės:

1. Atsijungti nuo internetinės aplikacijos
2. Valdyti vairuotojo profilį
    2.1 Pridėti naują vairuotoją
    2.2 Išmesti vairuotoją
    2.3 Peržiūrėti vairtuotoją
    2.4 Redaguoti vairuotojo profilį
3. Valdyti maršrutus
    3.1 Pridėti maršrutą
    3.2 Atnaujint maršrutą
    3.3 Ištrinti maršrutą
    3.4 Peržiūrėti maršrutą

Vairuotojas galės:

1. Valdyti maršrutą
    1.1 Pridėti maršrutą
    1.2 Redaguoti maršrutą
    1.3 Ištrinti maršrutą
    1.4 Peržiūrti maršrutą

Administratorius galės:

1. Valdyti dispečiarinė
    1.1 Pridėti dispečiarinė
    1.2 Atnaujint dispečiarinė
    1.3 Ištrinti dispečiarinė
    1.4 Peržiūrėti dispečiarinė

## 2. Sistemos architektūra

Sistemos sudedamosios dalys:
• Kliento pusė (ang. Front-End) – naudojant React.js;
• Serverio pusė (angl. Back-End) – naudojant C# .NET. Duomenų bazė – MySQL.

Serverio diegimo diagrama. Sistemai talpinti bus naudojama Azure teikiamos paslaugos. Viskas bus talpinama viename serveryje. Kiekviena programaminio kodo dalis komunikuos naudojant HTTP protokolą. API programinės įrangos dalis bus jungiama su duomenų baze naudoajant ORM sąsają.
