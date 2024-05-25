# Get Country
## Project Overview
This project relies on the `whois` library to extract country information from ip address through whois lookups. The server automatically reads visitor's IP Address from the `X-Forwarded-For` header.
## Usage
### API Endpoint

- **Method:** GET
- **Endpoint:** `/api/v1/country`
- **Response:**
    - **Status Code:** 200 OK
    - **Body:**
        ```json
        {
            "ip":"192.168.1.1",
            "cn": "US"
        }
        ```
- **Error:**
    - **Status Code:** 401 OK
    - **Body:**
        ```json
        {
            "error": "Permission Denied"
        }
        ```


