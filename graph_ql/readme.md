# F1-hub backend

This app was created to provide a backend to f1-hub app.
It is a simple Django+graphene setup, based on an existing mySQL database, which can be found at (TODO: URL to ergast DB).

## Running 

To run the server, first activate the Python virtual environment. To do this, run ` source venv/bin/activate ` from inside /graph_ql/ folder.
Then, execute:
```
cd f1-hub
python manage.py runserver
```
From this point on, the server will be available at 127.0.0.1:8000.

## Testing

To test making queries, you can either use a third-party REST client (I recommend Insomnia) or visit http://127.0.0.1:8000/graphql and use the in-build system.
