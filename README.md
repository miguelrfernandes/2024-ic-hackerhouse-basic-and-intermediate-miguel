## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# On a new tab start the replica, it will be important for logs
dfx start

# On previous tab, deploy your canisters to the replica and generate your candid interface
dfx deploy --playground
```

Once the job completes, your application will be available at the links provided (be aware of copying the query params to the Codespace machine url!).

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:3000`, proxying API requests to the replica at port 4943.
