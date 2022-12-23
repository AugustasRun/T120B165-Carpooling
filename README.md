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
![architecture](https://user-images.githubusercontent.com/53519808/192145440-6a71e559-dd77-4cda-bf08-206a7a81d62b.png)

# API specifikacija
## Registracijoa/Prisijungimo API metodai
### POST /api/register
Sukuria naują naudotoją su nurodytais parametrais
#### Metodo URL
`/api/register`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |201     |
|Bad request   |400     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|username      |Taip          |Naudotojo vardas   | `demovardas`   |
|password      |Taip          |Naudotojo slaptažodis   | `Vartotojas1!`   |
|email         |Taip          |Naudotojo paštas   | `testas@testas.com`   |
#### Užklausos pavyzdys
`POST /api/register`
```
{
  "username": "demovardas",
  "password": "Vartotojas1!",
  "phoneNumber": "testas@testas.com"
}
```
#### Atsakymo pavyzdys
```
{
  "id": "ab9173cf-97f6-4eb1-9de8-09c1aec8f23b",
  "userName": "demovardas",
  "email": "testas@testas.com"
}
```
### POST /api/login
Gražina sugeneruotą žetoną vartotojui, kuris prisijungia
#### Metodo URL
`/api/login`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Bad request   |400     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|username      |Taip          |Naudotojo vardas   | `demovardas`     |
|password      |Taip          |Naudotojo slaptažodis   | `Vartotojas1!`   |
#### Užklausos pavyzdys
`POST https://autodaug.azurewebsites.net/api/users/token`
```
{
  "userName": "demovardas",
  "password": "Vartotojas1!"
}
```
#### Atsakymo pavyzdys
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGVtb3ZhcmRhcyIsImp0aSI6ImU3ZGIyMTg3LWU4ODQtNDhmMy04NTVhLTBiNmViYzJiNWZmMCIsInN1YiI6ImFiOTE3M2NmLTk3ZjYtNGViMS05ZGU4LTA5YzFhZWM4ZjIzYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2NzE3Nzc5MzEsImlzcyI6IkF1Z3VzdGluYXMiLCJhdWQiOiJUcnVzdGVkQ2xpZW50In0.Ga1KAME5b80mbhstqJLilpfroZohZbAO7AqpK_hcRaY"
}
```
## Dispečerinių API metodai
### GET /api/dispatchcenters
Gražina sąrašą visų dispečerinių, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/dispatchcenters`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
#### Užklausos pavyzdys
`GET /api/dispatchcenters`
#### Atsakymo pavyzdys
```
[
    {
        "id": 1,
        "name": "Testas",
        "city": "Testas",
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 2,
        "name": "Testas",
        "city": "Testas",
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 3,
        "name": "Testas",
        "city": "Testas",
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 4,
        "name": "Testas",
        "city": "Testas",
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    }
]
```
### GET /api/dispatchcenters/{id}
Gražina dispečerinę, pagal id, kuris perduodamas per URL, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/dispatchcenters/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
|Not found     |404     |
#### Užklausos pavyzdys
`GET /api/dispatchcenters/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "name": "Testas",
    "city": "Testas",
    "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
}
```
### POST /api/dispatchcenters
Sukuria naują dispečerinę su nurodytais parametrais, funckija prieinama tik administratoriams
#### Metodo URL
`/api/dispatchcenters`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |201     |
|Bad request   |400     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|name      |Taip          |Dispečerinės pavadinimas   | `pavadinimas`   |
|city   |Taip          |Dispečerinės miestas   | `miestas kuriame yra dispečerinė`   |
#### Užklausos pavyzdys
`POST /api/dispatchcenters`
```
{
  "name": "Testas",
  "city": "Testas"
}
```
#### Atsakymo pavyzdys
```
{
    "id": 4,
    "name": "Testas",
    "city": "Testas",
    "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
}
```
### PUT /api/dispatchcenters/{id}
Atnaujiną dispečerinę su duotais parametrais, kurie buvo nurodyti užklausos metu, id kartu su URL, o kiti parametrai nurodami kartu su užklausos body, funckija prieinama vartotojams
#### Metodo URL
`/api/dispatchcenters/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Bad request   |400     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|name      |Taip          |Dispečerinės pavadinimas   | `pavadinimas`   |
|city   |Taip          |Dispečerinės miestas   | `miestas kuriame yra dispečerinė`   |
#### Užklausos pavyzdys
`PUT /api/dispatchcenters/1`
```
{
  "name": "Testas333333",
  "city": "Testas"
}
```
#### Atsakymo pavyzdys
```
Tuščias body su statuso kodu 200 Success
```
### DELETE /api/dispatchcenters/{id}
Ištrina dispečerinę su nurodytu id per URL, funckija prieinama tik administratoriams
#### Metodo URL
`/api/dispatchcenters/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |204     |
|Unauthorized  |401     |
|Not found     |404     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|id            |Taip          |Dispečerinės id   | `1`       |
#### Užklausos pavyzdys
`DELETE /api/dispatchcenters/1`
#### Atsakymo pavyzdys
```
Tuščias body su statuso kodu 204 No content
```

