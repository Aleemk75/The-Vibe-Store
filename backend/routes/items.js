const express = require("express");
const items = require("../data/items");

const router = express.Router();

const ITEMS_PER_PAGE = 9;


router.get("/", (req, res) => {
  try {
    const search = (req.query.search || "").trim().toLowerCase();
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit) || ITEMS_PER_PAGE));
    
    let filtered = search
      ? items.filter((item) => item.name.toLowerCase().includes(search))
      : [...items];
    
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    res.json({
      items: paginatedItems,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;
