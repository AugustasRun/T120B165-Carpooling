# T120B165-Carpooling

## 1. Sprendžiamo uždavinio aprašymas

### 1.1 Sistemos paskirtis

Projekto tikslas - leisti varituotojams susirasti pakeleivių kurie važiuoja tais pačiais maršrutais ir važiuoti kartu leidžiant taupyti pinigus kuriuos išleidžia kurui bei mažinti mašinų išmetų dalelių kiekį.

Veikimo principas - platformą sudarys dvi dalys: internetinė aplikacija, kuria naudosis vairuotojai, pakeleiviai ir administratoriai bei aplikacijų programavimo sąsaja.

Šios programos vartotojas norėdamas naudotis paltforma turės prisiregistruoti pasirinkdamas miestą. Prisiregistravęs galės pasirinkti ar nori būti vairuotojas ar pakeleivis. Vairuotojas prisijungęs galės sudaryti maršrutus ir nurodyti kokiomis dienomis jis jais važiuoja, vairtuojas taip pat galės peržiūrėti visus galimus maršrutus ir prisijungti prie kito vairuotojo, kuris važiuos jam tinkamu maršrutu. Vairuotojai galės vieną kitą įvertinti. Administrorius galės pasirinkti ištrinti vartojų paskyras, kurios neišpildo reikalavimų, bei trinti paskyras dėl kurių kyla nusiskundimų.

### 1.2 Funkciniai reikalavimai

Neregistruotas vartotojas galės:

1. Peržiūrėti vairuotojus
2. Prisijungti prie platformos
3. Peržiūrėti maršrutus

Vairuotojas galės:

1. Atsijungti nuo internetinės aplikacijos
2. Valdyti maršrutą
2.1 Pridėti naują maršrutą
2.2 Pridėti naują tašką maršrute
2.3 Pridėti pakeleivius
2.4 Išmesti pakeleivius
3. Peržiūrėti kitą vairutoją pagal pakeleivio id
4. Prisijungti prie kito vairuotojo maršruto
5. Įvertinti kitus vairuotojus

Administratorius galės:

1. Šalinti vairuotojus
2. Šalinti blogus maršrutus

## 2. Sistemos architektūra

Sistemos sudedamosios dalys:
• Kliento pusė (ang. Front-End) – naudojant React.js;
• Serverio pusė (angl. Back-End) – naudojant C# .NET. Duomenų bazė – MySQL.

Serverio diegimo diagrama. Sistemai talpinti bus naudojama Azure teikiamos paslaugos. Viskas bus talpinama viename serveryje. Kiekviena programaminio kodo dalis komunikuos naudojant HTTP protokolą. API programinės įrangos dalis bus jungiama su duomenų baze naudoajant ORM sąsają.