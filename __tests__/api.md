# `[ Doctor API ]` Treatments and Templates 
> API Documentation \
> **`@version`**: **v4** \
> **`@url`**: **[/api/v4](http://34.245.46.125/api/v4)**

## Global parameters:
### Request 
- **headers**
    ```elm
    Content-Type: application/json
    Authorization: Bearer ':doctor_token'
    ```
### Response
- **`@http_code`**
    ```yaml
    {
        "status": "ok|error",   # response status: 'ok' or 'error'
        "message": string,      # response info or error description
        "data": object          # response {Data}
    }
    ```
- **200** OK
    ```yaml
    {
        "status": "ok",
        "message": "success",
        "data": [ ]
    }
    ```
- **201** Creat3e4d
    ```yaml
    {
        "status": "ok",
        "message": "created",
        "data": {
            "id": integer | string
        }
    }
    ```
- **400** Bad request
    ```yaml
    {
        "status": "error",
        "message": "request error",
        "data": { }
    }
    ```
- **403** Forbidden
    ```yaml
    {
        "status": "error",
        "message": "token verification error",
        "data": { }
    }
    ```
- **404** Not Found
    ```yaml
    {
        "status": "error",
        "message": "resource doesn't exist",
        "data": { }
    }
    ```
- **422** Unprocessable Entity
    ```yaml
    {
        "status": "error",
        "message": "validation error",
        "data": { }
    }
    ```
- **500**  Internal Server Error 
    ```yaml
    {
        "status": "error",
        "message": "server error",
        "data": { }
    }
    ```

### **@** Type **`| Prescription |`**:
```yaml
{
    "title": "Treatment Text",  # required | UI Title
    "type": string              # required | @see Activity::types
    "data": object,             # required | DataObject according to activity
    "frequency": {              # required | @see Frequency
        "days": array<Day>      # required | Day's schedule
        "type": string          # required | one of "daily|weekly|monthly" 
    },
    "start": datetime,          # required | format:YYYY-MM-ddThh:mm:ss+ZZZZ
    "end": datetime,            # optional | format:YYYY-MM-ddThh:mm:ss+ZZZZ
    "repeats": intetger,        # optional | if 'end' not provided
}
```
### **@** Type **`| Day |`**:
```yaml
{
    "day": 1,                       # required | day of week (1 is for Monday)
    "schedule": [
        { 
            "time": string % hh:mm, # required | time for activity
            "dosage": string        # optional | required for medocine type prescription
        }
    ]
}
```

---

# `1.` Templates
## Get `Template` list for doctor
```elm
✔ GET /api/v4/profile/templates 
```
>**<-#** *::* ava test: ( *172ms* )
### Request
- **`@headers`***`: @inherit`*

## Get `Template` details
```elm  
✔ GET /api/v4/profile/templates/':template_id'
```
>**<-•** *::* ava test: ( *156ms* )
### Request
- **`@headers`***`: @inherit`*


## Create new `Template` 
> **•->** *::* ava test: ( *155ms* )
```elm  
✔ POST /api/v4/profile/templates 
```
### Request
- **`@headers`***`: @inherit`*
- **body**
    ```yaml
    {
        "title": "Treatment Created",   # required | string
        "diagnosis": :diagnosis_id,     # required | string
        "prescriptions": [ ]            # required | Prescription[]
    }
    ```
### Response
- **`@code`***`: @inherit`*
- **201** Created
    ```yaml
    {
        "status": "ok",
        "message": "success",
        "data": {
            "id": :template_id # string    Created Template ID
        }
    }
    ```

## Edit `Template`
```elm  
  ✔ PUT /api/v4/profile/templates/':template_id'
```
> **•-•** *::* ava test: *257ms*
### Request
- **`@headers`***`: @inherit`*
- **body**
    ```yaml
    {
        "title": "Treatment Edited",    # optional | string
        "folder": :folder_id            # optional | string
        "prescriptions": [ ]            # optional | Prescriptions[]
    }
    ```
### Response
- **`@code`***`: @inherit`*
- **200**
    ```yaml
    {
        "status": "ok",
        "message": "success",
        "data": {
            "id": :template_id # string    Edited Template ID
        }
    }
    ```


## Remove `Template`
> **•-x** *::* ava test: *135ms*
```elm  
  ✔ DELETE /api/v4/profile/templates/':template_id'
```
### Request
- **`@headers`***`: @inherit`*
- **body**
    ```yaml
    {
        "id": :template_id # required | string    Template ID to delete
    }
    ```
### Response
- **`@code`***`: @inherit`*
- **200**
    ```yaml
    {
        "status": "ok",
        "message": "success",
        "data": { }
    }
    ```
