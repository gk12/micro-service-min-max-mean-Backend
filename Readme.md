# Tech Stack

- NodeJS
- ExpressJS
- MongoDB

### For database we are using MongoDB with Mongoose(ORM)

### For Authentication part we are using token based authentication using JSON WEB TOKEN

## Basic Requirements

- NodeJS >= 14
- A running instance of MongoDB(for now i have used my mongodb cluster)

# Steps To Start The Application

- First of all you need to install all of the dependencies using

```
 npm install
```

Once all dependencies have been installed take a look at the .env if all the environment variables are present if yes then you can start the server with a simple

```
 npm start
```

## Routes

First Of All, You need to get a token to access all the other routes You can get a token using login route(http://localhost:3030/login) by passing payload

```
{
    "username":"test",
    "password":"test"
}
```

After successful login you will receive the token

```
{
    "token": "some token"
}
```

### NOTE :- You will need to include this token in the headers as Authorization header without Bearer

```
headers : {
  "Authorization" : token
}
```

## POST /addRecords

This API endpoint is designed to add a new record.

Model Schema types


    "name": string,
    "salary": number,
    "currency": string,
    "department": string,
    "on_contract": boolean,
    "sub_department": string


Endpoint

    Method: POST
    Path: /addRecords

Request Payload

```
{
  "name": "Saurav",
  "salary": 80000,
  "currency": "USD",
  "department": "Banking",
  "on_contract": true,
  "sub_department": "Loan"
}

```

Successful Response

```
{
  "message": "Record created successfully"
}
```

## DELETE /deleterecords/:id

This API endpoint is designed to delete record..
Endpoint

    Method: DELETE
    Path:  /deleterecords/:id

Request Parameters

    id: The unique identifier of the record to be deleted.

Successful Response

```
{
    "message": "Record deleted successfully"
}
```

## GET /fetchss

This API endpoint retrieves min,max and mean salary.

    Method: GET
    Path: /fetchss

Successful Response

```

 {
  "min": [
    {
      "_id": null,
      "minSalary": 30
    }
  ],
  "max": [
    {
      "_id": null,
      "maxSalary": 200000000
    }
  ],
  "mean": [
    {
      "_id": null,
      "meanSalary": 22295010
    }
  ]
}

```

## GET /fetchoncontact

This API endpoint retrieves min,max and mean salary for records which satisfy "on_contract": "true".

    Method: GET
    Path: /fetchoncontact

Successful Response

```
{
    "min": [
        {
            "_id": null,
            "minSalary": 90000
        }
    ],
    "max": [
        {
            "_id": null,
            "maxSalary": 110000
        }
    ],
    "mean": [
        {
            "_id": null,
            "meanSalary": 100000
        }
    ]
}

```

## GET /fetchdepartment

This API endpoint retrieves min,max and mean salary for each department.

    Method: GET
    Path: /fetchdepartment

Successful Response

```
{
    "min1": [
        {
            "_id": {
                "department": "Engineering"
            },
            "minSalary": 30
        },
        {
            "_id": {
                "department": "Operations"
            },
            "minSalary": 30
        },
        {
            "_id": {
                "department": "Administration"
            },
            "minSalary": 30
        },
        {
            "_id": {
                "department": "Banking"
            },
            "minSalary": 90000
        }
    ],
    "max1": [
        {
            "_id": {
                "department": "Operations"
            },
            "maxSalary": 70000
        },
        {
            "_id": {
                "department": "Banking"
            },
            "maxSalary": 90000
        },
        {
            "_id": {
                "department": "Administration"
            },
            "maxSalary": 30
        },
        {
            "_id": {
                "department": "Engineering"
            },
            "maxSalary": 200000000
        }
    ],
    "mean1": [
        {
            "_id": {
                "department": "Operations"
            },
            "meanSalary": 35015
        },
        {
            "_id": {
                "department": "Banking"
            },
            "meanSalary": 90000
        },
        {
            "_id": {
                "department": "Administration"
            },
            "meanSalary": 30
        },
        {
            "_id": {
                "department": "Engineering"
            },
            "meanSalary": 40099006
        }
    ]
}
```

## GET /fetchdepartmentandsubdept

This API endpoint retrieves min,max and mean salaryfor each department and sub-department combination.

    Method: GET
    Path: /fetchdepartmentandsubdept

Successful Response

```
{
    "min1": [
        {
            "_id": {
                "department": "Operations",
                "sub_department": "CustomerOnboarding"
            },
            "minSalary": 30
        },
        {
            "_id": {
                "department": "Administration",
                "sub_department": "Agriculture"
            },
            "minSalary": 30
        },
        {
            "_id": {
                "department": "Banking",
                "sub_department": "Loan"
            },
            "minSalary": 90000
        },
        {
            "_id": {
                "department": "Engineering",
                "sub_department": "Platform"
            },
            "minSalary": 30
        }
    ],
    "max1": [
        {
            "_id": {
                "department": "Engineering",
                "sub_department": "Platform"
            },
            "maxSalary": 200000000
        },
        {
            "_id": {
                "department": "Banking",
                "sub_department": "Loan"
            },
            "maxSalary": 90000
        },
        {
            "_id": {
                "department": "Administration",
                "sub_department": "Agriculture"
            },
            "maxSalary": 30
        },
        {
            "_id": {
                "department": "Operations",
                "sub_department": "CustomerOnboarding"
            },
            "maxSalary": 70000
        }
    ],
    "mean1": [
        {
            "_id": {
                "department": "Engineering",
                "sub_department": "Platform"
            },
            "meanSalary": 40099006
        },
        {
            "_id": {
                "department": "Banking",
                "sub_department": "Loan"
            },
            "meanSalary": 90000
        },
        {
            "_id": {
                "department": "Administration",
                "sub_department": "Agriculture"
            },
            "meanSalary": 30
        },
        {
            "_id": {
                "department": "Operations",
                "sub_department": "CustomerOnboarding"
            },
            "meanSalary": 35015
        }
    ]
}
```