## Vairuotojų API metodai
### GET /api/drivers
Gražina sąrašą esamų vairuotojų, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/drivers`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
#### Užklausos pavyzdys
`GET /api/drivers`
#### Atsakymo pavyzdys
```
[
    {
        "id": 1,
        "firstName": "Testas",
        "lastName": "Testas",
        "startedDriving": "2022-12-23T07:09:41.967",
        "startedWorking": "2022-12-23T07:09:41.967",
        "workingForId": 2,
        "userId": "ab9173cf-97f6-4eb1-9de8-09c1aec8f23b"
    },
    {
        "id": 2,
        "firstName": "Testas",
        "lastName": "Testas",
        "startedDriving": "2022-12-23T07:09:41.967",
        "startedWorking": "2022-12-23T07:09:41.967",
        "workingForId": 2,
        "userId": "ab9173cf-97f6-4eb1-9de8-09c1aec8f23b"
    }
]
```
### GET /api/drivers/{id}
Gražina vairuotoją, pagal id, kuris perduodamas per URL, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/drivers/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
|Not found     |404     |
#### Užklausos pavyzdys
`GET /api/drivers/2`
#### Atsakymo pavyzdys
```
{
    "id": 2,
    "firstName": "Testas",
    "lastName": "Testas",
    "startedDriving": "2022-12-23T07:09:41.967",
    "startedWorking": "2022-12-23T07:09:41.967",
    "workingForId": 2,
    "userId": "ab9173cf-97f6-4eb1-9de8-09c1aec8f23b"
}
```
### POST /api/drivers
Sukuria naują vairuotoją su nurodytais parametrais, funkcija prieinama administracijai
#### Metodo URL
`/api/drivers`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |201     |
|Bad request   |400     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|firstName      |Taip          |Vairuotojo vardas   | `Vardenis`   |
|lastName   |Taip          |Vairuotojo pavardė   | `Pavardenis`   |
|startedDriving     |Taip    |Nuo kada pradėjo vairuoti    | `2022-12-23`   |
|startedWorking    |Taip    |Nuo kada pradėjo dirbti    | `2022-12-23`    |
|workingForId     | Taip     |Kuriai dispečiarinei dirba     | `2`    |
#### Užklausos pavyzdys
`POST /api/drivers`
```
{
  "firstName": "Testas",
  "lastName": "Testas",
  "startedDriving": "2022-12-23T07:09:41.967Z",
  "startedWorking": "2022-12-23T07:09:41.967Z",
  "workingForId": 2
}
```
#### Atsakymo pavyzdys
```
{
    "firstName": "Testas",
    "lastName": "Testas",
    "startedDriving": "2022-12-23T07:09:41.967Z",
    "startedWorking": "2022-12-23T07:09:41.967Z",
    "workingForId": 2
}
```
### PUT /api/drivers/{id}
Atnaujiną vairuotojo duomenis su duotais parametrais, kurie buvo nurodyti užklausos metu, id kartu su URL, o kiti parametrai nurodomi kartu su užklausos body, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/drivers/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |204     |
|Bad request   |400     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|firstName      |Taip          |Vairuotojo vardas   | `Vardenis`   |
|lastName   |Taip          |Vairuotojo pavardė   | `Pavardenis`   |
|startedDriving     |Taip    |Nuo kada pradėjo vairuoti    | `2022-12-23`   |
|startedWorking    |Taip    |Nuo kada pradėjo dirbti    | `2022-12-23`    |
|workingForId     | Taip     |Kuriai dispečiarinei dirba     | `2`    |
#### Užklausos pavyzdys
`PUT /api/drivers/2`
```
{
  "firstName": "Testas123",
  "lastName": "Testas",
  "startedDriving": "2022-12-23T07:09:41.967Z",
  "startedWorking": "2022-12-23T07:09:41.967Z",
  "workingForId": 2
}
```
#### Atsakymo pavyzdys
```
Tuščias body su statuso kodu 204 No Content
```
### DELETE /api/drivers/{id}
Ištrina vairuotoją su nurodytu id per URL, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/drivers/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |204     |
|Unauthorized  |401     |
|Not found     |404     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|id            |Taip          |Vairuotojo id   | `3`       |
#### Užklausos pavyzdys
`DELETE /api/drivers/3`
#### Atsakymo pavyzdys
```
Tuščias body su statuso kodu 204 No content
```
## Maršrutų API metodai
### GET /cars
Gražina sąrašą esamų maršrutų, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/routes`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
#### Užklausos pavyzdys
`GET /api/routes`
#### Atsakymo pavyzdys
```
[
    {
        "id": 1,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 2,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 3,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 4,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 5,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 6,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    },
    {
        "id": 7,
        "from": "Kaunas",
        "to": "Vilnius",
        "time": "2022-12-23T07:41:36.994",
        "price": 300,
        "driverId": 2,
        "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
    }
]
```
### GET /api/routes/{id}
Gražina maršrutą, pagal id, kuris perduodamas per URL, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/routes/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
|Not found     |404     |
#### Užklausos pavyzdys
`GET /api/routes/3`
#### Atsakymo pavyzdys
```
{
    "id": 3,
    "from": "Kaunas",
    "to": "Vilnius",
    "time": "2022-12-23T07:41:36.994",
    "price": 300,
    "driverId": 2,
    "userId": "28e79b73-670f-42b2-ac1f-670f7fd5a3bc"
}
```
### POST /api/routes/
Sukuria naują mašiną su nurodytais parametrais, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/routes/`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|Created    |201     |
|Bad request   |400     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|from      |Taip          |Iš kur   | `Kaunas`   |
|to   |Taip          |Į kur   | `Vilnius`   |
|time     |Taip    |Kada    | `2015-05-05`   |
|price     |Taip    |Kaina    | `333`   |
|driverId     |Taip    |Kas vairuoja    | `2`   |
#### Užklausos pavyzdys
`POST /api/routes/`
```
{
  "from": "Kaunas",
  "to": "Vilnius",
  "time": "2022-12-23T07:41:36.994Z",
  "price": 300,
  "driverId": 2
}
```
#### Atsakymo pavyzdys
```
{
    "from": "Kaunas",
    "to": "Vilnius",
    "time": "2022-12-23T07:41:36.994Z",
    "price": 300,
    "driverId": 2
}
```
### PUT /api/routes/{id}
Atnaujiną maršrutą su duotais parametrais, kurie buvo nurodyti užklausos metu, id kartu su URL, o kiti parametrai perudodami kartu su užklausos body, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/routes/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |204     |
|Bad request   |400     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|from      |Taip          |Iš kur   | `Kaunas`   |
|to   |Taip          |Į kur   | `Vilnius`   |
|time     |Taip    |Kada    | `2015-05-05`   |
|price     |Taip    |Kaina    | `333`   |
|driverId     |Taip    |Kas vairuoja    | `2`   |
#### Užklausos pavyzdys
`PUT /api/routes/{id}`
```
{
  "from": "Marijampole",
  "to": "Vilnius",
  "time": "2022-12-23T07:41:36.994Z",
  "price": 300,
  "driverId": 2
}
```
#### Atsakymo pavyzdys
```
Tuščias body su statuso kodu 204 No Content
```
### DELETE /api/routes/{id}
Ištrina maršrutą su nurodytu id per URL, funkcija prieinama prisijungusiems naudotojams
#### Metodo URL
`/api/routes/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|No Content    |204     |
|Unauthorized  |401     |
|Not found     |404     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas   |Pavyzdys   |
| ------------ | ------------ | ------------- | --------- |
|id            |Taip          |Maršruto id   | `2`       |
#### Užklausos pavyzdys
`DELETE /api/routes/2`
#### Atsakymo pavyzdys
```
Tuščias body su statuso kodu 204 No content
```
# Naudotojo sąsaja
## Prisijungimo langas
![image](https://user-images.githubusercontent.com/53519808/209308516-c5a148d4-97bb-4ae9-8a8e-dd43f73f5e68.png)

Prisijungus nueinama į pagrindinį puslapį priklausomai pagal rolę, taip pat iš šio lango galima ir užsiregistruoti į sistemą

## Registracijos langas
![image](https://user-images.githubusercontent.com/53519808/209308603-29d9b495-d814-4e33-8e74-a9f0f5e2dfe3.png)
Registracijos lange įvedus informaciją gaunamas pranešimas, jog naudotojas užregistruotas sėkmingai ir reikia laukti administratoriaus patvirtinimo

## Modalinis naudingos informacijos langas
![image](https://user-images.githubusercontent.com/53519808/209308645-34019081-b016-4adf-8185-7b56c496dab8.png)
Paspaudus „About System“ mygtuką, atidaromas šis modalinis langas, kuriame galite matyti informaciją apie sistemą

## Administratoriaus pagrindinis langas
![image](https://user-images.githubusercontent.com/53519808/209309144-7c62266e-d5b3-4ee9-bbfa-314ead81ad66.png)
Šiame lange administratorius gali pasirinkti ką daryti sistemoje.

## Visų naudotojų langas
![image](https://user-images.githubusercontent.com/53519808/209309070-c77b9b12-122b-480b-b9a8-154579c54408.png)

Šiame lange naudotojas gali pasirinkti ką daryti sistemoje.

## Dispečiarinės langas
![image](https://user-images.githubusercontent.com/53519808/209309253-e6399b9a-9f77-44f2-8db1-a4071691805b.png)

Šiame lange naudotojas gali peržiūrėti visas dispiačiarines, pasirinkti sukurti naują, ištrinti arba redaguoti dispčiarinę

## Dispiačiarinės redagavimo langas
![image](https://user-images.githubusercontent.com/53519808/209309467-2ea3b11d-2274-4475-a4f6-36699c98a6cc.png)
Šiame lange naudotojas gali pakeisti dispiačiarinęs duomenis, baigus redaguoti jis grįžta atgal į visų dispiačiarinių sąrašą

## Naujos dispiačiarinęs pridėjimo langas
![image](https://user-images.githubusercontent.com/53519808/209309376-9111635b-00a9-4d5a-b5fb-ad6849a8a136.png)
Šiame lange galime įvesti informaciją naujai dispiačiarinei pridėti

## Dispiačiarinės trynimas
![image](https://user-images.githubusercontent.com/53519808/209309643-f843563c-15b0-4403-80e4-735aabbbcf3a.png)
Šiame pop up naudotojas gali ištrinti dispiačiarinę


## Vairuotojų langas
![image](https://user-images.githubusercontent.com/53519808/209309946-1b44e0f9-2a30-403c-9777-4f84a8b2fca6.png)

Šiame lange naudotojas gali peržiūrėti visus vairuotojus, pasirinkti sukurti naują, ištrinti arba redaguoti vairuotoją

## Vairuotojų redagavimo langas
![image](https://user-images.githubusercontent.com/53519808/209310028-c37d2157-b23a-4185-83d5-d973867d1171.png)
Šiame lange naudotojas gali pakeisti vairuotojo duomenis, baigus redaguoti jis grįžta atgal į visų vairuotojų sąrašą

## Naujo vairuotojo pridėjimo langas
![image](https://user-images.githubusercontent.com/53519808/209309980-d1bb23a4-83e9-4453-a83e-41c2e3e597d8.png)
Šiame lange galime įvesti informaciją naujai vairuotoją pridėti

## Maršrutų langas
![image](https://user-images.githubusercontent.com/53519808/209310201-b278f5fe-a2d8-4b97-aff1-e6230edc0097.png)
Šiame lange naudotojas gali peržiūrėti visus maršrutus, pasirinkti sukurti naują, ištrinti arba redaguoti maršrutą

## Maršrutų redagavimo langas
![image](https://user-images.githubusercontent.com/53519808/209310253-9a72a239-8df8-4469-abb4-00a392e5181a.png)
Šiame lange naudotojas gali pakeisti maršruto duomenis, baigus redaguoti jis grįžta atgal į visų maršrutų sąrašą

## Naujo maršruto pridėjimo langas
![image](https://user-images.githubusercontent.com/53519808/209310232-87742778-ec39-41cf-87c7-f8e2894340c7.png)
Šiame lange galime įvesti informaciją naujai maršrutą pridėti



## Tinklapio pritaikymas mobiliems įrenginiams
![image](https://user-images.githubusercontent.com/53519808/209310317-b5bcf5d8-0a0b-4455-a352-3d916bcc5f7b.png)
![image](https://user-images.githubusercontent.com/53519808/209313260-4a133649-9749-4473-9215-9201d616d310.png)

Navigacijos meniu pasikeičia, jei yra tinklapis yra prieinamas iš mobilaus įrenginio

# Išvados
Šiame modulyje pavyko realizuoti dispiačerinės valdymo sistemą, buvo panaudota .NET karkasas ir react fron end technologijos. Tai pat visas sprendimas buvo patalpintas debesyse naudojant azure ir azure duomenų bazę. Pagrindinė kliūtis buvo front end technologijos, nes su jomis teko mažiau susidurti nei su .NET karkasu
