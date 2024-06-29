exports.buildByClassificationId = async (req, res) => {
  const classificationId = parseInt(req.params.classificationId);  
    res.send(`Inventario para la clasificación con ID: ${classificationId}`);


  try {
    const inventoryData = await db.query('SELECT * FROM inventory WHERE classification_id = ?', [classificationId]);
    // ... (rest of the code for processing inventoryData)
  } catch (error) {
    switch (error.code) {
      case 'ER_NO_SUCH_TABLE':
        console.error('Error: Table "inventory" does not exist');
        res.status(500).send('Error: Inventory table not found');
        break;
      case 'ER_BAD_FIELD_ERROR':
        console.error('Error: Invalid field name in query');
        res.status(400).send('Error: Invalid query parameters');
        break;
      case 'ECONNREFUSED':
        console.error('Error: Database connection refused');
        res.status(503).send('Error: Unable to connect to database');
        break;
      default:
        console.error('Unhandled database error:', error);
        res.status(500).send('Error: Database error occurred');
    }
  }
};
