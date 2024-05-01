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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      email: "maggie_boyse@hotmail.com",
      password: "moggie-admin866",
      username: "maggies-moggies",
    },
  ]);
  await knex("patterns").del();
  await knex("patterns").insert([
    {
      id: 1,
      pattern_title: "Dish Sponge",
      pattern_body:
        "1. Chain 20 2. HDC in 3rd chain from hook. HDC across 3. Ch 2. HDC across 4.- 12 Ch 2. HDC across 1. Chain 17 2. DC in 4th chain from hook. DC across 3. Ch 2. FPDC. *DC In next 2 stitches, FPDC in next. Repeat from * across. DC in top of chain 4. Ch 2. DC in next stitch. *FPDC in next 2 stitches, DC in next. Repeat from * across. 5. Alternate rows 3 & 4",
      pattern_image: "/images/crochet-dish-sponge.jpg",
      user_id: 1,
    },
    {
      id: 2,
      pattern_title: "Basic Dishcloth",
      pattern_body:
        "1. Chain 36 2. 1 HDC in third chain from hook 3. - 26 continue 4. HDC border",
      pattern_image: "/images/crochet-basic-dishcloth.jpg",
      user_id: 1,
    },
  ]);
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: 1,
      post_body:
        "Welcome to Maggie's Moggies! Leave a post here about your projects, meetups, making crochet friends, and more!",
      user_id: 1,
    },
  ]);
};
//// on front end src={`${SERVER_URL}${obj.pattern_image}`
