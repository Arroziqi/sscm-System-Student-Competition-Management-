# Activity API

## Create

Endpoint : POST /api/activity

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
  "organization_name": "AcademyUP",
  "role": "Member of AcademyUP Division",
  "description": "Served as a peer tutor for other students in coursework.",
  "place": "Jakarta",
  "start_date": "5 February 2023",
  "end_date": "5 January 2024",
}
```

Response body (success) : 

```json
{
  "data": {
    "id": 1,
    "organization_name": "AcademyUP",
    "role": "Member of AcademyUP Division",
    "description": "Served as a peer tutor for other students in coursework.",
    "place": "Jakarta",
    "start_date": "5 February 2023",
    "end_date": "5 January 2024",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "organization_name must not blank, ..."
}
```

## Get

Endpoint : GET /api/activity/:idActivty

Request Header : 
- X-API-TOKEN : token

Response body (success) : 

```json
{
  "data": {
    "id": 1,
    "organization_name": "AcademyUP",
    "role": "Member of AcademyUP Division",
    "description": "Served as a peer tutor for other students in coursework.",
    "place": "Jakarta",
    "start_date": "5 February 2023",
    "end_date": "5 January 2024",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "the activity is not found, ..."
}
```

## Update

Endpoint : PUT /api/activity/:idActivty

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
  "organization_name": "AcademyUP",
  "role": "Member of AcademyUP Division",
  "description": "Served as a peer tutor for other students in coursework.",
  "place": "Jakarta",
  "start_date": "5 February 2023",
  "end_date": "5 January 2024",
}
```

Response body (success) : 

```json
{
  "data": {
    "id": 1,
    "organization_name": "AcademyUP",
    "role": "Member of AcademyUP Division",
    "description": "Served as a peer tutor for other students in coursework.",
    "place": "Jakarta",
    "start_date": "5 February 2023",
    "end_date": "5 January 2024",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "not authorized, ..."
}
```

## List

Endpoint : GET /api/activity
Request Header : 
- X-API-TOKEN : token

Response body (success) : 

```json
{
  "data": [
    {
      "id": 1,
      "organization_name": "AcademyUP",
      "role": "Member of AcademyUP Division",
      "description": "Served as a peer tutor for other students in coursework.",
      "place": "Jakarta",
      "start_date": "5 February 2023",
      "end_date": "5 January 2024",
    },
    {
      "id": 2,
      "organization_name": "MAN IC Pekalongan",
      "role": "President of Student Council",
      "description": "Led a divission with 3+ staffs focused on student career development",
      "place": "Pekalongan",
      "start_date": "5 Agustus 2019",
      "end_date": "5 Agustus 2020",
    },
  ]
}
```

Response Body (Failed) :

```json
{
  "errors" : "not authorized, ..."
}
```

## Remove

Endpoint : DELETE /api/activity/:idActivty

Request Header : 
- X-API-TOKEN : token

Response body (success) : 

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "experience is not found, ..."
}
```