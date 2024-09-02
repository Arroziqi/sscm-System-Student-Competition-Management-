# Experience API

## Create

Endpoint : POST /api/experience

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
  "company_name": "PT WIRATRANS SAMUDERA",
  "position": "Project Manager",
  "status": "contract",
  "description": "Built a business web profile for PT Wiratrans Samudera using Laravel.",
  "place": "Jakarta",
  "start_date": "5 November 2024",
  "end_date": "5 January 2024",
}
```

Response body (success) : 

```json
{
  "data": {
    "id": 1,
    "company_name": "PT WIRATRANS SAMUDERA",
    "position": "Project Manager",
    "status": "contract",
    "description": "Built a business web profile for PT Wiratrans Samudera using Laravel.",
    "place": "Jakarta",
    "start_date": "5 November 2024",
    "end_date": "5 January 2024",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "company_name must not blank, ..."
}
```

## Get

Endpoint : GET /api/experience/:idExperience

Request Header : 
- X-API-TOKEN : token

Response body (success) : 

```json
{
  "data": {
    "id": 1,
    "company_name": "PT WIRATRANS SAMUDERA",
    "position": "Project Manager",
    "status": "contract",
    "description": "Built a business web profile for PT Wiratrans Samudera using Laravel.",
    "place": "Jakarta",
    "start_date": "5 November 2024",
    "end_date": "5 January 2024",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "company_name must not blank, ..."
}
```

## Update

Endpoint : PUT /api/experience/:idExperience

Request Header : 
- X-API-TOKEN : token

Request Body :

```json
{
  "company_name": "PT WIRATRANS SAMUDERA",
  "position": "Project Manager",
  "status": "contract",
  "description": "Built a business web profile for PT Wiratrans Samudera using Laravel.",
  "place": "Jakarta",
  "start_date": "5 November 2024",
  "end_date": "5 January 2024",
}
```

Response body (success) : 

```json
{
  "data": {
    "id": 1,
    "company_name": "PT WIRATRANS SAMUDERA",
    "position": "Project Manager",
    "status": "contract",
    "description": "Built a business web profile for PT Wiratrans Samudera using Laravel.",
    "place": "Jakarta",
    "start_date": "5 November 2024",
    "end_date": "5 January 2024",
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "company_name must not blank, ..."
}
```

## List

Endpoint : GET /api/experience

Request Header : 
- X-API-TOKEN : token

Response body (success) : 

```json
{
  "data": [
    {
      "id": 1,
      "company_name": "PT WIRATRANS SAMUDERA",
      "position": "Project Manager",
      "status": "contract",
      "description": "Built a business web profile for PT Wiratrans Samudera using Laravel.",
      "place": "Jakarta",
      "start_date": "5 November 2024",
      "end_date": "5 January 2024",
    },
    {
      "id": 2,
      "company_name": "Sistem Informasi Universitas Pertamina",
      "position": "Frontend Developer",
      "status": "internship",
      "description": "BDeveloped NOLAN, a web application for meeting management, including scheduling, distribution, minutes, and task management. Served as a front-end developer using the Blade engine Laravel.",
      "place": "Jakarta",
      "start_date": "5 November 2024",
      "end_date": "5 January 2024",
    },
  ]
}
```

Response Body (Failed) :

```json
{
  "errors" : "company_name must not blank, ..."
}
```

## Remove

Endpoint : DELETE /api/experience/:idExperience

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