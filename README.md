### Sleep Tracker ###

**/--------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**Register a Teacher**
_method url_: `/auth/register`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description            |
| ------------ | ------ | -------- | --------------         |
| `name`       | String | Yes      | Must be unique         |
| `password`   | String | Yes      |                        |


#### Example

```
  {
    "username": "chris",
    "password": "1234",
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 2,
    "username": "chris",
  }
```

##### 409 (Preconditon Failed)

```
  {
    "message": "Username is already taken"
  }
```

##### 500 (Server error)

```
  {
    "message": "Something went wrong",
  }
```


### **Login a teacher**

_method url_: `/auth/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      |                         |

#### Example

```
  {
    "username": "chris",
    "password": "1234"
  }
```

#### Response

##### 200 (ok)

> no issues logging in

###### Example response

```
  {
    "id": 2,
    "username": "chris",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im1pY2hhZWwiLCJpYXQiOjE1NjQ0MDY4OTQsImV4cCI6MTU2NDQ1MDA5NH0.sbuq8MfwUEaqjcdMEFgCLsxlNvnrpX9UndYIMKli14s"
  }
```


##### 401 (UnAuthorized)

```
  {
    message: "Invalid credentials"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Something went wrong",
  }
```

**/--------------------------------------------/ USER ROUTES /-----------------------------------/**

### **Get all Entries By a Users ID**

_method url_: `/entries/:id`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "date": "2020-05-20",
    "fell_asleep": "2020-05-20 12:00:00",
    "woke_up": "2020-05-20 08:00:00",
    "total_time_slept": null,
    "Entry_Id": 1
  },
  {
    "date": "2020-05-21",
    "fell_asleep": "2020-05-20 10:00:00",
    "woke_up": "2020-05-20 06:00:00",
    "total_time_slept": 8,
    "Entry_Id": 2
  }
]
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Invalid User)

```
  {
    message: "User not found"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Something went wrong",
  }
```

### **Get A single Entry By User Id and Entry Id**

_method url_: `/entries/:id/entry/:entryId`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
[
{
  "id": 1,
  "date": "2020-05-20",
  "fell_asleep": "2020-05-20 12:00:00",
  "woke_up": "2020-05-20 08:00:00",
  "total_time_slept": null
}
]
```

##### 404 (Not Found)

```
  {
    message: "Could not find post"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Something went wrong",
  }
```