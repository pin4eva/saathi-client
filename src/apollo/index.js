import { ApolloClient, InMemoryCache } from "@apollo/client";
import jscookie from "js-cookie"

const HTTP_URL = process.env.NODE_ENV === "production" ? "https://..." : "http://localhost:8000";

export const TOKEN_NAME = "token";

const client = new ApolloClient({
    uri: `${HTTP_URL}/api/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
    headers: {
        authorization: jscookie.get(TOKEN_NAME) || ""
    }
})

export default client