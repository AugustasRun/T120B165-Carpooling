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
