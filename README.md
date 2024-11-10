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

For more information about the project, you can visit the [project page](https://taikai.network/icp-portugal/hackathons/ICP-AI-HACKERHOUSE/projects/cm3bjkxkc07n467douxi63skp/idea).
For a visual guide on how to run the project locally, you can watch the following video:

[![Running the project locally](https://img.youtube.com/vi/Sdxa7D7uq18/0.jpg)](https://www.youtube.com/watch?v=Sdxa7D7uq18)
