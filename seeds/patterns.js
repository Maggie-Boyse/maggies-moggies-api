/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("patterns").del();
  await knex("patterns").insert([
    {
      id: 1,
      pattern_title: "Dish Sponge",
      pattern_body:
        "1. Chain 20 2. HDC in 3rd chain from hook. HDC across 3. Ch 2. HDC across 4.- 12 Ch 2. HDC across 1. Chain 17 2. DC in 4th chain from hook. DC across 3. Ch 2. FPDC. *DC In next 2 stitches, FPDC in next. Repeat from * across. DC in top of chain 4. Ch 2. DC in next stitch. *FPDC in next 2 stitches, DC in next. Repeat from * across. 5. Alternate rows 3 & 4",
      pattern_image: "/images/crochet-dish-sponge.jpg",
    },
    {
      id: 2,
      pattern_title: "Basic Dishcloth",
      pattern_body:
        "1. Chain 36 2. 1 HDC in third chain from hook 3. - 26 continue 4. HDC border",
      pattern_image: "/images/crochet-basic-dishcloth.jpg",
    },
  ]);
};
await knex()
//// on front end src={`${SERVER_URL}${obj.pattern_image}`
