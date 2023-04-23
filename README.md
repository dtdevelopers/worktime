# Worktime

Welcome to Worktime, a project that aims to manage employees' worktime. This repository contains the code for both the frontend and backend, with the frontend built using React and the backend built using Node.js Nest. The project uses a PostgreSQL database hosted on CockroachDB. 

## Project Objective

The objective of Worktime is to simplify the process of managing employee worktime, ins and outs events, workload, vacations, and compensatory time off. By centralizing this data in one system, managers and HR can have a better overview of employee performance and productivity, as well as ensure that employees receive their rightful compensation for overtime and time off. 

## Technologies Used

- React (Frontend)
- Node.js Nest (Backend)
- PostgreSQL (Database)
- CockroachDB (Hosted Database)
- Docker (DevOps)
- Nginx (DevOps)
- AWS EC2 (DevOps)

## Installation and Setup

1. Clone the repository to your local machine.
2. Navigate to the `worktime` directory and install the dependencies for both the frontend and backend using `yarn install`.
3. Create a `.env` file in the root directory of the backend and fill in the necessary environment variables for the database connection and external service access.
4. Start the backend server using `yarn start:dev` and the frontend server using `yarn start`.
5. The application should now be accessible at `http://localhost:5173/`.

## Mocked JSON Data

For development purposes, the door device data will be mocked using JSON data. This data will be replaced with the actual door device data when the external service is ready to supply it.

## Contributing

This project is still a work in progress and contributions are welcome. If you would like to contribute, please submit a pull request with your changes.

## License

This project is licensed under the MIT License. It was created for portfolio and practicing purposes only. This means that you are free to use the code. If you wish to use this code for production purposes, please make sure to thoroughly test it and adapt it to your specific needs.
