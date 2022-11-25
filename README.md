# kanban_practice
# Kanban Application
Membuat sebuah website kanban 
Kanban App, using express, jquery, ajax
This is an application to organize and maintain your flow of tasks.
This app has :
* RESTful endpoint for task List's CRUD operation
* JSON formatted response

`environment variables:`
* file .env values:
> - PORT=
> - SECRET_KEY=
> - CLIENT_ID=

`link deploy:`
> - _heroku_
> - _firebase_

`apis:`
> - 

`Raka's Kanban  Guides:`
> - Log In - this button automatically guide you to our task table page
> - Register - this button automatically store your user data to the application
> - Google Button - this button allows you to signing in using your google account
> - Add task - this button allows you to create a new task in a form. once it generate, it will automatically comes with tasks id AND category of "Backlog"
> - Log Out ( Kanban or Google ) - this button allows you to log yourself out from the application. Don't worry, it comes with a confirmation log out Modal.
> - #(tasks id) - tells you the number of selected tasks has been created for the whole application
> - Title - tells the main to do activity
> - Category - shows the status of the task and where it belong
> - Actions,
-- Back(arrow left): allows you to move the selected task to go to its previous status. Mainly because the task has not been done in the current category and needs to do a rework
-- Edit: this button allows you to manipulate the selected task in a form, excluded: task's id
--Delete: this button allows you to terminate selected task. Don't worry, it comes with a confirmation delete Modal.
-- Next(arrow right): allows you to move the selected task to go to next state of category. Mainly because the task has been done in the current category .

&nbsp;
# RESTful endpoints

## Global Responses
_Response (500 - Unknown error)_
> This endpoint should always return response below,
```
{ "message": "Interval Server Error" }
```
---
## POST /register

> Create a new user account

_Request Header_
```
  no need
```
_Request Body_
```
{
  email: <email input>,
  password: <email password>
}
```
_Response (201)_
```
{
    "id": <created id>,
    "email": <created email>,
    "organization": <created organization>,
    "updatedAt": "2020-05-05T08:39:37.867Z",
    "createdAt": "2020-05-05T08:39:37.867Z"
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": "Email already exist"
}
```
---
## POST /login

> Create a new user account

_Request Header_
```
  no need
```
_Request Body_
```
{
  email: <email input>,
  password: <email password>
}
```
_Response (200)_
```
{
    "email": <given email>
    "access_token": <created access_token>
}
```
_Response (400 - Bad request)_
```
{ 
    "message": "Invalid, check email or password"
}
```

---
## GET /tasks

>Get all tasks list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
    {
        "id": <task id>,
        "title": "<task title>",
        "category": "<task category>",
        "UserId": "<task UserId>",
        "createdAt": "2020-04-27T13:07:02.409Z",
        "updatedAt": "2020-04-27T17:00:35.647Z",
        "User": <User data>
    },
    {
        "id": <task id>,
        "title": "<task title>",
        "category": "<task category>",
        "UserId": "<task UserId>",
        "createdAt": "2020-04-27T13:07:02.409Z",
        "updatedAt": "2020-04-27T17:00:35.647Z",
        "User": <User data>
    },
]
```

---
## POST /tasks

>Create new tasks list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
}
```
_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "category": "<posted category>",
    "UserId": "<posted UserId>",
    "updatedAt": "2020-04-29T09:18:21.016Z",
    "createdAt": "2020-04-29T09:18:21.016Z"
}
```
_Response(400- Bad request)_ (validation)
```
{
    "message": [
        "Please do not leave title empty";
        "Please do not leave title null";
    ]
}
```
---
## PUT /tasks/:id

>Update tasks list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title to get updated later on>"
}
```
_Response(200)_
```
{
    "message": "Update selected task successfully"
}
```
_Response(404 - Not found_
```
{
    "message": "Task not found"
}
```
_Response(400 - Bad request)_ (validation)
```
{
    "message": [
        "Please do not leave title empty";
        "Please do not leave title null";
    ]
}
```

---
## DELETE /tasks/:id

>Delete task by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response(200)_
```
{
    "message": "Delete selected task successfully"
}
```
_Response(404 - Not found_
```
{
    "message": "Task not found"
}
```
