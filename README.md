# Get Country

## Project Overview
This project provides an API server that takes an IP address and returns the corresponding country code. It utilizes the `whois` library to perform a WHOIS lookup on the provided IP address and extracts the country information from the results. The server attempts to determine the client's IP address from request headers (e.g., `X-Forwarded-For`, `X-Real-IP`) or the direct connection when an IP is not explicitly provided.

## Technologies Used
- Node.js
- Express.js
- `whois` library

## User Guide

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/optiwariindia/get-country.git
    cd repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the project:**
    *   For development (with auto-reloading, if configured):
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```

### API Usage

The API server provides an endpoint to look up the country code for a given IP address.

#### Automatic IP Detection
- For **GET** requests to `/api/v1/country`, the server attempts to determine the visitor's IP address from request headers (e.g., `X-Forwarded-For`, `X-Real-IP`) or the direct connection.
- For **POST** requests to `/api/v1/country`, if an `ip` field is not provided in the JSON body, the server will also fall back to using these methods.

#### Endpoints

##### GET /api/v1/country
Retrieves the country code for the requestor's IP address (auto-detected).

- **Method:** GET
- **Endpoint:** `/api/v1/country`
- **Example Request:**
    ```bash
    curl http://localhost:3000/api/v1/country
    ```

##### POST /api/v1/country
Retrieves the country code for the IP address specified in the request body. If no IP is specified, it uses the auto-detected requestor's IP address.

- **Method:** POST
- **Endpoint:** `/api/v1/country`
- **Request Body (JSON):**
    ```json
    {
        "ip": "YOUR_IP_ADDRESS_HERE"
    }
    ```
- **Example Request (providing an IP):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"ip":"8.8.8.8"}' http://localhost:3000/api/v1/country
    ```
- **Example Request (IP auto-detection):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:3000/api/v1/country
    ```

#### Responses

-   **Success Response (Status Code: 200 OK)**
    Indicates a successful lookup.
    -   **Body:**
        ```json
        {
            "ip": "8.8.8.8",
            "cn": "US"
        }
        ```
    -   **Fields:**
        -   `ip`: The IP address that was looked up. This could be the IP address provided in a POST request or the auto-detected IP address.
        -   `cn`: The two-letter ISO country code (e.g., "US", "GB", "DE"). If the `whois` lookup returns "ZZ" (often used for unknown, unassigned, or reserved IP addresses), or if no country information can be determined, the `cn` field might be `null` or absent in the response.

-   **Error Response (Status Code: 401 Unauthorized)**
    This response indicates a generic error if the request cannot be processed or encounters an unhandled issue on the server. This might occur due to malformed requests that bypass other specific validations or if an unexpected problem arises during the IP lookup process.
    -   **Body:**
        ```json
        {
            "error": "Unauthorized"
        }
        ```
