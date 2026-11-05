export async function onRequestGet(context) {
  try {
    // DB merujuk kepada D1 Binding yang tuan set dalam Cloudflare Dashboard
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM catalog ORDER BY id DESC"
    ).all();

    return Response.json(results, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60" // Cache 1 minit di edge supaya laju
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
