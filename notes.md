API endpoints

Maggies_Moggies

- POST /posts
- POST /patterns
  -- will need to be authed with authorization header

- POST /auth/signup
- POST /auth/login
  -- can be a route together

- GET /patterns
  -- gets ALLLL patterns from both
  -- will include Ravelry endpoint(s)
  -- optional query param to search

## would be cool to comment on patterns. Nice to have

- GET /patterns/:id
  -- from just moggies
  -- display on page

- GET /posts

## additional functionality of filtering/expiring/managing user posts

    -- display community board

posts and patterns can each be one route respectively

1. setup API env variables etc
2. establish routers/routes
3. test endpoints thunderclient
4. refer to routering/API backend examples
5. before coding endpoints, pseudocode --> what is each request, and each expected response
   -- how to blend the different API endpoint responses?
   -- differentiate between database and ravelry

--which comes first - auth or ravelry?


