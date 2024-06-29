-- Insertar un nuevo registro en la tabla 'account'
INSERT INTO account (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Modificar el registro de Tony Stark para cambiar el 'account_type' a 'Admin'
UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';

-- Eliminar el registro de Tony Stark de la base de datos
DELETE FROM account
WHERE email = 'tony@starkent.com';

-- Modificar el registro de 'GM Hummer' para cambiar la descripción
UPDATE inventory
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';

-- Usar un INNER JOIN para seleccionar campos específicos de las tablas 'inventory' y 'classification'
SELECT inventory.make, inventory.model, classification.classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

-- Actualizar todos los registros en la tabla 'inventory' para añadir "/vehicles" al medio de las rutas de 'inv_image' y 'inv_thumbnail'
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
