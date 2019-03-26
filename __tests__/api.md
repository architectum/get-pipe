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
### Type: **`| Prescription |`**:
```yaml
{
    "data": object,        # required | data object according to activity
    "frequency": {         # required | @see Frequency
        "days": array<Day>
        "type": "daily"
    },
    "start": "2019-03-18T15:12:56Z",
    "end": "2019-04-18T15:12:56Z",
    "title": "Treatment Text",
    "type": "text"
}
```
### Type: **`| Day |`**:
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

# Templates
## Get `Template` list for doctor
```elm
✔ GET /api/v4/profile/templates 
```
>**<-#** *::* ava test: ( *172ms* )
### Request
- **headers**: `@global`

## Get `Template` details
```elm  
✔ GET /api/v4/profile/templates/':template_id'
```
>**<-•** *::* ava test: ( *156ms* )
### Request
- **headers**: `@global`


## Create new `Template` 
> **•->** *::* ava test: ( *155ms* )
```elm  
✔ POST /api/v4/profile/templates 
```
### Request
- **headers**: `@global`
- **body**
    ```yaml
    {
        "title": "Treatment Created",   # required | string
        "diagnosis": :diagnosis_id,     # required | string
        "prescriptions": [ ]            # required | Prescription[]
    }
    ```
### Response
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
- **401**
- **403**
- **422**
- **500**

## Edit `Template`
```elm  
  ✔ PUT /api/v4/profile/templates/':template_id'
```
> **•-•** *::* ava test: *257ms*
### Request
- **headers**: `@global`
- **body**
    ```yaml
    {
        "title": "Treatment Edited",    # optional | string
        "folder": :folder_id            # optional | string
        "prescriptions": [ ]            # optional | Prescriptions[]
    }
    ```
### Response
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
- **401**
- **403**
- **422**
- **500**


## Remove `Template`
> **•-x** *::* ava test: *135ms*
```elm  
  ✔ DELETE /api/v4/profile/templates/':template_id'
```
### Request
- **headers**: `@global`
- **body**
    ```yaml
    {
        "id": :template_id # required | string    Template ID to delete
    }
    ```
### Response
- **200**
    ```yaml
    {
        "status": "ok",
        "message": "success",
        "data": { }
    }
    ```
- **401**
- **403**
- **422**
- **500**
